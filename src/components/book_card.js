import React, { useState, useRef, useEffect } from "react";
import "./book_card.css";

const BookCard = ({ book, queryUsingBook, appendToInterestedBookList }) => {
  // handle hovering or interested books
  const [hoveredBook, setHoveredBook] = useState(null);
  // for delaying hovering action, delay of 1 second before capturing hover
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutRef = useRef(null);

  const [hoveredBookList, setHoveredBookList] = useState([]);

  const handleMouseEnter = (book) => {
    timeoutRef.current = setTimeout(() => {
      setShowOverlay(true);
      setHoveredBook(book);
      setHoveredBookList((prevList) => [...prevList, book]);
      console.log("hovered book: ", book);
      console.log("hovered book list: ", hoveredBookList.length);
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowOverlay(false);
    setHoveredBook(null);
    appendToInterestedBookList(book);
  };
  // useEffect(() => console.log("xlist: ", hoveredBookList), [hoveredBookList]);

  // handle clicks
  const [clicked, setClicked] = useState(false);
  const [clickedBook, setClickedBook] = useState(null);

  const handleClick = (book) => {
    setClicked(!clicked);
    setClickedBook(clicked ? null : book.id);
    console.log("clicked book: ", book);
    queryUsingBook(book, hoveredBookList);
  };

  return (
    <div
      key={book.id}
      className="book-card"
      onMouseEnter={() => handleMouseEnter(book)}
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => handleClick(book)}
      style={clickedBook === book.id ? { border: "3px solid blue" } : {}}
    >
      <img src={book.backdrop_path} alt={book.name} />
      {hoveredBook === book && showOverlay && (
        <div className="card-overlay">
          <h2>{book.name}</h2>
          <p>{book.genre.split("|").join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default BookCard;
