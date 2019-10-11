import React from 'react';
import './App.css';
import LayoutPage from './containers/Layout/Layout.js';
import 'antd/dist/antd.css';
import { BrowserRouter} from 'react-router-dom';

const App = () => {
  return (
<BrowserRouter>
<div>
<LayoutPage/>;
</div>
</BrowserRouter>
  )

  
};
export default App;
