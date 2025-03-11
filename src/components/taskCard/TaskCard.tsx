import React, { useState } from "react";
import "./TaskCard.scss";

export interface Task {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

interface TaskProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number, currentFavorite: boolean) => void;
}

const favoriteOn = "./images/favoriteOn.png";
const favoriteOff = "./images/favoriteOff.png";
const editIcon = "./images/edit.png";
const deleteIcon = "./images/close.png";
const colorIcon = "./images/color.png";

const colorOptions = [
  "#BAE2FF",
  "#B9FFDD",
  "#FFE8AC",
  "#FFCAB9",
  "#F99494",
  "#9DD6FF",
  "#ECA1FF",
  "#DAFF8B",
  "#FFA285",
  "#CDCDCD",
  "#979797",
  "#A99A7C",
];

const TaskCard: React.FC<TaskProps> = ({
  task,
  onUpdate,
  onDelete,
  onToggleFavorite,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);
  const [editedDescription, setEditedDescription] = useState<string>(
    task.description
  );
  const [showColorOptions, setShowColorOptions] = useState<boolean>(false);

  const handleFavoriteChange = () => {
    onToggleFavorite(task.id, task.favorite);
  };

  const handleColorChange = (newColor: string) => {
    onUpdate({ ...task, color: newColor });
    setShowColorOptions(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes when exiting edit mode
      onUpdate({
        ...task,
        title: editedTitle,
        description: editedDescription,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="cardTask" style={{ backgroundColor: task.color }}>
      <div className="topCard">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="formTitle"
            required
          />
        ) : (
          <h3>{task.title}</h3>
        )}

        <img
          src={task.favorite ? favoriteOn : favoriteOff}
          alt="Favorite"
          className="favorite-icon"
          onClick={handleFavoriteChange}
        />
      </div>

      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="formDescription"
          required
        />
      ) : (
        <p className="description">{task.description}</p>
      )}

      <div className="bottomCard">
        <img
          src={editIcon}
          alt="Edit"
          className={`icon-button edit-button ${isEditing ? "active" : ""}`}
          onClick={handleEditToggle}
        />
        <img
          src={deleteIcon}
          alt="Delete"
          className="icon-button delete-button"
          onClick={() => onDelete(task.id)}
        />
        <img
          src={colorIcon}
          alt="Edit Color"
          className={`icon-button color-button ${
            showColorOptions ? "active" : ""
          }`}
          onClick={() => setShowColorOptions(!showColorOptions)}
        />
      </div>

      {showColorOptions && (
        <div className="color-options">
          {colorOptions.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
