import React from 'react';
import './createTable.scss';

class CreateTable extends React.Component {
  render() {
    return (
      <div className="create-table">
        <h2 className="create-table-header">Create new table</h2>
        <input type="text" value={this.props.tableName} onChange={this.props.changeTableName} />
        <button onClick={this.props.onCreateTable}>Create</button>
      </div>
    );
  }
}

export default CreateTable;
