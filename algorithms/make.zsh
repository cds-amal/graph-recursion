#! /usr/bin/env zsh
echo "generating algorithm data"

# how modifiers work
# info -f zsh -n Modifiers
mydir=${0:a:h}
for f in ${mydir}/*.js; do; node $f; done
