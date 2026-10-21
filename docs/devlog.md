# Dev Log

## 1
- Created the repo and set up the Node project with Express and better-sqlite3
- Chose SQLite because I am familiar with it

## 2
- Created the server.js which creates the server and adds a test endpoint on localhost3000
- Also aded a api health check
- Created index.html to test it would open on localhost3000
- Added the start node to server.js in package.json

## 3 - Db
-Added the database schema which contains a user login table, products table, stock_movement table and the idx_movements_products index
-Stock_movement table is used to track the stock going in and out of the data base
-Idx_movement_product is an index of the product_id column of stock_movements
-prices are stored in pence to avoid rounding errors
-Stock_movements contains userID so any updates have a trail back to the user
-Users allow for different access levels later on
-Quantity is calculated for a product by taking the sum of the quantity changed. This method is appropriate for this project as it is just small scale so reading all the indexes doesnt cost any significant time while being simple to code


