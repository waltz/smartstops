#!/usr/bin/python
import sys
import re
import json
import urllib

# This is the input JSON that it sent to this module by the core program
input_jsonstr = ("\n".join(sys.stdin.readlines())).strip(" \n")
input = json.loads(input_jsonstr)

# Check that there is a subcommand
if (len(sys.argv) == 1):
    sys.stderr.write("Sub-command not given")
    sys.exit(1)

# This is the sub-command that this module is invoked with by the core program
subcommand = sys.argv[1]
if (subcommand == 'score'):
    if ("message" in input):
        match = re.search('weather', input['message'], flags=re.IGNORECASE);
        if (match):
            print 1
        else:
            print 0
    else:
        print 0
    sys.exit(0)

elif (subcommand == 'run'):
    latitude = str(input['latitude'])
    longitude = str(input['longitude'])
    numDays = '5'
    weatherKey = '4e11214676001957120909'
    response = urllib.urlopen('http://free.worldweatheronline.com/feed/weather.ashx?q='+latitude+','+longitude+'&format=json&num_of_days='+numDays+'&key='+weatherKey)
    for line in response:
        response_dict = json.loads(line)

    current_condition = response_dict['data']['current_condition'][0]
    current_temp = ['temp_F'] + 'F'
    weatherDesc = ['weatherDesc'][0]['value']

    print current_temp + ' and ' + weatherDesc
