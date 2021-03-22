import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { playPauseHandler, jump } from "./Utilities";

export default function MeetingPlayer({
  setInPlayer,
  setTime,
  player,
  setSync,
  currentTime,
  sync,
  meeting,
  focus,
  setFocus,
}) {
  const [, state, controls] = player;

  // Getting percents out of the timing and the downloaded audio (buffer)
  const value = (state.time / state.duration) * 100;
  const valueBuffer = state.buffered[state.buffered.length - 1]
    ? (state.buffered[state.buffered.length - 1].end / state.duration) * 100
    : 0;

  // Getting the window width right for responsiveness, accurate visuals and so we can jump in the audio by clicking on it
  const wWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Time Formatting
  function convertTime(sec) {
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;

    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    return min + ":" + sec;
  }

  // Shows an empty buffering player when fetching goes wrong
  if (!state.duration) {
    state.duration = 1;
  }

  // It contains, in this order: Jump Back, Play/pause, Jump Forward, Sound On/Off, Timer, Sync On/Off
  // And then a Mui progress bar for the audio

  return (
    <div style={{ display: "flex" }}>
      <div style={{ minWidth: 217, borderRight: "1px solid #45a3fa" }}>
        <div
          style={{ margin: "0px", marginTop: 15, marginLeft: 35, padding: 0 }}
        >
          <IconButton
            style={{ margin: "0px", padding: 0 }}
            onClick={() => {
              if (focus > 0) setFocus(focus - 1);
              setSync(false);
            }}
            color="primary"
          >
            <SkipPreviousIcon size="medium" />
          </IconButton>
          <IconButton
            style={{ margin: "0px", marginLeft: 30, padding: 0 }}
            onClick={() => playPauseHandler(state, controls)}
            color="primary"
          >
            {state.paused ? (
              <PlayArrowIcon fontSize="large" />
            ) : (
              <PauseIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton
            style={{ margin: "0px", marginLeft: 30, padding: 0 }}
            onClick={() => {
              if (focus < meeting.transcript.length) setFocus(focus + 1);
            }}
            color="primary"
          >
            <SkipNextIcon size="medium" />
          </IconButton>
        </div>
        <div style={{ display: "flex" }}>
          <IconButton
            style={{ margin: "0px", marginLeft: 10, padding: 0 }}
            onClick={() => {
              state.volume === 1 ? controls.volume(0) : controls.volume(1);
            }}
          >
            {state.volume === 1 ? (
              <VolumeUpIcon color="primary" size="medium" />
            ) : (
              <VolumeOffIcon style={{ color: "grey" }} size="medium" />
            )}
          </IconButton>
          <Typography
            style={{
              margin: 5,
              marginTop: 10,
              marginLeft: 25,
              fontSize: 15,
              padding: 0,
              color: "#45a3fa",
            }}
            variant="body1"
            component="p"
          >
            {convertTime(Math.round(currentTime)) +
              "   |   " +
              convertTime(Math.round(state.duration))}
          </Typography>
          <IconButton
            style={{ margin: 1, marginLeft: 20, marginTop: 4, padding: 0 }}
            onClick={() => setSync(!sync)}
            color="primary"
          >
            {sync ? (
              <Typography
                align="center"
                style={{ fontSize: "13px" }}
                variant="overline"
                gutterBottom
              >
                SYNC
              </Typography>
            ) : (
              <Typography
                style={{ color: "grey", fontSize: "13px" }}
                variant="overline"
                display="block"
                gutterBottom
              >
                SYNC
              </Typography>
            )}
          </IconButton>
        </div>
      </div>
      <div style={{ width: "100%", margin: 0 }}>
        <LinearProgress
          onClick={(e) => {
            let pos = (e.clientX - 217) / (wWidth - 217);
            controls.seek(pos * state.duration);
          }}
          onMouseEnter={() => setInPlayer(true)}
          onMouseLeave={() => setInPlayer(false)}
          onMouseMove={(e) => {
            let pos = (e.clientX - 217) / (wWidth - 217);
            setTime(pos * state.duration);
          }}
          style={{ height: "100%" }}
          variant="buffer"
          value={value}
          valueBuffer={valueBuffer}
        />
      </div>
    </div>
  );
}
