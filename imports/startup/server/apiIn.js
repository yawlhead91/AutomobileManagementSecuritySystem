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
                var id = this.request.headers['x-user-id'];
                if (id) {
                    Meteor.call('insertActivity', "123", "34", "/path/test");
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