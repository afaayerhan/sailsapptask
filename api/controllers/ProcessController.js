/**
 * ProcessController
 *
 * @description :: Server-side logic for managing processes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var processJson=require('../../seeds/processing.json');

module.exports = {

	processGet:function  (req, res) {
		// body...
		var id =req.param('id');

    var myquery={};
    if(id) {
      Process.find({orderId:id}, function (err, resOrders) {
        // body...
        if (err) {
          console.log("could not find orders" + err);
        } else {
          delete resOrders.createdAt;
          delete resOrders.updatedAt;

          return res.json(resOrders);
        };
      })

    }
    else{
      Process.find({}, function (err, resOrders) {
        // body...
        if (err) {
          console.log("could not find orders" + err);
        } else {
          delete resOrders.createdAt;
          delete resOrders.updatedAt;

          return res.json(resOrders);
        };
      })
    }
	},

	processPost: function  (req, res) {
		// body...
	var	 id =req.param('id'); // Express 4 // req.param('id') express < 4
	console.log(id);

	Process.find({orderId:id}, function  (err, result) {

			if (err) {
				console.log(" error finding orderId in process "+ err);
			}

			else {

				if(result[0].orderId){
					var incre=result[0].processed+1;
            console.log('data to be updated' + result[0]);
          //before update is done check if the number of allocated is equal or greater than processesed
        Orders.find({id:result[0].orderId}, function (err, data){
            if(err){}
            else {

             if( data[0].allocated <=result[0].processed){
               incre=result[0].processed;
         return  res.json({message:"alloc is equel or less than processed"});

             }
              else  {
               Process.update({orderId:result[0].orderId}, {processed:incre}, function  (err, updateData) {
                 // body...
                 if (err) {
                   console.log('could not update record with  ' + id + " " + err);
                 };

                 delete updateData[0].createdAt;
                 delete updateData[0].updatedAt;

                 return	res.json(updateData[0]); /// update always returns array of objects so i'm just taking the first object;
               } )
             }
            }
          })

				}
				else{
						// create a new process document for the document with that id
						console.log(id);
					Process.create({orderId:id, processed:1}, function  (err, createdProcess) {
						// body...
						if (err) {
							console.log('could not create new Process for orderId:' +id+ ''+ err);
						}
						else {
							delete createdProcess.createdAt;
							delete createdProcess.updatedAt;


							return res.json(createdProcess);
						}
					})
				}
			}
	})

},




	load: function  (req, res) {

		var myprocess=processJson;

			for (var i=0; i<myprocess.length; i++){
				delete myprocess[i].id;
				Process.create(myprocess[i], function  (err) {
					// body...
					if (err) {console.log("errror occured while loading data")}

				})
			}

		Process.find({}, function  (err, data) {
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

