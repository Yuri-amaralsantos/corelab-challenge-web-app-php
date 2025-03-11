import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard, { Task } from "./components/taskCard/TaskCard";
import SearchBar from "./components/searchBar/SearchBar";
import TaskForm from "./components/taskForm/TaskForm";

const API_URL = "http://localhost:8000/api/tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Search filter
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separating favorite and non-favorite tasks
  const favoriteTasks = filteredTasks.filter((task) => task.favorite);
  const nonFavoriteTasks = filteredTasks.filter((task) => !task.favorite);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = (updatedTask: Task) => {
    axios
      .put(`${API_URL}/${updatedTask.id}`, updatedTask)
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task.id === updatedTask.id ? response.data : task
          )
        );
      })
      .catch((error) => console.error("Error updating task", error));
  };

  const handleToggleFavorite = (taskId: number, currentFavorite: boolean) => {
    axios
      .patch(`${API_URL}/${taskId}/favorite`, { favorite: !currentFavorite })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, favorite: response.data.favorite }
              : task
          )
        );
      })
      .catch((error) => console.error("Error updating favorite status", error));
  };

  const handleDelete = (taskId: number) => {
    axios
      .delete(`${API_URL}/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error("Error deleting task", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="formContainer">
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>
      <div className="containerList">
        <p className="titleList">Favoritas</p>
        <div className="cardList">
          {favoriteTasks.length > 0 ? (
            favoriteTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <p>No favorite tasks.</p>
          )}
        </div>
      </div>
      <div className="containerList">
        <p className="titleList">Outras</p>
        <div className="cardList">
          {nonFavoriteTasks.length > 0 ? (
            nonFavoriteTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <p>No other tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
