options( digits = 17 );

n = 15
p = 0.2
x = 1:20

cat( dbinom( x, n, p ), sep = ",\n" )
