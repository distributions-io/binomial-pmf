/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pmf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pmf', function tests() {

	var n = 10,
		p = 0.8;

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should compute the Binomial pmf and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':0},
			{'x':2},
			{'x':4},
			{'x':6},
			{'x':8},
			{'x':10},
		];

		data = pmf( data, n, p, 'x' );

		expected = [
			{'x':1.024e-07},
			{'x':7.372799999999991e-05},
			{'x':0.00550502399999999},
			{'x':0.08808038399999996},
			{'x':0.301989888},
			{'x':0.1073741824},
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-14 );
		}

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,6]},
			{'x':[9,8]},
			{'x':[9,10]},
		];

		data = pmf( data, n, p, 'x/1', '/' );
		expected = [
			{'x':[9,1.024e-07]},
			{'x':[9,7.372799999999991e-05]},
			{'x':[9,0.00550502399999999]},
			{'x':[9,0.08808038399999996]},
			{'x':[9,0.301989888]},
			{'x':[9,0.1073741824]},
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-14, 'custom separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pmf( [], n, p, 'x' ), [] );
		assert.deepEqual( pmf( [], n, p, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = pmf( data, n, p, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
