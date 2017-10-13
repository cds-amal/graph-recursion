#! /usr/bin/env zsh

for string in combination fibonacci partition permute
do
    echo $string
    function { local GRAPH=$string; GRAPH=$string outname=$string ./node_modules/.bin/webpack ; }; 
done