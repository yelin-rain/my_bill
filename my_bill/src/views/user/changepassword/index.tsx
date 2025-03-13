import React, { memo, useEffect, useState } from 'react';
import { NavBar, Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import taxios from '@/service';
import s from './style.module.less';

const changPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();
  const onSubmitClick = async () => {
    if (!oldPassword) {
      Toast.show('请输入原密码');
      return;
    }
    if (!newPassword) {
      Toast.show('请输入新密码');
      return;
    }
    if (!confirmPassword) {
      Toast.show('请确认新密码');
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show('两次输入的密码不一致');
      return;
    }
    if (
      oldPassword &&
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword
    ) {
      const res = await taxios.post('/user/changePassword', {
        oldPassword,
        newPassword,
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
            修改密码
          </NavBar>
        </div>
        <div className={s.content}>
          <Form
            layout="horizontal"
            mode="card"
            footer={
              <Button
                block
                color="primary"
                size="large"
                onClick={onSubmitClick}
              >
                提交
              </Button>
            }
          >
            <Form.Item label={'原密码'}>
              <Input
                placeholder="请输入原密码"
                value={oldPassword}
                onChange={e => {
                  setOldPassword(e);
                }}
              />
            </Form.Item>
            <Form.Item label={'新密码'}>
              <Input
                placeholder="请输入新密码"
                value={newPassword}
                onChange={e => {
                  setNewPassword(e);
                }}
              />
            </Form.Item>
            <Form.Item label={'新密码'}>
              <Input
                placeholder="请再次输入确认新密码"
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e);
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default memo(changPassword);
