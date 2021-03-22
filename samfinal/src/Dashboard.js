import React, { useState, useContext } from "react";
import { useFetch } from "./useFetch";
import AddAudio from "./AddAudio";
import { Link } from "@reach/router";
import MeetingGrid from "./MeetingGrid";
import SearchBar from "./SearchBar";
import DatePicker from "./DatePicker";
import MeetingGridSkeleton from "./MeetingGridSkeleton";
import Enroll from "./Enroll";
import Calendar from "./Calendar";
import { DemoContext } from "./DemoContext";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Dashboard = ({ url }) => {
  const [search, setSearch] = React.useState("");
  const [update, setUpdate] = React.useState();

  const demo = useContext(DemoContext);

  let data = useFetch(update, url + "meetings/allMeetings");
  const meetings = data.items.meetings;

  // Getting the window width and a resize listener to update ui when needed
  const [wWidth] = useWindowSize();

  // Date formatting
  const date = new Date();
  const [month, day, year] = date.toLocaleDateString().split("/");
  const [selectedDate, setSelectedDate] = React.useState(
    year + "-" + day + "-" + month
  );

  function titleAndSubjectSearch(meetings) {
    if (!meetings) {
      return null;
    }

    // Get all title matches
    let titleResult = meetings.filter(
      (meeting) =>
        meeting.title.toLowerCase().search(search.toLowerCase()) !== -1
    );

    // Get all subject matches
    let subjectsResult = meetings.filter(
      (meeting) =>
        meeting.subjects
          .toString()
          .toLowerCase()
          .search(search.toLowerCase()) !== -1
    );

    // Get rid of duplicates
    var duplicate = false;
    subjectsResult.map((subjectMeeting) => {
      titleResult.map((titleMeeting) => {
        if (subjectMeeting.id === titleMeeting.id) {
          duplicate = true;
        }
      });
      if (duplicate === false) {
        titleResult.push(subjectMeeting);
      } else {
        duplicate = false;
      }
    });

    // If the date picker has been changed we return meetings from that date
    if (selectedDate !== year + "-" + day + "-" + month) {
      return titleResult
        .sort(function (a, b) {
          return b.id - a.id;
        })
        .filter((meeting) => meeting.date === selectedDate);
    }
    // Else we return every matches sorted by id
    return titleResult.sort(function (a, b) {
      return b.id - a.id;
    });
  }

  return (
    <div>
      <header>
        {/* Grid with empty slots for additional features */}
        <div className="bandeau">
          <div />
          <div />
          <div />
          <div />
          <Link
            to="/"
            style={{
              lineHeight: "50px",
              fontSize: "35px",
              textDecoration: "none",
              color: "white",
            }}
          >
            SAM
          </Link>

          {wWidth > 400 ? <Calendar /> : null}

          <div />
          {/* {wWidth > 400 ? <Enroll /> : null} */}
          {wWidth > 670 ? (
            <SearchBar search={search} setSearch={setSearch} />
          ) : null}
          {wWidth > 940 ? (
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ) : null}
        </div>
      </header>
      {/* Div to set the Meeting grid's height and avoid unwanted scrolling */}
      <div style={{ width: "100%", height: "55px" }}></div>
      {data.error ? (
        <MeetingGridSkeleton type={false} />
      ) : data.isLoaded && meetings ? (
        <MeetingGrid meetingsSearch={titleAndSubjectSearch(meetings)} />
      ) : (
        <MeetingGridSkeleton type={"wave"} />
      )}
      {/* This component is messy but dedicated to disapear anyway  ¯\_(ツ)_/¯ */}
      <div className="addaudio">
        <AddAudio setUpdate={setUpdate} url={url} />
      </div>
    </div>
  );
};

export default Dashboard;
