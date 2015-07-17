options( digits = 16 );

n = 1000
p = 0.01
x =  c( 100, 10, 50 )

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )
