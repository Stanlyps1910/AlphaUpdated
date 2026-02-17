
import requests

def download_file_from_google_drive(id, destination):
    URL = "https://docs.google.com/uc?export=download"

    session = requests.Session()

    response = session.get(URL, params = { 'id' : id }, stream = True)
    token = get_confirm_token(response)

    if token:
        params = { 'id' : id, 'confirm' : token }
        response = session.get(URL, params = params, stream = True)

    save_response_content(response, destination)
    print("Downloaded " + destination)

def get_confirm_token(response):
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            return value

    return None

def save_response_content(response, destination):
    CHUNK_SIZE = 32768

    with open(destination, "wb") as f:
        for chunk in response.iter_content(CHUNK_SIZE):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)

images = [
    {"id": "1f8TgN1_LpyJ0VIiHaqtODzPmOUUk-EAF", "path": "public/assets/services/wedding.jpg"},
    {"id": "1Dpi8j-39X_zDwyM79e-1IHniM8VDefZN", "path": "public/assets/services/engagement.jpg"},
    {"id": "1N89MxU6zBlaKT4YX04Osagia01ZIXAoy", "path": "public/assets/services/pre_wedding.jpg"},
    {"id": "1fbiyVrKXAR1uhqvbikHQ_LyoZI5fIjYI", "path": "public/assets/services/haldi.jpg"},
]

for img in images:
    download_file_from_google_drive(img["id"], img["path"])
