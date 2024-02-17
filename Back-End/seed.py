from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, text

"""
WARNING: Running this script multiple times will generate duplicate data and may throw unique constraint exceptions.
Only execute this script if you want to insert the provided data into the database once.

"""
devices = [
    """
INSERT INTO devices (name, power_rating, type) VALUES 
('Samsung QLED TV', '150', 'TV'),
('LG Smart Inverter Microwave Oven', '1200', 'Oven'),
('Bosch Serie 6 Washing Machine', '2300', 'Washing Machine'),
('Philips Air Fryer', '1425', 'Air Fryer'),
('Sony PlayStation 5', '350', 'Game Console'),
('Apple MacBook Pro', '96', 'Laptop'),
('Anker PowerPort III Nano', '18', 'Charger'),
('Dyson Pure Cool Tower Fan', '40', 'Fan'),
('Daikin Inverter Split System Air Conditioner', '2000', 'Air Conditioner'),
('Amazon Echo Dot', '15', 'Smart Speaker');


"""
]
users = [
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Eleanor', 'Sackett', '278-649-7990', 'esackett0@squarespace.com', 'Azerbaijan', '$2b$12$xF4jZTzCLrGmt0aYIR7am.GHKwHUOzrqRzL5VrSKoeHqgExUw99f6', 'Brazil', '263 Gina Lane', 'Hövsan', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('L;urette', 'Wathell', '457-933-2709', 'lwathell1@pagesperso-orange.fr', 'China', '$2b$12$pe0IGe5jj1mjOH6H8u43.e0/fXX8RJXD1Cl9S7LkFmyl5HcvJa8RO', 'China', '8894 Northview Road', 'Baizhang', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Ulrich', 'Breens', '660-467-3705', 'ubreens2@cdc.gov', 'Russia', '$2b$12$0lIeS4nQ3UTh/03DRKxfCeM.GtBjWm0xM8uTJnB4MxBstki1I7E7q', 'Finland', '03233 Mcguire Lane', 'Naro-Fominsk', null, '143316');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Bettina', 'Banishevitz', '705-837-8947', 'bbanishevitz3@barnesandnoble.com', 'Indonesia', '$2b$12$neZ61xyq5WAVhX2Gt7aYD.kvUG9V0cnqXeW.vNDwSHWvV9kZbpOo2', 'Sweden', '840 Marquette Street', 'Rancaseneng', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Ernest', 'Eblein', '682-241-1415', 'eeblein4@themeforest.net', 'Czech Republic', '$2b$12$NG44Z7JjyEqlkADbbCbPL.ZBxsPezlD8vth9jY0XzfuF/EbG9qWf2', 'Trinidad and Tobago', '92345 Forster Avenue', 'Petrovice u Karviné', null, '735 72');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Pedro', 'Radmore', '533-909-6570', 'pradmore5@feedburner.com', 'Russia', '$2b$12$L8n6gnI1bBcK3U1rGUO0AuAKL3bLqz2IKI/oufRw7nFfZB8/95zLa', 'Indonesia', '4617 Holy Cross Trail', 'Shebunino', null, '694761');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Mara', 'Rustich', '982-263-2722', 'mrustich6@dailymail.co.uk', 'Macedonia', '$2b$12$jSvFQvWcPPxg9xw3EP8q.eWz0BIBz9iSTLPYYrIbUeQIicDqjVg2W', 'China', '4 Oak Circle', 'Kičevo', null, '6262');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Linzy', 'Ferminger', '824-575-0821', 'lferminger7@t-online.de', 'China', '$2b$12$XHoV6pCVZBrUcD/FAKJAhOvcPySHC.5g9Shgl5xW/AZ7EwnjvgQkK', 'Armenia', '8664 Eagle Crest Circle', 'Huangliu', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Zia', 'Calderon', '146-645-5512', 'zcalderon8@auda.org.au', 'Zambia', '$2b$12$0n3lQzYRWUNv3/hbM2tqXeuy20lmM3pSE0Wh9.VY16WYvREptllq6', 'Thailand', '033 Northridge Court', 'Monze', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Oliy', 'Izhakov', '840-141-0241', 'oizhakov9@cocolog-nifty.com', 'Macedonia', '$2b$12$HH4i/EsUVlQHPYyjZMzDjOg4WDFHUY1eH0N4mqknsNLusL0CVq.K2', 'Democratic Republic of the Congo', '682 Ilene Pass', 'Чегране', null, '1237');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Jacquenette', 'Sconce', '566-521-3929', 'jsconcea@census.gov', 'Kenya', '$2b$12$F5TNiYXYEcTlfIGsyxV/1upJj98yFntzfF1EhH5y0gP4wYIatZpTa', 'United States', '07856 Center Alley', 'Malindi', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Cymbre', 'Cleveley', '337-839-9874', 'ccleveleyb@indiegogo.com', 'Bahrain', '$2b$12$UYwcmL/qKn3G9tPwM2wJPenI68/pzm8i3OaXLb38tTo.YqjqnByai', 'Brazil', '6 Mccormick Way', 'Dār Kulayb', null, null);",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Miner', 'Garken', '701-803-1939', 'mgarkenc@si.edu', 'Czech Republic', '$2b$12$ieBfdjPw0OH0ZoQIuJ3tzujJgM9oRNBxvH8FQHvL6xynYmsOvMJqC', 'China', '3051 2nd Center', 'Srubec', null, '370 06');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Howard', 'Carass', '105-267-8046', 'hcarassd@reverbnation.com', 'New Zealand', '$2b$12$XYCzz5O8U5ms.YjNeQk9MuuOL.Gi03YOl6I6OSvtUw6cJ7LrY05tC', 'Philippines', '03637 Portage Place', 'Taupo', null, '3352');",
    "insert into users (first_name, last_name, phone, email, nationality, password, country, street, city, state, postal_code) values ('Kennie', 'Peasnone', '839-632-8796', 'kpeasnonee@dailymotion.com', 'Indonesia', '$2b$12$F3TrN3BZIGRVgIlcDgyBmOTo3Aaqq/dM4BfrYXFIZhZDcr4OY4Ive', 'Democratic Republic of the Congo', '691 Morning Avenue', 'Rantepang', null, null);",
]
session_maker = sessionmaker(
    bind=create_engine("postgresql://postgres:root@localhost/Capstone")
)


def insert(s):
    try:
        with session_maker() as session:
            for stmt in s:
                st = text(stmt)
                session.execute(st)
            session.commit()
    except Exception:
        session.rollback()


insert(users)
