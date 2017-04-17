let http = require('http');
let server = http.createServer();
let fs = require('fs');

let YandexDisk = require('yandex-disk').YandexDisk;
let disk = new YandexDisk("maxim.kolotovkin@yandex.ru", "kkkmmm1996");	
disk.cd("/");


server.on('request', function(request, response)
{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.writeHead(200);	
 
    request.on('data', function(x)
    {
        
    });
	
    request.on('end', function()
    {	
		let answer = "";
		let flag = false;
		
		function readFromFile()
		{
			let path = "aaa.txt"; 
			let encoding = "utf8";
			disk.readFile(path, encoding, function(err,s){
				answer = s;
				flag = true;
				console.log("Answer = " + answer);
			});		
		}
		
		readFromFile();
		
		let t1;
		
		function prover()
		{
			console.log("Wait...");
			if(flag == true)
			{
				clearInterval(t1);
				
				console.log("New Answer = " + answer);

				function writeToFile(s)
				{
					let path = "aaa.txt"; 
					let content = s;
					let encoding = "utf8";
					disk.writeFile(path, content, encoding, function(err,s){ 
						
					});	
				}
				
				writeToFile(answer + "___1_");
				
				response.write("OK");					
				response.end();
			}
		}
		
		t1 = setInterval(prover,50);
		
    });
 
});
 
let port = process.env.PORT || 5000;
server.listen(port);

console.log("Server works on port " + port);

