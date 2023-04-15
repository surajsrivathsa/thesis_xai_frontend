import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Slider, Button, Switch, Tooltip } from "@mui/material";
import { capitalize } from "@material-ui/core";

const inputKeys = [
  "genre_comb",
  "gender",
  "panel_ratio",
  "supersense",
  "comic_cover_img",
  "comic_cover_txt",
];

const FACET_NAME_OBJ = {
  genre_comb: "Genre",
  gender: "Gender",
  panel_ratio: "Story Pace",
  supersense: "Topics and Keywords from Dialogues",
  comic_cover_img: "Book Cover Image",
  comic_cover_txt: "Topics from Book Cover Image",
};

const INITIAL_STATE = {
  genre_comb: 1.0,
  gender: 1.0,
  panel_ratio: 1.0,
  supersense: 1.0,
  comic_cover_img: 1.0,
  comic_cover_txt: 1.0,
};

const TOOLTIP_LST = {
  genre_comb:
    "Amount of Genres such as Action, Adventure, Humor, Romance, Spy etc in book",
  gender: "Gender Ratio such as Male, Female characters in book",
  panel_ratio: "Book Length and Ease of Reading the book",
  supersense:
    "Coarse topics such as weather, adjectives, emotions that are talked about in the book",
  comic_cover_img: "Themes from Important Images in book",
  comic_cover_txt: "Important Images from Book",
};

const GlobalExplanationSliderGrid = ({ inputData, onSubmit }) => {
  const [data, setData] = useState(inputData);
  const [isEditable, setIsEditable] = useState(false);
  const [sliderSX, setSliderSX] = useState({
    width: "80%",
    "& .MuiSlider-thumb": { color: "gray" },
    "& .MuiSlider-track": { color: "gray" },
    "& .MuiSlider-rail": { color: "#acc4e4" },
    "& .MuiSlider-active": { color: "green" },
  });

  const handleSliderChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
    console.log("submitted user global slider data: ", data);
    onSubmit({
      isEditable: isEditable,
      userChosenFacetWeights: data,
    });
  };

  // update editable switch and color of sliders
  const handleSwitchChange = (event) => {
    console.log(event);
    setIsEditable((checked) => event.target.checked);
    if (event.target.checked) {
      setSliderSX({
        width: "80%",
        "& .MuiSlider-thumb": { color: "#42a5f5" },
        "& .MuiSlider-track": { color: "#42a5f5" },
        "& .MuiSlider-rail": { color: "#acc4e4" },
        "& .MuiSlider-active": { color: "green" },
      });

      onSubmit({
        isEditable: event.target.checked,
        userChosenFacetWeights: data,
      });
    } else {
      setSliderSX({
        width: "80%",
        "& .MuiSlider-thumb": { color: "gray" },
        "& .MuiSlider-track": { color: "gray" },
        "& .MuiSlider-rail": { color: "#acc4e4" },
        "& .MuiSlider-active": { color: "green" },
      });
      console.log("submitted default data from global slider: ", data);
      onSubmit({
        isEditable: event.target.checked,
        userChosenFacetWeights: {
          genre_comb: 1.0,
          gender: 1.0,
          panel_ratio: 1.0,
          supersense: 1.0,
          comic_cover_img: 1.0,
          comic_cover_txt: 1.0,
        },
      });
    }
  };

  const conditionalGlobalExplanationUpdateFromBackend = () => {
    if (isEditable === false) {
      setData(inputData);
    }
  };

  const sendUsersFacetWeightsToMain = () => {
    if (isEditable === true) {
      console.log("submitted user global slider data: ", data);
      onSubmit(data);
    } else {
      onSubmit({
        genre_comb: 1.0,
        gender: 1.0,
        panel_ratio: 1.0,
        supersense: 1.0,
        comic_cover_img: 1.0,
        comic_cover_txt: 1.0,
      });
    }
  };

  const columns = [
    {
      field: "key",
      headerName: "Facet",
      width: 260,
      renderCell: (params) => (
        <Tooltip title={TOOLTIP_LST[params.row.key]}>
          <span className="table-cell-trucate">{params.row.id}</span>
        </Tooltip>
      ),
    },
    {
      field: "value",
      headerName: "Contribution towards Search",
      width: 270,
      renderCell: (params) => (
        <Tooltip title={TOOLTIP_LST[params.row.id]}>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={data[params.row.id]}
            disabled={!isEditable}
            onChange={(event, value) =>
              handleSliderChange(params.row.id, value)
            }
            sx={sliderSX}
          />
        </Tooltip>
      ),
    },
    {
      field: "isEditable",
      headerName: "Edit Contribution",
      width: 100,
      renderHeader: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>{params.headerName}</div>
          <Switch
            checked={isEditable}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              "& .MuiSwitch-thumb": { color: "#42a5f5" },
              "& .MuiSwitch-track": { color: "#42a5f5" },
            }}
          />
        </div>
      ),
    },
  ];

  const rows = inputKeys.map((k) => ({
    id: k,
    key: FACET_NAME_OBJ[k],
    value: data[k],
  }));
  console.log("rows: ", rows);

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        disableColumnMenu={true}
        onStateChange={conditionalGlobalExplanationUpdateFromBackend}
      />
    </div>
  );
};

export default GlobalExplanationSliderGrid;
