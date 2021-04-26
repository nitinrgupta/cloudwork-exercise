import React from 'react';

import { WorkloadFormContainer } from './WorkloadForm';
import { WorkloadListContainer } from './WorkloadList';

import './WorkloadPage.css';

const Workload = () => (
  <div className="page-container">
    <div className="page-innerContainer">
      <WorkloadFormContainer />
      <WorkloadListContainer />
    </div>
  </div> 
)
export default Workload;
