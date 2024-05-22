#!/usr/bin/node

const request = require('request');

// Get the movie ID from command line arguments
const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./101-starwars_characters.js <Movie ID>');
  process.exit(1);
}

// API endpoint for the movie
const url = `https://swapi.dev/api/films/${movieId}/`;

// Fetch the movie details
request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Failed to fetch movie data. Status code:', response.statusCode);
    return;
  }

  const movieData = JSON.parse(body);
  const characterUrls = movieData.characters;

  // Function to fetch and print each character name in order
  function fetchCharacterName(url) {
    return new Promise((resolve, reject) => {
      request(url, (charError, charResponse, charBody) => {
        if (charError) {
          reject(charError);
        } else if (charResponse.statusCode !== 200) {
          reject(`Failed to fetch character data. Status code: ${charResponse.statusCode}`);
        } else {
          const characterData = JSON.parse(charBody);
          resolve(characterData.name);
        }
      });
    });
  }

  // Create an array of promises for all character fetch requests
  const characterPromises = characterUrls.map(url => fetchCharacterName(url));

  // Resolve all promises and print character names in order
  Promise.all(characterPromises)
    .then(names => {
      names.forEach(name => console.log(name));
    })
    .catch(err => console.error('Error:', err));
});
