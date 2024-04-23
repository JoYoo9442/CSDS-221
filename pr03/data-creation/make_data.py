# Going to get, store, and process data from the RIOT API.
import requests
import json
import time
import os
import sys
import pandas as pd
import numpy as np

# API Key
RIOT_API_KEY = "RGAPI-cdd4ff65-29d6-4583-b74a-9b16032f62c6"

# My PUUID
PUUID = "1He4bGiGLgcUKwuob9HoLsCT304qtrkNPCYDRNTyyHr-SqXMn2DybJCQeuxcUsuFFY2BvxPp-xOhvQ"


# Function to get the match history of a player
def get_match_history(puuid, count=100):
    # URL to get match history
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=ranked&start=0&count={count}&api_key={RIOT_API_KEY}"
    # Get the data
    response = requests.get(url, timeout=10)
    # Check if the response is good
    if response.status_code == 200:
        # Return the data
        return response.json()
    # Return an empty list
    return []


# From the match history, get the match data, and save as a json file
def get_match_data(match_id):
    # URL to get match data
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}?api_key={RIOT_API_KEY}"
    # Get the data
    response = requests.get(url, timeout=10)
    # Check if the response is good
    if response.status_code == 200:
        # Return the data
        return response.json()
    # Return an empty list
    return []


# Save all of it in one json file
def save_match_data(puuid, count=100):
    # Get the match history
    match_history = get_match_history(puuid, count)
    # Create a list to store the match data
    match_data = []
    # Loop through the match history
    for match_id in match_history:
        # Get the match data
        data = get_match_data(match_id)
        # Append to the list
        match_data.append(data)
        # Sleep for a bit
        time.sleep(1)
    # Save the data
    with open("match_data.json", "w") as f:
        json.dump(match_data, f)


save_match_data(PUUID, 100)
