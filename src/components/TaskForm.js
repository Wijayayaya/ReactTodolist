import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState({ name: "", priority: "Medium", status: "To Do" });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ name: "", priority: "Medium", status: "To Do" }); // Reset form on close
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!task.name.trim()) {
      alert("Task name cannot be empty.");
      return;
    }
    taskToEdit ? editTask(task) : addTask(task);
    setTask({ name: "", priority: "Medium", status: "To Do" });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskName">
            <Form.Label>Task</Form.Label>
            <Form.Control type="text" name="name" value={task.name} onChange={handleChange} placeholder="Enter task name" />
          </Form.Group>
          <Form.Group controlId="taskPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" name="priority" value={task.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="status" value={task.status} onChange={handleChange}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!task.name.trim()}>
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
