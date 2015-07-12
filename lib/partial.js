'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( n, p )
*	Partially applies number of trails `n` and success probability `p` and returns a function for evaluating the probability density function (PDF) for a Binomial distribution.
*
* @param {Number} n - number of trails
* @param {Number} p - success probability
* @returns {Function} PDF
*/
function partial( n, p ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Binomial distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
