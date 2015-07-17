/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pmf = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array pmf', function tests() {

	var n = 15,
		p = 0.2;

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Binomial pmf', function test() {
		var data, actual, expected, i;

		data = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
		];
		actual = new Array( data.length );

		actual = pmf( actual, data, n, p );

		expected = [
			0.13194139533312002,
			0.23089744183296002,
			0.25013889531903999,
			0.1876041714892801,
			0.103182294319104,
			0.042992622632959984,
			0.013819057274879974,
			0.0034547643187199991,
			0.00067175972863999943,
			0.00010076395929599991,
			1.1450449919999998e-05,
			9.5420416000000017e-07,
			5.5050239999999997e-08,
			1.9660799999999958e-09,
			3.2768000000000022e-11,
			0,
			0,
			0,
			0,
			0
		];

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pmf( [], [], n, p ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = pmf( actual, data, n, p );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
