import React from 'react';
import './userTables.scss';
import RenderTable from '../renderTable/RenderTable';

const UserTables = ({
  tablesList
  // dragStartHandler
  // dragLeaveHandler
  // dragEndHandler
  // dragOverHandler
  // dropHandler
}) => {

  if (!tablesList) {
    return null;
  }
  if (!Array.isArray(tablesList)) {
    console.log(tablesList);
    return <h3>received not array</h3>
  }
  return (
    <div className="user-tables">
      {
        <>
          {tablesList.map(element => {
            if (element.tableTitle !== '0') {
              return (
                <div key={element.id} className="table-item">
                  <h2>{element.tableTitle}</h2>
                  <ul className="tasks-list">
                    {element.tableContent.map(task => (
                      <RenderTable
                        key={task.order}
                        task={task}
                      // dragStartHandler={dragStartHandler}
                      // dragLeaveHandler={dragLeaveHandler}
                      // dragEndHandler={dragEndHandler}
                      // dragOverHandler={dragOverHandler}
                      // dropHandler={dropHandler}
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
  )
}



export default UserTables;
