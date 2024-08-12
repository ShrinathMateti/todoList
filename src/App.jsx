import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const saveLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLS();
  };

  return (
    <>
      <Navbar />
      <div className="p-5 m-5">
        <div className="container  my-5 rounded-xl p-4 bg-sky-700">
          <h1 className="font-bold text-center text-white text-xl">
            MyTodoList- Manage Your Todos At One Place
          </h1>
          <div className="addTodo my-5 grid place-items-center">
            <h3 className="text-lg font-bold  text-white hover:font-medium transition cursor-pointer ms-2 mb-2">
              Add Todo
            </h3>
            <input
              onChange={handleChange}
              type="text"
              className="w-1/4 h-10 border border-black p-2 py-1 rounded-lg"
              value={todo}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-slate-100 hover:bg-slate-200  font-bold transition cursor-pointer p-2 py-1 rounded-md ms-2 mt-3 w-1/4"
            >
              Save
            </button>
          </div>

          <h4 className=" text-white hover:font-medium transition cursor-pointer font-bold ms-1 mt-2 mb-2 grid place-items-center">
            Your Todos
          </h4>
          <div className="todos grid place-items-center">
            {todos.length === 0 && (
              <div className="my-3 ms-1 text-white">No Todos To Display</div>
            )}
            {todos.map((items) => {
              return (
                <div key={items.id} className="todo flex w-1/4 justify-between">
                  <div className="flex gap-4">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={items.isCompleted}
                      name={items.id}
                      id=""
                    />
                    <div
                      className={`text-white mt-1 my-4 ${
                        items.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {items.todo}
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={(e) => {
                        handleEdit(e, items.id);
                      }}
                      className="bg-slate-100  hover:bg-slate-200  font-bold transition cursor-pointer p-3 py-2 rounded-md ms-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, items.id);
                      }}
                      className="bg-slate-100 hover:bg-slate-200  font-bold transition cursor-pointer p-3 py-2 rounded-md ms-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
