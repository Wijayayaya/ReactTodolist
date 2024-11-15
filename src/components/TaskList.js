// src/components/TaskList.js

import React from "react";
import { Card } from "react-bootstrap";
import { FaEdit, FaTrash, FaDotCircle, FaCircle, FaChevronCircleDown } from "react-icons/fa";

const TaskList = ({ tasks, deleteTask, showEditForm, toggleComplete }) => {
  const getPriorityColor = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  };

  const getStatusIcon = (status) => {
    if (status === "To Do") return <FaCircle />;
    if (status === "In Progress") return <FaDotCircle />;
    if (status === "Done") return <FaChevronCircleDown />;
    return null;
  };

  const handleStatusChange = (task) => {
    if (task.status === "To Do") {
      toggleComplete({ ...task, status: "In Progress" });
    } else if (task.status === "In Progress") {
      toggleComplete({ ...task, status: "Done" });
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Card className="task-card mb-3" key={task.id}>
          <Card.Body className="task-card-body d-flex justify-content-between align-items-center">
            <div className="task-details">
              <div className="task-label">Task</div>
              <div className="task-name">{task.name}</div>
            </div>
            <div className="task-priority">
              <div className="task-label">Priority</div>
              <div className={getPriorityColor(task.priority)}>{task.priority}</div>
            </div>
            <div className="task-status">
              <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
            </div>
            <div className="task-complete" onClick={() => handleStatusChange(task)}>
              {getStatusIcon(task.status)}
            </div>
            <div className="icon-buttons">
              <FaEdit onClick={() => showEditForm(task)} className="edit-icon" />
              <FaTrash onClick={() => deleteTask(task.id)} className="delete-icon" />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
