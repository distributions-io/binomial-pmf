'use strict';

// MODULES //

var partial = require( './partial.js' );


// PMF //

/**
* FUNCTION: pmf( out, arr, n, p, accessor )
*	Evaluates the probability mass function (PMF) for a Binomial distribution with number of trails `n` and success probability `p` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} n - number of trails
* @param {Number} p - success probability
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pmf( y, x, n, p, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( n, p );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION pmf()


// EXPORTS //

module.exports = pmf;
