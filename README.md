# Learn Microsoft Azure

Learn how to deploy your Web Application &amp;
Database Server to Microsoft Azure.

## Why?

A decision was made by someone to deploy your work/app to Azure,
now you have the task of making it happen.

## What?

Step-by-Step guide to deploying your first app on Microsoft Azure.

## Who?

Developers who need to deploy to Azure because their client/employer requires them to.
_Everyone_ `else` knows there are _better_ (_more mature, feature rich/innovative, faster, cheaper_) alternatives.

## How?

### 1. Register for Azure

If you don't already have a Microsoft Azure account (_why would you?_)
register for one at: https://azure.microsoft.com/

![Azure register](https://cloud.githubusercontent.com/assets/194400/23656683/9aa2c3d6-0332-11e7-8c4d-5e45ed2049a4.png)

### 2. Go to your "Portal Dashboard"


### X. Login With SSH


In our case the user for the server is `hladmin`
and the IP address is `51.140.45.21`.

```
ssh hladmin@51.140.45.21
```

```
no-port-forwarding,no-agent-forwarding,no-X11-forwarding,command="echo 'Please login as the user \"hladmin\" rather than the user \"root\".';echo;sleep 10" ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC5lvyvoOry+TRFwDjYWHt4L+6LOlCo9uD47qzQFJVYHNg+TW/QZwbI3eWBElg5i1QlrTfnFGyQD31aj4qukaqsrqx0tsgysUS8nOltrx2IYxSJ1XFqQCETXwNvjns+gasOvg07yoGnczgtsUWWuytQkwu5x8+cGhC08e65AFAYZuam8jHQgsDhOeskN0RzpdyfI7IjNNheTkcHIfgMy+iaZHTDNE95vELdKhu9N8+HzxUko+GanRADCIYZGBaJPWX4i9gRVgevPGCJ+Y/W96ctnWm0TdzdVyypF4q8oiySbujm/4fqLH1tP7lp9Aox2XlK98PRTkhD0rZvKaa6gEDWDxihSz0Phhvuv4da/IOSimw+5v5f439m69cWruQh9a46652nUqA92En2hayql6uE5D9QWgoKZFCebIBQfGHqKU3kIL0zENnpQM+39ydipYN4+2gXLajmAgpMi+/EXk1y/grhxOugLcJgSLfHR5/6pEzXiHNhPPE1gpCcxpDuELcCi/cIaKmjo+w2m6onmouHu6iZE2SMEIo3WkBhVtSiKqERjS63xfkaI8eDdlQ3ONh++ykk+nM49Y/Y47ofj5FV5hTfFLvre9tpsK5dHkw7Qe85dbyxc92TSDD0+2uI3w2D86BXBLnNVf03njXIWEyI8jfkk1HqKuZs2ptkYeqd8w==
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
Azur3sucks2017

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

Microsoft Azure is not "_better_" than any other "Cloud"
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
