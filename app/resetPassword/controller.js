function Controller ( $routeParams, $location, resetPasswordService, temp_app, $scope ) {
	this.passwordResetToken = $routeParams.prt;
	this.resetPasswordService = resetPasswordService;
	this.$location = $location;
	this.$scope = $scope;

	temp_app.angular_preProcessForAngularView();

	$("#userEmail").focus();
}

Controller.prototype.submit = function () {

	// reset validators
	this.form.$setValidity( 'nonMatchingPassword', true );
	this.form.$setValidity( 'serverError', true );

	if ( !this.form.$valid ) return;

	// check if passwords match
	if ( this.user.password !== this.user.passwordReenter ) {
		this.form.$setValidity( 'nonMatchingPassword', false );
		return;
	}

	this.pending = true;

	//{"url":"https://.....[productionToolsServer]...../api/v2/resources/update_user_passwords","data":"{\"email\":\"senderEmail3@email\",\"newPassword\":\"Password1\",\"newPasswordRepeat\":\"Password1\",\"passwordToken\":\"ryKVBfOZ55p3OJxZ8ivoyo6J50BEbCr0EpJjDWgibY0\"}","httpMethod":"POST"}

	let user = {
		email: this.user.email,
		newPassword: this.user.password,
		newPasswordRepeat: this.user.passwordReenter,
		passwordToken: this.passwordResetToken
	};

	this.resetPasswordService.update( user ).then( value => {

		this.pending = false;

		// TEMP
		if ( value.meta.status !== 200 ) {
			this.form.$setValidity( 'serverError', false );
			// TEMP ----> ugly --->
			this.errorMessage = value.meta.message[ 0 ].userMessage;
			return;
		}

		this.$location.path( '/login' );

	});
};

module.exports = Controller;
