import {Activity} from '../activity.js';

if (Meteor.isServer) {
    Meteor.publish('activity', function() {
        return Activity.find({
            userId: this.userId
        });
    });
    Meteor.publish('ddpActivity', function(userId) {
        return Activity.find({
            userId: userId
        });
    }, {
        url: "localhost:3000/:0",
        httpMethod: "post"
    });
}