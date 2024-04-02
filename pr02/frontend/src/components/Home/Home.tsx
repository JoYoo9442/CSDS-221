import React, { FC, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
    Button, Grid, AppBar, Box, Toolbar, IconButton, Typography,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Title from "../TitleBar/TitleBar.tsx";
import TaskForm from "../Form/TaskForm.tsx";
import TaskList from "../List/TaskList.tsx";
import "./styles.css";

interface HomeProps {}

const Home = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [taskToEdit, setTaskToEdit] = useState<{ id: number, title: string, description: string, date: string, priority: string} | null>(null);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const handleSubmit = (task) => {
    if (taskToEdit) {
        editTask({...task, id: taskToEdit.id});
        setTaskToEdit(null);
    } else {
        addTask(task);
    }
  }

  const addTaskClick = () => {
    setTaskToEdit(undefined);
    setFormIsOpen(true);
  }

  const editTaskClick = (task) => {
    setTaskToEdit(task);
    setFormIsOpen(true);
  }

  const addTask = (task) => {
    const newId = tasks.length + 1;
    task.id = newId;
    setTasks([...tasks, task]);
    toast.success("Task added successfully", { position: "bottom-right"});
    setFormIsOpen(false);
  }

  const editTask = (task) => {
    const newTasks = tasks.map((t) => {
        if (t.id === task.id) {
            return task;
        }
        return t;
    });
    setTasks(newTasks);
    toast.success("Task updated successfully", { position: "bottom-right"});
    setFormIsOpen(false);
  }

  const deleteTask = (task) => {
    const newTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);
    toast.success("Task deleted successfully", { position: "bottom-right"});
  }

  const handleClose = () => {
    setFormIsOpen(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title
        handleOpenForm={addTaskClick}
      />
      <TaskList
        tasks={tasks}
        editTaskClick={editTaskClick}
        deleteTask={deleteTask}
      />
      <TaskForm
        formIsOpen={formIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        taskToEdit={taskToEdit ? {
            title: taskToEdit.title,
            description: taskToEdit.description,
            date: taskToEdit.date,
            priority: taskToEdit.priority
        } : undefined}
        tasks={tasks}
      />
    </Box>
  );
};

export default Home;
