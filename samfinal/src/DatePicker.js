import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    float: "right",
    margin: theme.spacing(1),
    marginTop: 15,
  },
  textField: {
    width: 150,
    color: "white",
  },
  input: {
    color: "white",
  },
}));

export default function DatePicker({ selectedDate, setSelectedDate }) {
  const classes = useStyles();

  return (
    <form color="secondary" className={classes.container}>
      <TextField
        id="date"
        type="date"
        color="secondary"
        defaultValue={selectedDate}
        className={classes.textField}
        onChange={(e) => {
          setSelectedDate(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          defaultValue: selectedDate,
          margin: "dense",
          disableUnderline: true,
          className: classes.input,
        }}
      />
    </form>
  );
}
