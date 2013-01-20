#!/usr/bin/python
import sys
import re
import json

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
    # FIXME: Replace with actual weather code
    print "The temperature is 57F"


