import React from 'react';
import './create-task.scss';

class CreateTask extends React.Component {
  render() {
    return (
      <div className="create-task-form">
        <h1 className="create-task-title">Create Task</h1>
        <input
          type="text"
          className="create-task-form__input"
          value={this.props.inputValue}
          onChange={this.props.onChangeInput}
        />
        <button className="create-task-form__button" onClick={this.props.onCreateTask}>
          Create task
        </button>
      </div>
    );
  }
}

export default CreateTask;
