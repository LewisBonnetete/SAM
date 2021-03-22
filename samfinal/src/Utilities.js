import React from "react";

export function playPauseHandler(state, controls) {
  state.paused && state.duration ? controls.play() : controls.pause();
}

// Jumps to a specific time in the audio
export function jump(replica, setSync, controls) {
  setSync(true);
  controls.seek(replica.start_time.slice(0, -1));
}
