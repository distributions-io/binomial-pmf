options( digits = 16 );

n = 10
p = 0.8
x = seq( from = 0, to = 10, by = 2 )

cat( dbinom( x, n, p ), sep = ",\n" )
