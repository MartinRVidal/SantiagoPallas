import {
  Collapse,
  alpha,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import AddTitleCardOrList from "./AddTitleCardOrList";

function AddCardOrList({ type, listId }) {
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddTitleCardOrList type={type} setOpen={setOpen} listId={listId} />
      </Collapse>
      <Collapse in={!open}>
        <Paper
          className={classes.addCardOrListText}
          onClick={() => setOpen(true)}
        >
          <Typography>
            {type === "card" ? "+ Add a Card " : "+ Add a List"}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(2),
  },
  addCardOrListText: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#ebecf0",
    "&:hover": {
      background: alpha("#000", 0.15),
      cursor: "pointer",
    },
  },
}));

export default AddCardOrList;
