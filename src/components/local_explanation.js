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

const FACET_KEYS = ["Who", "What", "When", "Why", "Where", "How"];

function LinechartApp(props) {
  console.log("story pace props: ", props);
  var query_book_story_pace = props.story_pace[0];
  var interested_book_story_pace = props.story_pace[1];
  var max_len = Math.max(
    query_book_story_pace.length,
    interested_book_story_pace.length
  );
  labels_lst = [...Array(max_len).keys()];
  const new_state = {
    data: {
      labels: labels_lst,
      datasets: [
        {
          label: "query_book",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          data: query_book_story_pace,
          lineTension: 0.95,
        },

        {
          label: "interested_book",
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          data: interested_book_story_pace,
          lineTension: 0.95,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    legend: {
      display: true,
    },
  };

  // const options = {
  //   responsive: true,
  //   legend: {
  //     display: true,
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         scaleLabel: {
  //           display: true,
  //           labelString: "X-axis Label",
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         scaleLabel: {
  //           display: true,
  //           labelString: "Y-axis Label",
  //         },
  //       },
  //     ],
  //   },
  // };

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

function FacetKeywordsComp(props) {
  var query_book_facets = props.facets[2];
  var selected_book_facets = props.facets[3];
  console.log("facet props: ", query_book_facets, selected_book_facets);

  const compareKeywords = (key) => {
    const query_book_individual_facet = Array.from(
      query_book_facets[key]
    ).slice(2);
    const selected_book_individual_facet = Array.from(
      selected_book_facets[key]
    ).slice(2);

    return (
      query_book_individual_facet &&
      query_book_individual_facet.filter(
        (keyword) =>
          selected_book_individual_facet &&
          selected_book_individual_facet.includes(keyword)
      )
    );
  };

  return (
    <div className="facets-container">
      <h2>Facets Comparison</h2>
      {FACET_KEYS.map((key) => (
        <div className="facets-row" key={key}>
          <div className="facets-key">{key}</div>
          <div className="facets-values">
            <div>
              {query_book_facets[key] &&
                Array.from(query_book_facets[key]).slice(0, 3).join(", ")}
            </div>
            <div>
              {selected_book_facets[key] &&
                Array.from(selected_book_facets[key]).slice(0, 3).join(", ")}
            </div>
          </div>
          {/* <div className="facets-shared">
            {compareKeywords(key) && compareKeywords(key).join(", ")}
          </div> */}
        </div>
      ))}
    </div>
  );
}

export { FacetKeywordsComp, LinechartApp };
