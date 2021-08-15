import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ListIItems from "../ListIItems/ListIItems";
import UserInput from "../UserInput/UserInput";

const TodoList = (props) => {

  const getLocalStorageItems = () => {
    let list = localStorage.getItem("List");

    if (list) {
      return JSON.parse(localStorage.getItem("List"));
    } else {
      return [];
    }
  };

  const [todoList, setTodoList] = useState(getLocalStorageItems());

  const onClickAddHandler = (item) => {
    const items = [...todoList];
    items.push({
      listItem: item,
      isDone: false,
      toggle: true,
      editToggle: true,
    });
    setTodoList(items);
  };

  const doneClickHandler = (listIndex) => {
    const items = [...todoList];
    items[listIndex].isDone = true;
    setTodoList(items);
    // console.log(items)
  };

  const deleteClickHandler = (listIndex) => {
    if(window.confirm('Are you sure you want to remove it')){
      const items = [...todoList];
      items.splice(listIndex, 1);
      setTodoList(items);
    }
  };

  const editClickHandler = (listIndex) => {
    const items = [...todoList];
    todoList[listIndex].editToggle = false;
    setTodoList(items);
    // console.log(items);
  };

  const saveClickHandler = (listIndex) => {
    const items = [...todoList];
    todoList[listIndex].editToggle = true;
    setTodoList(items);
    // console.log(items)
  };

  const swapItems = (initialIndex, finalIndex) => {
    const items = [...todoList];
    const temp = items[initialIndex];
    items[initialIndex] = items[finalIndex];
    items[finalIndex] = temp;
    setTodoList(items);
  };

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <Container>
        <UserInput onClickAddHandler={onClickAddHandler} />

        <ListIItems
          todoList={todoList}
          doneClickHandler={doneClickHandler}
          deleteClickHandler={deleteClickHandler}
          upDownClickHandler={swapItems}
          editClickHandler={editClickHandler}
          saveClickHandler={saveClickHandler}
        />
      </Container>
    </div>
  );
};

export default TodoList;
