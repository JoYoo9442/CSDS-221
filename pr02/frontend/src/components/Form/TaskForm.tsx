import React, { FC, useState, useEffect, useCallback } from "react";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, AppBar, Toolbar, Typography, Stack, Radio, RadioGroup, FormControlLabel,
    Box
} from '@mui/material'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

interface TaskFormProps {
    formIsOpen: boolean;
    handleSubmit: (task) => void;
    handleClose: () => void;
    taskToEdit?: {
        title: string;
        description: string;
        date: string;
        priority: string;
    };
    tasks?: any[];
}

const TaskForm: FC<TaskFormProps> = ({ formIsOpen, handleSubmit, handleClose, taskToEdit, tasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [unique, setUnique] = useState(true);
    const [titleIsEmpty, setTitleIsEmpty] = useState(false);
    const [descriptionIsEmpty, setDescriptionIsEmpty] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setDate(taskToEdit.date);
            setPriority(taskToEdit.priority);
        }
        else {
            resetForm();
        }
    }, [taskToEdit]);

    useEffect(() => {
        setTitleIsEmpty(false);
    }, [setTitleIsEmpty]);

    useEffect(() => {
        setDescriptionIsEmpty(false);
    }, [setDescriptionIsEmpty]);

    const uniqueTitle = (title) => {
        if (tasks) {
            const titleExists = tasks.some((task) => task.title === title);
            setUnique(!titleExists);
            return !titleExists;
        }
        setUnique(true);
        return true;
    }

    const validateEntries = (data) => {
        var result = true;
        if (data.title === "") {
            setTitleIsEmpty(true);
            result = false;
        } else {
            setTitleIsEmpty(false);
        }
        if (data.description === "") {
            setDescriptionIsEmpty(true);
            result = false;
        } else {
            setDescriptionIsEmpty(false);
        }
        return result;
    }

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDate("");
        setPriority("Low");
        setUnique(true);
        setTitleIsEmpty(false);
        setDescriptionIsEmpty(false);
    }

    const onClose = () => {
        resetForm();
        handleClose();
    }

    return (
      <Dialog
        open={formIsOpen}
        onClose={onClose}
        sx={{ p: 0 }}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = {
              title: formData.get("title"),
              description: formData.get("description"),
              date: formData.get("date"),
              priority: formData.get("priority"),
            };
            if (
                validateEntries(data) &&
                uniqueTitle(data.title)) {
              resetForm();
              handleSubmit(data);
            } else if (!uniqueTitle(data.title)){
                toast.error("Title must be unique", { position: "bottom-right" });
            } else if (titleIsEmpty) {
                toast.error("Title cannot be empty", { position: "bottom-right" });
            } else if (descriptionIsEmpty) {
                toast.error("Description cannot be empty", { position: "bottom-right" });
            }
          }
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 0 }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <AppBar position="static">
              <Toolbar>
                <AddCircleIcon />
                <Typography mt={.5} ml={2} variant="h6">
                  {taskToEdit ? "Edit Task" : "Add Task"}
                </Typography>
              </Toolbar>
            </AppBar>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText mt={2}>
          </DialogContentText>
          <TextField
            {...(unique ? {} : { error: true, helperText: "Title must be unique" })}
            {...(titleIsEmpty && unique ? { error: true, helperText: "Title cannot be empty" } : {})}
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label={taskToEdit ? "Title: Cannot Edit After Task Creation" : "Title"}
            value={title}
            inputProps={{ readOnly: taskToEdit ? true : false}}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            {...(descriptionIsEmpty ? { error: true, helperText: "Description cannot be empty" } : {})}
            margin="dense"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            label="Deadline"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            fullWidth
          />
          <Box sx={{ flexGrow: 1 }} mt={2}>
            <Typography variant="h6">
              Priority
            </Typography>
            <RadioGroup
              row
              aria-label="priority"
              name="priority"
              value={priority}
              onChange={
                  (e) => setPriority(e.target.value)
              }
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
            sx={{width: "25%"}}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={taskToEdit ? <EditIcon /> : <AddCircleIcon />}
            sx={{width: "25%"}}
          >
            {taskToEdit ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default TaskForm;
