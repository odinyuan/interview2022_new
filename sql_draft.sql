CREATE USER 'demo'@'localhost' IDENTIFIED BY '123456';
GRANT ALL privileges on doctor TO 'demo'@'localhost';
show grants for demo@localhost;
grant create on table1 to demo@localhost;
drop database table1;
create table doctor(
dName int
);

create table Pid_prescription(
Pid int references Patient(id),
t_time Date,
Content varchar(50)
);
GRANT ALL privileges on demo.* to 'demo'@'localhost';
create database demo;
use demo;

select * from Did_Pid;
select * from Pid_prescription;
select version();