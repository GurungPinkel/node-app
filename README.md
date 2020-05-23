# authentication module

This app is extended from https://github.com/GurungPinkel/base-node

## User Table

---

```
create schema authentication;
create table authentication.AUTHENTICATION_TYPE
(
	ID int auto_increment
		primary key,
	NAME varchar(255) not null,
	UPDATED_TIMESTAMP timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
	CREATED_TIMESTAMP timestamp default CURRENT_TIMESTAMP not null
);

create table authentication.USERS
(
	ID int auto_increment
		primary key,
	EMAIL varchar(255) not null,
	PASSWORD varchar(255) not null,
	UPDATED_TIMESTAMP timestamp default CURRENT_TIMESTAMP not null,
	CREATED_TIMESTAMP timestamp default CURRENT_TIMESTAMP not null,
	constraint USERS_EMAIL_uindex
    unique (EMAIL)
);



```
