import React, { memo, useEffect, useState } from 'react';
import { Button, Modal, List, Dialog } from 'antd-mobile';
import { useNavigate, Outlet } from 'react-router-dom';

import taxios from '@/service';
import s from './style.module.less';
import dayjs from 'dayjs';

interface IUserInfo {
  phone: number;
  username: null;
  avatar: string;
  signature: string;
  create_at: string;
}

const User: React.FC = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const { data } = await taxios.get('/user/getUserInfo');
    setUserInfo(data.user);
  };
  const logout = () => {
    Dialog.show({
      title: '退出',
      content: '确认退出登录？',
      closeOnMaskClick: true,
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'confirm',
            text: '确认',
            bold: true,
            danger: true,
            onClick: () => {
              localStorage.removeItem('token');
              navigate('/login');
            },
          },
        ],
      ],
    });
    // Modal.confirm({
    //   title: '退出',
    //   content: '确认退出登录？',
    //   closeOnMaskClick: true,
    //   confirmText: '确认',
    //   cancelText: '取消',
    //   onConfirm: () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    //   },
    // });
  };
  return (
    <>
      <div className={s.wrap}>
        <div className={s.header}>
          <div className={s.info}>
            <div className={s.username}>
              昵称：{userInfo?.username || userInfo?.phone}
            </div>
            <div className={s.signature}>
              <img src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
              <span>{userInfo?.signature}</span>
            </div>
          </div>
          <div className={s.avatar}>
            <img src={userInfo?.avatar} alt="" />
            {/* <img
              src="https://wx2.sinaimg.cn/mw690/008g8FqPly1ht9axcgf56j30u00u0jto.jpg"
              alt=""
            /> */}
          </div>
        </div>
        <div className={s.content}>
          <List>
            <List.Item
              prefix={
                <img
                  style={{ width: 20, verticalAlign: '-7px' }}
                  src="//s.yezgea02.com/1615974766264/gxqm.png"
                  alt=""
                />
              }
              clickable={false}
              arrowIcon={true}
              onClick={() => {
                navigate('/user/changeUserInfo');
              }}
            >
              修改用户信息
            </List.Item>
            <List.Item
              prefix={
                <img
                  style={{ width: 20, verticalAlign: '-7px' }}
                  src="//s.yezgea02.com/1615974766264/zhaq.png"
                  alt=""
                />
              }
              clickable={false}
              arrowIcon={true}
              onClick={() => {
                navigate('/user/changePassword');
              }}
            >
              修改密码
            </List.Item>
            <List.Item
              prefix={
                <img
                  style={{ width: 20, verticalAlign: '-7px' }}
                  src="//s.yezgea02.com/1615975178434/lianxi.png"
                  alt=""
                />
              }
              clickable={false}
              arrowIcon={true}
              onClick={() => {
                navigate('/user/about');
              }}
            >
              关于我们
            </List.Item>
          </List>
        </div>
        <div className={s.logout_btn}>
          <Button onClick={logout} color="danger" block>
            退出登录
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(User);
