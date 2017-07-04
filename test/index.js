
const chai = require('chai');
const expect = chai.expect;
const WayfClient = require('../lib');
const uuidv4 = require('uuid/v4');
const API_KEY = "test-key";

// GENERATE API KEY:
// curl --request POST \
//   --url https://wayf-cloud-sandbox.literatumonline.com/1/publisher \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Awesome Publisher","code":"GTHB", "contact":{"firstName":"john","lastName":"doe", "email":"john.doe@awesomepublisher.com","phoneNumber":"15619237018"}}'

const wc = new WayfClient('b3ff5c14-07ce-42fe-8ecd-89c91737b58a');

const WAYF_LOCAL = uuidv4();


describe('Create IdP Entity', () => {
    it('for SAML should return SAML Entity Object', async () => {
      let samlEntity = new wc.samlEntity("University of X","sample-saml-entity-id","sample-saml-federation-id");
      expect(samlEntity).to.deep.equal(create_saml_entity_request_body);
    });
    it('for Open Athens should return Open Athens Entity Object', async () => {
      let oaEntity = new wc.openAthensEntity("University of Y","sample-oa-entity-id","sample-oa-organization-id","sample-oa-scope");
      expect(oaEntity).to.deep.equal(create_oa_entity_request_body);
    });
    it('for OAuth should return OAuth Entity Object', async () => {
      let oAuthEntity = new wc.oAuthEntity("ORCID");
      expect(oAuthEntity).to.deep.equal(create_oauth_entity_request_body);
    });
});

describe('Device Creation', () => {
    it('should return an empty device', async () => {
      var device = await wc.create(WAYF_LOCAL);
      expect(device.id).to.equal(WAYF_LOCAL);
    });
});

describe('Sharing an IdP for a device', function() {
    it('should return the IdP', async () => {
      var idp = await wc.share(WAYF_LOCAL,create_saml_entity_request_body);
      expect(idp).to.deep.equal(create_saml_entity_request_body);
    });
});

describe('Device history discovery', () => {
    it('should return an array of IdPs', async () => {
      var history = await wc.discover(WAYF_LOCAL);
      expect(history).to.be.an('array').that.includes(create_saml_entity_request_body);
    });
});

describe('Deleting a suggestion', () => {
    it('should return an array of IdPs', async () => {
      //Get history
      let history = await wc.discover(WAYF_LOCAL);
      let response = await wc.delete(WAYF_LOCAL,history[0].id)
      expect(response).to.exist;
    });
});

///// Test data:
const create_saml_entity_request_body = {
  "entityId": "sample-saml-entity-id",
  "federationId": "sample-saml-federation-id",
  "type" : "SAML",
  "name" : "University of X"
}

const create_oa_entity_request_body = {
  "entityId": "sample-oa-entity-id",
  "organizationId": "sample-oa-organization-id",
  "scope": "sample-oa-scope",
  "type" : "OPEN_ATHENS",
  "name" : "University of Y"
}

const create_oauth_entity_request_body = {
  "provider": "ORCID",
  "type" : "OAUTH"
}
