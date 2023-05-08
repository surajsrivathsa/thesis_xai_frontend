import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Slider, Button, Switch, Tooltip } from "@mui/material";
import { capitalize } from "@material-ui/core";
import { Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

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
  supersense: "Broad Themes from Dialogues",
  comic_cover_img: "Visual aspects of Book Cover Image",
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

const FACET_NAME_TOOLTIP_LST = {
  genre_comb: "Facet captures amount of Action, Humor, Mystery etc in book",
  gender: "Gender Proportion such as Male, Female, Other characters in book",
  panel_ratio: "Story Pace, Book Length and Ease of Reading the book",
  supersense:
    "Coarse topics such as weather, adjectives, emotions that are talked about in the dialogues",
  comic_cover_img:
    "Represents visual aspects of Book cover image like color, objects",
  comic_cover_txt: "Textual topics extracted from book cover image",
};

const FACET_VALUE_TOOLTIP_LST = {
  genre_comb: "More the value, More the emphasis of genre on search results",
  gender: "More the value, More the emphasis of gender on search results",
  panel_ratio:
    "More the value, More the emphasis of story pace on search results",
  supersense:
    "More the value, More the emphasis of coarse themes on search results",
  comic_cover_img:
    "More the value, More the emphasis of cover image on search results",
  comic_cover_txt:
    "More the value, More the emphasis of cover image topics on search results",
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
      field: "name",
      headerName: "Facet Name",
      width: 250,
      renderCell: (params) => (
        <Tooltip
          title={
            <Typography fontSize={15}>
              {FACET_NAME_TOOLTIP_LST[params.row.id]}
            </Typography>
          }
        >
          <span className="table-cell-trucate">{params.row.name}</span>
        </Tooltip>
      ),
    },
    {
      field: "value",
      width: 200,
      renderHeader: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <EditIcon />
          <div>{params.headerName}</div>
          <Switch
            checked={isEditable}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              "& .MuiSwitch-thumb": { color: isEditable ? "#A9A9A9" : "#42a5f5" },
              "& .MuiSwitch-track": { backgroundColor: isEditable ? "#42a5f5" : "#A9A9A9" },
            }}
          />
        </div>
      ),
      renderCell: (params) => (
        <Tooltip
          title={
            <Typography fontSize={15}>
              {FACET_VALUE_TOOLTIP_LST[params.row.id]}
            </Typography>
          }
        >
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
    }
  ];

  const rows = inputKeys.map((k) => ({
    id: k,
    name: FACET_NAME_OBJ[k],
    value: data[k],
  }));
  console.log("rows: ", rows);

  return (
    <div>
      <h3>Facet Contribution Towards Search</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        disableColumnMenu={true}
        onStateChange={conditionalGlobalExplanationUpdateFromBackend}
        sx={{ color: "whitesmoke"}}
      />
    </div>
  );
};

export default GlobalExplanationSliderGrid;
