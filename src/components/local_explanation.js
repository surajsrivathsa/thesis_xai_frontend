import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./local_explanation.css";

var labels_lst = ["query_book", "selected_book"];

const DUMMY_LOCAL_EXPLANATION = {
  data: {
    labels: labels_lst,
    datasets: [
      {
        label: "query_book",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [3, 5, 3, 2, 8],
      },

      {
        label: "selected_book",
        backgroundColor: "rgba(155,231,91,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [1, 2, 5, 4, 3, 8, 2],
      },
    ],
  },
};

function LinechartApp(props) {
  console.log("props: ", props);
  var query_book_story_pace = props.story_pace[0];
  var selected_book_story_pace = props.story_pace[1];
  var max_len = Math.max(
    query_book_story_pace.length,
    selected_book_story_pace.length
  );
  labels_lst = [...Array(max_len).keys()];
  console.log("previous pace: ", query_book_story_pace);
  console.log("current pace: ", selected_book_story_pace);
  const [localExplanation, setLocalExplanation] = useState(
    DUMMY_LOCAL_EXPLANATION
  );
  const new_state = {
    data: {
      labels: labels_lst,
      datasets: [
        {
          label: "query_book",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          data: query_book_story_pace,
        },

        {
          label: "selected_book",
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          data: selected_book_story_pace,
        },
      ],
    },
  };

  //setLocalExplanation(new_state);
  //   useEffect(() => {
  //     console.log("localExplanation: ", localExplanation);
  //   }, [localExplanation]);

  const options = {
    responsive: true,
    legend: {
      display: true,
    },
  };

  return (
    <Line
      data={new_state.data}
      width={null}
      height={null}
      options={options}
      className="local-explanation"
    />
  );
}

export default LinechartApp;
