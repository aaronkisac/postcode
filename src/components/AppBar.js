import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar as Bar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  icon: { color: "white" },

  title: {
    flexGrow: 1
  }
}));

export default function AppBar() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Bar position="static">
        <Toolbar>
          <IconButton
            onClick={() => history.push("/")}
            aria-label="delete"
            className={classes.margin}
          >
            <HomeIcon className={classes.icon} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Postcodes
          </Typography>
        </Toolbar>
      </Bar>
    </div>
  );
}
