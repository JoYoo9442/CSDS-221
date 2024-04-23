# Use the data and format it to use in a sunburst chart
import json
import pandas as pd

# Read the data from match_data.json
with open('match_data.json') as f:
    data = json.load(f)

# My PUUID
PUUID = "1He4bGiGLgcUKwuob9HoLsCT304qtrkNPCYDRNTyyHr-SqXMn2DybJCQeuxcUsuFFY2BvxPp-xOhvQ"

# Create a dataframe from the data
df = pd.DataFrame(data)

# Calculate total time played
total_time = 0
for match in df['info']:
    total_time += match['gameDuration']
    for participant in match['participants']:
        if participant['puuid'] == PUUID:
            print(f'Champion: {participant["championName"]}')
            print(f'Role: {participant["teamPosition"]}')
            print(f'Time played: {match["gameDuration"]} seconds')
            print()
print(f'Total time played: {total_time} seconds')

# gameCreation is a Unix timestamp, convert it to a datetime object
# df['gameCreation'] = pd.to_datetime(df['gameCreation'], unit='ms')

# Sunburst is going to be a dictionary with the following format:
# {
#     "name": "root",
#     "sum": 600,
#     "children": [
#         {
#             "name": "child1",
#             "sum": 300,
#             "children": [
#                 {
#                     "name": "child1.1",
#                     "value": 200
#                 },
#                 {
#                     "name": "child1.2",
#                     "value": 100
#                 }
#             ]
#         },
#         {
#             "name": "child2",
#             "value": 300
#         }
#     ]
# }

# Create the root of the sunburst
sunburst = {
    "name": "root",
    "sum": 0,
    "children": []
}

# Create a dictionary to keep track of what name the role corresponds to
role_name = {
    "TOP": "Top",
    "JUNGLE": "Jungle",
    "MIDDLE": "Middle",
    "BOTTOM": "Bottom",
    "UTILITY": "Support"
}
# Create a dictionary to keep track of the time played in each role by champion
role_time = {
    "name": "Roles",
    "sum": 0,
    "children": [
        {
            "name": "Top",
            "sum": 0,
            "children": []
        },
        {
            "name": "Jungle",
            "sum": 0,
            "children": []
        },
        {
            "name": "Middle",
            "sum": 0,
            "children": []
        },
        {
            "name": "Bottom",
            "sum": 0,
            "children": []
        },
        {
            "name": "Support",
            "sum": 0,
            "children": []
        }
    ]
}

# Loop through each match and get my personal data
for match in df['info']:
    for participant in match['participants']:
        if participant['puuid'] == PUUID:
            # Get the champion played
            champion = participant['championName']
            # Get the role played
            role = participant['teamPosition']
            # Get the time played
            time = match['gameDuration']
            # Find the role in the role_time dictionary
            for r in role_time['children']:
                if r['name'] == role_name[role]:
                    # Check if the champion is already in the list
                    FOUND = False
                    for c in r['children']:
                        if c['name'] == champion:
                            c['value'] += time
                            FOUND = True
                    if not FOUND:
                        r['children'].append({
                            "name": champion,
                            "value": time
                        })

# Add the role_time dictionary to the sunburst dictionary
sunburst['children'].append(role_time)

# Now to create a dictionary to keep track of the time played by champion
champion_time = {
    "name": "Champions",
    "sum": 0,
    "children": []
}

# Loop through each match and get my personal data
for match in df['info']:
    for participant in match['participants']:
        if participant['puuid'] == PUUID:
            # Get the champion played
            champion = participant['championName']
            # Get the time played
            time = match['gameDuration']
            # Check if the champion is already in the list
            FOUND = False
            for c in champion_time['children']:
                if c['name'] == champion:
                    c['value'] += time
                    FOUND = True
            if not FOUND:
                champion_time['children'].append({
                    "name": champion,
                    "value": time
                })

# Add the champion_time dictionary to the sunburst dictionary
sunburst['children'].append(champion_time)

# Now to create a dictionary to keep track of the time played by Month and day
month_time = {
    "name": "Calendar",
    "sum": 0,
    "children": [
        {
            "name": "January",
            "sum": 0,
            "children": []
        },
        {
            "name": "February",
            "sum": 0,
            "children": []
        },
        {
            "name": "March",
            "sum": 0,
            "children": []
        },
        {
            "name": "April",
            "sum": 0,
            "children": []
        },
        {
            "name": "May",
            "sum": 0,
            "children": []
        },
        {
            "name": "June",
            "sum": 0,
            "children": []
        },
        {
            "name": "July",
            "sum": 0,
            "children": []
        },
        {
            "name": "August",
            "sum": 0,
            "children": []
        },
        {
            "name": "September",
            "sum": 0,
            "children": []
        },
        {
            "name": "October",
            "sum": 0,
            "children": []
        },
        {
            "name": "November",
            "sum": 0,
            "children": []
        },
        {
            "name": "December",
            "sum": 0,
            "children": []
        }
    ]
}

# Loop through each match and get my personal data
for match in df['info']:
    # Get the Unix timestamp of the match
    timestamp = match['gameCreation']
    # Convert the timestamp to a datetime object
    date = pd.to_datetime(timestamp, unit='ms')
    # Get the month and day of the match
    month = date.month
    day = date.day
    # Get the time played
    time = match['gameDuration']
    # Find the month in the month_time dictionary
    for m in month_time['children']:
        if m['name'] == date.strftime('%B'):
            # Check if the day is already in the list
            FOUND = False
            for d in m['children']:
                if d['name'] == day:
                    d['value'] += time
                    FOUND = True
            if not FOUND:
                m['children'].append({
                    "name": day,
                    "value": time
                })

# Add the month_time dictionary to the sunburst dictionary
sunburst['children'].append(month_time)

# Loop through the sunburst dictionary and calculate the sum of time played
def calculate_sum(data):
    if 'children' in data:
        for child in data['children']:
            calculate_sum(child)
            if 'value' in child:
                data['sum'] += child['value']
            else:
                data['sum'] += child['sum']

calculate_sum(sunburst)

# Write the sunburst dictionary to a file
with open('sunburst_data.json', 'w') as f:
    json.dump(sunburst, f, indent=4)
print('Data formatted and saved to sunburst_data.json')
