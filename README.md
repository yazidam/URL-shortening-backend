URL Shortener Service
This project implements a URL shortener service, allowing users to shorten long URLs, view all shortened URLs, and access the original URL via the shortened URL. It is built using Node.js for the backend and React for the frontend.

Features
Shorten any given URL and get a shortened link.
Display a list of all previously shortened URLs.
Access the original URL via the shortened link.
Show error messages when invalid URLs are provided.
Prerequisites
Before running the project, make sure you have the following installed:

Node.js (>= 16.0)
MongoDB (local or cloud-based instance)
npm or yarn
Getting Started
Backend Setup
1 - Clone the repository:

![image](https://github.com/user-attachments/assets/1f7899e6-b94f-4123-90f0-7aff8c73a37a)

2 - Install dependencies:

![image](https://github.com/user-attachments/assets/20818392-05cf-44f1-83c8-02a0b21b358d)

3 - Set environment variables (in .env):

![image](https://github.com/user-attachments/assets/9bb2cde2-d323-49b6-b493-38b5399737c6)

API Endpoints
 1 - POST /shorten
Shortens a given URL and returns a shortened version.

Request body:

![image](https://github.com/user-attachments/assets/11f19561-54ef-4891-ad87-fc949783c706)

Response:

![image](https://github.com/user-attachments/assets/e4a869c7-137f-4e36-b93e-fb467e0c12aa)

2 - GET /urls
Fetches all the URLs stored in the database.

Response:

![image](https://github.com/user-attachments/assets/076c4ff7-7b79-420d-b24b-fcd2d2bfaf12)

 3 - GET /:shortUrl
Redirects to the original URL corresponding to the shortened URL.

Response:
Redirect to the original URL.





