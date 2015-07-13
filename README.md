Probability Density Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) distribution probability mass function (PMF).

The [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function) (PMF) for a [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) random variable is

<div class="equation" align="center" data-raw-text="f(x;n,p)=P(X=x;n,p)=\begin{cases} \textstyle {n \choose x}\, p^x (1-p)^{n-x} & \text{ for } x = 0,1,2,\ldots \\
0 & \text{ otherwise}
\end{cases}" data-equation="eq:pmf_function">
	<img src="https://cdn.rawgit.com/distributions-io/binomial-pmf/2c91ff694b52547e5978337d1826d1ade8be9d0e/docs/img/eqn.svg" alt="Probability mass function (PMF) for a Binomial distribution.">
	<br>
</div>

where `n` is the number of trails and `p` is the success probability.

## Installation

``` bash
$ npm install distributions-binomial-pmf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var pmf = require( 'distributions-binomial-pmf' );
```

#### pmf( x[, options] )

Evaluates the [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function) (PMF) for the [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = pmf( 1 );
// returns 0.5

out = pmf( -1 );
// returns 0

out = returns( 1.5 ):
// returns 0

x = [ 0, 1, 2, 3, 4, 5 ];
out = pmf( x, {
	'n': 5
});
// returns [ 0.03125, 0.15625, 0.3125, 0.3125, 0.15625, 0.03125 ]

x = new Int8Array( x );
out = pmf( x );
// returns Float64Array( [...] )

x = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'int16' );
/*
	[ 0  1
	  2  3
	  4  5 ]
*/

out = pmf( mat, {
	'n': 5
});
/*
	[ 0.03125 0.15625
	  0.3125  0.3125
	  0.15625 0.03125 ]
*/
```

The function accepts the following `options`:

*	__n__: number of trails. Default: `1`.
*	__p__: success probability. Default: `0.5`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) distribution is a function of 2 parameter(s): `n` (number of trails) and `p` ( success probability). By default, `n` is equal to `1` and `p` is equal to `0.5`, i.e. the function evaluates the PMF of a [Bernoulli](https://en.wikipedia.org/wiki/Bernoulli_distribution) distribution. To adjust either parameter, set the corresponding option(s).

``` javascript
var x = [ 0, 1, 2, 3, 4, 5 ];

var out = pmf( x, {
	'n': 4,
	'p': 0.9,
});
// returns [ 1e-04, 0.0036, 0.0486, 0.2916, 0.6561, 0 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,1],
	[2,2],
	[3,3],
	[4,4],
	[5,5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = pmf( data, {
	'accessor': getValue,
	'n': 4,
	'p': 0.9
});
//  returns [ 1e-04, 0.0036, 0.0486, 0.2916, 0.6561, 0 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,1]},
	{'x':[2,2]},
	{'x':[3,3]},
	{'x':[4,4]},
	{'x':[5,5]}
];

var out = pmf( data, {
	'path': 'x/1',
	'sep': '/',
	'n': 4,
	'p': 0.9
});
/*
	[
		{'x':[0,1e-04]},
		{'x':[1,0.0036]},
		{'x':[2,0.0486]},
		{'x':[3,0.2916]},
		{'x':[4,0.6561]},
		{'x':[5,0]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types). Since the output of the function is a probability, i.e. a value between zero and one, the result will be always truncated to zero when choosing an integer data-type unless the specified distribution is degenerate and takes a certain value with probability 1.

``` javascript
var x, out;

x = new Int8Array( [0,1] );

out = pmf( x, {
	'dtype': 'float32'
});
// returns Float32Array( [0.5, 0.5] )

// Works for plain arrays, as well...
out = pmf( [0,1], {
	'dtype': 'float32'
});
// returns Float32Array( [0.5,0.5] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 1, 2, 3, 4, 5 ];

out = pmf( x, {
	'copy': false,
	'n': 4,
	'p': 0.9
});
// returns [ 1e-04, 0.0036, 0.0486, 0.2916, 0.6561, 0 ]

bool = ( x === out );
// returns true

x = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'int16' );
/*
	[ 0  1
	  2  3
	  4  5 ]
*/

out = pmf( mat, {
	'copy': false,
	'n': 5,
	'p': 0.5
});
/*
	[ 0.03125 0.15625
	  0.3125  0.3125
	  0.15625 0.03125 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [PMF](https://en.wikipedia.org/wiki/Binomial_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = pmf( null );
	// returns NaN

	out = pmf( true );
	// returns NaN

	out = pmf( {'a':'b'} );
	// returns NaN

	out = pmf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = pmf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = pmf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

## Examples

``` javascript
var pmf = require( 'distributions-binomial-pmf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pmf( data, {
	'n': 10
});

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = pmf( data, {
	'accessor': getValue,
	'n': 10
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = pmf( data, {
	'path': 'x/1',
	'sep': '/',
	'n': 10
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pmf( data, {
	'n': 10
});

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = pmf( mat );

// Matrices (custom output data type)...
out = pmf( mat, {
	'dtype': 'float32',
	'n': 10
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-binomial-pmf.svg
[npm-url]: https://npmjs.org/package/distributions-binomial-pmf

[travis-image]: http://img.shields.io/travis/distributions-io/binomial-pmf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/binomial-pmf

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/binomial-pmf/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/binomial-pmf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/binomial-pmf.svg
[dependencies-url]: https://david-dm.org/distributions-io/binomial-pmf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/binomial-pmf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/binomial-pmf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/binomial-pmf.svg
[github-issues-url]: https://github.com/distributions-io/binomial-pmf/issues
