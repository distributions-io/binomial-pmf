/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	pmf = require( './../lib/matrix.js' ),

	// Probability mass function:
	PMF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix pmf', function tests() {

	var n = 25,
		p = 0.5,
		out,
		mat,
		d1,
		d2,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i;
		d2[ i ] = PMF( i, n, p );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out = matrix( d2, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			pmf( matrix( [10,10] ), mat, n, p );
		}
	});

	it( 'should evaluate the Binomial pmf for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = pmf( actual, mat, n, p );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( pmf( out, mat, n, p ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( pmf( out, mat, n, p ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( pmf( out, mat, n, p ).data, expected );
	});

});
