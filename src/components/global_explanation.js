import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./global_explanation.css";

const labels_lst = [
  "genre_comb",
  "gender",
  "panel_ratio",
  "supersense",
  "comic_cover_img",
  "comic_cover_txt",
];

const DUMMY_EXPLANATION = {
  data: {
    labels: labels_lst,
    datasets: [
      {
        label: "previous",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      },

      {
        label: "current",
        backgroundColor: "rgba(155,231,91,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      },
    ],
  },
};

function BarchartApp(props) {
  console.log("global props: ", props);
  var previous_data = [];
  labels_lst.forEach((item) =>
    previous_data.push(props.global_explanations_lst[0][item])
  );
  var current_data = [];
  labels_lst.forEach((item) =>
    current_data.push(props.global_explanations_lst[1][item])
  );
  // console.log("previous weights: ", previous_data);
  // console.log("current weights: ", current_data);
  const [explanation, setExplanation] = useState(DUMMY_EXPLANATION);
  const new_state = {
    data: {
      labels: labels_lst,
      datasets: [
        {
          label: "previous",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: previous_data,
        },

        {
          label: "current",
          backgroundColor: "rgba(155,231,91,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: current_data,
        },
      ],
    },
  };

  //setExplanation(new_state);

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    type: "bar",
  };

  return (
    <Bar
      data={new_state.data}
      width={null}
      height={null}
      options={options}
      className="global-explanation"
    />
  );
}

export default BarchartApp;
