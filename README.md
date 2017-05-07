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


### 0. Go to "Azure Portal Dashboard"

Visit your Azure Dashboard: https://portal.azure.com


### 2. Create a Virtual Machine

![azure-no-vms](https://cloud.githubusercontent.com/assets/194400/26004350/5d2d925e-372d-11e7-9d63-3c5097cf9c17.png)

1. Click on the "Burger" (☰) Menu to expand the service menu
2. Click on "Virtual Machines" in the services menu
3. Click on "+ Add" to add a Virtual Machine

> The Azure Tutorial(s) all assume you have the CLI installed. e.g:
https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-manage-vm




### 3. Create Ubuntu `16.04 LTS` Virtual Machine

![azure-create-ubuntu-16 04-lts](https://cloud.githubusercontent.com/assets/194400/26004467/ea050aae-372d-11e7-94f6-fb9e8463208f.png)

1. Search for "Ubuntu LTS"
2. Select the LTS Version which is _currently_ `16.04 LTS`
3. Select the VM from the Right Menu <br >
  Note: Dependent on your screen size, you may need to scroll to the Right to reveal the "Create" Button.
4. Click "Create" button to start the creation process.

![azure-create-button](https://cloud.githubusercontent.com/assets/194400/26009278/fbcec8b2-373f-11e7-8bab-efb67ccd3cdc.png)



### X. Login With SSH


In our case the user for the server is `hladmin`
and the IP address is `51.140.45.21`.

```
ssh hladmin@51.140.45.21
```


### Upload your Public Key to the VPS

cat ~/.ssh/id_rsa.pub | ssh hladmin@healthlocker.uksouth.cloudapp.azure.com "sudo sshcommand acl-add dokku custom-identifier"


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
