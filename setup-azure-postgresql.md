# Azure PostgreSQL-as-a-Service

This is a _step-by-step_ guide
to setting up a PostgreSQL Database
on Microsoft Azure!

### 1. On Azure Dashboard Click the "Search" Icon

Click on the search (_magnifying glass_) icon:

![azure-dashboard](https://cloud.githubusercontent.com/assets/194400/26401136/50d3dcfe-407c-11e7-878f-dd2221ce041c.png)

### 2. Type Postgres into the Search input Field

Once the search interface appears, type `postgres` into the field:

![azure-search-for-postgresql](https://cloud.githubusercontent.com/assets/194400/26401268/fd71d0ba-407c-11e7-8ba8-22a2a79b4f38.png)

Then click on the result that says "**Azure Database for PostgreSQL**".
(_that will take you to screen that allows you to create a new database_)

### 3. Click on the "Add" Button to Create a Database

Click on one of the buttons that allows you to add

![azure-postgres-01-dashboard](https://cloud.githubusercontent.com/assets/194400/26401372/8158a30e-407d-11e7-8195-f0b6318d3037.png)


### 4. Complete the Database Creation Form

![azure-postgres-02-creation-form](https://cloud.githubusercontent.com/assets/194400/26444871/0599e5a2-4136-11e7-8f9a-271f85ec8bae.png)

1. Give your database a meaningful name
(_longer is better. spaces aren't allowed_)
2. Select the subscription
(_i.e. how are you paying for the Database resources_)
3. Select a resource group (_we just use the same one as the VPS servers_)
4. Define the username that will be used to login to your Database
(_we chose to keep it obvious for this example, but longer is better_)
5. Create a password.
(_the longer the better. it does not need to be "human readable"_)
for an example of a _long_ and _secure_ password see:
https://www.grc.com/passwords.htm
6. Repeat (_copy-paste_) the same password. <br />
**Tip**: Make a _note_ of this password because
Azure will not "remind" you of it (_it won't be displayed in plaintext_)
and you will need it in a later step.
7. Select the location where you want your PostgreSQL instance to be.
(_we select the **same** as our VPS servers/cluster for lower latency_)
8. Select the _version_ of PostgreSQL you want to use.
(_unless you have a **reason** to select something else,
  pick the current/latest version; in this case 9.6_)
9. Select a Pricing Tier. Pricing depends on your perceived needs.
If you _know_ that you need a certain amount
of storage space and "compute units" then go for more, but for _most_ "simple"
web applications the "Basic" tier is _perfectly fine_.
10. Click "**Create**" to finalise the creation.

## 5.


Environment Variables:
```
export DATABASE_URL=postgres://postgres@pxblog:{your_password}@pxblog.postgres.database.azure.com:5432/{your_database}?ssl=true
export PORT=4000
```
