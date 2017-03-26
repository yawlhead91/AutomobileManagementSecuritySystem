import {Activity} from '../activity.js';
import {Gps} from '../gps.js';
import {SecurityStatus} from '../securityStatus.js';

if (Meteor.isServer) {
    Meteor.publish('activity', function(userId) {
        return Activity.find({
            userId: this.userId
        });
    });

    Meteor.publish('gps', function(userId) {
        return Gps.find({
            userId: this.userId
        });
    });

    Meteor.publish('secStat', function(userId) {
        return SecurityStatus.find({
            userId: this.userId
        });
    });
}