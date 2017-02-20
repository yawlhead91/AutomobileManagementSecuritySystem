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
                console.log(this.request.headers)
                var id = this.request.headers['x-user-id'];
                var lat = parseFloat(this.request.headers['lat']);
                var long = parseFloat(this.request.headers['long']);
                var image = this.request.headers['image'];



                if (id && long && lat && image) {
                    Meteor.call('insertActivity',  id, long, lat, image);
                    return {
                    	status: "successfull",
                    	message: "POST Successfull"
                    }
                }else {
                    return {
                        statusCode: 400,
                        body: {
                            status: "fail",
                            message: "Unable to add article"
                        }
                    }
                }
            },
        });


    }
});