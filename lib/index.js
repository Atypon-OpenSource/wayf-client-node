const config = require('./config');

var request = require('request-promise-native');


module.exports = function(apikey) {
  this.key = apikey;

  this.samlEntity = function(name, entityId, federationId) {
    this.name = name;
    this.entityId = entityId;
    this.federationId = federationId;
    this.type = "SAML";
  };

  this.openAthensEntity = function(name, entityId, organizationId, scope) {
    this.name = name;
    this.entityId = entityId;
    this.organizationId = organizationId;
    this.scope = scope;
    this.type = "OPEN_ATHENS";
  };

  this.oAuthEntity = function(provider) {
    this.provider = provider;
    // FACEBOOK,
    // GOOGLE,
    // TWITTER,
    // LINKED_IN,
    // ORCID;
    this.type = "OAUTH";
  };

  this.create = (wayfLocal) => {
    let options = {
        method: 'POST',
        uri: config.url+'/device/'+wayfLocal,
        headers: {
          'Authorization': 'Token ' + this.key
        },
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then ((response) => { return response })
      .catch ((err) => { return err });
  };

  this.share = (wayfLocal,data) => {
    let options = {
        method: 'POST',
        uri: config.url+'/device/' + wayfLocal + '/history/idp',
        headers: {
          'Authorization': 'Token ' + this.key
        },
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
        uri: config.url+'/device/' + wayfLocal + '/history',
        headers: {
          'Authorization': 'Token ' + this.key
        },
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then ((response) => { return response })
      .catch ((err) => { return err });
  };

  this.delete = (wayfLocal,idpId) => {
    let options = {
        method: 'DELETE',
        uri: config.url+'/device/' + wayfLocal + '/history/idp/' + idpId,
        headers: {
          'Authorization': 'Token ' + this.key
        },
        json: true // Automatically stringifies the body to JSON
    };
    return request(options)
      .then(
        function(response) {
         console.log("Resolve:",response);
      })
      .catch (
        function(err) {
          console.log("CATCH:", err);
      });
  };
}
