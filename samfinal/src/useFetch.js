import { useEffect, useState, useContext } from "react";
import { DemoContext } from "./DemoContext";
import meetings from "./allmeetings.json";

export const useFetch = (update, url) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const demo = useContext(DemoContext);
  let isMounted = true;

  function mergeReplica(replica, next_replica) {
    replica.sentence += " " + next_replica.sentence;
    replica.end_time = next_replica.end_time;
    replica.next_time = next_replica.next_time;
  }

  function mergeReplicas(items) {
    const transcript = items.transcript_azure;
    const mergedtranscript = [];
    var i = 0;
    var cpt = 0;
    if (transcript) {
      transcript.map((elem, key) => {
        if (elem.sentence === "D.") {
          elem.sentence = "Des...";
        }
        if (elem.sentence === "E.") {
          elem.sentence = "Euh...";
        }
      });
      transcript.map((elem, key) => {
        if (cpt === 0) {
          if (transcript[key] && transcript[key + 1] && transcript[key + 2]) {
            mergedtranscript.push(transcript[key]);
            if (mergedtranscript[i].speaker === transcript[key + 1].speaker) {
              mergeReplica(mergedtranscript[i], transcript[key + 1]);
              cpt++;
            }
            if (mergedtranscript[i].speaker === transcript[key + 2].speaker) {
              mergeReplica(mergedtranscript[i], transcript[key + 2]);
              cpt++;
            }
            i++;
          }
        } else {
          cpt--;
        }
      });
      items.transcript_azure = mergedtranscript;
      return mergedtranscript;
    }
    return null;
  }

  useEffect(() => {
    if (demo == "true") {
      console.log("DEMO");
      if (url.search("allUsers") !== -1) {
        setItems(
          JSON.parse(
            '{"users":[{"id":1,"mail":"antilope.sauvage@mail.com","name":"Antilope Sauvage"},{"id":2,"mail":"patate.douce@mail.com","name":"Patate douce"},{"id":3,"mail":"carotte.enervee@gmail.com","name":"Carotte enervee"}]}'
          )
        );
        setIsLoaded(true);
        setError(null);
      } else if (url.search("allMeetings") !== -1) {
        setItems(meetings);
        setIsLoaded(true);
        setError(null);
      } else if (
        url.search("meetings") !== -1 &&
        url.search("allMeetings") === -1
      ) {
        const meeting = meetings.meetings[4];
        console.log(meeting);
        setItems(meeting);
        setIsLoaded(true);
        setError(null);
      }
    } else {
      setItems([]);
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          if (isMounted) {
            // console.log(result);
            setIsLoaded(true);
            if (url.search("transcript") !== -1) {
              mergeReplicas(result);
              setItems(result);
            } else {
              setItems(result);
            }
          }
        })
        .catch((error) => {
          if (isMounted) {
            //  console.log("error", error);
            setError(error);
          }
        });
      return () => {
        isMounted = false;
      };
    }
  }, [url, update]);
  // console.log(url + ":" + JSON.stringify(items));
  return { items, isLoaded, error };
};
