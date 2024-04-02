import React, { FC, useState, useEffect, useCallback } from "react";
import { 
    Button, Grid, AppBar, Box, Toolbar, IconButton, Typography,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "react-toastify/dist/ReactToastify.css";

interface TitleProps {
    handleOpenForm: () => void;
}

const Title: FC<TitleProps> = ({ handleOpenForm }) => {
  const [formIsOpen, setFormIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mt: 0.4, flexGrow: 1 }}>
            Frameworks
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleOpenForm}
          >
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Title;
