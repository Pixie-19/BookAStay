<b>BookAStay</b>

A full-stack Airbnb-style property listing and review platform built using Node.js, Express, MongoDB, and EJS. The application allows users to browse all properties, view detailed listings, create new listings, and manage reviews within a structured MVC architecture.

<hr/>
<b>Overview</b>
<br>
<br>
BookAStay replicates core functionality found in modern accommodation platforms. It provides a server-rendered interface where users can explore listings, view images, check pricing, and interact with each property through reviews. The project demonstrates backend development using Express and MongoDB, server-side rendering with EJS, and clean routing with validation and custom error handling.
<hr/>

<b>Tech Stack:</b>

Frontend:
EJS, HTML5, CSS3, Bootstrap
<br>
Backend:
Node.js, Express.js
<br>
Database:
MongoDB, Mongoose
<hr/>

## Project Structure
---

```
BookAStay/
│
├── models/
│ ├── listing.js
│ └── review.js
│
├── routes/
│ ├── listings.js
│ └── reviews.js
│
├── views/
│ ├── listings/
│ ├── reviews/
│ ├── layouts/
│ └── partials/
│
├── public/
│ ├── css/
│ └── images/
│
├── utils/
│ ├── ExpressError.js
│ └── wrapAsync.js
│
├── schema.js
├── app.js
└── package.json
```
---

## 🚀 Installation & Setup

Follow these steps to get the project up and running locally:

### 1. Clone the repository
```bash
git clone https://github.com/Pixie-19/BookAStay
cd BookAStay
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start MongoDB
```bash
Make sure MongoDB is running locally or update the connection string in your project.
```
### 4. Run the development server
```bash
node app.js
```
### 5. Open the app
```bash
Visit http://localhost:8080
in your browser to see the application running.
```
---

