import React from 'react';
import './index.scss';
import TasksTable from "./tasksTable/TasksTable";
import UserTables from "./userTables/UserTables";
import CreateItem from "./createItem/CreateItem";
import useInput from './hooks/useInput';
import { fetchData, postTask } from './gateway/tasks.gateway';

const App = () => {
    const initialTables = [{
        id: 0,
        tableTitle: '0',
        tableContent: [{ id: 0, text: '', table: '0', order: 0 }]
    }];
    const [tables, setTables] = React.useState(initialTables);

    const createTaskInput = useInput('');
    const createTableInput = useInput('');
    // const [currentTask, setCurrentTask] = React.useState(null);

    const addTable = (tableTitle = createTableInput.value) => setTables([...tables, {
        id: tables.length,
        tableTitle,
        tableContent: [{ id: 0, text: '', table: createTableInput.value, order: 0 }]
    }]);

    const addTaskToTable = task => {
        let isUpdated = false;
        const updatedTables = tables.map(table => {
            if (table.tableTitle === task.table) {
                table.tableContent.push(task)
                isUpdated = true;
            }
            return table
        })
        if (isUpdated) {
            setTables(updatedTables);
        }
        addTable();
    }

    const updateData = () => {
        fetchData().then((response) => {
            setTables(initialTables);
            response.forEach(task => addTaskToTable(task))
        })

    };


    React.useEffect(() => {
        updateData()
    }, [])

    const onCreateTask = () => {
        if (!createTaskInput.value) return

        const taskItem = {
            text: createTaskInput.value,
            order: tables[0].tableContent.length,
            done: false,
            table: '0',
        }

        postTask(taskItem).then(() => updateData())
    }

    const isUniqueTable = () =>
        tables
            .map(
                (table) =>
                    table.tableTitle.toUpperCase() ===
                    createTableInput.value.toUpperCase()
            )
            .includes(true);

    const onCreateTable = () => {
        if (!createTableInput.value) return

        if (isUniqueTable) {
            // eslint-disable-next-line no-alert
            alert('This table already exists')
            // better to have dialog window for this one
        }

        addTable(newTable);
        // postTable(newTable);
    }

    return (
        <div className="tasks-container">
            <div className="tasks-container__creator">
                <CreateItem
                    {...createTaskInput}
                    title="Create Task"
                    buttonText="Create Task"
                    onCreateItem={onCreateTask}
                />
                <TasksTable
                    tasksList={tables[0]}
                // dragStartHandler={dragStartHandler}
                // dragEndHandler={dragEndHandler}
                // dragLeaveHandler={dragLeaveHandler}
                // dragOverHandler={dragOverHandler}
                // dropHandler={dropHandler}
                />
            </div>
            <div className="task-tables">
                <CreateItem
                    onCreateItem={onCreateTable}
                    {...createTableInput}
                    title="Create Table"
                    buttonText="Create Table"
                />
                <UserTables
                    tablesList={tables}
                // dragStartHandler={dragStartHandler}
                // dragLeaveHandler={dragLeaveHandler}
                // dragEndHandler={dragEndHandler}
                // dragOverHandler={dragOverHandler}
                // dropHandler={dropHandler}
                />
            </div>
        </div>
    )
}

export default App;






// const dragStartHandler = (e, task) => {
//     setCurrentTask(task)
// };

// const dragEndHandler = (e) => {
//     e.target.style.background = "rgba(204, 204, 204, 0.5)";
// };

// const dragLeaveHandler = (e) => {
//     e.target.style.background = "rgba(204, 204, 204, 0.5)";
// };

// const dragOverHandler = (e) => {
//     e.preventDefault();
//     e.target.style.background = "#ccc";
// };

// const addTask = (task) => {
//     currentTask.table = task.table;

//     const tableForChange = tables.find(
//         (el) => el.tableTitle === currentTask.table
//     ).tableContent;

//     if (tableForChange[0].text === "") {
//         tableForChange.pop();
//         tableForChange.push(currentTask);
//     } else {
//         tableForChange.push(currentTask);
//     }
// }


// // refactor this one
// const removeTask = () => {

//     const currentTable = tables.find(
//         (el) => el.tableTitle === currentTask.table
//     );
//     const indexOfTask = currentTable.tableContent.indexOf(currentTask);

//     currentTable.tableContent.splice(indexOfTask, 1);

//     // tables.filter(el => el.tableTitle === currentTask.table)

//     if (currentTable.tableContent.length === 0) {
//         currentTable.tableContent.push({
//             id: 0,
//             text: "",
//             order: 0,
//             table: currentTable.tableTitle,
//         });
//     }
// };

// const dropHandler = (e, task) => {
//     e.preventDefault();
//     // console.log(task);
//     e.target.style.background = "rgba(204, 204, 204, 0.5)";

//     if (task.table !== currentTask.table) {
//         // if tasks form different tables change table for task
//         removeTask();
//         addTask(task);

//         // update tables
//         setState({ tables });
//     }
//     // if tasks from same table change order
//     this.changeOrder(currentTask, task);
//     this.sortTable();
// };