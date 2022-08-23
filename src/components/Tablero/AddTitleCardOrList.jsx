import {
  Paper,
  InputBase,
  alpha,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useContext, useState } from "react";
import contextAPI from "../../utils/contextAPI";

const AddTitleCardOrList = ({ type, setOpen, listId }) => {
  const [title, setTitle] = useState("");
  const classes = useStyle();
  const { addCard, addList } = useContext(contextAPI);

  const handleAddCardOrList = () => {
    if (type === "card") {
      addCard(title, listId);
    } else {
      addList(title);
    }

    setTitle("");
    setOpen(false);
  };

  return (
    <>
      <Paper className={classes.card}>
        <InputBase
          multiline
          placeholder={
            type === "card"
              ? "Ingresa en titulo de la tarjeta"
              : "Ingresa en titulo de la Lista"
          }
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setOpen(false)}
          value={title}
          inputProps={{ className: classes.input }}
        />
      </Paper>
      <div className={classes.confirm}>
        <div className={classes.options}>
          <Button className={classes.btnConfirm} onClick={handleAddCardOrList}>
            {type === "card" ? "Add card" : "Add list"}
          </Button>
          <IconButton onClick={() => setOpen(false)}>
            <ClearIcon />
          </IconButton>
        </div>

        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  card: {
    width: "284px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
  },
  options: {
    flexGrow: 1,
  },
  confirm: {
    display: "flex",
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5aac44",
    color: "#fff",
    margin: theme.spacing(0, 1, 0, 0),
    "&:hover": {
      background: alpha("#5aac44", 0.75),
    },
  },
}));

export default AddTitleCardOrList;
