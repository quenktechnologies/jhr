var NODE = true;
var uri = 'http://localhost:5000';

if (typeof window !== 'undefined') {
    console.log('iffffffffffffffffffff');
    NODE = false;
    uri = '//' + window.location.host;
}else {
    console.log('elsedddddddddddddddddddd');
    process.env.ZUUL_PORT = 5000;
    require('./server');
    uri = 'http://localhost:5000';
}