#!/usr/bin/python
import sys

input = sys.stdin.readlines()

subcommand = sys.argv[1]
if (subcommand == 'score'):
    print 1

if (subcommand == 'run'):
    print "The temperature is 57F"


