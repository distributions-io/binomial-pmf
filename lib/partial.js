'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer'),
	binomcoefln = require( 'compute-binomcoefln/lib/number.js' );


// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log,
	ln1p = require('log1p');


// PARTIAL //

/**
* FUNCTION: partial( n, p )
*	Partially applies number of trails `n` and success probability `p` and returns a function for evaluating the probability mass function (PMF) for a Binomial distribution.
*
* @param {Number} n - number of trails
* @param {Number} p - success probability
* @returns {Function} PMF
*/
function partial( n, p ) {

	/**
	* FUNCTION: pmf( x )
	*	Evaluates the probability mass function (PMF) for a Binomial distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PMF
	*/
	if ( p === 0 ) {
		return function pmf( x ) {
			return ( x === 0 ) ? 1 : 0;
		};
	}

	if ( p === 1 ) {
		return function pmf( x ) {
			return ( x === n ) ? 1 : 0;
		};
	}

	return function pmf( x ) {
		if ( isNonNegativeInteger( x ) ) {
			if ( x > n ) {
				return 0;
			}
			return exp( binomcoefln( n, x ) + x * ln( p ) + ( n - x ) * ln1p( -p ) );
		}
		return 0;
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
