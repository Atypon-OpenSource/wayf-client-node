[![npm version](https://badge.fury.io/js/wayf-cloud.png)](https://www.npmjs.com/package/wayf-cloud)

# WAYF Cloud node.js Client
This is a node.js client module for the WAYF Cloud API.
It wraps the WAYF Cloud [REST API](https://wayf-cloud.readme.io/v1/reference) in order to simplify the integration of node.js applications to the WAYF Cloud.



## Usage

### Connect to the WAYF Cloud

```js
const Wayf = require('wayf-cloud');

// connect using an API Key
const wc = new Wayf.client(API_KEY,url);

```

### Register a local device id

```js
const uuidv4 = require('uuid/v4');


let wayfLocal = uuidv4();
var device = await wc.create(wayfLocal);
```

### Save data to the WAYF Cloud
```js

// SAML/Shibboleth IdP
let idp = new Wayf.samlEntity("University of X","sample-saml-entity-id","sample-saml-federation-id");
// Open Athens IdP
let idp = new Wayf.openAthensEntity("University of Y","sample-oa-entity-id","sample-oa-organization-id","sample-oa-scope");
// idp IdP Object
let samlEntity = new Wayf.oAuthEntity("ORCID");

// save the IdP data to the WAYF Cloud
var response = await wc.share(WAYF_LOCAL, idp);

```


### Get the IdP history for a device

```js

let history = await wc.discover(wayfLocal);
// [
//  {
//    "frequency": 20,
//    "last-used": "date",
//    "entity": {
//      "id": 1,
//      "type":"saml",
//      "entityID": "https://example-entity.saml.org"
//    }
//  },
//  {
//    "frequency": 5,
//    "last-used": <date>,
//    "entity": {
//      "id": 2,
//      "type":"oa",
//      "entityID": "https://example-entity.oa.org",
//      "scope": "123doc.com",
//      "organizationID": "5762748"
//     }
//   },
//   {
//     "type":"oauth",
//     "provider": "ORCID",
//   }
// ]

```

### Delete a user's IdP

```js

//get history
let history = await wc.discover(WAYF_LOCAL);

// delete an element from the history
let response = await wc.delete(WAYF_LOCAL,history[0].id)
```
