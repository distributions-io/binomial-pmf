/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pmf', function tests() {

	var n = 10,
		p = 0.5,
		pmf;

	pmf = partial( n, p );

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Binomial pmf for given parameter values', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the probability mass function', function test() {
		assert.closeTo( pmf( 0 ), 0.0009765625, 1e-14 );
		assert.closeTo( pmf( 2.25 ), 0, 1e-14 );
		assert.closeTo( pmf( 5 ), 0.24609375000000067, 1e-14 );
	});

	it( 'should return a function which returns `0` if provided a negative number', function test() {
		var val = pmf( -9 );
		assert.strictEqual( val, 0 );
	});

	it( 'should handle corner case where p = 1', function test() {
		var pmf;
		pmf = partial( 10, 1 );
		assert.strictEqual( pmf( 10 ), 1 );
		assert.strictEqual( pmf( 9 ), 0 );
	});

	it( 'should handle corner case where p = 0', function test() {
		var pmf;
		pmf = partial( 10, 0 );
		assert.strictEqual( pmf( 0 ), 1 );
		assert.strictEqual( pmf( 9 ), 0 );
	});

});
