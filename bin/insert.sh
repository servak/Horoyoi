#!/bin/bash

json=$(cat $1)
len=$(echo $json | jq length)
for i in $( seq 0 $(($len - 1)) ); do
  row=$(echo $json | jq .[$i])
  echo $row | curl  -H 'Content-Type: application/json' http://localhost:3000/api/videos -d @-
done
