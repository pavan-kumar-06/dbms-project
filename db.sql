//image url in user profile and date in orders --> todo
//search feature in main page and catogory features

--making stored procedure called checkout which clears all products in cart which are available and with less quantity and insert them into orders table
create table user_profile(
	user_id int,
    user_password varchar(255),
    user_name varchar(255),
    full_name varchar(255),
    address varchar(255),
    phone_number varchar(10),
	image_url varchar(8000),
	PRIMARY KEY (user_id)
);

create table catogory(
	catogory_id int,
    cname varchar(255),
    primary key(catogory_id)
);

create table products(
	product_id int,
    user_id int,
    image_url varchar(8000),
    product_name varchar(255),
    description varchar(255),
    price int,
    quantity int,
	status varchar(255),
	post_date date,
	catogory_id int,
	PRIMARY KEY (product_id),
	FOREIGN KEY (user_id) REFERENCES user_profile(user_id),
	FOREIGN KEY (catogory_id) REFERENCES catogory(catogory_id)
);

create table whishlist(
	user_id int,
    product_id int,
    PRIMARY KEY (user_id,product_id),
	FOREIGN KEY (user_id) REFERENCES user_profile(user_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id)
);

create table orders(
	order_id int,
    product_id int,
    user_id int,
    quantity int,
    price int,
	status varchar(255),
	placed_date date,
	delivered_date date,
    PRIMARY KEY(order_id),
	FOREIGN KEY (user_id) REFERENCES user_profile(user_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id)
);

create table cart(
    user_id int,
    product_id int,
    quantity int,
    PRIMARY KEY (user_id,product_id),
	FOREIGN KEY (user_id) REFERENCES user_profile(user_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id)
)


-----------------Triggers Good Example




--insert trigger on orders  decease quantity and makes unavailable if quantity drops to 0

DELIMITER $$
CREATE TRIGGER after_order_insert
AFTER INSERT
ON orders FOR EACH ROW
BEGIN
	update products set quantity = quantity - new.quantity where product_id = new.product_id ;
    update products set status='unavailable' where product_id = new.product_id and quantity <=0;
END$$


--update trigger on orders increases quantity 
DELIMITER $$
CREATE TRIGGER after_order_update
AFTER UPDATE
ON orders FOR EACH ROW
BEGIN
	if :new.status == 'canceled' then
		update products set quantity = quantity + new.quantity where product_id = new.product_id ;
	end if;
END$$

DELIMITER ;


----------------We need a stored procedure for checkout 
-------------we should delete all the avaialble products from cart and insert in orders and there are insert and update triggers 
--to make sure that quantity is corrected correctly --------------------------------------------------------


DELIMITER ;

--delete trigger on orders automatically increase quantity and makes product available 
--noneed because orders are not being deleted just upadting that order is canceled
DELIMITER $$
CREATE TRIGGER after_order_delete
AFTER DELETE
ON orders FOR EACH ROW
BEGIN
	update products set quantity = quantity + old.quantity where product_id = old.product_id ;
END$$

DELIMITER ;

drop procedure checkout;
delimiter //
create procedure checkout (in uid int) 
begin
	declare is_done int default 0;
	declare order_id int default 0;
	declare pid int;
	declare quantity int;
	declare price int;
    declare cart_cursor cursor for
	select p.product_id,c.quantity,p.price
	from products p,cart c
	where p.quantity>=c.quantity and p.status = 'available' and c.user_id = uid and p.product_id = c.product_id;
    
	declare continue handler for not found set is_done = 1;
    
	select count(*)+1 into order_id from orders ;

	open cart_cursor;
	get_list : loop
		fetch cart_cursor into pid,quantity,price;
		if is_done =1 then
			leave get_list;
		end if;
		insert into orders values(order_id,pid,uid,quantity,price,'placed',curdate(),curdate());
		delete from cart where product_id = pid and user_id = uid;
		set order_id = order_id+1;
	end loop;
	close cart_cursor;
end//
delimiter ;





1-electronics 
2-fashion 
3-Books
4-Others

