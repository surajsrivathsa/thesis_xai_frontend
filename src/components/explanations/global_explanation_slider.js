import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Slider, Button, Switch } from "@mui/material";

const inputKeys = [
  "genre_comb",
  "gender",
  "panel_ratio",
  "supersense",
  "comic_cover_img",
  "comic_cover_txt",
];
const INITIAL_STATE = {
  genre_comb: 1.0,
  gender: 1.0,
  panel_ratio: 1.0,
  supersense: 1.0,
  comic_cover_img: 1.0,
  comic_cover_txt: 1.0,
};

const GlobalExplanationSliderGrid = ({ inputData, onSubmit }) => {
  const [data, setData] = useState(inputData);
  const [checked, setChecked] = React.useState(false);

  // getDerivedStateFromProps(inputData, data);
  // {
  //   // do things with nextProps.someProp and prevState.cachedSomeProp
  //   return {
  //     data: inputData,
  //     // ... other derived state properties
  //   };
  // }

  // setData(inputData);
  useEffect(() => {
    console.log("useeffect slider rows: ", rows);
  }, [data]);

  const handleSliderChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleReset = () => {
    setData(inputData);
  };

  const conditionalGlobalExplanationUpdateFromBackend = (updatedData) => {
    if (checked === false) {
      setData(inputData);
    }
  };

  const handleSubmit = () => {
    if (checked === true) {
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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const columns = [
    { field: "key", headerName: "Key", width: 200 },
    {
      field: "value",
      headerName: "Value",
      width: 150,
      renderCell: (params) => (
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={data[params.row.key]}
          onChange={(event, value) => handleSliderChange(params.row.key, value)}
          sx={{ width: "80%" }}
        />
      ),
    },
  ];

  const rows = inputKeys.map((key) => ({ id: key, key, value: data[key] }));

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnMenu
        onStateChange={conditionalGlobalExplanationUpdateFromBackend}
      />
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{ marginRight: "10px" }}
        >
          Reset
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </div>
  );
};

export default GlobalExplanationSliderGrid;
