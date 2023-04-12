import RowContainer from "./RowContainer";
import {
  FAMOUS_TITLES_LIST,
  CLASSICS_LIST,
  NEW_ISSUES_LIST,
} from "../components/constants";
import "./LandingPage.css";

function LandingPage() {
  console.log("inside landing page");
  return (
    <div className="landing-page">
      <RowContainer
        famous_titles_booklist={FAMOUS_TITLES_LIST}
        classics_booklist={CLASSICS_LIST}
        new_issues_booklist={NEW_ISSUES_LIST}
      />
    </div>
  );
}

export default LandingPage;
