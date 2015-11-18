var Controller = require('./controller');

module.exports = function ( module ) {

  module
    .controller( 'EmbeddableController', [ '$rootScope', '$scope', '$location', '$routeParams', Controller ] );
};