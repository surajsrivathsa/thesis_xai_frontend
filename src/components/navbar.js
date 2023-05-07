import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import SearchContainer from "../components/search_bar";
import "react-widgets/styles.css";
import { MenuItem, Select } from "@mui/material";
import FetchSearchResultsforSearchbarQuery from "../backend_api_calls/FetchSearchResultsforSearchbarQuery";

function HomeLogo() {
  return (
    <div className="home-logo">
      <Link to="/">
        <img
          src="../../home_button_2.png"
          alt="Home"
          style={{ height: "55px", width: "55px" }}
        />
      </Link>
    </div>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState("Wayne"); // initialize state with default value

  const handleSystemChange = (event) => {
    setSelectedSystem(event.target.value);
  };

  useEffect(() => {
    console.log("selected system: ", selectedSystem);
    sessionStorage.setItem("system_type", JSON.stringify(selectedSystem));
  }, [selectedSystem]);

  function generateGrid(book) {
    //event.preventDefault();
    console.log("generateGrid input: ", book);
    const searchResults = null;
    let queryBook = {
      ...book.clickedQuery,
      text: book.book_title,
      type: "book",
    };

    queryBook = {
      id: queryBook.id,
      comic_no: queryBook.comic_no,
      book_title: queryBook.book_title,
      text: queryBook.book_title,
      type: queryBook.type,
    };
    console.log("generateGrid querybook: ", queryBook);

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
          console.log("navigate path: ", `/search/${queryBook.comic_no}`);
          navigate(`/search/${queryBook.comic_no}`, {
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
    <div className="nav-bar">
      <HomeLogo />
      <div className="about-us-link">
        <Link to="/about-us">
          <img
            src="../../about-us-icon-9.jpg"
            alt="About Us"
            style={{ height: "55px", width: "55px" }}
          />
        </Link>
      </div>

      <div className="search-container">
        <SearchContainer getUserInputsFromSearchBar={generateGrid} />
      </div>
      <div className="dropdown-container">
        <label htmlFor="dropdown">Select the System</label>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={selectedSystem}
          onChange={handleSystemChange}
          label="Dropdown"
        >
          <MenuItem value="Wayne">Wayne</MenuItem>
          <MenuItem value="Stark">Stark</MenuItem>
          <MenuItem value="Croft">Croft</MenuItem>
          <MenuItem value="Butcher">Butcher</MenuItem>
          <MenuItem value="Gray">Gray</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default NavBar;

// import React, { useState } from "react";
// import "./navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import SearchContainer from "../components/search_bar";
// import "react-widgets/styles.css";
// import FetchSearchResultsforSearchbarQuery from "../backend_api_calls/FetchSearchResultsforSearchbarQuery";

// function HomeLogo() {
//   return (
//     <div className="home-logo">
//       <Link to="/">
//         <img
//           src="../../logo192.png"
//           alt="Home"
//           style={{ height: "50px", width: "50px" }}
//         />
//       </Link>
//     </div>
//   );
// }

// function NavBar() {
//   const navigate = useNavigate();
//   const [showAbout, setShowAbout] = useState(false);

//   function generateGrid(book) {
//     console.log("generateGrid input: ", book);
//     const searchResults = null;
//     let queryBook = {
//       ...book.clickedQuery,
//       text: book.book_title,
//       type: "book",
//     };

//     queryBook = {
//       id: queryBook.id,
//       comic_no: queryBook.comic_no,
//       book_title: queryBook.book_title,
//       text: queryBook.book_title,
//       type: queryBook.type,
//     };
//     console.log("generateGrid querybook: ", queryBook);

//     // default all facet weights to one
//     let isEditable = true;
//     let userFacetWeights = {
//       genre_comb: 1.0,
//       supersense: 1.0,
//       gender: 1.0,
//       panel_ratio: 1.0,
//       comic_cover_img: 1.0,
//       comic_cover_txt: 1.0,
//     };
//     try {
//       let fetchSearchPromise = FetchSearchResultsforSearchbarQuery({
//         clickedBook: { ...queryBook },
//         isEditable,
//         userFacetWeights,
//       });

//       fetchSearchPromise
//         .then((response) => {
//           let searchResults = response.data[0];
//           console.log("clicked book from landing page: ", { ...queryBook });
//           console.log("searchResults in promise: ", searchResults);
//           navigate(`/search/${book.comic_no}`, {
//             state: {
//               books: [...searchResults],
//               query: {
//                 id: queryBook.id,
//                 comic_no: queryBook.comic_no,
//                 book_title: queryBook.book_title,
//                 year: queryBook.year,
//                 genre: queryBook.genre,
//                 query_book: true,
//               },
//             },
//           });
//         })
//         .catch((error) => {
//           throw error;
//         });
//     } catch (error) {
//       // handle rejected Promise/error/etc...
//       console.log("error during navigation: ", error);
//     }
//   }

//   return (
//     <div className="nav-bar">
//       <HomeLogo />
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/about-us">About Us</Link>
//       </div>
//       <div className="search-container">
//         <SearchContainer getUserInputsFromSearchBar={generateGrid} />
//       </div>
//       <div className="google-form">
//         <a
//           href="https://www.google.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Google Form
//         </a>
//       </div>
//     </div>
//   );
// }

// export default NavBar;
