options( digits = 16 );

cat( "number:\n\n" )

n = 100
p = 0.8


cat( dbinom( 40, n, p ), sep = ",\n" )
cat( dbinom( 80, n, p ), sep = ",\n" )
cat( "\n" )

cat( "array:\n\n" )
p = 0.5
n = 1
x = c( -1, 0, 1, 2 )

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )

cat( "typed-array:\n\n" )
p = 0.5
n = 1
x = c( -1, 0, 1, 2 )

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )

cat( "accessor:\n\n" )
p = 0.5
n = 1
x = c( -1, 0, 1, 2 )

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )

cat( "deepset:\n\n" )
p = 0.1
n = 6
x = 0:6

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )

cat( "matrix:\n\n" )
p = 0.5
n = 25
x = 0:24

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )

cat( "matrix (float32):\n\n" )
p = 0.5
n = 25
x = 0:24

cat( dbinom( x, n, p ), sep = ",\n" )
