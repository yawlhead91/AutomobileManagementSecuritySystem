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
        url: "http://13.92.135.184/:0",
        httpMethod: "get"
    });
}