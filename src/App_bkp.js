import React, { useState, useEffect } from "react";
import axios from "axios";
import "./book.css";
import ReactGridLayout from "react-grid-layout";

const DUMMY_BOOKS = [
  {
    id: 0,
    comic_no: 1,
    book_title: "X-Men",
    year: 1964,
    genre: "Superhero",
  },
  {
    id: 1,
    comic_no: 2,
    book_title: "BatMan",
    year: 1943,
    genre: "Superhero|Detective",
  },
  {
    id: 2,
    comic_no: 3,
    book_title: "Wonder woman",
    year: 1955,
    genre: "Superhero|Action",
  },
  {
    id: 3,
    comic_no: 4,
    book_title: "Tin-Tin",
    year: 1922,
    genre: "Adventure|Detective|Action",
  },
];

function App() {
  const [books, setBooks] = useState(DUMMY_BOOKS);
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/book/{b_id}").then((response) => {
  //     setBooks(response.data);
  //     setFilteredBooks(response.data);
  //   });
  // }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.book_title.toLowerCase().includes(searchText.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const layout = books.map((book, index) => {
    return {
      i: book.id, // unique key for each book
      x: index % 3, // column index
      y: Math.floor(index / 3), // row index
      w: 2, // number of columns the item spans
      h: 2, // number of rows the item spans
    };
  });

  const handleClick = (comicNo) => {
    console.log("clicked comic ", comicNo);
    axios
      .get("http://localhost:8000/book/" + comicNo)
      .then((response) => {
        console.log(response);
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(layout);
  };

  //onClick={() => handleClick(book.comic_no)}

  return (
    <div className="app-container">
      <div className="nav-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or genre"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <ReactGridLayout
        className="grid-container"
        cols={3}
        rowHeight={150}
        width={1200}
        layout={layout}
      >
        {filteredBooks.map((book, index) => (
          <div
            key={book.id}
            className={`grid-item item-${index + 1}`}
            style={{
              gridColumn: `${(index % 3) + 1} / span 1`,
              gridRow: `${Math.floor(index / 3) + 1} / span 1`,
            }}
            onClick={() => handleClick(book.comic_no)}
          >
            <div className="book-name">{book.book_title}</div>
            <div className="book-genre">{book.genre}</div>
          </div>
        ))}
        ;
      </ReactGridLayout>
    </div>
  );
}

export default App;
