import React from 'react';
import './userTables.scss';
import RenderTable from '../renderTable/RenderTable';

class UserTables extends React.Component {
  render() {
    if (!this.props.tablesList) {
      return null;
    }

    return (
      <div className="user-tables">
        {
          <>
            {this.props.tablesList.map(element => {
              if (element.tableTitle !== '0') {
                return (
                  <div key={element.tableTitle} className="table-item">
                    <h2>{element.tableTitle}</h2>
                    <ul className="tasks-list">
                      {element.tableContent.map(task => (
                        <RenderTable
                          key={task.order}
                          task={task}
                          dragStartHandler={this.props.dragStartHandler}
                          dragLeaveHandler={this.props.dragLeaveHandler}
                          dragEndHandler={this.props.dragEndHandler}
                          dragOverHandler={this.props.dragOverHandler}
                          dropHandler={this.props.dropHandler}
                        />
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
          </>
        }
      </div>
    );
  }
}

export default UserTables;
