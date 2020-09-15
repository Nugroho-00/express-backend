<h1 align="center">Create Rest API - Express JS</h1>


This is simple CRUD app with node js and framework express js, this app is wearing to e-commerce
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`'
3. Turn on Web Server and MySQL can using Third-party tool like xampp
4. Create a database with the name ecommerce, and import file at folder sql ecom.sql to **phpmyadmin**
5. Open Postman desktop application or Chrome web app extension that has installed before
6. Choose HTTP Method and enter request url.(ex. localhost:8180/)
7. You can see all the end point [here](#end-point)


## End Point Method
**1. GET**
* '/'
     'Get All item produk'
* '/:id'
     'Get item by Id produk'
**2. POST**
* '/' 
     'To Create items'
**3. PUT**
* '/:id '
    'Update all item by id'
**4. PATCH**
* '/:id' 
    'Update Partial item by id'
**5. DELETE**
* '/:id' 
    'Delete item by id'