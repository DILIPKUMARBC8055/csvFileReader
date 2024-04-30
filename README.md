CSV File Reader is a simple Node.js application that allows users to upload CSV files, parse the data, and display it on a web page.

#Features
File Upload: Users can upload CSV files through a web interface.
Data Parsing: The application parses the uploaded CSV files and displays the data on the web page.
Search and Sort: Users can search for specific data and sort the displayed data based on different columns.
#Installation

Clone the repository:
Copy code
git clone https://github.com/DILIPKUMARBC8055/csvFileReader.git

Navigate to the project directory:

cd csvFileReader

Create .env file in the directory and speicfy port,
PORT=3000

Install dependencies:

npm install

#Usage
Start the server:

npm start

Access the application in your web browser at http://localhost:PORT, where PORT is the port number specified in the .env file.
Upload CSV files using the provided interface.
Search, sort, and paginate through the displayed data as needed.

#Dependencies
 "body-parser": "^1.20.2",
    "csv-parser": "^3.0.0",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "express-ejs-layouts": "^2.5.1",
    "mongoose": "^8.3.2",
    "multer": "^1.4.5-lts.1"

