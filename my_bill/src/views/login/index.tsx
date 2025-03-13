import React, { memo, useEffect, useState } from 'react';

import Vcode from 'react-vcode';
import { Button, Input, Tabs, Form, Toast } from 'antd-mobile';

import s from './style.module.less';
import userIcon from '@/assets/images/icons/账号.png';
import passwordIcon from '@/assets/images/icons/密码.png';
import identifyIcon from '@/assets/images/icons/验证码.png';
import taxios from '@/service';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [vcode, setVcode] = useState('');
  const [authCode, setAuthCode] = useState('');

  // 如果之前登录过直接跳转至home
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);

  // 点击改变验证码
  const handleVcodeChange = (value: any) => {
    setVcode(value);
  };

  // 点击登录
  const handleLogin = async (): Promise<void> => {
    if (!loginPhone) {
      Toast.show({
        content: '请输入手机号',
        position: 'bottom',
      });
      return;
    }
    if (!loginPassword) {
      Toast.show({
        content: '请输入密码',
        position: 'bottom',
      });
      return;
    }

    const { data } = await taxios.post('/user/signIn', {
      phone: loginPhone,
      password: loginPassword,
    });
    console.log(data);

    if (data.code === '0') {
      localStorage.setItem('token', data.token);
      Toast.show({
        content: '登录成功',
        position: 'bottom',
        icon: 'success',
      });
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
  };

  // 点击注册
  const handleRegister = async (): Promise<void> => {
    if (!registerPhone) {
      Toast.show({
        content: '请输入手机号',
        position: 'bottom',
      });
      return;
    }
    if (!registerPassword) {
      Toast.show({
        content: '请输入密码',
        position: 'bottom',
      });
      return;
    }
    if (authCode !== vcode) {
      Toast.show({
        content: '验证码错误',
        position: 'bottom',
      });
      return;
    }
    const { data } = await taxios.post('/user/signUp', {
      phone: registerPhone,
      password: registerPassword,
    });
    if (data.code === '0') {
      Toast.show({ content: '注册成功', position: 'bottom', icon: 'success' });
      //重置输入框
      setRegisterPhone('');
      setRegisterPassword('');
      setAuthCode('');
    }
  };

  return (
    <>
      <div className={s.wrap}>
        <div className={s.header}></div>
        <div className={s.body}>
          <Tabs>
            <Tabs.Tab title="登录" key={'login'}>
              <div className={s.form}>
                <Form layout="horizontal">
                  <Form.Item
                    label={
                      <div>
                        <img src={userIcon} className={s.icon} />
                        手机号
                      </div>
                    }
                    name="username"
                  >
                    <Input
                      placeholder="请输入手机号"
                      value={loginPhone}
                      onChange={(e: string) => {
                        setLoginPhone(e);
                      }}
                      clearable
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div>
                        <img src={passwordIcon} className={s.icon} />
                        密码
                      </div>
                    }
                    name="password"
                  >
                    <Input
                      placeholder="请输入密码"
                      type="password"
                      value={loginPassword}
                      onChange={(e: string) => {
                        setLoginPassword(e);
                      }}
                      clearable
                    />
                  </Form.Item>
                </Form>
                <Button color="primary" block onClick={handleLogin}>
                  登录
                </Button>
              </div>
            </Tabs.Tab>
            <Tabs.Tab title="注册" key={'register'}>
              <div className={s.form}>
                <Form layout="horizontal">
                  <Form.Item
                    label={
                      <div>
                        <img src={userIcon} className={s.icon} />
                        手机号
                      </div>
                    }
                    name="username"
                  >
                    <Input
                      placeholder="请输入手机号"
                      value={registerPhone}
                      onChange={(e: string) => {
                        setRegisterPhone(e);
                      }}
                      clearable
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div>
                        <img src={passwordIcon} className={s.icon} />
                        密码
                      </div>
                    }
                    name="password"
                  >
                    <Input
                      placeholder="请输入密码"
                      type="password"
                      value={registerPassword}
                      onChange={(e: string) => {
                        setRegisterPassword(e);
                      }}
                      clearable
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div>
                        <img src={identifyIcon} className={s.icon} />
                        验证码
                      </div>
                    }
                    name="vcode"
                    extra={
                      <div className={s.vcode}>
                        <Vcode
                          onChange={handleVcodeChange}
                          className={s.vcode}
                        />
                      </div>
                    }
                  >
                    <Input
                      placeholder="请输入验证码"
                      value={authCode}
                      clearable
                    />
                  </Form.Item>
                </Form>
                <Button color="primary" block onClick={handleRegister}>
                  注册
                </Button>
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default memo(Login);
