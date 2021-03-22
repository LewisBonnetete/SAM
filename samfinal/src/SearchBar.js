import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginTop: 11,
  },
  input: {
    color: "white",
    padding: 0,
  },
}));

export default function SearchBar({ search, setSearch }) {
  const classes = useStyles();
  return (
    <TextField
      size="small"
      color="secondary"
      className={classes.margin}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      InputProps={{
        disableUnderline: true,
        spellCheck: "false",
        startAdornment: (
          <SearchIcon
            style={{ margin: "7px", marginTop: "4px" }}
            color="secondary"
          />
        ),
        className: classes.input,
      }}
    />
  );
}
