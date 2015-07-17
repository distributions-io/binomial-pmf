/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pmf = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array pmf', function tests() {

	var n = 100,
		p = 0.2;

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Binomial pmf', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10
		]);
		actual = new Float64Array( data.length );

		actual = pmf( actual, data, n, p );

		expected = new Float64Array([
			5.092589940836177e-09,
			6.302080051784738e-08,
			5.146698708957596e-07,
			3.120186092305547e-06,
			1.49768932430666e-05,
			5.928353575380548e-05,
			0.000199023298602061,
			0.0005784114615622392,
			0.001478162623992388,
			0.003362819969582687
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pmf( new Int8Array(), new Int8Array(), n, p ), new Int8Array() );
	});

});
