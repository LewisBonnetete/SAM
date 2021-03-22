import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "98.7%",
    height: "100%",
    margin: "0.5vw",
  },
}));

function convertTime(sec) {
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  sec < 1 ? (sec = "00") : void 0;

  min.toString().length == 1 ? (min = "0" + min) : void 0;
  sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

  return min + ":" + sec;
}

function isSearched(replica, search) {
  return replica.sentence.toLowerCase().search(search.toLowerCase()) !== -1;
}

export default function Replica({ meeting, search, onClick, replica, id }) {
  const classes = useStyles();

  const time = convertTime(Math.round(replica?.start_time?.slice(0, -1)));
  const inputRef = useRef();

  // Managing focus for edition and not built yet put requests
  const [focused, setFocused] = React.useState(false);

  return (
    <Card className={classes.card}>
      <CardContent style={{ justifyContent: "space-between", width: "100%" }}>
        {/* Waiting for a diarization solution to re-enable this part and I worked on a select to edit possible mistakes */}
        <div style={{ fontSize: "25px", width: "20%", marginBottom: 10 }}>
          {replica.speaker + " : "}
        </div>
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={replica.speaker}
          onChange={(e) => {
            // setReplicaState(e.target.value);
            console.log(replica);
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select> */}
        <div onClick={onClick} className="timestamp">
          <p>{time}</p>
        </div>
        <div
          onBlur={() => {
            focused ? console.log("PUT request") : null;
            setFocused(false);
          }}
          onClick={() => setFocused(true)}
        >
          {focused ? (
            <InputLabel
              autoFocus
              onFocus={(e) =>
                e.target.setSelectionRange(
                  e.target.value.length,
                  e.target.value.length
                )
              }
              defaultValue={replica.sentence}
              multiline
              variant="filled"
              style={{
                width: "85%",
                border: "1px solid #45a3fa",
                padding: 5,
                fontSize: "20px",
              }}
              disableUnderline={true}
              onChange={(e) => (replica.sentence = e.target.value)}
            />
          ) : (
            <Typography
              style={{
                width: "85%",
                fontSize: "20px",
              }}
            >
              {replica.sentence}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
