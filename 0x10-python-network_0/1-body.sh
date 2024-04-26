#!/bin/bash

URL=$1

response=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ "$response" == "200" ]; then
    curl -s "$URL"
fi

