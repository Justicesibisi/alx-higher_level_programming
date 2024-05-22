#!/usr/bin/python3
"""
This script fetches and prints all characters of a specified Star Wars movie.
"""

import requests
import sys

def fetch_movie_characters(movie_id):
    """
    Fetches and prints character names from a given Star Wars movie.

    Args:
        movie_id (int): The ID of the Star Wars movie.

    Returns:
        None
    """
    # API endpoint to fetch movie details
    url = f"https://swapi.dev/api/films/{movie_id}/"
    
    # Fetch movie data
    response = requests.get(url)
    
    # Check if the response is successful
    if response.status_code != 200:
        print("Error: Unable to fetch data for the given movie ID")
        return
    
    # Parse the JSON response
    movie_data = response.json()
    
    # Fetch and print character names
    character_urls = movie_data.get("characters", [])
    for character_url in character_urls:
        character_response = requests.get(character_url)
        if character_response.status_code == 200:
            character_data = character_response.json()
            print(character_data.get("name"))

if __name__ == "__main__":
    # Check if the Movie ID is provided
    if len(sys.argv) != 2:
        print("Usage: ./0-gather_data_from_an_API.py <Movie ID>")
        sys.exit(1)
    
    # Get the Movie ID from the command-line arguments
    movie_id = sys.argv[1]
    
    # Fetch and print the movie characters
    fetch_movie_characters(movie_id)
