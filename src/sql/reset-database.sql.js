/* eslint-disable no-tabs */
export default `
drop database if exists mini_bookkeeping;
create database mini_bookkeeping;

use mini_bookkeeping;

create table departments (
	Id int auto_increment,
    \`Name\` text not null,
    primary key(Id),
    check(\`Name\` != '')
);

create table employees (
	Id int auto_increment,
    FullName text not null,
    DepartmentId int null,
    primary key(Id),
	foreign key(DepartmentId) references departments(Id) on delete set null,
    check(FullName != '')
);

create table types_of_costs (
	Id int auto_increment,
    \`Name\` text not null,
    \`Description\` text not null,
    ThresholdPerMonth int unsigned not null,
    primary key(Id),
    check(\`Name\` != '' and \`Description\` != '')
);

create table shops (
	Id int auto_increment,
    \`Name\` text not null,
    primary key(Id),
    check(\`Name\` != '')
);

create table expenses (
	Id int auto_increment,
    \`Description\` text not null,
    Price int not null,
    DateOfPurchase Date not null,
    DepartmentId int null,
    EmployeeId int null,
    TypeOfCostId int null,
    ShopId int null,
    primary key(Id),
    foreign key(DepartmentId) references departments(id) on delete set null,
    foreign key(EmployeeId) references employees(id) on delete set null,
    foreign key(TypeOfCostId) references types_of_costs(id) on delete set null,
    foreign key(ShopId) references shops(id) on delete set null,
    check(\`Description\` != '')
);

create view employees_pretty_view as
select e.Id, e.FullName, concat(d.Id, ' - ', d.\`Name\`) as Department
from employees as e
left join departments as d
on e.DepartmentId = d.Id;

create view expenses_pretty_view as
select 
	exp.Id, 
	exp.\`Description\`,
    exp.Price,
	exp.\`DateOfPurchase\`, 
	concat(d.Id, ' - ', d.\`Name\`) as Department, 
	concat(emp.Id, ' - ', emp.\`FullName\`) as Employee, 
	concat(t.Id, ' - ', t.\`Name\`) as TypeOfCost, 
	concat(s.Id, ' - ', s.\`Name\`) as Shop
from expenses as exp
left join departments as d
on d.Id = exp.DepartmentId
left join employees as emp
on emp.Id = exp.EmployeeId
left join types_of_costs as t
on t.Id = exp.TypeOfCostId
left join shops as s
on s.Id = exp.ShopId;
`;
