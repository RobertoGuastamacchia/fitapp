const { Service } = require('node-windows');

const service = require('node-windows').Service;

const svc = new Service({
    name:"NodeServer",
    description:'start app',
    script:"F:\\Appl\\backend\\index.js"
})

svc.on('install',function(){
    svc.start();
})

svc.install()