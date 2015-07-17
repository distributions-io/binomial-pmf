/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pmf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor pmf', function tests() {

	var n = 500,
		p = 0.5;

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Binomial pmf using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			{'x':100},
			{'x':200},
			{'x':300},
			{'x':400},
			{'x':500}
		];
		actual = new Array( data.length );

		actual = pmf( actual, data, n, p,getValue );

		expected = [
			6.237245964515566e-44,
			1.544255011223464e-06,
			1.544255011223464e-06,
			6.237245964515566e-44,
			3.054936363499709e-151
		];

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pmf( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = pmf( actual, data, n, p, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
