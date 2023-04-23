import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Row.css";
import FetchSearchResultsforSearchbarQuery from "../backend_api_calls/FetchSearchResultsforSearchbarQuery";
import { delay } from "../components/constants";

function Row({ category, bookList, isColumn }) {
  // add api data

  const provided_category = category;
  console.log(bookList);
  var data = bookList;
  console.log("data: ", data, " category: ", provided_category, typeof data);
  const navigate = useNavigate();

  function generateGrid(book) {
    console.log("generateGrid: ", book);
    //event.preventDefault();
    const searchResults = null;
    let queryBook = { ...book, text: book.book_title, type: "book" };
    queryBook = {
      id: queryBook.id,
      comic_no: queryBook.comic_no,
      book_title: queryBook.book_title,
      text: queryBook.text,
      type: queryBook.type,
      year: queryBook.year,
    };

    // default all facet weights to one
    let isEditable = true;
    let userFacetWeights = {
      genre_comb: 1.0,
      supersense: 1.0,
      gender: 1.0,
      panel_ratio: 1.0,
      comic_cover_img: 1.0,
      comic_cover_txt: 1.0,
    };
    try {
      let fetchSearchPromise = FetchSearchResultsforSearchbarQuery({
        clickedBook: { ...queryBook },
        isEditable,
        userFacetWeights,
      });

      fetchSearchPromise
        .then((response) => {
          let searchResults = response.data[0];
          console.log("clicked book from landing page: ", { ...queryBook });
          console.log("searchResults in promise: ", searchResults);
          navigate(`/search/${book.comic_no}`, {
            state: {
              books: [...searchResults],
              query: {
                id: queryBook.id,
                comic_no: queryBook.comic_no,
                book_title: queryBook.book_title,
                year: queryBook.year,
                genre: queryBook.genre,
                query_book: true,
              },
            },
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      // handle rejected Promise/error/etc...
      console.log("error during navigation: ", error);
    }
  }

  return (
    <div className="row">
      <h1 className="title">{category}</h1>

      <div className="row-container">
        {data
          ? data.map((book_obj) => {
              const book = book_obj;
              return (
                <div key={book.id} className="link">
                  <img
                    key={book.id}
                    className="imageLarge"
                    src={book.backdrop_path}
                    alt={book.book_title}
                    onClick={() => generateGrid(book)}
                  />
                  {/* </Link> */}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

Row.defaultProps = {
  category: "Trending",
  bookList: [
    {
      id: 12,
      comic_no: 12,
      book_title: "Brenda Starr - Silver lining in sun valley",
      backdrop_path: "../../comic_book_covers_ui/original_12_1.jpeg",
      genre: "detective|female",
    },
  ],
  isColumn: false,
};

Row.propTypes = {
  category: PropTypes.string,
  bookList: PropTypes.array,
  isColumn: PropTypes.bool,
};

export default Row;
