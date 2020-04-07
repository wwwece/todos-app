import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@material-ui/core";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={RouterLink} to="/">
          Home
        </Button>
        <Button component={RouterLink} to="/todos">
          Todos
        </Button>
        <Button component={RouterLink} to="/create">
          Add new
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
