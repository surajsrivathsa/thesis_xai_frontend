import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./local_explanation.css";

import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import { capitalize } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
const average = (array) => array.reduce((a, b) => a + b) / (array.length + 1);
const round_number = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

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
    scales: {
      y: {
        title: {
          display: true,
          text: "Story Pace",
          font: {
            size: 18, // adjust as needed
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Page Number",
          font: {
            size: 18, // adjust as needed
          },
        },
      },
    },
  };

  return (
    <div className="local-explanation">
      <h3>Story Pace Comparision</h3>
      <Line
        data={new_state.data}
        width={null}
        height={null}
        options={options}
        className="local-explanation"
      />
    </div>
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

const CardGrid = ({
  pagecount,
  story_pace,
  pagecount_str,
  story_pace_str,
  color_str,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={5}>
        <Card>
          <CardHeader
            title={<span style={{ color: color_str }}>{pagecount_str}</span>}
            titleTypographyProps={{ fontSize: 14 }}
            subheaderTypographyProps={{ fontSize: 12 }}
          />
          <CardContent>
            {<span style={{ color: color_str }}>{pagecount}</span>}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            title={<span style={{ color: color_str }}>{story_pace_str}</span>}
            subheader="higher the number, higher the pace"
            titleTypographyProps={{ fontSize: 16 }}
            subheaderTypographyProps={{ fontSize: 14 }}
          />
          <CardContent>
            {<span style={{ color: color_str }}>{story_pace}</span>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

function StoryPaceExplanation(props) {
  // data for textual boxes
  console.log("story pace props: ", props);
  var query_book_story_pace = props.story_pace[0];
  var interested_book_story_pace = props.story_pace[1];
  var query_book_pages = query_book_story_pace.length + 1;
  var interested_book_pages = interested_book_story_pace.length + 1;
  var panel_ratio_query_book = round_number(
    2 / (average(query_book_story_pace) + 0.01)
  );
  var panel_ratio_interested_book = round_number(
    2 / (average(interested_book_story_pace) + 0.01)
  );

  // data for linechart
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
    scales: {
      y: {
        title: {
          display: true,
          text: "Panel Count",
          font: {
            size: 18, // adjust as needed
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Page Number",
          font: {
            size: 18, // adjust as needed
          },
        },
      },
    },
  };

  return (
    <div className="local-explanation">
      <h3>Story Pace Comparision</h3>
      {Math.floor(Math.random() * 10) % 2 === 1 ? (
        <Line
          data={new_state.data}
          width={null}
          height={null}
          options={options}
          className="local-explanation"
        />
      ) : (
        <Line
          data={new_state.data}
          width={null}
          height={null}
          options={options}
          className="local-explanation"
        />
      )}
    </div>
  );
}

export { FacetKeywordsComp, LinechartApp, StoryPaceExplanation };

/*
<>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell sx={{color: "rgb(255, 99, 132)" }} >Query Book</TableCell>
                    <TableCell sx={{color: "rgb(53, 162, 235)" }}>Hovered Book</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Page Count</TableCell>
                    <TableCell>{query_book_pages}</TableCell>
                    <TableCell>{interested_book_pages}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Story Pace <br /><p>*higher the number, higher the pace</p>
                    </TableCell>
                    <TableCell>{panel_ratio_query_book}</TableCell>
                    <TableCell>{panel_ratio_interested_book}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            { <CardGrid
              pagecount={query_book_pages}
              story_pace={panel_ratio_query_book}
              pagecount_str="Query Book Page Count"
              story_pace_str="Query Book Story Pace"
              color_str="rgb(255, 99, 132)" />
            <CardGrid
                pagecount={interested_book_pages}
                story_pace={panel_ratio_interested_book}
                pagecount_str="Interested Book Page Count"
                story_pace_str="Interested Book Story Pace"
                color_str="rgb(53, 162, 235)" /> }
          </>
*/
