# Learn Microsoft Azure

![windows-azure-cloud](https://cloud.githubusercontent.com/assets/194400/26028631/9cdc1840-381c-11e7-9391-73f8cda79fac.png)

Learn how to deploy your Web Application &amp;
Database Server to Microsoft Azure.

## Why?

The decision was made to deploy your work/app to Azure<sup>1</sup>,
now you have the task of making it happen.

## What?

A Step-by-Step guide to deploying your first app on Microsoft Azure.

The first part of this guide focusses on getting a Linux Virtual Machine
launched on Azure. <br /.
You can then deploy what ever you like to it
and it will work _similarly_ to other cloud providers.


After that we move on to deploying a Phoenix Web Application
(_because that is our chosen
[technology stack](https://github.com/dwyl/technology-stack) @dwyl_)
but the process is the same for _any_ stack.

## Who?

Developers who need to deploy to Azure
because their client/employer requires them to.
If you have no prior "Cloud" Infrastructure experience,
you will have no expectations or pre-conceptions.


# How?

> If you don't already have an account on Azure,
go register for one now!
[/**register**-for-**azure**-account.md](https://github.com/dwyl/learn-microsoft-azure/blob/master/register-for-azure-account.md)

## Part 1: Creating a Linux Virtual Machine (VM) Instance

### 1. Go to "Azure Portal Dashboard"

Visit your Azure Dashboard: https://portal.azure.com


### 2. Create a Virtual Machine

![azure-no-vms](https://cloud.githubusercontent.com/assets/194400/26004350/5d2d925e-372d-11e7-9d63-3c5097cf9c17.png)

1. Click on the "Burger" (☰) Menu to expand the service menu
2. Click on "Virtual Machines" in the services menu
3. Click on "+ Add" to add a Virtual Machine

> The Azure Tutorial(s) all assume you have the CLI installed. e.g:
https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-manage-vm
> I'm doing a _step-by-step_ GUI tutorial instead because it's
_way_ more beginner friendly!


### 3. Create Ubuntu `16.04 LTS` Virtual Machine

![azure-create-ubuntu-16 04-lts](https://cloud.githubusercontent.com/assets/194400/26004467/ea050aae-372d-11e7-94f6-fb9e8463208f.png)

1. Search for "Ubuntu LTS"
2. Select the LTS Version which is _currently_ `16.04 LTS`
3. Select the VM from the Right Menu <br >
  Note: Dependent on your screen size, you may need to scroll to the Right to reveal the "Create" Button.
4. Click "Create" button to start the creation process.

![azure-create-button](https://cloud.githubusercontent.com/assets/194400/26009278/fbcec8b2-373f-11e7-8bab-efb67ccd3cdc.png)


### 4. Input the Configuration Details for your VM

You should then see a screen similar to this:

![azure-create-vm-details](https://cloud.githubusercontent.com/assets/194400/26009083/355e65de-373f-11e7-994f-f1ddd00a2105.png)

1. Name: give your VM a meaningful name e.g: `phoenix-prod-1` (_useful if you end up having a cluster of several machines later on..._)
2. VM disk type: SSD (_keep the default_)
3. User name: `azure` (_they don't let you have the username `root` even though which ever username you do pick here has `root priviledges`!... I use `azure` so it's clear which platform my VM is hosted by/on._)
4. Authentication Type: `SSH public key` (_obviously more secure than password_)
5. SSH public key - paste your public key here.
(_if you don't have a public key,
how are you using GitHub...?!_
see: http://stackoverflow.com/questions/3828164/how-do-i-access-my-ssh-public-key ...)
copy your ssh key into your clipboard using this command:
```
pbcopy < ~/.ssh/id_rsa.pub
```
6. Subscription: Free Trial (_obviously_)
7. Resource Group: [x] Create new.
Called it `phoenix-cluster`
8. Location: `West Europe` (_pick what ever is closest to your end-users_)
9. Click "OK" (_finally_!)

### 5. Size: Choose Virtual Machine Size

![azure-create-vm-2](https://cloud.githubusercontent.com/assets/194400/26013750/b2643dee-3751-11e7-8fc6-8de78ecb8d23.png)

Select the _cheapest_ VM available and
then click the "Select" button.


### 6. Confirm the Settings for New Instance

Confirm the settings for your new instance (_leave the defaults they are fine_):

![azure-leave-default-settings](https://cloud.githubusercontent.com/assets/194400/26023339/47bed7b4-37b1-11e7-982a-612909042726.png)

Click on "OK" to confirm.

> nothing.else.is.available@outlook.com

### 7. Instance Summary

![azure-create-vm-4](https://cloud.githubusercontent.com/assets/194400/26023438/2a790cfe-37b3-11e7-8920-c36d822a2808.png)

Once you have confirmed the details, click "OK" to launch your instance.

### 8. Wait for the Instance to be "Provisioned"

Now Wait ...

![azure-instance-creating](https://cloud.githubusercontent.com/assets/194400/26023724/b09b4520-37ba-11e7-9e6f-6f9dc3498c58.png)

Sadly, Azure takes some time to launch.
Go re-fill your water bottle. ;-)

Make a note of the IP address of the instance so that you can login to it in the next step.
Ours VM's IP Address is: **52.232.127.28**.

### 9. Login With SSH

In our case the **user** for the server
(_which we defined in step 4.3 above_) is `azure`
and the IP address of our VM/instance is `52.232.127.28`.
So we login using the following command

```
ssh azure@52.232.127.28
```
![ssh into Azure instance](https://cloud.githubusercontent.com/assets/194400/26024106/b194590a-37c2-11e7-8aee-c7ccd934bc09.png)

You will be asked to _confirm_ you want to _continue_ connecting.
Type Yes and then [return].

### 10. Setup Network Security Rule for VM

In order to allow inbound TCP traffic
into the instance

From the Azure Dashboard, Select "Virtual Machines" then click on your Machine:

![azure-vm-dashboard](https://cloud.githubusercontent.com/assets/194400/26027182/3ba144bc-3801-11e7-84a7-1cb1bfee6fae.png)

Once you are viewing the details for your VM:

![azure-click-network-interface-then-interface](https://cloud.githubusercontent.com/assets/194400/26027266/e9bb302a-3802-11e7-93f7-6cb32739a147.png)

1. Click on "**Network Interfaces**"
2. Click on the name of the interface for you instance in our case: **phoenix-prod-1594**
3. Click on "**Network Security Group**"
4. Click on the the name of your Security Group
in our case "**phoenix-prod-1-nsg**"

![azure-click-network-security-group](https://cloud.githubusercontent.com/assets/194400/26027348/7aaf5e02-3804-11e7-9eaa-0afd2f6a358f.png)

Next you will setup a Firewall rule for the VM.

### 11. Define Inbound HTTP Firewall Rule for the VM

After completing the preceeding step,
you will see the network security group Overview.

![azure-create-inbound-rule](https://cloud.githubusercontent.com/assets/194400/26027411/7d814234-3805-11e7-9204-974bca5568fa.png)

Click on the (_nonsensical_) button to Create
a new inbound security rule.

Then you will see the "Inbound Security Rules"
where you can click on the "**+ Add**" button:

![azure-add-inbound-rule-http](https://cloud.githubusercontent.com/assets/194400/26027568/1460e7e8-3808-11e7-9f5e-61ed064cfada.png)

1. Click on the "**+ Add**" button
2. Select **HTTP** from the list of services (_option "drop-down" list_)
3. Click "**OK**" button to create the new rule.

You should now see the rule in the
**Inbound security rules** list:

![azure-http-rule-added-success](https://cloud.githubusercontent.com/assets/194400/26027612/a77613fa-3808-11e7-9246-a7215626d1ed.png)


### 12. Install & Run NGINX to Test

While logged into the remote machine (the azure VM) run the following three commands:

```sh
sudo apt-get update
sudo apt-get install nginx -y
sudo service nginx start
sudo service nginx status
```
You should see:
![nginx-install](https://cloud.githubusercontent.com/assets/194400/26026944/237fec66-37fd-11e7-8519-326c343ba597.png)
Then:
![nginx-install](https://cloud.githubusercontent.com/assets/194400/26026948/3c9d0512-37fd-11e7-95d2-ddfad453b127.png)
Then:
![nginx-start-status](https://cloud.githubusercontent.com/assets/194400/26027724/df940d8a-380a-11e7-989f-af3052198a77.png)


### 13. Confirm NGINX is Serving the Default Page

Now visit the IP address for your VM in a browser (_in our case:_ http://52.232.127.28/)
and you should expect to see the following:

![nginx-working-on-azure](https://cloud.githubusercontent.com/assets/194400/26026902/77d8fbc8-37fc-11e7-8560-4b2cf585ba6c.png)

## Congratulations Your Azure VM Instance is _Working_!! :-)

After you've tested with NGINX, if you prefer to _remove_ it
(_because you don't need it for serving your app_)
see:
https://askubuntu.com/questions/235347/what-is-the-best-way-to-uninstall-nginx


## Part 2: Deploying Your Application

Before deploying _your_ app to the Azure Instance,
shut down NGINX (_if you still have it running from "Part 1"_)
```
sudo service nginx stop
```

For deploying a Phoenix Framework Web Application,
see:

> **TODO**: Link to `advanced-deployment.md` once PR containing instructions is merged!


### Edit Your `~/.profile` File on Azure Instance to set TCP Port for Phoenix

Your Phoenix Web Application expects to have an environment variable
defined for the TCP PORT which the app will listen on.
In our case we are going to stick with the default and use `4000`.

Run the following command to append the line
`export PORT=4000` to your `~/.profile` file:
```
"echo export PORT=4000" >> ~/.profile
```
Then run the following command to ensure that `~/.profile` file is _loaded_:
```
source ~/.profile
```
You can _confirm_ that the `PORT` environment variable is now define on the VM
by running the `printenv` command:
```
printenv
```
![azure-define-port](https://cloud.githubusercontent.com/assets/194400/26028291/5c29b336-3815-11e7-8ca3-3f595b12579c.png)

### Redirect TCP Port 80 to Port 4000 (where our app is listening)

On the Azure Instance run the following command:
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 4000
```
To _confirm_ the routing from port 80 to 4000 run the following command:
```
sudo iptables -t nat --line-numbers -L
```
![azure-port-redirect-80-to-4000](https://cloud.githubusercontent.com/assets/194400/26028325/1a9ee228-3816-11e7-9dd0-d04fb09d6169.png)

Now when you _deploy_ the app to this instance
it will "_listen_" on PORT 4000,
but the Firewall will re-route `http` requests from port `80` to `4000`.


### Deploy your Phoenix Web App using EDeliver

Once you have configured your Phoenix App to deploy using Edeliver,
simply update the settings of your `.deliver/config` file to
to the VM IP Address and username of your Azure instance:

```
PRODUCTION_HOSTS="52.232.127.28"
PRODUCTION_USER="azure"
DELIVER_TO="/home/azure"
```

Once you have updated the `.deliver/config` file with the Azure VM details,
run these two commands from inside your Phoenix Project (_on your local machine_):

```
mix edeliver deploy release to production
mix edeliver start production
```

You should expect to see the following output:

![deploy-app-to-azure](https://cloud.githubusercontent.com/assets/194400/26028205/9d2f3ca4-3813-11e7-949e-405a09ce2137.png)

### Confirm the Phoenix App is Working in a Web Browser

Visit your app by IP Address in your Web Browser. e.g: http://52.232.127.28

![phoenix-app-working-on-azure](https://cloud.githubusercontent.com/assets/194400/26028344/8572b192-3816-11e7-8e7b-2011da765348.png)


## Part 3: Using the Azure PostgreSQL-as-a-Service Database with Phoenix

see: https://github.com/dwyl/learn-microsoft-azure/issues/5


<br />

# "Advanced" Deployment

## Part 4: High Availability Clustering (_including WebSockest!_)

### Load Balancing

+ Azure **Load Balancer**:
https://azure.microsoft.com/en-gb/services/load-balancer -
All web traffic is handled through the load balancer which performs
_continous_ health checks on the application server(s) and routes
requests in a "round-robin" to balance load.

> Screenshots + full walkthrough to follow.

<!-- ### Clustering Two VMs



### Monitoring

> Use default Azure Monitoring.
 -->

## Background Reading

+ Install NGINX on Ubuntu on Azure:
https://ztirom.at/2016/01/setup-nginx-and-ubuntu-on-azure/
+ Opening Ports on your Azure VM:
http://stackoverflow.com/questions/38155616/azure-ubuntu-vm-endpoints
+ http://www.phoenixframework.org/docs/deployment
+ http://dokku.viewdocs.io/dokku/getting-started/installation/
+ http://dokku.viewdocs.io/dokku/getting-started/install/azure/
+ https://www.microsoft.com/developerblog/real-life-code/2015/10/30/Streamlined-Dokku-Deployment.html
+ https://gist.github.com/henrik/c70e32544e09c1a79841
+ http://blog.pragtechnologies.com/deploying-phoenix-using-dokku-in-azure/

<br /><br /><br /><br /><br />
<sup>1</sup>See: [/tldr.md](https://github.com/dwyl/learn-microsoft-azure/blob/master/tldr.md)
