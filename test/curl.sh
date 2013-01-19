#!/bin/bash

curl  -v -XPOST -H'Content-Type: application/x-www-form-urlencoded' -d'AccountSid=AC47761615be8d2db6fcf6512360fb7815&Body=Who%27s+got+the+best+coffee+near+5545%3F&ToZip=94111&FromState=CA&ToCity=SAN+FRANCISCO&SmsSid=SM26112da2601e1ad91a7dc68c887a80c2&ToState=CA&To=%2B14154187890&ToCountry=US&FromCountry=US&SmsMessageSid=SM26112da2601e1ad91a7dc68c887a80c2&ApiVersion=2010-04-01&FromCity=SAN+FRANCISCO&SmsStatus=received&From=%2B14153074175&FromZip=94947' 'http://localhost:5000/api/v1/questions'
