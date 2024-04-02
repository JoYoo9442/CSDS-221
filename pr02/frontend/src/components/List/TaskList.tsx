import React from 'react';
import {
    FC, useState, useEffect, useCallback
} from 'react';
import {
    Button, Grid, AppBar, Box, Toolbar, IconButton, Typography,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Checkbox, TableSortLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';

interface TaskListProps {
    tasks?: any[];
    editTaskClick: (task) => void;
    deleteTask: (task) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, editTaskClick, deleteTask }) => {
    const headCells = [
        { id: 'title', label: 'Task' },
        { id: 'description', label: 'Description' },
        { id: 'date', label: 'Deadline' },
        { id: 'priority', label: 'Priority' },
        { id: 'isComplete', label: 'Is Complete' },
        { id: 'actions', label: 'Actions' },
    ];

    const NewTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align="center"
                        >
                            {headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const NewTableItem = ({ task, index }) => {
        const [isComplete, setIsComplete] = useState(false);

        return (
            <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row" sx={{ width: "20%", wordWrap: "break-word" }}>
                    {task.title}
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>{task.description}</TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>{task.date}</TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>{task.priority}</TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>
                    <Checkbox
                        checked={task.checked}
                        onChange={(e) => {
                            setIsComplete(e.target.checked);
                        }}
                    />
                </TableCell>
                <TableCell align="center" sx={{ width: "15%", height: "120px" }}>
                    {!isComplete && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            sx={{width: "100px", marginBottom: "5px"}}
                            onClick={() => {
                                editTaskClick(task);
                            }}
                        >
                            Edit
                        </Button>
                    )}
                    <Box ml={2} />
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{width: "100px"}}
                        onClick={() => {
                            deleteTask(task);
                        }}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <NewTableHead />
                <TableBody>
                    {tasks.map((task, index) => (
                        <NewTableItem task={task} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TaskList;
