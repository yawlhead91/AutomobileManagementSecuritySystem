import {Activity} from '../../api/lists/activity.js';

Meteor.startup(() => {
    // code to run on server at startup
    if (Meteor.isServer) {

        // Global API configuration
        var Api = new Restivus({
            prettyJson: true,
            useDefaultAuth: true,
        });


        Api.addCollection(Meteor.users, {
            excludedEndpoints: ['getAll', 'put', 'post', 'delete', 'patch'],
            routeOptions: {
                authRequired: true
            },
            endpoints: {
                post: {
                    authRequired: false
                }
            }
        });

        // Maps to: /api/articles/:id
        Api.addRoute('alert', {
            authRequired: true
        }, {
            post: function() {
                //console.log(this)
                var id = this.request.headers['x-user-id'];
                var lat = parseFloat(this.request.headers['lat']);
                var long = parseFloat(this.request.headers['long']);
                var image = this.request.headers['image'];

                

                if (id && long && lat && image) {
                    var fa = geocodeLatLng(lat, long);
                    Meteor.call('insertActivity',  id, long, lat, image, fa[0].formattedAddress);
                    return {
                    	status: "successfull",
                    	message: "POST Successfull"
                    }
                }else {
                    return {
                        statusCode: 400,
                        body: {
                            status: "fail",
                            message: "Unable to add data"
                        }
                    }
                }
            },
        });

        Api.addRoute('status', {
            authRequired: true
        }, {
            get: function() {
                //console.log(this)
                var id = this.request.headers['x-user-id'];

                if (id) {
                    var data = Activity.findOne({userId: id}, {
                        sort: {
                            date: -1,
                            limit: 1
                        }
                    });

                    if(data){
                        return {
                            status: data.status,
                            message: "POST Successfull"
                        }
                    }else{
                        return {
                            status: "fail",
                            message: "No data found"
                        }
                    }
                    
                } else {
                    return {
                        statusCode: 400,
                        body: {
                            status: "fail",
                            message: "Unable to retrive data"
                        }
                    }
                }
            },
        });


    }
});

function geocodeLatLng(lati, longi) {
    var geo = new GeoCoder({
    httpAdapter: "https",
    apiKey: 'AIzaSyCOzfISoah8IT6BVNBoq3rdEmboa9Hox98'
    });
    var result = geo.reverse(lati, longi);
    return result;
}