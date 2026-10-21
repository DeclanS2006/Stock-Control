# Dev Log

## Commit 1
- Created the repo and set up the Node project with Express and better-sqlite3
- Chose SQLite because I am familiar with it

## Commit 2
- Created the server.js which creates the server and adds a test endpoint on localhost3000
- Also aded a api health check
- Created index.html to test it would open on localhost3000
- Added the start node to server.js in package.json

## Commit 3 - Db
-Added the database schema which contains a user login table, products table, stock_movement table and the idx_movements_products index
-Stock_movement table is used to track the stock going in and out of the data base
-Idx_movement_product is an index of the product_id column of stock_movements
-prices are stored in pence to avoid rounding errors
-Stock_movements contains userID so any updates have a trail back to the user
-Users allow for different access levels later on
-Quantity is calculated for a product by taking the sum of the quantity changed. This method is appropriate for this project as it is just small scale so reading all the indexes doesnt cost any significant time while being simple to code

## Commit 4
-Created database.js which connects the app the the database
-It then exports the database to the rest of the app so it can be imported without opening other connections
-It runs on startup so anyone who clones the repo can run npm start and get a fully working database
-It is safe to do so because all the tables use CREATE TABLE IF NOT EXISTS