var Service = require('node-windows').Service;
var svc = new Service({
 name:'Service EasyPermitARS',
 description: 'Node.js service description goes here.',
 script: 'C:\\backend\\backend\\index.js'
});

svc.on('install',function(){
 svc.start();
});

svc.install();