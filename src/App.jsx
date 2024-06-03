import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        setTodos([...todos, { id: new Date(), todo: input }]);
        setInput("");
      }
    } catch (error) {
      console.error(error);
      setInput("");
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].todo = input;
        setTodos(updatedTodos);
        setInput("");
        setEditIndex(-1); // Reset editIndex after updating
      }
    } catch (error) {
      console.error(error);
      setInput("");
    }
  };

  const removeTodo = async (id) => {
    try {
      let filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-custom-background bg-center bg-cover bg-no-repeat bg-fixed">
      <div
        className="bg-gray-100 p-6 h-full w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-blue-100
 rounded shadow-md w-full max-w-md md:w-1/2"
      >
        <h1 className="text-4xl font-bold text-center mb-4">Todo App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a Task"
            className="py-2 px-4 border rounded w-full mr-2 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={input} // Bind input value to state
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={editIndex === -1 ? addTodo : updateTodo}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-2 w-20 rounded"
          >
            {editIndex === -1 ? "ADD" : "UPDATE"}
          </button>
        </div>
      </div>

      {todos.length > 0 && (
        <div
          className="h-full w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-blue-100
        p-6 rounded shadow-md w-full max-w-md md:w-1/2"
        >
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex flex-wrap items-center justify-between bg-white p-3 rounded shadow-lg mb-3"
              >
                <span className="text-lg text-pretty flex-1 break-words mr-4">
                  {todo.todo}
                </span>
                <div className="flex-shrink-0 flex">
                  <button
                    onClick={() => setEdit(index)}
                    className="mr-2 p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded hover:from-blue-500 hover:to-blue-700 "
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700 "
                  >
                    DELETE
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
