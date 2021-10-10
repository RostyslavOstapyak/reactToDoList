import React from 'react';
import './renderTable.scss';

// should get key={task.id} task={task}

const RenderTable = props => {
  const { task, dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler } =
    props;
  let text = 'No tasks';
  let active = false;
  if (task.text !== '') {
    text = task.text;
    active = !active;
  }
  return (
    <li
      className="task-item"
      draggable={active}
      onDragStart={e => dragStartHandler(e, task)}
      onDragEnd={e => dragEndHandler(e)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragOver={e => dragOverHandler(e)}
      onDrop={e => dropHandler(e, task)}
    >
      {text}
    </li>
  );
};

export default RenderTable;
