# Image Optimization Script for Flora Yanma Atlası
# This script converts images to WebP format and creates responsive versions

#!/bin/bash

# Configuration
INPUT_DIR="images/plants"
OUTPUT_DIR="images/plants-optimized"
QUALITY=85
SIZES=(192 384 768 1024 1536)

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to convert image to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="$2"
    local quality="$3"
    
    if command -v cwebp &> /dev/null; then
        cwebp -q "$quality" "$input_file" -o "$output_file"
    elif command -v magick &> /dev/null; then
        magick "$input_file" -quality "$quality" -define webp:lossless=false "$output_file"
    else
        echo "Error: Neither cwebp nor ImageMagick found. Please install one of them."
        exit 1
    fi
}

# Function to resize image
resize_image() {
    local input_file="$1"
    local output_file="$2"
    local width="$3"
    
    if command -v magick &> /dev/null; then
        magick "$input_file" -resize "${width}x>" -quality 85 "$output_file"
    elif command -v convert &> /dev/null; then
        convert "$input_file" -resize "${width}x>" -quality 85 "$output_file"
    else
        echo "Error: ImageMagick not found. Please install ImageMagick."
        exit 1
    fi
}

# Process each image
for image in "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.png; do
    if [ -f "$image" ]; then
        filename=$(basename "$image")
        name="${filename%.*}"
        extension="${filename##*.}"
        
        echo "Processing: $filename"
        
        # Create WebP version
        webp_file="$OUTPUT_DIR/${name}.webp"
        convert_to_webp "$image" "$webp_file" "$QUALITY"
        
        # Create responsive versions
        for size in "${SIZES[@]}"; do
            responsive_file="$OUTPUT_DIR/${name}-${size}w.webp"
            resize_image "$image" "$responsive_file" "$size"
        done
        
        # Create fallback JPEG versions
        jpeg_file="$OUTPUT_DIR/${name}.jpg"
        resize_image "$image" "$jpeg_file" 1024
        
        for size in "${SIZES[@]}"; do
            responsive_jpeg="$OUTPUT_DIR/${name}-${size}w.jpg"
            resize_image "$image" "$responsive_jpeg" "$size"
        done
    fi
done

echo "Image optimization complete!"
echo "Optimized images saved to: $OUTPUT_DIR"

# Generate HTML with responsive images
cat > responsive-images.html << 'EOF'
<!-- Responsive Image Template -->
<picture>
    <source 
        media="(max-width: 768px)" 
        srcset="images/plants-optimized/plant-name-384w.webp 384w,
                images/plants-optimized/plant-name-768w.webp 768w"
        type="image/webp">
    <source 
        media="(max-width: 1024px)" 
        srcset="images/plants-optimized/plant-name-768w.webp 768w,
                images/plants-optimized/plant-name-1024w.webp 1024w"
        type="image/webp">
    <source 
        srcset="images/plants-optimized/plant-name-1024w.webp 1024w,
                images/plants-optimized/plant-name-1536w.webp 1536w"
        type="image/webp">
    
    <!-- Fallback for browsers that don't support WebP -->
    <source 
        media="(max-width: 768px)" 
        srcset="images/plants-optimized/plant-name-384w.jpg 384w,
                images/plants-optimized/plant-name-768w.jpg 768w"
        type="image/jpeg">
    <source 
        media="(max-width: 1024px)" 
        srcset="images/plants-optimized/plant-name-768w.jpg 768w,
                images/plants-optimized/plant-name-1024w.jpg 1024w"
        type="image/jpeg">
    <source 
        srcset="images/plants-optimized/plant-name-1024w.jpg 1024w,
                images/plants-optimized/plant-name-1536w.jpg 1536w"
        type="image/jpeg">
    
    <img 
        src="images/plants-optimized/plant-name.jpg" 
        alt="Plant description"
        loading="lazy"
        decoding="async"
        width="1024"
        height="768">
</picture>
EOF

echo "Responsive image template created: responsive-images.html"
