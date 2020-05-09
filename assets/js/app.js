// Variables

const listaTweets = document.querySelector('#lista-tweets');



// ----- Event listeners -----

eventListeners();


function eventListeners() {
  document.querySelector('#formulario').addEventListener('submit',
  addTweet);

  listaTweets.addEventListener('click', borrarTweet);

  document.addEventListener('DOMContentLoaded', readyLocalStorage);
}



// ----- Functions -----

function addTweet(event) {
  event.preventDefault();

  const tweet = document.getElementById('tweet').value;

  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';

  const li = document.createElement('li');
  li.innerHTML = tweet;
  li.appendChild(botonBorrar);

  listaTweets.appendChild(li);

  addTweetLocalStorage(tweet);
}


function borrarTweet(event) {
  event.preventDefault();
  if (event.target.className === 'borrar-tweet') {
    event.target.parentElement.remove();
    deleteTweetLocalStorage(event.target.parentElement.innerText);
  }

}


function addTweetLocalStorage(tweet) {
  let tweets;

  tweets = getTweetsLocalStorage();
  tweets.push(tweet);

  localStorage.setItem('tweets', JSON.stringify(tweets));
}


function getTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse( localStorage.getItem('tweets') );
  }

  return tweets;
}

function readyLocalStorage() {
  let tweets;

  tweets = getTweetsLocalStorage();
  tweets.forEach(tweet => {
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    const li = document.createElement('li');
    li.innerHTML = tweet;
    li.appendChild(botonBorrar);

    listaTweets.appendChild(li);
  });
}

function deleteTweetLocalStorage(tweet) {
  let tweets, tweetDelete;
  tweetDelete = tweet.substring(0, tweet.length - 1);

  tweets = getTweetsLocalStorage();

  tweets.forEach((tweet, index) => {
    if (tweetDelete === tweet) {
      tweets.splice(index, 1);
    }
  })

  localStorage.setItem('tweets', JSON.stringify(tweets));
}