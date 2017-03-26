import '../../ui/override/input.html';
import '../../ui/override/form.html';

Template['override-atTextInput'].replaces('atTextInput');
Template['override-atPwdForm'].replaces('atPwdForm');

AccountsTemplates.addFields([
	{	
		_id: 'firstName',
		type: 'text',
		displayName: 'First Name',
		required: true,
	},
	{	
		_id: 'surname',
		type: 'text',
		displayName: 'Surname Name',
		required: true,
	},
]);


AccountsTemplates.configure({
    showForgotPasswordLink: true,
});

// Define these routes in a file loaded on both client and server
AccountsTemplates.configureRoute('signIn', {
  name: 'dashboard',
  path: '/dashboard'
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password'
});
