/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pmf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pmf', function tests() {

	var n = 1000,
		p = 0.01;

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Binomial probability mass function', function test() {
		assert.closeTo( pmf( 100, n, p ), 7.530772e-65, 1e-14 );
		assert.closeTo( pmf( 10, n, p ), 0.1257402111262073, 1e-14 );
		assert.closeTo( pmf( 50, n, p ), 6.750674503834556e-20, 1e-14 );
	});

	it( 'should return `0` if provided a negative number', function test() {
		var val;

		val = pmf( -9, n, p );
		assert.strictEqual( val, 0 );
	});

	it( 'should return `0` if provided x > n ', function test() {
		 var val;

		val = pmf( 1001, n, p );
		assert.strictEqual( val, 0 );
	});

	it( 'should handle corner case where p = 1', function test() {
		assert.strictEqual( pmf( 10, 10, 1 ), 1 );
		assert.strictEqual( pmf( 9, 10, 1 ), 0 );
	});

	it( 'should handle corner case where p = 0', function test() {
		assert.strictEqual( pmf( 0, 10, 0 ), 1 );
		assert.strictEqual( pmf( 9, 10, 0 ), 0 );
	});

});
