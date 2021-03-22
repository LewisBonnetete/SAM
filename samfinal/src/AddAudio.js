import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Form } from "semantic-ui-react";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { motion } from "framer-motion";
import AddParticipants from "./AddParticipants";
import styled from "styled-components";
import { useFetch } from "./useFetch";
import { Flag } from "semantic-ui-react";

// As a temporary component I don't wanna explain it too much, It's meant to be replaced by an automatic recover of one's meetings.

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  },
}));

export default function AddAudio({ setUpdate, url }) {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [language, setLanguage] = React.useState("fr-FR");
  const [fetchError, setFetchError] = React.useState(null);
  const { register, handleSubmit } = useForm();
  const [participants, setParticipants] = React.useState("");
  const classes = useStyles();
  let users = useFetch("update", url + "users/allUsers");
  const friends = users.items.users;

  function postMeeting(data) {
    setFetchError("PENDING");
    const file = data.file;
    const vtt = data.vtt;
    var participantsStr;
    const obj = {
      participants: [],
      title: null,
      date: null,
      subjects: [],
      language: language,
    };
    participants.map((participant) => (participantsStr = " " + participant.id));
    obj.participants = participantsStr.match(/[^ ]+/g);
    obj.subjects = data.subjects.match(/[^ ]+/g);
    obj.title = data.title;
    const date = new Date();
    const [month, day, year] = date.toLocaleDateString().split("/");
    obj.date = year + "-" + day + "-" + month;

    var formdata = new FormData();
    formdata.append("file", file[0]);
    formdata.append("vtt", vtt[0]);
    formdata.append("json_str", JSON.stringify(obj));

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    console.log("post: " + url + "meetings/");
    console.log(obj);
    fetch(url + "meetings/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (-1 !== result.search("400")) {
          console.log("Post error format");
          setFetchError("FORMAT");
          setUpdate(new Date());
          setOpen(false);
        } else {
          console.log("Post sucess");
          setFetchError("SUCCESS");
          setUpdate(new Date());
          setOpen(false);
        }
      })
      .catch((error) => {
        // console.log("error", error);
        console.log("Post failed");
        if (error) {
          setFetchError("FAILED");
        }
        setOpen(false);
      });
  }

  const onSubmit = (data) => {
    if (
      data.title === "" ||
      data.date === "" ||
      participants.length === 0 ||
      data.subjects === "" ||
      data.file.length === 0 ||
      data.vtt.length === 0 ||
      data.title.length > 20
    ) {
      if (data.title.length > 20) {
        setAlert("Title must contain less than 20 characters");
      } else {
        setAlert(true);
      }
    } else {
      setAlert(false);
      postMeeting(data);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFetchError(null);
  };

  const variantsadd = {
    open: { opacity: 1, y: "-4vw" },
    closed: { opacity: 0, y: 0 },
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={fetchError === "FAILED" ? true : false}
        autoHideDuration={2500}
        onClose={handleClose2}
      >
        <Alert onClose={handleClose2} severity="error">
          Upload has failed
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={fetchError === "FORMAT" ? true : false}
        autoHideDuration={2500}
        onClose={handleClose2}
      >
        <Alert onClose={handleClose2} severity="error">
          Upload has failed, your file might be corrupted
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={fetchError === "SUCCESS" ? true : false}
        autoHideDuration={2500}
        onClose={handleClose2}
      >
        <Alert onClose={handleClose2} severity="success">
          Upload was successful
        </Alert>
      </Snackbar>
      <motion.div animate={!open ? "open" : "closed"} variants={variantsadd}>
        <Modal
          onClose={() => {
            setOpen(false);
            setAlert(false);
          }}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <div className="addbutton-container">
              <Fab
                style={{
                  width: 90,
                  height: 90,
                }}
                color="primary"
                aria-label="add"
              >
                <AddIcon
                  style={{
                    width: 35,
                    height: 35,
                    color: "#ffffff",
                  }}
                />
              </Fab>
            </div>
          }
          className={classes.modal}
        >
          {fetchError === "PENDING" ? (
            <Modal.Content
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <div style={{ textAlign: "center", margin: "2vw" }}>
                <CircularProgress color="primary" />
              </div>
            </Modal.Content>
          ) : (
            <Modal.Content>
              <Form error id="formElem" onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                  <Label>Title</Label>
                  <input ref={register} name="title"></input>
                </Form.Field>
                <Form.Field>
                  <Label>Subjects</Label>
                  <input ref={register} name="subjects" />
                </Form.Field>
                <Form.Field>
                  {users.isLoaded ? (
                    <AddParticipants
                      friends={friends}
                      participants={participants}
                      setParticipants={setParticipants}
                    />
                  ) : (
                    <h2>Upload unavailable</h2>
                  )}
                </Form.Field>
                <Form.Field>
                  <input
                    className={classes.input}
                    ref={register}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      style={{ float: "left", marginBottom: "20px" }}
                      variant="contained"
                      component="span"
                      color="default"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                    >
                      Video
                    </Button>
                  </label>
                  <input
                    className={classes.input}
                    ref={register}
                    id="contained-button-file2"
                    multiple
                    type="file"
                    name="vtt"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="contained-button-file2">
                    <Button
                      style={{
                        float: "left",
                        marginBottom: "20px",
                        marginLeft: "20px",
                      }}
                      variant="contained"
                      component="span"
                      color="default"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                    >
                      Vtt
                    </Button>
                  </label>
                </Form.Field>
                <Button
                  label={"Language:"}
                  style={{
                    height: 33,
                    color: "#ffffff",
                    float: "left",
                    marginBottom: "20px",
                    marginLeft: "20px",
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (language === "en-US") {
                      setLanguage("fr-FR");
                    } else {
                      setLanguage("en-US");
                    }
                  }}
                >
                  {language === "fr-FR" ? (
                    <Flag name="france" />
                  ) : (
                    <Flag name="us" />
                  )}
                </Button>
                <Button
                  style={{
                    color: "#ffffff",
                    float: "right",
                    marginBottom: "20px",
                  }}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Add
                </Button>
                <Button
                  style={{
                    color: "#f44336",
                    float: "right",
                    marginBottom: "20px",
                    marginRight: "20px",
                  }}
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Form>
            </Modal.Content>
          )}
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={
              alert || alert === "Title must contain less than 20 characters"
                ? true
                : false
            }
            autoHideDuration={2500}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {alert === "Title must contain less than 20 characters"
                ? alert
                : "All field must be filled"}
            </Alert>
          </Snackbar>
        </Modal>
      </motion.div>
    </>
  );
}
