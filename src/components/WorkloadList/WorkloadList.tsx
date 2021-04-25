import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootAction, RootState } from '../../state';
import { cancel, checkStatus } from '../../state/workloads/actions';
import { WorkloadItem, WorkloadItemStateProps } from '../WorkloadItem';
import './WorkloadList.css';


export interface WorkloadListStateProps {
  workloads: WorkloadItemStateProps[];
}

export interface WorkloadListDispatchProps {
  cancelWorkload: (id: number) => void;
  checkStatus: (id: number) => void;
}

export interface WorkloadListProps extends 
  WorkloadListStateProps,
  WorkloadListDispatchProps {}


const WorkloadList: React.SFC<WorkloadListProps> = ({ workloads, cancelWorkload, checkStatus }) => {
  return (
    <div className="workload-list-container">
      <h3 className="list-header"><span>Current Workloads</span> <span>{workloads.length}</span> </h3>
      <div className="workload-list">
        {!workloads.length 
        ? (
            <div className="empty-list">
              <svg width="302" height="106" viewBox="0 0 302 106" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="302" height="106" rx="4" fill="#111111"/>
              <rect x="26" y="29" width="121" height="13" fill="#2C2C2C"/>
              <rect x="26" y="64" width="121" height="13" fill="#2C2C2C"/>
              <circle cx="252.5" cy="57.5" r="19.5" fill="#2C2C2C"/>
              </svg>
              <p>No ongoing workloads currently</p>
            </div> 
          )
        : 
          workloads.map((workload) => (
            <WorkloadItem key={workload.id} {...workload} onCancel={() => cancelWorkload(workload.id)} onCompletion={() => checkStatus(workload)}/>
          ))
        }
      </div>
    </div>
    )
  }



const mapStateToProps = (state: RootState): WorkloadListStateProps => ({
  workloads: Object.values(state.workloads),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): WorkloadListDispatchProps => ({
  cancelWorkload: (id: number) => dispatch(cancel({ id })),
  checkStatus: (id: number) => dispatch(checkStatus( { id })),
}) 

const WorkloadListContainer = connect(mapStateToProps, mapDispatchToProps)(WorkloadList);


export {
  WorkloadList,
  WorkloadListContainer,
};

export default WorkloadList;
