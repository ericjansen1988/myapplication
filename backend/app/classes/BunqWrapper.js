const db = require('../config/db.config.js');
const BunqClientWrapper = require('./BunqClientWrapper')
const BunqJSClient = require("@bunq-community/bunq-js-client").default;
const customStore = require( "@bunq-community/bunq-js-client/dist/Stores/JSONFileStore").default;
const path = require("path");

module.exports = class BunqWrapper {

  constructor() {
  
    this.status = 'STARTING';
    
    this.storage = customStore(path.resolve(__dirname, "../bunq/genericClient.json" ));
    this.genericBunqClient = new BunqJSClient(this.storage);
    this.bunqClients = {}
    
  }
  
  async startup(){
      //alle clients laden
      const allclients = await db.apisettings.findAll({where: {name: 'bunq'}});
      const result = await Promise.all(allclients.map(async (clientsetting) => {
          this.bunqClients[clientsetting.user] = new BunqClientWrapper(clientsetting);
          console.log('loading client ' + clientsetting.user)
          this.bunqClients[clientsetting.user].initialize();
      }))
      console.log(2, 'alles klaar')
  }
  
  async installNewClient(clientsetting){
    this.bunqClients[clientsetting.user] = new BunqClientWrapper(clientsetting);
    await this.bunqClients[clientsetting.user].initialize();
    return this.bunqClients[clientsetting.user];
  }
  
  getGenericClient(){
    //get generic client (to generate keys etc)
    return this.genericBunqClient;
  }
  
  getClient(identifier){
    //get client by identifier
    return this.bunqClients[identifier];
  }
  
  async createSandboxAPIKey(){
      const apiKey = await this.genericBunqClient.api.sandboxUser.post();
      return apiKey;
  }

  
}

