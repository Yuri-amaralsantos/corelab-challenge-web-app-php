import React, { useState, useRef } from "react";
import axios from "axios";
import "./TaskForm.scss";

const API_URL = "http://localhost:8000/api/tasks";

interface Task {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

const favoriteOn = "./images/favoriteOn.png";
const favoriteOff = "./images/favoriteOff.png";

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    favorite: false,
    color: "#ffffff",
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Auto resize textarea when description changes
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height dynamically
    }
  };

  const handleToggleFavorite = () => {
    setNewTask((prevTask) => ({
      ...prevTask,
      favorite: !prevTask.favorite,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(API_URL, newTask)
      .then((response) => {
        onTaskCreated(response.data);
        setNewTask({
          id: 0,
          title: "",
          description: "",
          favorite: false,
          color: "#ffffff",
        });
      })
      .catch((error) => console.error("Error creating task", error));
  };

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        type="text"
        name="title"
        placeholder="Titulo"
        value={newTask.title}
        onChange={handleChange}
        className="formTitle"
        required
      />

      <textarea
        ref={textareaRef}
        name="description"
        placeholder="Criar nota..."
        value={newTask.description}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
        className="formDescription"
      />

      <div className="topCard">
        <img
          src={newTask.favorite ? favoriteOn : favoriteOff}
          alt="Favorite"
          className="favorite-icon"
          onClick={handleToggleFavorite} // Fix: use onClick instead of onChange
        />
      </div>
    </form>
  );
};

export default TaskForm;
