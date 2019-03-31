const db = require('../config/db.config.js');
const Rekening = db.rekeningen;
var moment = require('moment');


// Alle rekeningen gegroepeerd per rekening
exports.groupedOverview = (req, res) => {
	Rekening.findAll({
   		attributes: ['rekening', 
     		[db.sequelize.fn('SUM', db.sequelize.col('month_1')), 'totaal_1'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_2')), 'totaal_2'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_3')), 'totaal_3'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_4')), 'totaal_4'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_5')), 'totaal_5'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_6')), 'totaal_6'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_7')), 'totaal_7'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_8')), 'totaal_8'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_9')), 'totaal_9'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_10')), 'totaal_10'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_11')), 'totaal_11'],
			[db.sequelize.fn('SUM', db.sequelize.col('month_12')), 'totaal_12']], 
        order: [
            ['rekening', 'ASC'],
        ],		
   		group: ["Rekening.rekening"]
 	}).then(rekeningen => {
	  // Send all rekeningen to Client
	  res.send(rekeningen);
	});
};
