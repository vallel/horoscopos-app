import quotesData from "../data/quotes.json";

export function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotesData.length);

  return quotesData[randomIndex];
}
