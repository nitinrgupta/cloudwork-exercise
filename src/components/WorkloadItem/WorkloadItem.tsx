import React from 'react';
import Countdown from 'react-countdown';
import { Status } from '../../state/workloads'
import './WorkloadItem.css';


export interface WorkloadItemStateProps {
  id: number;
  name: string;
  complexity: number;
  status: Status;
  completeDate: Date;
}

export interface WorkloadItemMethodProps {
  onCancel: () => void;
  checkStatus: () => void;
}

export interface WorkloadItemProps extends 
  WorkloadItemStateProps,
  WorkloadItemMethodProps {}


  


const WorkloadItem: React.SFC<WorkloadItemProps> = (props) => {
  // Renderer callback with condition
  const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      console.log("task completed");
      // props.checkStatus();
      return <span></span>
    } else {
      // Render a countdown
      return <span>ETA: {hours}{hours>0 ? hours + ' hrs:': ''}{minutes}{minutes>0 ? minutes + ' mins: ': ''}{Number(seconds) + ' seconds'}</span>;
    }
  };
  return (
    <div className="workloadItem">
      <span className="new-workload-notif"></span>
      <div className="workloadItem-textContainer">
        <h3 className="workloadItem-heading margin-0">{props.name? props.name : 'Workload #' + Number(props.id+1)}</h3>
        <p className="workloadItem-subHeading">
          <span> Complexity: {props.complexity}</span>
          <span className="workloadItem-etaText"> {props.status === 'WORKING' ? <Countdown date={props.completeDate} renderer={countdownRenderer}/> : <span>&nbsp;</span>}</span>
        </p>
      </div>
      <div className="workloadItem-status">
        {props.status === 'WORKING'
          ? (
            <>
              <button 
                className="workloadItem-secondaryButton" 
                onClick={props.onCancel}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.558 5.442L0 10L0.884 10.884L5.442 6.326L10 10.884L10.884 10L6.326 5.442L10.884 0.884L10 0L5.442 4.558L0.884 0L0 0.884L4.558 5.442Z" fill="white"/>
              </g>
              </svg>


              </button>
            </>
          )
          : props.status === 'FAILURE' ? (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14.5" fill="#B40202" stroke="#770000"/>
            <path d="M14.3258 18.0986L13.2697 12.0986V8H16.7753V12.0986L15.7416 18.0986H14.3258ZM15 23C14.2809 23 13.764 22.8451 13.4494 22.5352C13.1498 22.2254 13 21.8451 13 21.3944V20.8873C13 20.4366 13.1498 20.0563 13.4494 19.7465C13.764 19.4366 14.2809 19.2817 15 19.2817C15.7191 19.2817 16.2285 19.4366 16.5281 19.7465C16.8427 20.0563 17 20.4366 17 20.8873V21.3944C17 21.8451 16.8427 22.2254 16.5281 22.5352C16.2285 22.8451 15.7191 23 15 23Z" fill="white"/>
            </svg>


          ) : props.status === 'SUCCESS' ? (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14.5" fill="#2972EA" stroke="#0443AC"/>
            <path d="M9 14.6957L13.2059 19C16.6402 15.4853 18.5657 13.5147 22 10" stroke="white" strokeWidth="2"/>
            </svg>

          ) : (
            <p className="cancelled-text">Cancelled</p>
          )
        }
      </div>
    </div>
  );
}
export { 
  WorkloadItem,
};

export default WorkloadItem;