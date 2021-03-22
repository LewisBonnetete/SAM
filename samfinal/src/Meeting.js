import React from "react";
import { useAudio } from "react-use";
import MeetingContent from "./MeetingContent";
import MeetingInfos from "./MeetingInfos";
import MeetingPlayer from "./MeetingPlayer";
import { useFetch } from "./useFetch";
import KeyboardEventHandler from "react-keyboard-event-handler";
import ResizePanel from "react-resize-panel";
import { playPauseHandler, jump } from "./Utilities";

export default function Meeting({ url, id }) {
  // Update is just here to trigger a fetch mostly whenever I want to debug or understand stuff
  const [update, setUpdate] = React.useState();

  let data = useFetch(update, url + "meetings/" + id);

  // Sync defines if the transcript must jump to the timing of the player or not
  const [sync, setSync] = React.useState(true);

  // Focus keeps track of were we are in the transcript
  const [focus, setFocus] = React.useState(0);

  // Source of transcription
  const [source, setSource] = React.useState("azure");

  // Hook I found on google that handles almost everything for us about audio in the browser -> https://github.com/streamich/react-use/blob/master/docs/useAudio.md
  const [audio, state, controls] = useAudio({
    src: url + "meetings/" + id + "/download",
    autoPlay: false,
  });

  // Time is where we are/wanna be in the audio opposed to state.time from useAudio that is the time from the html audio
  // In other words its our time value that we're gonna use to edit state.time
  const [time, setTime] = React.useState(0);
  const [inPlayer, setInPlayer] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Data formatting
  function dataParser(meeting) {
    if (meeting && meeting.transcript) {
      meeting.transcript.map((replica, key) => {
        if (key !== meeting.transcript.length) {
          replica.next_time = state.duration + "s";
        } else {
          replica.next_time = meeting.transcript[key + 1].start_time;
        }
      });
    }
    return meeting;
  }
  const meeting = dataParser(data.items.meeting);

  return (
    <div>
      {/* Shortcuts */}
      <KeyboardEventHandler
        handleKeys={[
          "space",
          "up",
          "down",
          "right",
          "left",
          "m",
          "s",
          "backspace",
        ]}
        onKeyEvent={(key, e) => {
          if (key === "space") {
            playPauseHandler(state, controls);
          }
          if (key === "m") {
            state.volume === 1 ? controls.volume(0) : controls.volume(1);
          }
          if (key === "s") {
            setSync(!sync);
          }
          if (key === "backspace") {
            jump(meeting.transcript[0], setSync, controls);
          }
          if ((key === "up" || key === "left") && focus > 0) {
            jump(meeting.transcript[focus - 1], setSync, controls);
          }
          if (key === "down" || key === "right") {
            jump(meeting.transcript[focus + 1], setSync, controls);
          }
        }}
      />
      {/* I've iterated a lot in this design so they might be duplicated and/or unnecessary (at least atm) logic here and there
      But right now the idea is that we have the player on top and a book-like design beneath it with infos on the left and the transcript (content) on the right */}
      <div className="meeting">
        <div className="meeting-view">
          <div className="player">
            <MeetingPlayer
              setInPlayer={setInPlayer}
              setTime={setTime}
              player={[audio, state, controls]}
              sync={sync}
              focus={focus}
              setFocus={setFocus}
              setSync={setSync}
              currentTime={inPlayer ? time : state.time}
              duration={state.duration}
              meeting={meeting}
            />
          </div>
          <div className="meeting-book">
            <ResizePanel direction="e" style={{ flexGrow: "1" }}>
              <div className=" meeting-infos">
                {data.error ? null : (
                  <MeetingInfos
                    search={search}
                    setSearch={setSearch}
                    focus={focus}
                    currentTime={inPlayer ? time : state.time}
                    duration={state.duration}
                    meeting={meeting}
                    player={[audio, state, controls]}
                    sync={sync}
                    setSync={setSync}
                    source={source}
                    setSource={setSource}
                    url={url}
                    id={id}
                  />
                )}
              </div>
            </ResizePanel>
            <div className=" meeting-content">
              {data.error ? (
                <h2 style={{ textAlign: "center", margin: "5vw" }}>
                  Something went wrong
                </h2>
              ) : (
                <MeetingContent
                  source={source}
                  duration={state.duration}
                  search={search}
                  focus={focus}
                  setFocus={setFocus}
                  sync={sync}
                  setSync={setSync}
                  controls={controls}
                  stateTime={state.time}
                  id={id}
                  meeting={meeting}
                  url={url}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
