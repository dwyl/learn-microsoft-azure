# Learn Microsoft Azure

![windows-azure-cloud](https://cloud.githubusercontent.com/assets/194400/26023549/0c3ee1a2-37b6-11e7-8cb4-8bf689409df3.png)

Learn how to deploy your Web Application &amp;
Database Server to Microsoft Azure.

## Why?

The decision was made to deploy your work/app to Azure<sup>1</sup>,
now you have the task of making it happen.

## What?

A Step-by-Step guide to deploying your first app on Microsoft Azure.

The first part of this guide focusses on getting a Linux Virtual Machine
launched on Azure. You can then deploy what ever you like to it
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


## How?

> If you don't already have an account on Azure,
go register for one now!
[/**register**-for-**azure**-account.md](https://github.com/dwyl/learn-microsoft-azure/blob/master/register-for-azure-account.md)


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


<br /><br /><br /><br /><br />






### Upload your Public Key to the VPS

cat ~/.ssh/id_rsa.pub | ssh hladmin@healthlocker.uksouth.cloudapp.azure.com "sudo sshcommand acl-add dokku custom-identifier"


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

## tl;dr

<sup>1</sup>Microsoft Azure is not "_better_" than any other "Cloud"
Infrastructure/Platform Provider.
They have implemented a IaaS/PaaS in _response_ to Amazon Web Services;
because they saw their server business being _wiped out_.
Their choice of name "Windows Azure" in 2010 reflects how _utterly clueless_
[Steve Ballmer](https://medium.com/packt-publishing/how-to-be-like-steve-ballmer-cf4c9803d74c)
was about the "Cloud" (_Market_)
that MSFT saw Azure as a way to sell more Windows (_i.e. Server Licenses_)
and not as general purpose platform. _Obviously_ in 2014 when
[Satya Nadella](https://en.wikipedia.org/wiki/Satya_Nadella)
was made CEO of Microsoft Azure was re-branded from "**_Windows_ Azure**"
to "**_Microsoft_ Azure**" they decided to expand
to being a more general purpose IaaS/PaaS provider.
The fact that Nadella was "Executive Vice President" of "Cloud and Enterprise"
before being made CEO helped Microsoft to focus on that segment
of their business when was given the reins.

To be **100% Clear**: we are _only_ using Azure
because one of our clients (NHS) _requires_ us to.
We would _prefer_ to use AWS, Digital Ocean
or Google Could Platform over Azure _every time_.
Not that we think that the _people_ working on the Azure team are "bad"
just that the Company (Microsoft) is [Evil](https://www.reddit.com/r/OutOfTheLoop/comments/2v4ses/why_is_microsoft_so_widely_considered_evil/) and should not be supported.

> Microsoft has _allowed_ their OS to be insecure
which has lead to Ransomeware costing the NHS _real_ Time and Money
e.g: http://www.bbc.co.uk/news/health-39899646
We think the NHS should implement moving _away_ from Microsoft _immediately_.
If anyone _at_ the NHS is reading `this` far and wants to discuss
an ***implementation plan*** for moving away from
[Microsoft's **Monopoly**](http://techrights.org/2016/06/05/microsoft-reputation-laundered),
contact us to discuss,
I will _personally_ work for **FREE** for as long as it takes
to make the NHS 100% Open Source, Transparent
and thus Orders of Magnitude more Cost-effective!!

We _understand_ from a corporate policy/decision-making perspective
that Azure is an _easy_ decision for certain companies/"executives"
 to make given their _existing_ investment/commitment to Microsoft ...
 So we want to _document_ our setup so that it can be followed
 by anyone `else` in the same situation.

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
