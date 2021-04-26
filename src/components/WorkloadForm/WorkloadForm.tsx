import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { submit } from '../../state/workloads/actions';
import './WorkloadForm.css';

interface WorkloadFormDispatchProps {
  submitWorkload: (complexity: number, name: string) => void  
}

interface WorkloadFormProps extends 
  WorkloadFormDispatchProps {}

interface WorkloadFormState {
  complexity: number;
  name: string;
}

class WorkloadForm extends React.PureComponent<WorkloadFormProps, WorkloadFormState> {
  defaultState = {
    complexity: 5,
    name:''
  }

  state = this.defaultState;

  handleSubmit = (e: React.MouseEvent) => {
    this.props.submitWorkload(this.state.complexity, this.state.name);
    this.setState(this.defaultState);
    e.preventDefault();
  }

  render() {
    return (
      <div className="create-workload-container">
        <h3 className="form-header">Create a new workload</h3>
        <form className="form-container">
          <div>
            <input
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: String(e.target.value) })}
              placeholder="Enter the name of your workload"
              />
            <div className="complexity-label-container">
              <p>
                Choose workload complexity (∞) : 
              </p>
              <p>
                {this.state.complexity}
              </p>
            </div>
            <input 
              value={this.state.complexity} 
              onChange={(e) => this.setState({ complexity: Number(e.target.value) })} 
              type="range" 
              min="1" 
              max="10" 
            />
          </div>

          <button onClick={this.handleSubmit} className="form-action-button" type="submit">Start work</button>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch): WorkloadFormDispatchProps => ({
  submitWorkload: (complexity: number, name: string) => dispatch(submit({ complexity, name })),
});

const WorkloadFormContainer = connect(null, mapDispatchToProps)(WorkloadForm);


export {
  WorkloadForm,
  WorkloadFormContainer,
}

export default WorkloadForm;