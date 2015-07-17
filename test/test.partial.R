options( digits = 16 );

n = 10
p = 0.5
x = c( 0, 2.25, 5 )

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )
