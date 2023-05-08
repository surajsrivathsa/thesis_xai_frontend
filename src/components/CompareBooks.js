import React from "react";
import "./CompareBooks.css";
import { Chip } from "@mui/material";

/*
const CrossTab = ({ comparedBooks }) => {
  return (
    <table className="cross-tab">
      <thead>
        <tr>
          <th></th>
          <th>Genre Types</th>
          <th>Story Pace</th>
          <th>Characters</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th rowSpan="3">Main Categories</th>
          <td></td>
          <td>Total Pages</td>
          <td>Male Characters</td>
        </tr>
        <tr>
          <td></td>
          <td>Total Panels</td>
          <td>Female Characters</td>
        </tr>
        <tr>
          <td></td>
          <td>Pace Number</td>
          <td>Occupations</td>
        </tr>
        {comparedBooks.compared_books.map((book) => {
          const bookNumber = Object.keys(book)[0];
          const { genres, story_pace, characters } = book[bookNumber];

          return (
            <React.Fragment key={bookNumber}>
              <tr>
                <th>Book {bookNumber}</th>
                <td>{genres.genre.join(", ")}</td>
                <td>{story_pace.num_pages}</td>
                <td>{characters.male_characters.join(", ")}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>{story_pace.num_panels}</td>
                <td>{characters.female_characters.join(", ")}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>{story_pace.pace_of_story.toFixed(2)}</td>
                <td>{characters.occupations.join(", ")}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default CrossTab;
*/

const img_folderpath = "../../comic_book_covers_ui/";
const subCategoriesWithLists = [
  "genre",
  "male_characters",
  "female_characters",
  "occupations",
];
function ChipsList({ list }) {
  return (
    <div>{list && list.map((item) => <Chip key={item} label={item} />)}</div> //
  );
}

const CompareBooks = ({ data }) => {
  console.log("inside compare books: ", data.compared_books);
  const books =
    data.compared_books &&
    data.compared_books.map((item) => Object.keys(item)[0]);
  const categories = ["genres", "story_pace", "characters"];
  const subCategories = {
    story_pace: ["num_pages", "num_panels", "pace_of_story"],
    characters: [
      "total_characters",
      "male_characters",
      "female_characters",
      "occupations",
    ],
    genres: ["genre"],
  };

  const getCellValue = (book, category, subCategory) => {
    const item = data.compared_books.find(
      (item) => Object.keys(item)[0] === book
    )[book][category];

    console.log("item for : ", item);
    console.log("category: ", category);
    console.log("subcategory: ", subCategory);
    if (subCategory && subCategoriesWithLists.includes(subCategory) && item) {
      console.log("detected list: ", item);
      // console.log("chips outout: ", ChipsList(item.subCategory));
      return renderSpanElements(item[subCategory]);
    } else if (subCategory && !subCategoriesWithLists.includes(subCategory)) {
      return item[subCategory] || "-";
    }
    if (Array.isArray(item)) {
      console.log("detected list: ", item);
      console.log("chips outout: ", ChipsList(item));
      return ChipsList(item);
    }

    return item || "-";
  };

  const renderSpanElements = (list) => {
    return (
      <div>
        {list.map((word, index) => (
          <Chip key={index} label={word} />
        ))}
      </div>
    );
  };

  return (
    <table className="cross-tab">
      <thead className="myDialogTableCls">
        <tr>
          <th>Books</th>
          {categories.map((category) =>
            subCategories[category] ? (
              <th colSpan={subCategories[category].length} key={category}>
                {category}
              </th>
            ) : (
              <th key={category}>{category}</th>
            )
          )}
        </tr>
        <tr>
          <th></th>
          {categories.map((category) =>
            subCategories[category]
              ? subCategories[category].map((subCategory) => (
                  <th key={`${category}-${subCategory}`}>{subCategory}</th>
                ))
              : null
          )}
        </tr>
      </thead>
      <tbody>
        {books &&
          books.map((book) => (
            <tr key={book}>
              <td>
                <img
                  src={img_folderpath + "original_" + book + "_1.jpeg"}
                  alt={"no images found"}
                  width="140"
                  height="180"
                />
              </td>
              {categories.map((category) =>
                subCategories[category] ? (
                  subCategories[category].map((subCategory) => (
                    <td key={`${book}-${category}-${subCategory}`}>
                      {getCellValue(book, category, subCategory)}
                    </td>
                  ))
                ) : (
                  <td key={`${book}-${category}`}>
                    {getCellValue(book, category)}
                  </td>
                )
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CompareBooks;
