
from PIL import Image
import os

directory = "public/assets/services"
target_width = 1920

# Iterate through all files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png"):
        filepath = os.path.join(directory, filename)
        
        try:
            with Image.open(filepath) as img:
                print(f"Processing {filename}...")
                original_width, original_height = img.size
                
                # Calculate new height to maintain aspect ratio
                ratio = target_width / original_width
                new_height = int(original_height * ratio)
                
                # Resize the image
                resized_img = img.resize((target_width, new_height), Image.LANCZOS)
                
                # Save the resized image, overwriting the original
                resized_img.save(filepath, quality=85, optimize=True)
                print(f"Resized {filename} to {target_width}x{new_height}")
                
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
