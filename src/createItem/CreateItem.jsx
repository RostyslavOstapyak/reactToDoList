import React from "react";

const CreateItem = ({
  inputValue,
  onChangeInput,
  onCreateItem,
  title,
  buttonText,
}) => (
  <div className="create-task-form">
    <h1 className="create-task-title">{title}</h1>
    <input
      type="text"
      className="create-task-form__input"
      value={inputValue}
      onChange={onChangeInput}
    />
    <button className="create-task-form__button" onClick={onCreateItem}>
      {buttonText}
    </button>
  </div>
);

export default CreateItem;
