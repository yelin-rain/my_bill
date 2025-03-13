import React, { memo } from 'react';
import { NavBar, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import s from './style.module.less';

const About: React.FC = () => {
  const navigate = useNavigate();

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
            关于我们
          </NavBar>
        </div>
        <div className={s.content}>
          <h3>好好学习，天天向上</h3>
          <Button
            color="primary"
            onClick={() => {
              navigate('/user');
            }}
          >
            返回
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(About);
