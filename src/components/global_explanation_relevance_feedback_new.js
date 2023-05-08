import { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const img_folderpath = "../../comic_book_covers_ui/";

// Example usage
var cdata = [
  {
    comic_no: 407,
    book_title: "Swift Arrow: Test of the Tomahawk",
    genre: "western|action",
    year: 1950,
    query_book: false,
    explanation_lst: [
      [
        "a native american warrior",
        "bronze - skinned",
        "20.jpeg",
        "Captain Marvel Jr - The hunt for treasure",
      ],
      [
        "with a parrot on his shoulder",
        "hes wearing a red neckerchief",
        "20.jpeg",
        "Captain Marvel Jr - The hunt for treasure",
      ],
    ],
  },
  {
    comic_no: 23,
    book_title: "Captain Marvel Jr - Keep the Liberty Bell Ringing",
    genre: "superhero|humour",
    year: 1950,
    query_book: false,
    explanation_lst: [
      [
        "comic artstyle",
        "a cover of a blue bolt comic book",
        "11.jpeg",
        "Boy - Detective: Death Trap",
      ],
      [
        "black cape",
        "cobalt blue",
        "20.jpeg",
        "Captain Marvel Jr - The hunt for treasure",
      ],
    ],
  },
  {
    comic_no: 469,
    book_title: "Wild Bill Pecos: Thunderbird",
    genre: "western",
    year: 1950,
    query_book: false,
    explanation_lst: [
      [
        "western comic art",
        "a cover of a blue bolt comic book",
        "11.jpeg",
        "Boy - Detective: Death Trap",
      ],
      [
        "a comic book with a cowboy on a horse",
        "a cover of a blue bolt comic book",
        "11.jpeg",
        "Boy - Detective: Death Trap",
      ],
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
  },
  chip: {
    cursor: "pointer",
    position: "relative",
  },
  box: {
    position: "relative",
    top: 0,
    left: "1%",

    backgroundColor: "white",
    width: "50%",
    padding: theme.spacing(1),
    borderRadius: "4px",
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
  },
}));

function ChipsWithBox({ data }) {
  const classes = useStyles();
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [clickedChipID, setClickedChipID] = useState(null);

  const handleChipClick = (comicNo, index) => {
    if (isBoxVisible) {
      console.log("clicked to leave");
      setClickedChipID(null);
    } else {
      console.log("clicked to show");
      setClickedChipID(index);
    }
    setIsBoxVisible(!isBoxVisible);
  };

  useEffect(() => {
    console.log("isBoxVisible: ", isBoxVisible);
    console.log("clickedChipID: ", clickedChipID);
  }, [isBoxVisible, clickedChipID]);

  return (
    <div className={classes.root}>
      <h3>Because you were interested in</h3>
      {data.map(
        (
          [
            comicNo,
            bookTitle,
            mainText,
            tooltipText,
            tooltipImage,
            bookTitle_2,
          ],
          index
        ) => (
          <div className="myGlobReleCls">
            <Tooltip key={`${comicNo}-${index}`} title={bookTitle}>
              <Chip
                key={`${comicNo}-${bookTitle}-${mainText}`}
                label={mainText}
                className={classes.chip}
                onClick={() => handleChipClick(comicNo, index)}
              />
            </Tooltip>
          </div>
        )
      )}

      {isBoxVisible && (
        <Box
          className={classes.box}
          onClick={() => handleChipClick(data[clickedChipID][0], clickedChipID)}
        >
          

          <img
            src={
              img_folderpath + "original_" + data[clickedChipID][4] + "_1.jpeg"
            }
            alt={"no images found"}
            width="140"
            height="180"
          />
          <br />
          <Tooltip
            key={`${data[clickedChipID][4]}-${data[clickedChipID][3]}`}
            title={data[clickedChipID][5]}
          >
            <Chip
              key={`${data[clickedChipID][0]}-${data[clickedChipID][5]}-${data[clickedChipID][3]}`}
              label={data[clickedChipID][3]}
              className={classes.chip}
            />
        </Tooltip>
        </Box>
      )}
    </div>
  );
}

export default function AllChipsWithBox(props) {
  const inputData = props.data || cdata;
  const outputData = inputData.flatMap(
    ({ comic_no, book_title, explanation_lst }) =>
      explanation_lst.map(
        ([mainText, tooltipText, tooltipImage, bookTitle_2]) => [
          comic_no,
          book_title,
          mainText,
          tooltipText,
          tooltipImage,
          bookTitle_2,
        ]
      )
  );

  const data = outputData;

  return <ChipsWithBox data={data} />;
}
