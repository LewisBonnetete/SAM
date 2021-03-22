import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import MailIcon from "@material-ui/icons/Mail";
import Downloader from "./Downloader";
import ChipContainer from "./ChipContainer";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "45.2vw",
    margin: 0,
    elevation: "0",
    overflow: "auto",
  },
  grid: {
    margin: 5,
  },
  chip: {
    maxWidth: "400px",
    margin: 1,
  },
  margin: {
    margin: theme.spacing(1),
    marginTop: 11,
  },
  input: {
    color: "#45a3fa",
    padding: 0,
  },
}));

function SearchBar({ search, setSearch }) {
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
            color="primary"
          />
        ),
        className: classes.input,
      }}
    />
  );
}

function InfoSkeleton() {
  return (
    <>
      <Skeleton
        style={{ marginTop: 16, marginLeft: 16 }}
        height={30}
        width={"50%"}
        animation="wave"
      />
      <Skeleton
        style={{ marginTop: 0, marginLeft: 16 }}
        height={25}
        width={"20%"}
        animation="wave"
      />
      <Skeleton
        style={{ marginTop: 20, marginLeft: 16, marginBottom: 0 }}
        height={25}
        width={"75%"}
        animation="wave"
      />
      <Skeleton
        style={{ marginTop: 0, marginLeft: 16, marginBottom: 15 }}
        height={25}
        width={"50%"}
        animation="wave"
      />
      <Skeleton
        style={{ marginTop: 0, marginLeft: 16, marginBottom: 0 }}
        height={25}
        width={"75%"}
        animation="wave"
      />
      <Skeleton
        style={{ marginTop: 0, marginLeft: 16, marginBottom: 16 }}
        height={25}
        width={"50%"}
        animation="wave"
      />
    </>
  );
}

export default function MeetingInfos({
  search,
  setSearch,
  focus,
  currentTime,
  duration,
  meeting,
  player,
  sync,
  setSync,
  setSource,
  source,
  url,
  id,
}) {
  // Mui style
  const classes = useStyles();

  const [participants, setParticipants] = React.useState();

  const [original, setOriginal] = React.useState(false);

  const [audio, state, controls] = player;

  // Just trying to manage my react lifecycles better
  let isMounted = true;

  function mailtoFormater() {
    var str = "mailto:";

    participants?.map((participant) => {
      str += "%20" + participant.user.mail;
    });

    str +=
      "?" +
      "subject=" +
      meeting?.title +
      ": " +
      meeting?.subjects.join("%20") +
      "&body=";
    str +=
      "Here is a generated mail for the " +
      meeting?.date +
      " meeting %0A%0ATitle: " +
      meeting?.title +
      "%0AParticipants:";
    participants?.map((participant) => {
      str += "%20" + participant?.user.mail;
    });
    str += "%0ASubjects: " + meeting?.subjects.join(" ");
    str +=
      "%0A%0ADownload the transcript at this link: " +
      url +
      "meetings/" +
      id +
      "/transcript/download";
    return str;
  }

  // Fetching every participants name by id
  React.useEffect(() => {
    if (meeting && isMounted) {
      Promise.all(meeting.participants.map((u) => fetch(u)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((results) => {
          if (isMounted) {
            setParticipants(results);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [meeting]);

  const handleChange = (event) => {
    setOriginal(!original);
  };

  // Components are pretty self-explanatory
  return (
    <>
      {audio}
      {meeting ? (
        <Card className={classes.card} elevation={0}>
          <CardActions>
            <div>
              <Typography style={{ margin: 10, fontSize: 30 }}>
                {meeting?.title}
              </Typography>
              <Typography style={{ margin: 10, fontSize: 15 }}>
                {meeting?.date}
              </Typography>

              <IconButton
                style={{ marginTop: 5 }}
                onClick={() => {
                  if (source === "google") {
                    setSource("stream");
                  } else if (source === "stream") {
                    setSource("azure");
                  } else if (source === "azure") {
                    setSource("google");
                  }
                }}
                color="primary"
              >
                {source === "google" ? (
                  <Typography
                    align="center"
                    style={{ fontSize: "13px" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                  >
                    google
                  </Typography>
                ) : source === "stream" ? (
                  <Typography
                    style={{ fontSize: "13px" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                  >
                    stream
                  </Typography>
                ) : (
                  <Typography
                    style={{ fontSize: "13px" }}
                    variant="overline"
                    display="block"
                    gutterBottom
                  >
                    azure
                  </Typography>
                )}
              </IconButton>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Original"
              />
              <IconButton color="primary" href={mailtoFormater()}>
                <MailIcon fontSize="large" />
              </IconButton>
              <Downloader url={url} id={id} />
              <div>
                <SearchBar search={search} setSearch={setSearch} />
              </div>
            </div>
          </CardActions>
          <CardContent style={{ padding: "0", heigth: "100%" }}>
            <Box
              style={{ marginLeft: 16, padding: 0 }}
              component="div"
              my={2}
              textOverflow="ellipsis"
              overflow="hidden"
              bgcolor="background.paper"
            >
              <ChipContainer
                title={"Participants"}
                tab={participants}
                color={"default"}
              />
              <ChipContainer
                title={"Subjects"}
                tab={meeting?.subjects}
                color={"primary"}
              />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <InfoSkeleton />
      )}
    </>
  );
}
