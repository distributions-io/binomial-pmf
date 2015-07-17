options( digits = 16 );

n = 25
p = 0.5
x =  0:24

cat( dbinom( x, n, p ), sep = ",\n" )
cat( "\n" )
