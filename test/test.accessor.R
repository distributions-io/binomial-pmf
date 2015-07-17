options( digits = 16 );

n = 500
p = 0.5
x = seq( from = 100, to = 500, by = 100 )

cat( dbinom( x, n, p ), sep = ",\n" )
