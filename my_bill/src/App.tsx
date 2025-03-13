import React, { useEffect, useState } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { DotLoading, ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';

import TabBar from './components/tab-bar';
import { routes } from '@/router/index';

const TLoading = () => {
  return (
    <div className="center">
      <DotLoading color="primary" />
    </div>
  );
};

function App() {
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    ['/home', '/statis', '/user'].includes(pathname)
      ? setShowNav(true)
      : setShowNav(false);
  }, [pathname]);

  return (
    <ConfigProvider locale={zhCN}>
      <>
        <React.Suspense fallback={<TLoading />}>
          {useRoutes(routes)}
        </React.Suspense>
        {showNav && <TabBar />}
      </>
    </ConfigProvider>
  );
}

export default App;
