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

Attempted to ssh in
```
ssh hladmin@51.140.66.108
```
Got:
![image](https://user-images.githubusercontent.com/194400/27037104-d89f4d24-4f7e-11e7-89a1-eb68b9022082.png)
```
Unable to negotiate with 51.140.66.108 port 22: no matching host key type found. Their offer: ssh-dss
```
see: https://askubuntu.com/questions/836048/ssh-returns-no-matching-host-key-type-found-their-offer-ssh-dss

> Note: the VM is restricted/protected by RSA Public Key.

## Background Reading

+ https://docs.microsoft.com/en-us/azure/sql-database/sql-database-connect-query-nodejs
