import '../../ui/layouts/landing/landing.js';
import '../../ui/layouts/dashboard/dashboard.js';

FlowRouter.route('/',{
	 name: 'entry',
	 title: 'Entry',
	 action() {
	 	if(Meteor.userId()){
	 		FlowRouter.go('dashboard');
	 	}else{
	 		FlowRouter.go('landing');
	 	}
	 },
});

FlowRouter.route('/dashboard', {
	 name: 'dashboard',
	 action() {
	 	BlazeLayout.render('Dashboard');
	 },
	 title: 'Dashboard',
});

FlowRouter.route('/landing', {
	 name: 'landing',
	 action() {
	 	BlazeLayout.render('Landing');
	 },
	 title: 'Landing',
});






