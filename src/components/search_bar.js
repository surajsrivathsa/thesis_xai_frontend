import React, { useState, useEffect } from "react";
import "./search_bar.css";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { SEARCHBAR_BOOKS, DUMMY_BOOKS } from "./constants";

const DUMMY_SAMPLE_BOOKS = [
  {
    id: 0,
    comic_no: 1665,
    book_title: "X-Men",
    year: 1964,
    genre: "Superhero",
    genre_comb: 1.0,
    supersense: 1.0,
    gender: 1.0,
    panel_ratio: 1.0,
    characters: [
      "cyclops",
      "professor x",
      "magneto",
      "wolverine",
      "phoenix",
      "jean gray",
    ],
  },
  {
    id: 1,
    comic_no: 637,
    book_title: "BatMan",
    year: 1943,
    genre: "Superhero|Detective",
    genre_comb: 1.0,
    supersense: 1.0,
    gender: 1.0,
    panel_ratio: 1.0,
    characters: [
      "batman",
      "robin",
      "harvey dent",
      "bruce wayne",
      "joker",
      "two face",
    ],
  },
  {
    id: 2,
    comic_no: 1661,
    book_title: "Wonder woman",
    year: 1955,
    genre: "Superhero|Action",
    genre_comb: 1.0,
    supersense: 1.0,
    gender: 1.0,
    panel_ratio: 1.0,
    characters: ["wonderwoman", "hercules", "ares", "british", "john wick"],
  },
  {
    id: 3,
    comic_no: 1640,
    book_title: "Tin-Tin",
    year: 1922,
    genre: "Adventure|Detective|Action",
    genre_comb: 1.0,
    supersense: 1.0,
    gender: 1.0,
    panel_ratio: 1.0,
    characters: [
      "tin tin",
      "professor calculus",
      "red rackham",
      "captain haddock",
      "thompson",
      "rastapopolous",
    ],
  },
];

const SearchContainer = (props) => {
  const [searchInput, setSearchInput] = useState({
    clickedQuery: "",
    clickedSuggestion: {},
  });

  const [searchTypingInput, setsearchTypingInput] = useState({
    typedQuery: "",
    suggestionList: [],
  });

  const handleClickedSuggestion = (e) => {
    console.log("clicked suggestion: ", e);
    setSearchInput({
      clickedQuery: e.book_title,
      clickedSuggestion: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getUserInputsFromSearchBar({
      typedQuery: searchInput.clickedQuery,
      clickedQuery: searchInput.clickedSuggestion,
    });
  };

  const suggestMatchedBookTitle = (book, typed_query) => {
    // console.log("type" in book);
    // console.log(book, typed_query, "type" in book);
    if (
      typeof typed_query === "string" &&
      (book.book_title.toLowerCase().includes(typed_query.toLowerCase()) ||
        book.genre.toLowerCase().includes(typed_query.toLowerCase()))
    ) {
      return {
        type: "book",
        text: book.book_title + "   -   " + book.genre,
        book_title: book.book_title,
        comic_no: book.comic_no,
      };
    } else if ("type" in book) {
      return book;
    } else {
      return { type: "book", text: "", book_title: null, comic_no: null };
    }
  };

  const suggestMatchedBookGenre = (book, typed_query) => {
    // console.log("type" in book);
    if ("type" in book) {
      return book;
    } else if (
      typeof typed_query === "string" &&
      book.genre.toLowerCase().includes(typed_query.toLowerCase())
    ) {
      return {
        type: "genre",
        text: book.genre,
        book_title: book.book_title,
        comic_no: book.comic_no,
      };
    } else {
      return { type: "genre", text: "", book_title: null, comic_no: null };
    }
  };

  const suggestMatchedBookCharacter = (book, typed_query) => {
    if ("type" in book) {
      return book;
    }
    let characterMatchedBooks = [];
    book.characters.map((character_name) => {
      if (
        typeof typed_query === "string" &&
        character_name.toLowerCase().includes(typed_query.toLowerCase())
      ) {
        characterMatchedBooks.push({
          type: "character",
          text: character_name,
          book_title: book.book_title,
          comic_no: book.comic_no,
        });
      } else {
        characterMatchedBooks.push({
          type: "character",
          text: "",
          book_title: null,
          comic_no: null,
        });
      }
    });
    return characterMatchedBooks;
  };

  const handleSearchTypingChange = (e) => {
    var typed_query = e;
    let suggestedQueryResults = [];

    // commented free text query
    // if (typeof e === "string") {
    //   var freeTextQueryDict = {
    //     type: "free text",
    //     text: e,
    //     book_title: null,
    //     comic_no: null,
    //   };
    // } else {
    //   var freeTextQueryDict = e;
    // }

    // console.log("e ", e);
    // suggestedQueryResults.push(freeTextQueryDict);

    SEARCHBAR_BOOKS.map((book) => {
      var matchedBookTitleDict = suggestMatchedBookTitle(book, typed_query);
      var matchedBookGenreDict = {}; //suggestMatchedBookGenre(book, typed_query); commented as genre mixed with book title
      var matchedBookCharacterList = {}; // suggestMatchedBookCharacter(book,typed_query); commented as not implements, character names not present

      if (matchedBookTitleDict.comic_no !== null) {
        suggestedQueryResults.push(matchedBookTitleDict);
      }

      // if (matchedBookGenreDict.comic_no !== null) {
      //   suggestedQueryResults.push(matchedBookGenreDict);
      // }

      // matchedBookCharacterList.map((matched_obj) => {
      //   if (matched_obj.comic_no !== null) {
      //     suggestedQueryResults.push(matched_obj);
      //   }
      // });

      return;
    });

    suggestedQueryResults.forEach((suggested_book, i) => {
      suggested_book.id = i + 1;
    });

    // const results = DUMMY_SAMPLE_BOOKS.filter((book) => {
    //   if (e.target.value === "") return DUMMY_SAMPLE_BOOKS.m;
    //   return book.book_title
    //     .toLowerCase()
    //     .includes(e.target.value.toLowerCase());
    // });

    setsearchTypingInput({
      query: e,
      suggestionList: suggestedQueryResults,
    });

    //console.log("suggestedQueryResults: ", suggestedQueryResults);
  };

  //   function Suggestions() {
  //     var suggestedQueryResults = searchTypingInput.suggestionList;
  //     console.log("xx", suggestedQueryResults);
  //     const options = suggestedQueryResults.map((r) => (
  //       <li key={r.comic_no}>{r.book_title}</li>
  //     ));
  //     return <ul>{options}</ul>;
  //   }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-input-container">
        {/* <div className="search-input-container">
          <select
            className="search-select"
            value={searchInput.selectedOption} //{searchInput.selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Free text</option>
            <option value="book">Book</option>
            <option value="character">Character</option>
          </select>
          <input
            className="search-input"
            type="text"
            value={searchInput.inputValue}
            onChange={handleSearchTypingChange}
            placeholder="Select by book, character, genre or freetext"
          />
        </div> */}
        <Combobox
          data={searchTypingInput.suggestionList}
          textField="text"
          groupBy="type"
          onSelect={handleClickedSuggestion}
          onChange={handleSearchTypingChange}
          className="search-input-container"
          //   onSelect={(value) => setSearchInput(value)}
        />
        {/* <Suggestions results={searchTypingInput.suggestionList} /> */}
        <button type="submit" className="search-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchContainer;
