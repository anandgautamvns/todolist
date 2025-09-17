import "./styles.css";
import React, { useState, useCallback, useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // Save to localStorage whenever todoList changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Load from localStorage on first render
  useEffect(() => {
    const todoListItem = localStorage.getItem("todoList");
    if (todoListItem) {
      setTodoList(JSON.parse(todoListItem));
    }
  }, []);

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleClick = () => {
    if (!inputValue.trim()) return; // prevent empty items
    const item = {
      id: Date.now(),
      title: inputValue.trim(),
    };
    setTodoList((prev) => [...prev, item]);
    setInputValue("");
  };

  const handleCheck = (event, id) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      setCheckedId((prev) => [...prev, id]);
    } else {
      setCheckedId((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((item) => !checkedId.includes(item.id)));
    setCheckedId([]); // reset after delete
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter value"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Save</button>
      </div>
      <div>
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={(event) => handleCheck(event, item.id)}
                checked={checkedId.includes(item.id)}
              />
              {item.title}
            </li>
          ))}
        </ul>
        {checkedId.length > 0 && (
          <button onClick={handleDelete}>Delete Selected</button>
        )}
      </div>
    </div>
  );
}
