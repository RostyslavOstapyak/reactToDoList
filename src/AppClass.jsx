/* eslint-disable no-param-reassign */
import React from "react";
import "./index.scss";
import TasksTable from "./tasksTable/TasksTable";
import UserTables from "./userTables/UserTables";
import CreateItem from "./createItem/CreateItem";

class App extends React.Component {
  state = {
    inputValue: "",
    newTableName: "",
    tables: [
      {
        id: 0,
        tableTitle: "0",
        tableContent: [
          { id: 0, text: "task1", order: 0, table: "0" },
          { id: 1, text: "task2", order: 1, table: "0" },
          { id: 2, text: "task3", order: 2, table: "0" },
          { id: 3, text: "task4", order: 3, table: "0" },
          { id: 4, text: "task5", order: 4, table: "0" },
          { id: 5, text: "task6", order: 5, table: "0" },
        ],
      },
      {
        id: 1,
        tableTitle: "Table Name",
        tableContent: [
          {
            id: 0,
            text: "sooooomeeeeee task",
            order: 0,
            table: "Table Name",
          },
          {
            id: 2,
            text: "sooooomeeeeee task",
            order: 1,
            table: "Table Name",
          },
          {
            id: 3,
            text: "sooooomeeeeee task",
            order: 2,
            table: "Table Name",
          },
        ],
      },
      {
        id: 2,
        tableTitle: "Table Name2",
        tableContent: [{ id: 0, text: "", order: 0, table: "Table Name2" }],
      },
    ],
    currentTask: null,
  };

  onChangeInput = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  onCreateTask = () => {
    if (!this.state.inputValue) {
      return null;
    }
    const { tables } = this.state;
    const taskItem = {
      id: tables[0].tableContent.length,
      text: this.state.inputValue,
      order: tables[0].tableContent.length,
      table: "0",
    };
    tables[0].tableContent.push(taskItem);
    this.setState({ tables });
    this.setState({ inputValue: "" });
    return null;
  };

  changeTableName = (e) => {
    this.setState({ newTableName: e.target.value });
  };

  isUniqueTable = () =>
    this.state.tables
      .map(
        (table) =>
          table.tableTitle.toUpperCase() ===
          this.state.newTableName.toUpperCase()
      )
      .includes(true);

  onCreateTable = () => {
    if (!this.state.newTableName) {
      return null;
    }
    if (this.isUniqueTable()) {
      // eslint-disable-next-line no-alert
      alert("Unique table already exists");
      return null;
    }
    const newTable = {
      id: this.state.tables.length,
      tableTitle: this.state.newTableName,
      tableContent: [{ id: 0, text: "", table: this.state.newTableName }],
    };

    const newTablesList = this.state.tables;
    newTablesList.push(newTable);
    this.setState({ tables: newTablesList });
    this.setState({ newTableName: "" });
    return null;
  };

  dragStartHandler = (e, task) => {
    this.setState({ currentTask: task });
  };

  dragEndHandler = (e) => {
    e.target.style.background = "rgba(204, 204, 204, 0.5)";
  };

  dragLeaveHandler = (e) => {
    e.target.style.background = "rgba(204, 204, 204, 0.5)";
  };

  dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = "#ccc";
  };

  dropHandler = (e, task) => {
    e.preventDefault();
    // console.log(task);
    e.target.style.background = "rgba(204, 204, 204, 0.5)";
    const { currentTask } = this.state;
    if (task.table !== currentTask.table) {
      const { tables } = this.state;
      // if tasks form different tables change table for task
      this.removeTask(tables);
      this.addTask(task, tables);
      this.setState({ tables });
    }
    // if tasks from same table change order
    this.changeOrder(currentTask, task);
    this.sortTable();
  };

  changeOrder = (currentTask, task) => {
    const taskOrder = task.order;
    task.order = currentTask.order;
    currentTask.order = taskOrder;
    this.setState({ currentTask });
  };

  addTask = (task, tables) => {
    const { currentTask } = this.state;
    currentTask.table = task.table;
    const tableForChange = tables.find(
      (el) => el.tableTitle === currentTask.table
    ).tableContent;

    if (tableForChange[0].text === "") {
      tableForChange.pop();
      tableForChange.push(currentTask);
    } else {
      tableForChange.push(currentTask);
    }
  };

  removeTask = (tables) => {
    const { currentTask } = this.state;

    const currentTable = tables.find(
      (el) => el.tableTitle === currentTask.table
    );
    const indexOfTask = currentTable.tableContent.indexOf(currentTask);

    currentTable.tableContent.splice(indexOfTask, 1);

    if (currentTable.tableContent.length === 0) {
      currentTable.tableContent.push({
        id: 0,
        text: "",
        order: 0,
        table: currentTable.tableTitle,
      });
    }
  };

  sortTable = () => {
    const { tables } = this.state;
    tables.map((el) => el.tableContent.sort((a, b) => a.order - b.order));
  };

  render() {
    return (
      <div className="tasks-container">
        <div className="tasks-container__creator">
          <CreateItem
            inputValue={this.state.inputValue}
            onCreateItem={this.onCreateTask}
            onChangeInput={this.onChangeInput}
            title="Create Task"
            buttonText="Create Task"
          />
          <TasksTable
            tasksList={this.state.tables[0]}
            dragStartHandler={this.dragStartHandler}
            dragEndHandler={this.dragEndHandler}
            dragLeaveHandler={this.dragLeaveHandler}
            dragOverHandler={this.dragOverHandler}
            dropHandler={this.dropHandler}
          />
        </div>
        <div className="task-tables">
          <CreateItem
            onCreateItem={this.onCreateTable}
            inputValue={this.state.newTableName}
            onChangeInput={this.changeTableName}
            title="Create Table"
            buttonText="Create Table"
          />
          <UserTables
            tablesList={this.state.tables}
            dragStartHandler={this.dragStartHandler}
            dragLeaveHandler={this.dragLeaveHandler}
            dragEndHandler={this.dragEndHandler}
            dragOverHandler={this.dragOverHandler}
            dropHandler={this.dropHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
