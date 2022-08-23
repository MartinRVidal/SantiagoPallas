import {
  makeStyles,
  Paper,
  Typography,
  Collapse,
  InputBase,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
// import contextAPI from '../../utils/contextAPI';

function TrelloCard({ card, index }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  // const{ updateTitleCard } = useContext(contextAPI)

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Collapse in={open}>
            <Paper className={classes.trelloCard}>
              <InputBase
                multiline
                placeholder={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setOpen(false)}
                value={title}
                inputProps={{ className: classes.input }}
              />
              <IconButton>
                <SaveIcon className={classes.edit} />
              </IconButton>
            </Paper>
          </Collapse>
          <Collapse in={!open}>
            <Paper className={classes.trelloCard}>
              <Typography>{card.title}</Typography>
              <IconButton onClick={() => setOpen(true)}>
                <EditIcon className={classes.edit} />
              </IconButton>
            </Paper>
          </Collapse>
        </div>
      )}
    </Draggable>
  );
}

const useStyle = makeStyles((theme) => ({
  trelloCard: {
    display: "flex",
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
  },
  edit: {
    fontSize: "1rem",
  },
  input: {
    margin: theme.spacing(1),
  },
}));

export default TrelloCard;
