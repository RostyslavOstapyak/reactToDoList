import React from 'react';
import RenderTable from '../renderTable/RenderTable';
import './tasksTable.scss';

// TODO
// add sorting logic for done field

const TasksTable = ({ tasksList, dragStartHandler, dragEndHandler, dragLeaveHandler, dragOverHandler, dropHandler }) => {

  if (tasksList.length <= 0) {
    return <h3>Table not found</h3>
  }

  return (
    <ul className="tasks-list">
      {tasksList.tableContent.map(task => (
        <RenderTable
          key={task.order}
          task={task}
          dragStartHandler={dragStartHandler}
          dragEndHandler={dragEndHandler}
          dragLeaveHandler={dragLeaveHandler}
          dragOverHandler={dragOverHandler}
          dropHandler={dropHandler}
        />
      ))}
    </ul>
  )
};

export default TasksTable;
