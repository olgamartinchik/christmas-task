import { getRandomNum } from "./setBg";

let randomQuote = getRandomNum(1, 32);
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const en = document.querySelector(".en");

export async function getQuotes() {
  const quotes = "/src/data/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  let textQuotes = "";
  let authorQuotes = "";
  if (en.classList.contains("ru")) {
    textQuotes = data[randomQuote].textRu;
    authorQuotes = data[randomQuote].authorRu;
  } else {
    textQuotes = `\"${data[randomQuote].text}\"`;
    authorQuotes = data[randomQuote].author;
  }

  quote.textContent = textQuotes;
  author.textContent = authorQuotes;
}
getQuotes();
function getQuoteNext() {
  randomQuote++;
  if (randomQuote === 63) {
    randomQuote = 1;
  }
  getQuotes();
}
changeQuote.addEventListener("click", getQuoteNext);
