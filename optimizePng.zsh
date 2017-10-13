#! /usr/bin/env zsh
echo "optimizing png files"
for f in ./docs/*.png ; do; optipng $f; done
