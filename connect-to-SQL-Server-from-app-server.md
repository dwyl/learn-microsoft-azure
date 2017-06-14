# Connect to Microsoft SQL Server from App Server

## Why?

In the
[Healthlocker Web Application](https://github.com/healthlocker/healthlocker)
(_personally identifiable_) patient data is stored a separate (_read only_)
Microsoft SQL Database.

We need to _read_ that data in order to display it for users in the App.

## What?

This _documents_ the steps taken to _confirm_ we are
able to connect the SQL Server and query the data (_step-by-step_).

## How?

Login to the application server (VM) using ssh:

```
ssh hladmin@51.140.45.21
```

Connection timed out.
![ssh-connection-time-out](https://user-images.githubusercontent.com/194400/27030732-4c29b69a-4f65-11e7-8d59-ecde253bbdc4.png)

IP Address updated to 51.140.66.108 without _any warning_ ...

Attempted to ssh in:
```
ssh hladmin@51.140.66.108
```
Got:
![image](https://user-images.githubusercontent.com/194400/27037104-d89f4d24-4f7e-11e7-89a1-eb68b9022082.png)
```
Unable to negotiate with 51.140.66.108 port 22: no matching host key type found. Their offer: ssh-dss
```
see: https://askubuntu.com/questions/836048/ssh-returns-no-matching-host-key-type-found-their-offer-ssh-dss

```sh
ssh -oHostKeyAlgorithms=+ssh-dss hladmin@51.140.66.108
```
> Note: the VM is restricted/protected by RSA Public Key.

20 Emails and 27h later ...
![20-emails](https://user-images.githubusercontent.com/194400/27083120-5cb9707e-503f-11e7-85b8-eff7761f5cc3.png)

_Finally_, Got access to a _new_ VM on a different IP Address:
```sh
ssh hladmin@51.140.86.5
```

![azure-vm-access-resumed](https://user-images.githubusercontent.com/194400/27083153-77f4e56c-503f-11e7-9034-87ac1079b7dc.png)

Instal Security Updates:

```
sudo apt-get update
```
![outbound-http-working-on-azure-vm](https://user-images.githubusercontent.com/194400/27087776-d47b3a44-504d-11e7-94de-b625a2b86312.png)

### Connect to Microsoft SQL Server from Linux (CLI)

using `sqlcmd` following this guide:
https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-connect-and-query-sqlcmd

### Install `sqlcmd` on Ubuntu

https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools#ubuntu

### Login

```
sqlcmd -S 192.555.5.555 -U SA -P '<YourPassword>'
```

In our case:

```
sqlcmd -S "$EPJS_MSSQL_DATABASE_SERVER" -U "$EPJS_MSSQL_DATABASE_USERNAME" -P "$EPJS_MSSQL_DATABASE_PASSWORD"
```
> Note the values in quotes preceded by a $ are environment variables:
EPJS_MSSQL_DATABASE_PASSWORD
EPJS_MSSQL_DATABASE_USERNAME
EPJS_MSSQL_DATABASE_SERVER

### List Databases

```
1> select name from sys.databases
2> go
```

in our case this showed:
```
master
tempdb
model
msdb
Carenotes
EPJS4_Derived_Info
DBAdmin
MHL2
```


## Background Reading

+ https://docs.microsoft.com/en-us/azure/sql-database/sql-database-connect-query-nodejs
