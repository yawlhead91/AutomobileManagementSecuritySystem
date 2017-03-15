import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Gps = new Mongo.Collection('gps');

gpsSchema = new SimpleSchema({
	userId: {
		type: String,
	},
	long: {
		type: Number,
		decimal: true
	},
	lat: {
		type: Number,
		decimal: true
	},
	gpsId: {
		type: String
	},
});

Gps.allow({
	insert: function (userId, doc) {
		// the user must be logged in, and the document must be owned by the user
		return !!userId;
	},
	update: function (userId, doc) {
		// can only change your own documents
		return !!userId;
	},
	remove: function (userId, doc) {
		// can only remove your own documents
		return doc.owner === userId;
	},
	fetch: ['owner']
});


Meteor.methods({
	insertGps: function(userId, long, lat, gpsId){
		Activity.insert({
			userId: userId,
			long: long,
			lat: lat,
			gpsId: gpsId,
		});
	},
});


Gps.attachSchema( gpsSchema );