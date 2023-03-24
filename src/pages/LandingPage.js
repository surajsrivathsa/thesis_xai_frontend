import RowContainer from "./RowContainer";
import { FAMOUS_TITLES_LIST, CLASSICS_LIST } from "../components/constants";

function LandingPage() {
  console.log("inside landing page");
  return (
    <div>
      <RowContainer
        famous_titles_booklist={FAMOUS_TITLES_LIST}
        classics_booklist={CLASSICS_LIST}
      />
    </div>
  );
}

export default LandingPage;
