/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var ordrsJson=require('../../seeds/orders.json');

module.exports = {
	/**
	*
	*
	*/

	find : function  (req, res) {
		// body...
		
		Orders.find({}, function  (err, resOrders) {

			if (err) {
				console.log('could not find ')
			} else{
			return	res.json(resOrders);
			};
			// body...
		})
	},




	load: function  (req, res) {

		var myorder=ordrsJson;

			for (var i=0; i<myorder.length; i++){

				Orders.create(myorder[i], function  (err) {
					// body...
					if (err) {console.log("errror occured while loading data")}

				})
			}

		Orders.find({}, function  (err, data) {
			// body...
			if (err) {
				console.log(err);
			} else{
				delete data.createdAt;
				delete data.updatedAt;
				return res.json(data);
			};
		})

	}
};

