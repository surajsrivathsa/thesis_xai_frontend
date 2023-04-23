import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const initial_chips = [
  {
    comic_no: 0,
    book_title: "Blue Bolt",
    query_book: false,
    explanation_lst: ["Angular", "Black and Blue", "Yellowed"],
  },
  {
    comic_no: 521,
    book_title: "Tin Tin",
    query_book: false,
    explanation_lst: ["steamship themed", "Mummy Coffin", "Pharoahs and Egypt"],
  },
  {
    comic_no: 551,
    book_title: "Asterix",
    query_book: false,
    explanation_lst: [
      "Roman clothes",
      "Golden and Blue",
      "Coloseium",
      "No Themes Found",
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  header: {
    margin: theme.spacing(1, 0),
  },
}));

function ExplanationChips(props) {
  const books = props.inputData || initial_chips;
  const classes = useStyles();

  const queryBooks = books.filter((book) => book.query_book);
  const nonQueryBooks = books.filter((book) => !book.query_book);

  const allBookTitles = books.map((book) => book.book_title);

  return (
    <div className={classes.root}>
      {queryBooks.length > 0 ? (
        <h3 className={classes.header}>
          Similar themes between current search results and your previous
          interested books{" "}
          {allBookTitles.map((title, index) => (
            <span key={title}>
              {title}
              {index !== allBookTitles.length - 1 ? ", " : ""}
            </span>
          ))}
        </h3>
      ) : (
        <h3 className={classes.header}>
          Similar themes between current search results and your previous
          interested books{" "}
          {allBookTitles.map((title, index) => (
            <span key={title}>
              {title}
              {index !== allBookTitles.length - 1 ? ", " : ""}
            </span>
          ))}
        </h3>
      )}
      {books.map((book) =>
        book.explanation_lst.map((explanation, index) => (
          <Tooltip key={`${book.comic_no}-${index}`} title={book.book_title}>
            <Chip
              key={`${book.comic_no}-${index}`}
              label={explanation}
              color={book.query_book ? "secondary" : "primary"}
              style={{ margin: "5px", flexWrap: "wrap", fontSize: 16 }}
            />
          </Tooltip>
        ))
      )}
    </div>
  );
}

export default ExplanationChips;
