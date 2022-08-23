import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.2)",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: "5px",
  },
}));

export default function TopBar() {
  const classes = useStyle();
  return <div className={classes.root}>Espacio de trabajo</div>;
}
