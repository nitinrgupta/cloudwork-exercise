import React, { PureComponent } from 'react';

import Navbar from './Navbar';
import Header from './Header';
import WorkloadPage from '../Pages/Workload';

import './App.css';


class App extends PureComponent {
  render() {
    return (
      <div className="app-root">
        <Navbar />
        <hr className="margin-0"/>
        <Header />
        <WorkloadPage />
      </div>
    );
  }
}

export default App;
