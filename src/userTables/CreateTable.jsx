import React from 'react';
import './UserTables.scss';
import TasksTable from '../tasksTable/TasksTable';

class UserTables extends React.Component {
  render() {
    if (!this.props.tablesList) {
      return null;
    }

    return (
      <div className="user-tables">
        {
          <>
            {this.props.tablesList.map(element => (
              <div key={element.tableTitle}>
                <h2>{element.tableTitle}</h2>
                <ul className="tasks-list">
                  <TasksTable tasksList={element.tableContent} />
                </ul>
              </div>
            ))}
          </>
        }
      </div>
    );
  }
}

export default UserTables;
