function sendToDiscovery(query) {
  return new Promise(function(resolve, reject) {
    var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

    var discovery = new DiscoveryV1({
      username: process.env.DISCOVERY_USERNAME,
      password: process.env.DISCOVERY_PASSWORD,
      version_date: '2018-05-04'
    });

    var environment_id = process.env.DISCOVERY_ENVIRONMENT_ID;
    var collection_id = process.env.DISCOVERY_COLLECTION_ID;

    discovery.query({
      environment_id: environment_id,
      collection_id: collection_id,
      query: 'text:' + query // only querying the text field
    }, function(error, data) {
        if (error) {
          reject(error);
        } else {
          if (data.results == null) {
            console.log("Your call to Discovery was complete, but it didn't return a response. Try checking your Discovery data format.");
            reject(error);
          } else {
            resolve([data.results[0].title,data.results[0].text, data.results[0].url]);
          }
        }
    });
  });
}

// sendToDiscovery('What is the shorthand for intents?');

module.exports = sendToDiscovery;
