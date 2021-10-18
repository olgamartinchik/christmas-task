import { getRandomNum } from "./setBg";
let randomQuote = getRandomNum(1, 153);
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "/src/data/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = `\"${data[randomQuote].text}\"`;
  author.textContent = data[randomQuote].author;
}
getQuotes();
function getQuoteNext() {
  randomQuote++;
  if (randomQuote === 18) {
    randomQuote = 1;
  }
  getQuotes();
}
changeQuote.addEventListener("click", getQuoteNext);
