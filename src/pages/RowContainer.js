import React from "react";
import Row from "./Row";
import styles from "./RowContainer.css";

const RowContainer = ({
  famous_titles_booklist,
  classics_booklist,
  new_issues_booklist,
}) => (
  <div className={styles.container}>
    <Row
      category="Famous Titles"
      bookList={famous_titles_booklist}
      isColumn={false}
    >
      Famous Titles
    </Row>
    <Row category="Classics" bookList={classics_booklist} isColumn={false}>
      Classics
    </Row>
    <Row category="New Issues" bookList={new_issues_booklist} isColumn={false}>
      New Issues
    </Row>
  </div>
);

export default RowContainer;
