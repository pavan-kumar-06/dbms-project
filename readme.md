A mock project of popular ecommerce site OLX.

Team:-

1. N.Pavan Kumar(19cs01006)
2. A.Jyothi Kiran Reddy(19cs01017)
3. V.Anudeep Sai(19cs01008)

Technologies used:-

Database: MySQL
Front-end: HTML, CSS, JavaScript and EJS.
Back-end: Node, express.

Features:-

Login:

1. Secure Login and user registration
2. Maintains Sessions to fecilitate easy access

Buying:

1. Home:-

   1. List of all products listed by all other sellers.
   2. search through all the products in search bar using product name or product description
   3. Sort the products through price, availability and date of posted.

2. Product:-

   1. Lists all details of products such as images, seller information, quantity available.
   2. buttons to add to cart, add to wishlist and buynow.

3. Wishlist:-

   1. All products wishlisted by the user can be seen here.

4. Cart:-

   1. All products added to cart will be listed here.
   2. If the products added to cart are available then on clicking checkout orders are placed.

5. Orders:-

   1. All the ordered items which are yet to delivered are listed here.

6. History:-

   1. All the previously placed orders are listed here weather delivered or cancelled.

7. Profile:-
   1. The details of the user are visible here.
   2. The user can update the personal details here.

Selling:

1. Home:-

   1. All products listed by user are seen here.
   2. An update button to update the product details such as qunatity available.
   3. A delete buttton to delete a listed product.

2. Post_Product:-

   1. A form is available here to fill the details of product.

3. Orders:-

   1. All the orders placed for the products listed by the user are visible here.
   2. Once an order is delivered the seller clicks on the delivered button.
   3. If the seller is not able to deliver the product he can cancel the order.

4. History:-
   1. All the previous orders placed for the products listed by the user are listed here.

Usage:

1. Install NodeJS in your local machine.
2. Open this project folder in your favorite IDE(preferred: vscode).
3. Install npm packages mentioned in package.json
	npm install
4. Setup MySQL in your local machine and create a database by name lab_project.
	change username password in index.js below
	const connection = mysql.createConnection({
    		host: 'localhost',
    		user: 'root',
    		password: '',
    		database: 'lab_project'
	});
5. In the database run the db.sql file present in the project folder.
	run schema and procedures seperately
6. Hence Node modules are installed and database is setup.
7. Open the terminal in project directory and run index.js file.
	node index.js
8. Hurray the webiste started in local machine on PORT 3000.
9. Now the site is yours to play.

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

[![Screenshot-91.png](https://i.postimg.cc/SKtyMfGb/Screenshot-91.png)](https://postimg.cc/McV2kR49)
[url=https://postimg.cc/FYf1LWd1][img]https://i.postimg.cc/FYf1LWd1/Screenshot-100.png[/img][/url]

[url=https://postimg.cc/XB7Y7Q6j][img]https://i.postimg.cc/XB7Y7Q6j/Screenshot-101.png[/img][/url]

[url=https://postimg.cc/pm7hcbbD][img]https://i.postimg.cc/pm7hcbbD/Screenshot-92.png[/img][/url]

[url=https://postimg.cc/4n5KkhR4][img]https://i.postimg.cc/4n5KkhR4/Screenshot-93.png[/img][/url]

[url=https://postimg.cc/G9rB5xNS][img]https://i.postimg.cc/G9rB5xNS/Screenshot-94.png[/img][/url]

[url=https://postimg.cc/Wh1d2bsG][img]https://i.postimg.cc/Wh1d2bsG/Screenshot-95.png[/img][/url]

[url=https://postimg.cc/VJ3vBqng][img]https://i.postimg.cc/VJ3vBqng/Screenshot-96.png[/img][/url]

[url=https://postimg.cc/FdvKwhPJ][img]https://i.postimg.cc/FdvKwhPJ/Screenshot-97.png[/img][/url]

[url=https://postimg.cc/PLYx6CMj][img]https://i.postimg.cc/PLYx6CMj/Screenshot-98.png[/img][/url]

[url=https://postimg.cc/4m2mnk3r][img]https://i.postimg.cc/4m2mnk3r/Screenshot-99.png[/img][/url]

