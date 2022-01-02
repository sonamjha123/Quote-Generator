// const quotesContainer = document.getElementById('quote-container');
// const quoteText = document.getElementById('quote');
// const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
// const newQuoteBtn = document.getElementById('new-quote');
// const loader = document.getElementById('loader');

// let apiQuotes = [];


// function loadingSpinner() {
//   loader.hidden = false;
//   quotesContainer.hidden = true;
// }


// function completeLoadingspinner() {
//   quotesContainer.hidden = false;
//   loader.hidden = true;
// }

// // Show New Quote
// function newQuote() {
//   loading();
//   // Pick a random quote from array
//   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//   // Check if Author field is blank and replace it with 'Unknown'
//   if (!quote.author) {
//     authorText.textContent = 'Unknown';
//   } else {
//     authorText.textContent = quote.author;
//   }
//   // Check Quote length to determine styling
//   if (quote.text.length > 120) {
//     quoteText.classList.add('long-quote');
//   } else {
//     quoteText.classList.remove('long-quote');
//   }
//   // Set Quote, Hide Loader
//   quoteText.textContent = quote.text;
//   completeLoadingspinner();
// }

// // Get Quotes from API
// async function getQuotes(){
//   loadingSpinner();
//   // We need to use a Proxy URL to make our API call in order to avoid a CORS error
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//   const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
//   try{
//     const response = await fetch(proxyUrl + apiUrl);
//     const data = await response.json();
//     newQuote();
//   }
//   catch(error){    
//     console.log('whoops, no syntax!!',error);
//     getQuotes();
//   }
// }

// // // Get Quotes From API
// // async function getQuotes() {
// //   loading();
// //   const apiUrl = 'https://type.fit/api/quotes';
// //   try {
// //     const response = await fetch(apiUrl);
// //     apiQuotes = await response.json();
// //     newQuote();
// //   } catch (error) {
// //     // Catch Error Here
// //   }
// // }

// // Tweet Quote
// function tweetQuote() {
//   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
//   window.open(twitterUrl, '_blank');
// }

// // Event Listeners
// newQuoteBtn.addEventListener('click', newQuote);
// twitterBtn.addEventListener('click', tweetQuote);

// // On Load
// getQuotes();
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader");

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //If Author is blank, add 'Unknown'
        authorText.innerText = '- ';
        if(data.quoteAuthor === ''){
            authorText.innerText = authorText.innerText+'Unknown';
        } else{
            authorText.innerText = authorText.innerText+data.quoteAuthor;
        }
        //Reducing font size for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
            authorText.classList.add('long-quote-author');
        } else {
            quoteText.classList.remove('long-quote');
            authorText.classList.remove('long-quote-author');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch(error) {
        getQuote();
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load 
getQuote();