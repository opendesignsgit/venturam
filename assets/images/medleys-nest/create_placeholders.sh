#!/bin/bash
# Create placeholder images using ImageMagick
for i in {1..8}; do
    convert -size 400x300 canvas:"#${i}${i}${i}999" -pointsize 60 -fill white -gravity center -annotate +0+0 "Image $i" image-$i.jpg
done

# Create the main building image (larger)
convert -size 800x600 canvas:"#2b5f4f" -pointsize 80 -fill "#d4af37" -gravity center -annotate +0+0 "Building\nExterior" building-main.jpg
