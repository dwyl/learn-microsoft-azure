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
