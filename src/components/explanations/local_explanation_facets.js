import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import "./local_explanation_facets.css";

const DEFAULT_CHIP = [
  { key: "Person", label: "Who" },
  { key: "Event", label: "Why and How" },
  { key: "Location", label: "Where" },
  { key: "Time", label: "When" },
];

const FACET_KEYS = ["Who", "What", "When", "Why", "Where", "How"];
const FACET_EXPLANATION_KEYS = ["Event", "Location", "Person", "Time"];
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {
  const [chipData, setChipData] = React.useState(DEFAULT_CHIP);

  var query_book_facets = props.facets[2];
  var selected_book_facets = props.facets[3];
  let facets_explanation_obj = {
    Person: "",
    Event: "",
    Location: "",
    Time: "",
  };

  const filtered_facets = (query_book_facets, selected_book_facets) => {
    FACET_KEYS.map((key) => {
      if (key === "How" || key === "What" || key === "Why") {
        if (query_book_facets[key]) {
          facets_explanation_obj.Event = Array.from(query_book_facets[key])
            .slice(0, 3)
            .join(", ");
        }
        if (
          selected_book_facets[key] &&
          facets_explanation_obj.Event.length > 0
        ) {
          facets_explanation_obj.Event =
            facets_explanation_obj.Event +
            ", " +
            Array.from(selected_book_facets[key]).slice(0, 3).join(", ");
        } else if (
          selected_book_facets[key] &&
          facets_explanation_obj.Event.length === 0
        ) {
          facets_explanation_obj.Event = Array.from(selected_book_facets[key])
            .slice(0, 3)
            .join(", ");
        } else {
        }
      } else if (key === "Where") {
        if (query_book_facets[key]) {
          facets_explanation_obj.Location = Array.from(query_book_facets[key])
            .slice(0, 3)
            .join(", ");
        }
        if (
          selected_book_facets[key] &&
          facets_explanation_obj.Location.length > 0
        ) {
          facets_explanation_obj.Location =
            facets_explanation_obj.Location +
            ", " +
            Array.from(selected_book_facets[key]).slice(0, 3).join(", ");
        } else if (
          selected_book_facets[key] &&
          facets_explanation_obj.Location.length === 0
        ) {
          facets_explanation_obj.Location = Array.from(
            selected_book_facets[key]
          )
            .slice(0, 3)
            .join(", ");
        } else {
        }
      } else if (key === "Who") {
        if (query_book_facets[key]) {
          facets_explanation_obj.Person = Array.from(query_book_facets[key])
            .slice(0, 3)
            .join(", ");
        }
        if (
          selected_book_facets[key] &&
          facets_explanation_obj.Person.length > 0
        ) {
          facets_explanation_obj.Person =
            facets_explanation_obj.Person +
            ", " +
            Array.from(selected_book_facets[key]).slice(0, 3).join(", ");
        } else if (
          selected_book_facets[key] &&
          facets_explanation_obj.Person.length === 0
        ) {
          facets_explanation_obj.Person = Array.from(selected_book_facets[key])
            .slice(0, 3)
            .join(", ");
        } else {
        }
      } else if (key === "When") {
        if (query_book_facets[key]) {
          facets_explanation_obj.Time = Array.from(query_book_facets[key])
            .slice(0, 3)
            .join(", ");
        }
        if (
          selected_book_facets[key] &&
          facets_explanation_obj.Time.length > 0
        ) {
          facets_explanation_obj.Time =
            facets_explanation_obj.Time +
            ", " +
            Array.from(selected_book_facets[key]).slice(0, 3).join(", ");
        } else if (
          selected_book_facets[key] &&
          facets_explanation_obj.Time.length === 0
        ) {
          facets_explanation_obj.Time = Array.from(selected_book_facets[key])
            .slice(0, 3)
            .join(", ");
        } else {
        }
      } else {
      }
    });
    // setChipData(facets_explanation_obj);
    // console.log("useeffect chipData: ", facets_explanation_obj);
  };

  // const handleFacetsOfClickedBooks = (chip_facets) => {
  //   setChipData(chip_facets);
  // };

  // useEffect(() => {
  //   filtered_facets(query_book_facets, selected_book_facets);
  //   // handleFacetsOfClickedBooks(facets_explanation_obj);
  //   console.log("useeffect chipData: ", facets_explanation_obj);
  // }, [chipData]);

  filtered_facets(query_book_facets, selected_book_facets);
  console.log("useeffect chipData: ", facets_explanation_obj);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        wordWrap: "break-word",
      }}
      component="ul"
    >
      {FACET_EXPLANATION_KEYS.map((elem) => {
        let icon;

        if (elem === "Person") {
          icon = <TagFacesIcon />;
        } else if (elem === "Event") {
          icon = <QuestionMarkIcon />;
        } else if (elem === "Location") {
          icon = <LocationOnIcon />;
        } else if (elem === "Time") {
          icon = <AccessAlarmIcon />;
        } else {
        }

        return (
          <ListItem key={elem} sx={{ wordWrap: "break-word" }}>
            <Chip
              sx={{ wordWrap: "break-word" }}
              icon={icon}
              label={facets_explanation_obj[elem]}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
