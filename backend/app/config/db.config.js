const env = require('./env.js');
 
const Sequelize = require('sequelize');
var sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './database.sqlite'
});

var sequelizeDomoticz = new Sequelize('domoticzDB', null, null, {
    dialect: "sqlite",
    storage: '/home/pi/domoticz/domoticz.db'
});

 
const db = {};
 
db.sequelize = sequelize;
db.sequelizeDomoticz = sequelizeDomoticz;
 
//Models/tables
db.customers = require('../models/customer.model.js')(sequelize, Sequelize);
db.events = require('../models/event.model.js')(sequelize, Sequelize);
db.config = require('../models/config.model.js')(sequelize, Sequelize);
db.rekeningen = require('../models/rekening.model.js')(sequelize, Sequelize);
db.meterstanden = require('../models/meterstanden.model.js')(sequelize, Sequelize);

//Domoticz tabellen
db.multimeter = require('../models/domoticz.multimeter.model.js')(sequelizeDomoticz, Sequelize);
db.multimeter_calendar = require('../models/domoticz.multimeter_calendar.model.js')(sequelizeDomoticz, Sequelize);
db.meter = require('../models/domoticz.meter.model.js')(sequelizeDomoticz, Sequelize);
db.meter_calendar = require('../models/domoticz.meter_calendar.model.js')(sequelizeDomoticz, Sequelize);
 
module.exports = db;
