import React from 'react';
import RenderTable from '../renderTable/RenderTable';
import './tasksTable.scss';

const TasksTable = props => (
  <ul className="tasks-list">
    {props.tasksList.tableContent.map(task => (
      <RenderTable
        key={task.order}
        task={task}
        dragStartHandler={props.dragStartHandler}
        dragEndHandler={props.dragEndHandler}
        dragLeaveHandler={props.dragLeaveHandler}
        dragOverHandler={props.dragOverHandler}
        dropHandler={props.dropHandler}
      />
    ))}
  </ul>
);

export default TasksTable;
