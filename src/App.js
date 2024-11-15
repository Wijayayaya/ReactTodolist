import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const toggleForm = (task = null) => {
    setShowForm(!showForm);
    setTaskToEdit(task);
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">Task List</h1>
        <Button variant="primary" onClick={() => toggleForm()} className="add-task-btn">
          <FaPlus /> Add Task
        </Button>
      </div>

      <div className="mt-4">
        <TaskList tasks={tasks} deleteTask={deleteTask} showEditForm={toggleForm} toggleComplete={toggleComplete} />
        {showForm && <TaskForm show={showForm} handleClose={() => toggleForm(null)} addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />}
      </div>
    </Container>
  );
}

export default App;
