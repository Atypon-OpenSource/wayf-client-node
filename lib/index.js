const config = require('./config');

var request = require('request-promise-native');


const  TYPE_OPEN_ATHENS =  "OPEN_ATHENS";
const  TYPE_OAUTH = "OAUTH";
const  TYPE_SAML = "SAML"


var oAuthProvider = new Map();
////////////  oAuth Providers currently supported in the API
oAuthProvider.set("FACEBOOK","FACEBOOK");
oAuthProvider.set("GOOGLE","GOOGLE");
oAuthProvider.set("TWITTER","TWITTER");
oAuthProvider.set("LINKED_IN","LINKED_IN");
oAuthProvider.set("ORCID","ORCID");
///////////////////////////////////


module.exports.samlEntity = function(name, entityId, federationId) {
  if (!entityId) {
    throw new Error('An Entity ID is required in order to create a SAML Entity.');
  }
  this.name = name;
  this.entityId = entityId;
  this.federationId = federationId;
  this.type = TYPE_SAML;
};

module.exports.openAthensEntity = function(name, entityId, organizationId, scope) {
  if (!entityId && !scope) {
    throw new Error('An Entity ID and a Scope is required in order to create an Open Athens Entity.');
  }
  this.name = name;
  this.entityId = entityId;
  this.organizationId = organizationId;
  this.scope = scope;
  this.type = TYPE_OPEN_ATHENS;
};

module.exports.oAuthEntity = function(provider) {
  if (! oAuthProvider.get(provider)) {
    throw new Error('This oAuth Provider is not supported: ' + provider);
  }

  this.provider = oAuthProvider.get(provider);
  this.type = TYPE_OAUTH;
};


module.exports.client = function(key,url) {
  var URL = url || config.url;

  this.create = (wayfLocal) => {
    let options = {
        method: 'POST',
        uri: URL+'/device/'+wayfLocal,
        headers: makeHeader(key),
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then ((response) => {return response })
      .catch ((err) => {return err });
  };

  this.share = (wayfLocal,data) => {
    let options = {
        method: 'POST',
        uri: URL+'/device/' + wayfLocal + '/history/idp',
        headers: makeHeader(key),
        body: data,
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then ((response) => { return response })
      .catch ((err) => { return err });
  };

  this.discover = (wayfLocal) => {
    let options = {
        method: 'GET',
        uri: URL+'/device/' + wayfLocal + '/history',
        headers: makeHeader(key),
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then ((response) => {return response })
      .catch ((err) => {return err });
  };

  this.delete = (wayfLocal,idpId) => {
    let options = {
        method: 'DELETE',
        uri: URL+'/device/' + wayfLocal + '/history/idp/' + idpId,
        headers: makeHeader(key),
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then ((response) => {return response })
      .catch ((err) => {return err });
  };
}

var makeHeader = (key) => {
  return {
    "Authorization" : "Token " + key
  };
}
