var TEMPLATE_MAPPING = require( '../../config/SETTINGS' ).TEMPLATE_MAPPING;

function Controller ( $scope, userService, emailValidationService, createLoginService ) {

	this.emailValidationService = emailValidationService;
	this.template = TEMPLATE_MAPPING.CREATE_LOGIN;

	this.login = { email: '', password: '', passwordRepeat: '' };

	$scope.$on( 'newAccountScreenChange', ( event, { form, next } ) => {

		if ( form !== 'createLogin' ) return;

		// reset
		this.form.$setValidity( 'matchPasswords', true );
		this.form.$setValidity( 'emailExists', true );
		this.form.showValidationMessages = false;
		this.form.showEmailExistsMessages = false;

		var userData = userService.getUserData(),
			{ email, password, passwordRepeat } = this.login;

		// additional validation
		if ( password !== passwordRepeat ) {
			this.form.$setValidity( 'matchPasswords', false );
		}

		if ( passwordRepeat === '' ) {
			this.form.$setValidity( 'repeatPassword', false );
		}

		if ( !this.form.$valid ) {
			this.form.showValidationMessages = true;
			return;
		}

		this.emailValidationService.validateEmail({ email: email }).then(function(value){

			var isEmailValid = value.data.valid;

			if(!isEmailValid){ 
				userData.user.email = email;
				userData.user.password = password;
				userData.user.passwordRepeat = passwordRepeat;
				userService.setUserData(userData);
				next(); 
			}
			else{
				$scope.createLogin.form.showValidationMessages = true;
				$scope.createLogin.form.$setValidity( 'emailExists', false );
			}
		});


	});
}

module.exports = Controller;