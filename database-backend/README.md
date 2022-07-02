# database-backend

## scheme

```
create table laborcontract(
  address char(50),
  wpname char(50),   
  wpemployer char(10),
  employeename char(10),
  workplaceindex int,          
  period char(50),                    
  duties char(50),                   
  workingtime char(50),         
  workingdays char(50),   
  wage char(20),                     
  wageday char(20),            
  comment char(255),
  primary key(address, workplaceindex)
);
```

```
create table qrcodecheck(
  workplaceindex int,
  date1 char(30),
  randomnum int,
  primary key(workplaceindex, date1)
);
```
