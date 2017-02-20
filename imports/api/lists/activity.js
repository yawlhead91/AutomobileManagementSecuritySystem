import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Activity = new Mongo.Collection('activity');

ActivitySchema = new SimpleSchema({
	date: {
		type: Date,
		label: "date",
	},
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
	imagepath: {
		type: String
	}
});

Activity.allow({
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
	insertActivity: function(userId, long, lat, image){
		Activity.insert({
			date: new Date(),
			userId: userId,
			long: long,
			lat: lat,
			imagepath: image
		})
	}
});


Activity.attachSchema( ActivitySchema );