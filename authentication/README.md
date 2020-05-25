# authentication module

This app is extended from https://github.com/GurungPinkel/base-node

## User Table

---

```
create schema authentication;

drop table USERS;
create table if not exists authentication.USERS
(
	ID int auto_increment primary key,
	EMAIL varchar(255) not null,
	PASSWORD varchar(255) not null,
	IS_ACTIVE tinyint(1) default 1 not null,
	UPDATED_TIMESTAMP timestamp default CURRENT_TIMESTAMP not null on update current_timestamp,
	CREATED_TIMESTAMP timestamp default CURRENT_TIMESTAMP not null,
	constraint USERS_EMAIL_uindex
		unique (EMAIL)
);

```
