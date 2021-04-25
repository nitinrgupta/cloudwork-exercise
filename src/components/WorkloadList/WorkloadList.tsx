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
            <div className="empty-list">No workloads to display</div> 
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
