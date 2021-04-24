import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { submit } from '../../state/workloads/actions';


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
      <form>
        <h2>Create workload</h2>
        
        <div>
          <label>
            Complexity: {this.state.complexity}
            <br />
            <input 
              value={this.state.complexity} 
              onChange={(e) => this.setState({ complexity: Number(e.target.value) })} 
              type="range" 
              min="1" 
              max="10" 
            />
            <input
              value={this.state.name}
              onChange={(e) => this.setState({ name: String(e.target.value) })}
              />
          </label>
        </div>

        <div>
          <button onClick={this.handleSubmit} type="submit">Start work</button>
        </div>
      </form>
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