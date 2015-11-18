var SERVER = require( '../../js/CONFIG' ).SERVER;

function Controller ( $location, resetPasswordRequestService ) {

	this.$location = $location;
	this.resetPasswordRequestService = resetPasswordRequestService;
}

Controller.prototype.submit = function () {

	// reset validator
	this.form.$setValidity( 'serverError', true );

	if ( !this.form.$valid ) return;

	this.pending = true;

	var urlRoot = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + SERVER.WEB_ROOT;

	var passwordResetUrl = urlRoot.replace( 'http:', 'https:' ) + '/index.aspx#/resetpassword';

	this.resetPasswordRequestService.reset( { email: this.user.email, passwordResetUrl: passwordResetUrl } ).then( value => {

		this.pending = false;

		// TEMP
		if ( value.meta.status !== 200 ) {
			this.form.$setValidity( 'serverError', false );
			// TEMP ----> ugly --->
			this.errorMessage = value.meta.message[ 0 ].userMessage;
			return;
		}

		this.success = true;
	});
};

module.exports = Controller;
