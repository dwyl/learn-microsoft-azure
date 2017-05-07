# Learn Microsoft Azure

Learn how to deploy your Web Application &amp;
Database Server to Microsoft Azure.

## Why?

The decision was made to deploy your work/app to Azure<sup>1</sup>,
now you have the task of making it happen.

## What?

A Step-by-Step guide to deploying your first app on Microsoft Azure.

> This guide focusses on deploying a Phoenix Web Application
(_because that is our chosen
[technology stack](https://github.com/dwyl/technology-stack) @dwyl_)
But it contains many _generally_ applicable skills for other stacks.

## Who?

Developers who need to deploy to Azure
because their client/employer requires them to.

## How?

This is a step-by-step guide to deploying an App on Azure.

> If you don't already have an account on Azure,
go register for one now!
[/**register**-for-**azure**-account.md](https://github.com/dwyl/learn-microsoft-azure/blob/master/register-for-azure-account.md)


### X. Login With SSH


In our case the user for the server is `hladmin`
and the IP address is `51.140.45.21`.

```
ssh hladmin@51.140.45.21
```



### X. Install Dokku

```s
wget https://raw.githubusercontent.com/dokku/dokku/v0.8.2/bootstrap.sh;
sudo DOKKU_TAG=v0.8.2 bash bootstrap.sh
```

> see: http://dokku.viewdocs.io/dokku/getting-started/installation
(_for latest version_)


### Create Dokku App

```
dokku apps:create healthlocker
```

### Clone the GitHub Repository on the VPS


```
git clone https://github.com/healthlocker/healthlocker.git
```

```
git remote add dokku dokku@51.140.45.21:healthlocker
```

```
git remote add dokku hladmin@healthlocker.uksouth.cloudapp.azure.com:healthlocker
```
or:

```
git remote set-url dokku hladmin@healthlocker.uksouth.cloudapp.azure.com:healthlocker
```

```
git remote set-url dokku git@healthlocker.uksouth.cloudapp.azure.com:healthlocker
```

git remote set-url dokku dokku@healthlocker.uksouth.cloudapp.azure.com:healthlocker


git remote set-url dokku dokku@healthlocker.uksouth.cloudapp.azure.com:phoenix_chat

dokku config:set phoenix_chat SECRET_KEY_BASE=ssXGYWHdJ0qxgKjENdranMkqakoZgz7K2bqXOOlx65RblhwWDbDVF6IWTB96W83+ HOSTNAME=healthlocker.uksouth.cloudapp.azure.com

postgres://okzcvdoxebqpaz:20oQB_Qx2lMeZ8k0WiKR-tFNAA@ec2-54-217-232-100.eu-west-1.compute.amazonaws.com:5432/d53rfqn51eur3c



### Install PostgreSQL

```
dokku plugin:install https://github.com/dokku/dokku-postgres.git
```

### Create Database for Application

```
dokku postgres:create healthlocker_prod
```

### Link the Database to the Container of the App

```
dokku postgres:link healthlocker_prod healthlocker
```
export DATABASE_URL=postgres://postgres:6fd91c3095f8cf7a2bf3c98f36da2b42@dokku-postgres-healthlocker-prod:5432/healthlocker_prod
export MIX_ENV=prod

url: "postgres://postgres:6fd91c3095f8cf7a2bf3c98f36da2b42@dokku-postgres-healthlocker-prod:5432/healthlocker_prod",

psql -d mydb -U myuser
psql -d healthlocker_prod -U 6fd91c3095f8cf7a2bf3c98f36da2b42

ALTER USER "postgres" WITH PASSWORD 'postgres';

### Configure Dokku to use Multiple Buildpacks

```
dokku config:set healthlocker BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

### Add Buildpacks

Add the two buildpacks
```
# append to the .buildpacks file:
echo "https://github.com/HashNuke/heroku-buildpack-elixir.git" >> .buildpacks
echo "https://github.com/gjaldon/heroku-buildpack-phoenix-static.git" >> .buildpacks
# confirm that the buildpacks were added by reading the .buildpacks file:
cat .buildpacks
```

### Install Node.js

https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

```
dokku config:set app_name SECRET_KEY_BASE=<secret_key> HOSTNAME=healthlocker.uksouth.cloudapp.azure.com  
```

ours is:
```
dokku config:set healthlocker SECRET_KEY_BASE=XwegP5nDFVh6ik5DYEmuwD0egecwPTFMAU684tajrEBbWRBCHbLxCd0J98auGH7m HOSTNAME=healthlocker.uksouth.cloudapp.azure.com  
```
<!-- Azur3sucks2017 -->

### (Optionally) Create SSH Keys

```
ssh-keygen -t rsa
```

```
custom
```

```
cat ~/.ssh/custom.pub | ssh hladmin@51.140.45.21.healthlocker.uksouth.cloudapp.azure.com "sudo sshcommand acl-add dokku custom-identifier"  
```

### Upload your Public Key to the VPS

cat ~/.ssh/id_rsa.pub | ssh hladmin@healthlocker.uksouth.cloudapp.azure.com "sudo sshcommand acl-add dokku custom-identifier"


### Trouble-Shooting

Error when trying to push to Azure VPS:
```
To healthlocker.uksouth.cloudapp.azure.com:healthlocker
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'dokku@healthlocker.uksouth.cloudapp.azure.com:healthlocker'
```

Try:
https://github.com/dokku/dokku/issues/841#issuecomment-69527122
did nothing. :-(


because script "node_modules/brunch/bin/brunch" does not exist.
solution:
```
npm install
```

Then:
```
sudo mix phoenix.server
```

## Background Reading

+ http://www.phoenixframework.org/docs/deployment
+ http://dokku.viewdocs.io/dokku/getting-started/installation/
+ http://dokku.viewdocs.io/dokku/getting-started/install/azure/
+ https://www.microsoft.com/developerblog/real-life-code/2015/10/30/Streamlined-Dokku-Deployment.html
+ https://gist.github.com/henrik/c70e32544e09c1a79841
+ http://blog.pragtechnologies.com/deploying-phoenix-using-dokku-in-azure/

## tl;dr

<sup>1</sup>Microsoft Azure is not "_better_" than any other "Cloud"
Infrastructure/Platform Provider.
They have implemented a IaaS/PaaS in _response_ to Amazon Web Services.
We are _only_ using it because one of our clients (NHS) _requires_ us to.
We would prefer to use AWS, Digital Ocean
or Google Could Platform over Azure _every time_.

We _understand_ from a corporate policy/decision-making perspective
that Azure is an _easy_ decision for certain companies/executives
 to make given their _existing_ investment/commitment to Microsoft ...
 So we want to _document_ our setup so that it can be followed
 by anyone `else` in the same situation.§

Much like Windows Phone, Azure is a "_me too_" product where Microsoft
is playing catchup with _well-established/better_
(_more mature, feature rich/innovative, faster, cheaper_) alternatives.
There's _no_ ***technical reason*** why _anyone_ would use Azure
other than a political decision.
In our case the NHS were offered _big_ discounts by Microsoft to use Azure.
Everyone knows that MSFT are discounting Azure to the NHS for reasons
_other_ than "doing good", but the NHS IT people love a bargain so they are
investing huge amounts of time locking themselves into the Microsoft "Cloud".

At least all the apps that _we_ (@dwyl) build are designed to be
"infrastructure agnostic" (_i.e. no "lock-in"_).
