import React, { createRef } from "react";
import Replica from "./Replica";
import ReplicaSkeleton from "./ReplicaSkeleton";
import { useScroll } from "react-scroll-hooks";
import { useFetch } from "./useFetch";
import { makeStyles } from "@material-ui/core/styles";
import { playPauseHandler, jump } from "./Utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function isSearched(replica, search) {
  if (search === "") return false;
  return replica.sentence.toLowerCase().search(search.toLowerCase()) !== -1;
}

function MeetingContent({
  source,
  duration,
  search,
  focus,
  setFocus,
  sync,
  setSync,
  stateTime,
  controls,
  meeting,
  url,
  id,
}) {
  //Mui style
  const classes = useStyles();

  // Update is just here to trigger a fetch mostly whenever I want to debug or understand stuff
  const [update, setUpdate] = React.useState();

  const data = useFetch(update, url + "meetings/" + id + "/transcript");

  // Jumped allows us enable Sync if needed when we jump in the transcript
  const [jumped, setJumped] = React.useState(false);

  // Scrolling tools
  const containerRef = React.useRef();
  const scrollSpeed = 50;
  const { scrollToElement } = useScroll({
    scrollSpeed,
    containerRef,
  });
  const elRefs = React.useRef([]);

  // A very poor way to declare an array to render multiple skeletons when needed
  const arr = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Godfather: Part II",
    "The Dark Knight",
  ];

  function dataParser(data) {
    if (source === "google") {
      if (data && data.transcript && data.transcript.length !== 0) {
        data.transcript.map((replica, key) => {
          if (key < data.transcript.length - 1) {
            replica.next_time = data.transcript[key + 1].start_time;
          } else {
            replica.next_time = duration + "s";
          }
        });
      } else {
        return null;
      }
      return data.transcript;
    } else if (source === "stream") {
      if (data && data.transcript_stream) {
        data.transcript_stream.map((replica, key) => {
          if (key < data.transcript_stream.length - 1) {
            replica.next_time = data.transcript_stream[key + 1].start_time;
          } else {
            replica.next_time = duration + "s";
          }
        });
      }
      return data.transcript_stream;
    } else if (source === "azure") {
      if (!data || data.transcript_azure === "pending") {
        return null;
      }
      data.transcript_azure?.map((replica, key) => {
        if (key < data.transcript_azure.length - 1) {
          replica.next_time = data.transcript_azure[key + 1].start_time;
        } else {
          replica.next_time = duration + "s";
        }
      });
      return data.transcript_azure;
    }
  }

  const transcript = dataParser(data.items);
  console.log(data.items.transcript_stream);

  // Making sure the refs match the transcript
  React.useEffect(() => {
    if (transcript && elRefs.current.length !== transcript.length) {
      elRefs.current = Array(transcript.length)
        .fill()
        .map((_, i) => elRefs.current[i] || createRef());
    }
  }, [transcript]);

  // Disabling sync on search
  React.useEffect(() => {
    if (search !== "") {
      setSync(false);
    }
  }, [sync, search]);

  // Updates the focus on any stateTime update and manages jumped to enable sync if needed
  React.useEffect(() => {
    if (transcript) {
      transcript.map((replica, key) => {
        if (
          stateTime < replica.next_time.slice(0, -1) &&
          stateTime >= replica.start_time.slice(0, -1)
        ) {
          setFocus(key);
          if (jumped) {
            setJumped(false);
            setSync(true);
          }
        }
      });
    }
  }, [stateTime]);

  // Visually does the jump for our jump functions on focus and potentially sync updates
  React.useEffect(() => {
    if (transcript && sync) {
      scrollToElement(elRefs?.current[focus]);
    }
  }, [focus, sync]);

  return (
    <div
      className={classes.root}
      ref={containerRef}
      style={{
        height: "100%",
        position: "relative",
        overflow: "scroll",
        backgroundColor: "#b8dcfd",
      }}
      onWheel={() => setSync(false)}
    >
      {meeting ? (
        transcript ? (
          transcript.map((replica, key) => (
            <div ref={elRefs.current[key]} key={key + source}>
              {search !== "" ? (
                isSearched(replica, search) ? (
                  <Replica
                    meeting={meeting}
                    search={search}
                    onClick={() => jump(replica, setSync, controls)}
                    replica={replica}
                  />
                ) : null
              ) : (
                <Replica
                  meeting={meeting}
                  search={search}
                  onClick={() => jump(replica, setSync, controls)}
                  replica={replica}
                />
              )}
            </div>
          ))
        ) : (
          <div>
            {arr.map((elem, key) => (
              <ReplicaSkeleton key={key} />
            ))}
          </div>
        )
      ) : (
        <div>
          {arr.map((elem, key) => (
            <ReplicaSkeleton key={key} />
          ))}
        </div>
      )}
    </div>
  );
}

// We need a lot of control on our updates, else we would remount a lot of components on every happening such as any mouse movement on the progress bar (since it refreshes the info component)
MeetingContent = React.memo(MeetingContent, (prevProps, nextProps) => {
  if (
    prevProps.meeting !== nextProps.meeting ||
    prevProps.sync !== nextProps.sync ||
    prevProps.search !== nextProps.search ||
    prevProps.focus !== nextProps.focus ||
    prevProps.stateTime !== nextProps.stateTime ||
    prevProps.search !== nextProps.search ||
    prevProps.source !== nextProps.source
  ) {
    return false;
  } else {
    return true;
  }
});

export default MeetingContent;
