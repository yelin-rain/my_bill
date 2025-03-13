import React, { memo, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextOutline, PieOutline, UserOutline } from 'antd-mobile-icons';

import taxios from '@/service';
import s from './style.module.less';

const Tabbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = useState(pathname);
  const tabs = [
    {
      key: '/home',
      title: '账单',
      icon: <TextOutline />,
    },
    {
      key: '/statis',
      title: '统计',
      icon: <PieOutline />,
    },
    {
      key: '/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ];
  return (
    <>
      <div className={s.wrap}>
        <TabBar
          activeKey={activeKey}
          onChange={value => {
            setActiveKey(value);
            navigate(value);
          }}
        >
          {tabs.map(item => (
            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </>
  );
};

export default memo(Tabbar);
