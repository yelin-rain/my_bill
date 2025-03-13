import React, { memo, useState, useEffect, useRef } from 'react';
import { NavBar, Form, Button, Input, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import taxios from '@/service';
import avaterCover from '@/assets/images/icons/头像蒙版.svg';
import s from './style.module.less';

const ChangeUserInfo: React.FC = () => {
  const [username, setUserName] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [tempAvatar, setTempAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const { data } = await taxios.get('/user/getUserInfo');
    setUserName(data.user.username);
    setSignature(data.user.signature);
    setTempAvatar(data.user.avatar);
  };
  const afterSelectImg = () => {
    if (fileInputRef.current?.files) {
      const files = fileInputRef.current?.files;
      if (!files[0].type.startsWith('image')) {
        alert('请上传图片类型文件');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        const res = e.target?.result as string;
        setTempAvatar(res);
      };
    }
  };

  const onSubmitClick = async () => {
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('signature', signature);
    if (fileInputRef.current?.files) {
      formdata.append('avatar', fileInputRef.current.files[0]);
    }
    const res = await taxios.post('/user/changeUserInfo', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data.code === '0') {
      Toast.show({
        position: 'bottom',
        content: '修改成功',
      });
      navigate('/user');
    } else {
      Toast.show({
        position: 'bottom',
        content: '修改失败',
      });
    }
  };

  return (
    <>
      <div className={s.wrap}>
        <div className={s.header}>
          <NavBar
            onBack={() => {
              navigate('/user');
            }}
            style={{
              '--border-bottom': '1px #eee solid',
            }}
          >
            用户信息
          </NavBar>
        </div>
        <div className={s.content}>
          <div className={s.avatar}>
            <div className={s.uploader}>
              <input
                type="file"
                className={s.fileInput}
                ref={fileInputRef}
                onChange={afterSelectImg}
              />
              <img className={s.tempAvatar} src={tempAvatar} alt="" />
              <div className={s.mask}>
                <img src={avaterCover} alt="" />
              </div>
            </div>
          </div>
          <div className={s.form}>
            <Form
              layout="horizontal"
              footer={
                <Button color="primary" block onClick={onSubmitClick}>
                  保存
                </Button>
              }
            >
              <Form.Item label="用户名">
                <Input
                  placeholder="请输入用户名"
                  value={username}
                  onChange={e => {
                    setUserName(e);
                  }}
                />
              </Form.Item>
              <Form.Item label="个性签名">
                <Input
                  placeholder="请输入个性签名"
                  value={signature}
                  onChange={e => {
                    setSignature(e);
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ChangeUserInfo);
