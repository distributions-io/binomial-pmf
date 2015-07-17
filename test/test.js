/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	pmf = require( './../lib' ),

	// Probability mass function:
	PMF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-binomial-pmf', function tests() {

	it( 'should export a function', function test() {
		expect( pmf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pmf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pmf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pmf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pmf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pmf( values[ i ] ) ) );
		}
	});

	it( 'should compute the Binomial pmf when provided a number', function test() {
		assert.closeTo( pmf( 40, {
			'n': 100,
			'p': 0.8
		}), 2.106604253214116e-18, 1e-14 );
		assert.closeTo( pmf( 80, {
			'n': 100,
			'p': 0.8
		}), 0.0993002148088247, 1e-14 );
	});

	it( 'should evaluate the Binomial pmf when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [ -1, 0, 1, 2 ];
		expected = [
			0, 0.5, 0.5, 0
		];

		actual = pmf( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate...
		actual = pmf( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the Binomial pmf when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ -1, 0, 1, 2 ] );

		expected = new Float64Array([
			0, 0.5, 0.5, 0
		]);

		actual = pmf( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = pmf( data, {
			'copy': false
		});
		expected = new Int8Array([
			0, 0, 0, 0
		]);
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the Binomial pmf element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ -1, 0, 1, 2 ];
		expected = new Int8Array([
			0, 0, 0, 0
		]);

		actual = pmf( data, {
			'dtype': 'int8'
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the Binomial pmf element-wise using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[0,-1],
			[1,0],
			[2,1],
			[3,2],
		];

		expected = [
			0, 0.5, 0.5, 0
		];

		actual = pmf( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = pmf( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the Binomial pmf element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,0]},
			{'x':[1,1]},
			{'x':[2,2]},
			{'x':[3,3]},
			{'x':[4,4]},
			{'x':[5,5]},
			{'x':[6,6]}
		];
		expected = [
			{'x':[0,0.5314410000000001]},
			{'x':[1,0.354294]},
			{'x':[2,0.09841500000000007]},
			{'x':[3,0.01458000000000001]},
			{'x':[4,0.001215,]},
			{'x':[5,5.399999999999994e-05]},
			{'x':[6,1e-6]}
		];

		actual = pmf( data, {
			'path': 'x.1',
			'n': 6,
			'p': 0.1
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[0,0]},
			{'x':[1,1]},
			{'x':[2,2]},
			{'x':[3,3]},
			{'x':[4,4]},
			{'x':[5,5]},
			{'x':[6,6]}
		];
		actual = pmf( data, {
			'path': 'x/1',
			'sep': '/',
			'n': 6,
			'p': 0.1
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}
	});

	it( 'should evaluate the Binomial pmf element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = PMF( i, 25, 0.5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pmf( mat, {
			'n': 25,
			'p': 0.5
		});

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = pmf( mat, {
			'copy': false,
			'n': 25,
			'p': 0.5
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the Binomial pmf element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = PMF( i, 25, 0.5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pmf( mat, {
			'dtype': 'float32',
			'n': 25,
			'p': 0.5
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pmf( [] ), [] );
		assert.deepEqual( pmf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pmf( new Int8Array() ), new Float64Array() );
	});

});
