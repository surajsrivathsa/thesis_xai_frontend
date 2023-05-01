import axios from "axios";

function FetchComicPDF(viewBook) {
  console.log("viewing book : ", viewBook);
  var pdfUrl = null;
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:8000/view_comic_book/${viewBook.comic_no}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        // Create a new Blob object from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });
        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);
        console.log("url pdf : ", url);
        resolve(response);
      })
      .catch((error) => {
        console.log("error in viewing pdf: ", error);
        reject(pdfUrl);
      });
  });
}

export default FetchComicPDF;
