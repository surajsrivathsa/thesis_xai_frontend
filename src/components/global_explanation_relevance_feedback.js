import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import "./global_explanation_relevance_feedback.css";

const initial_chips = [
  { key: 0, label: "Angular" },
  { key: 1, label: "jQuery" },
  { key: 2, label: "Polymer" },
  { key: 3, label: "React" },
  { key: 4, label: "Vue.js" },
];

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({ inputData }) {
  let wantedArray = inputData.map((obj_str, index) => {
    return {
      key: index,
      label: obj_str,
    };
  });

  // const [chipData, setChipData] = React.useState(wantedArray);

  // setChipData(wantedArray);

  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) =>
  //     chips.filter((chip) => chip.key !== chipToDelete.key)
  //   );
  // };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {wantedArray.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              // onDelete={data.label === "React" ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
