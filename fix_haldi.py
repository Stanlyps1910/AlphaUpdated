import requests
from PIL import Image, ImageOps
import io
import os

id = "1fbiyVrKXAR1uhqvbikHQ_LyoZI5fIjYI"
path = "public/assets/services/haldi.jpg"
target_width = 1920

def get_confirm_token(response):
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            return value
    return None

def download_and_fix():
    print("Downloading original Haldi image...")
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()
    response = session.get(URL, params = { 'id' : id }, stream = True)
    
    token = get_confirm_token(response)
    if token:
        params = { 'id' : id, 'confirm' : token }
        response = session.get(URL, params = params, stream = True)

    image_content = response.content
    
    try:
        with Image.open(io.BytesIO(image_content)) as img:
            print(f"Original size: {img.size}")
            
            # Apply EXIF orientation
            fixed_img = ImageOps.exif_transpose(img)
            print(f"Size after EXIF transpose: {fixed_img.size}")
            
            # Check if it's still landscape when it should be portrait or vice versa? 
            # We assume EXIF transpose fixes the "tilt" (rotation).
            
            # Resize
            original_width, original_height = fixed_img.size
            ratio = target_width / original_width
            new_height = int(original_height * ratio)
            
            resized_img = fixed_img.resize((target_width, new_height), Image.LANCZOS)
            
            resized_img.save(path, quality=85, optimize=True)
            print(f"Saved fixed haldi.jpg to {path} ({target_width}x{new_height})")
            
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    download_and_fix()
