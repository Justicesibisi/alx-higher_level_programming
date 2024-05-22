#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error('Error fetching movie:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Failed to retrieve movie information. Status code:', response.statusCode);
    return;
  }

  const movieData = JSON.parse(body);
  const characterUrls = movieData.characters;

  characterUrls.forEach(url => {
    request(url, function (error, response, body) {
      if (error) {
        console.error('Error fetching character:', error);
        return;
      }

      if (response.statusCode !== 200) {
        console.error('Failed to retrieve character information. Status code:', response.statusCode);
        return;
      }

      const characterData = JSON.parse(body);
      console.log(characterData.name);
    });
  });
});

