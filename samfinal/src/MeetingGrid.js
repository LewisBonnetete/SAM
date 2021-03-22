import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import { Link } from "@reach/router";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: 340,
    margin: "auto",
    overflowY: "scroll",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function LinkedCard({ meeting, classes }) {
  const [raised, setRaised] = React.useState(false);
  const [participants, setParticipants] = React.useState();
  // Just trying to handle my react lifecycles better
  let isMounted = true;

  // Fetching every participants names by id or putting user 1 as default
  React.useEffect(() => {
    if (meeting && meeting.participants && isMounted) {
      Promise.all(
        meeting.participants.map((u) =>
          u
            ? fetch("http://lp456338:5000/api/users/" + u)
            : fetch("http://lp456338:5000/api/users/" + "1")
        )
      )
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

  return (
    <Link to={`/meeting/${meeting.id}`}>
      <Card
        raised={raised}
        onMouseOver={() => setRaised(true)}
        onMouseOut={() => setRaised(false)}
        className={classes.card}
      >
        <CardHeader
          title={meeting.title}
          titleTypographyProps={{
            noWrap: true,
          }}
          subheader={meeting.date}
        />
        <CardContent>
          <Box component="div" my={2} bgcolor="background.paper">
            <div>
              {participants
                ? participants.map((participant, key) => (
                    <Chip
                      variant="outlined"
                      size="small"
                      className={classes.chip}
                      key={key}
                      label={participant.user.name}
                    ></Chip>
                  ))
                : null}
            </div>
            <br />
            <div>
              {meeting.subjects.map((subject, key) => (
                <Chip
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.chip}
                  key={key}
                  label={subject}
                ></Chip>
              ))}
            </div>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function MeetingGrid({ meetingsSearch }) {
  const classes = useStyles();

  // Worked a lot on smouth animations for this dashboard :)

  return (
    <div className="meetingGrid">
      <AnimatePresence>
        {meetingsSearch
          ? meetingsSearch.map((meetingSearch) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={meetingSearch.id}
              >
                <LinkedCard
                  key={meetingSearch.id}
                  meeting={meetingSearch}
                  classes={classes}
                />
              </motion.div>
            ))
          : null}
      </AnimatePresence>
    </div>
  );
}
