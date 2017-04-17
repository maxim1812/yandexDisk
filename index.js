let http = require('http');
let server = http.createServer();
let fs = require('fs');

let YandexDisk = require('yandex-disk').YandexDisk;
let disk = new YandexDisk("maxim.kolotovkin@yandex.ru", "kkxxxkk1996");	
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
		function readFromFile()
		{
			let path = "aaa.txt"; 
			let encoding = "utf8";
			disk.readFile(path, encoding, function(err,s){
				if (err) 
				{
					response.write("Error");					
					response.end();
				}
				else
				{
					function writeToFile(s)
					{
						let path = "aaa.txt"; 
						let content = s + "22______";
						let encoding = "utf8";
						disk.writeFile(path, content, encoding, function(err,s){ 
							if (err) 
							{
								response.write("Error");					
								response.end();
							}
							else
							{
								response.write("Answer: " + content);					
								response.end();
							}
						});	
					}
					
					writeToFile(s);
			
				}
			});		
		}
		
		readFromFile();		
    });
 
});
 
let port = process.env.PORT || 5000;
server.listen(port);

console.log("Server works on port " + port);

