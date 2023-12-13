import { useState } from "react";
import "./index.css";

const App = () => {
  const [todo, setTodo] = useState({ name: "", id: null });
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);

  const todoHandler = (event) => {
    setTodo({ name: event.target.value, id: Math.random() });
  };

  const itemHandler = (event) => {
    event.preventDefault();

    if (edit !== -1) {
      const updatedItems = [...items]
      updatedItems[edit] = todo
      setItems(updatedItems)
      setEdit(-1)
    } else {
      setItems((prevItems) => [...prevItems, todo]);
    }
    setTodo({ name: "", id: null });
  };

  const editHandler = (index) => {
    setTodo(items[index])
    setEdit(index)
  };

  const deleteHandler = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="main-container">
      <h1>Simple App : Todo List</h1>
      <input
        type="text"
        name="todo-item"
        onChange={todoHandler}
        value={todo.name}
      />
      <button onClick={itemHandler}>Add</button>
      <div className="todo-display">
        <p>Todo's</p>
        <ol>
          {items.map((item, index) => {
            return (
              <div key={item.id}>
                <li key={item.id}>{item.name}</li>
                <button
                  onClick={() => {
                    editHandler(index);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default App;
