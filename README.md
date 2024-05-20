# Note-taking Application developed with MySQL, Express, React, and Node.js

## Features:
- Users must register and then log in.
- Users can only view their own notes, and can delete, edit, or archive/unarchive them.
- Categories can be created for users to classify their notes.
- Filtering and deletion of notes by category.

## Backend
The backend was developed with Node.js and the following libraries were used:

```bash
npm install express cors mysql2 sequelize
npm install cookie-parser jsonwebtoken bcrypt
npm install nodemon
```
Sequelize was used as an ORM to communicate with the MySQL database, allowing interaction with the database using objects and methods instead of writing SQL queries directly. Authentication was managed using generated tokens, and passwords were properly encrypted.

Having explained this, it is necessary to show the database schema, which is:

[![diagram2.png](https://i.postimg.cc/85PfmSzb/diagram2.png)](https://postimg.cc/3yVw3zpy)

## Database Schema:
- Users: Stores user information.
- Notes: Stores notes, including the ID of the user who created them, and an "active" column for data storage.
- Category: Contains created categories.
- NoteCategories: Created due to the relationship "categories can have many notes, and in turn, many categories can belong to many notes". Facilitates data filtering by category.

Two controllers were developed, in order to facilitate the interaction at the moment of making POST, GET... requests to the database, one controller contains everything related to phase 1, while the second controller is for phase 2, the categories. 
  
## Frontend
The frontend was developed with React and the following libraries were used:
```bash
npm install axios react-router-dom bootstrap
npm install react-bootstrap
```

The Axios and React Router DOM libraries were used to make requests to the API developed with Express and Sequelize, keeping both levels separate. Some libraries were also used to format and animate the pages.

## Versions of the packages used:
## BACKEND
```bash
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.9.7",
    "sequelize": "^6.37.3"
  }
}
```
## FRONTEND
```bash
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.8",
    "bootstrap": "^5.3.3",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.2",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```
## Images of web page:
## Login
[![Captura-de-pantalla-2024-05-05-065735.png](https://i.postimg.cc/yNcf90bH/Captura-de-pantalla-2024-05-05-065735.png)](https://postimg.cc/qtBXH6rb)
## Home
[![Captura-de-pantalla-2024-05-05-065751.png](https://i.postimg.cc/VvL43pLf/Captura-de-pantalla-2024-05-05-065751.png)](https://postimg.cc/tZwh6rxw)
## Archive Notes
[![Captura-de-pantalla-2024-05-05-065809.png](https://i.postimg.cc/9081VbrG/Captura-de-pantalla-2024-05-05-065809.png)](https://postimg.cc/D4G1PqQZ)
## Create and add Categorize
[![Captura-de-pantalla-2024-05-05-065830.png](https://i.postimg.cc/DZhxcm9b/Captura-de-pantalla-2024-05-05-065830.png)](https://postimg.cc/Tykjd2YR)
## Filter and delete category from note
[![Captura-de-pantalla-2024-05-05-065841.png](https://i.postimg.cc/gJKNtmpt/Captura-de-pantalla-2024-05-05-065841.png)](https://postimg.cc/0MbYbgb7)
