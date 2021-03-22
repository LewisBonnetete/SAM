import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import { motion, AnimatePresence } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: 340,
    margin: "auto",
    whiteSpace: "nowrap",
    "box-shadow": "0px 0px 1px 0px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function MeetingGridSkeleton({ type }) {
  const classes = useStyles();

  //Just a poor way of declaring an array to replicate my skeleton
  const arr = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Godfather: Part II",
    "The Dark Knight",
    "12 Angry Men",
    "Schindler's List",
    "Pulp Fiction",
    "The Lord of the Rings: The Return of the King",
    "The Good, the Bad and the Ugly",
    "Fight Club",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Star Wars: Episode V - The Empire Strikes Back",
    "Forrest Gump",
  ];

  return (
    <div className="meetingGrid">
      <AnimatePresence>
        {arr.map((meetingSearch, key) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={key}
          >
            <Card key={key} className={classes.card}>
              <Skeleton
                style={{ marginTop: 16, marginLeft: 16 }}
                height={30}
                width={190}
                animation={type}
              />
              <Skeleton
                style={{ marginTop: 0, marginLeft: 16 }}
                height={25}
                width={80}
                animation={type}
              />
              <Skeleton
                style={{ marginTop: 40, marginLeft: 16 }}
                height={30}
                width={150}
                animation={type}
              />
              <Skeleton
                style={{ marginTop: 0, marginLeft: 16 }}
                height={30}
                width={190}
                animation={type}
              />
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
