// ----------------------------
// Location
//-----------------------------

/**
 * Provides a wrapper around an object containing
 * latitude and longitude properties
 */


var Location = function ( attributes ) {

  this.latitude  = attributes.latitude
  this.longitude = attributes.longitude

}

module.exports = Location