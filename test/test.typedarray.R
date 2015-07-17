options( digits = 16 );

n = 100
p = 0.2
x = 1:10

cat( dbinom( x, n, p ), sep = ",\n" )
