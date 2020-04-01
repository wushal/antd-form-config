import React from 'react';
import ReactDOM from 'react-dom';
import ConfigProvider from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import AntdFormConfig from './views/index';
import './app.less';

const App = () => (
  <ConfigProvider locale={zhCN}>
    <AntdFormConfig />
  </ConfigProvider>
);


ReactDOM.render(<App />, document.getElementById('app'));
