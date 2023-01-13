const fs = require('fs');
const http = require('http');

const data= fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const jsonData=JSON.parse(data); 
// const url = require('url');
//**********Http operations********** */
const server=http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName === '/' || pathName === '/home'){
        res.end('Hellow you successfully received response from node server');
    }
    else if(pathName === '/api')
    { 
        res.writeHead(200,{
            'Content-type':'application/json', 
        })
        res.end(data);
    }
    else if(pathName === '/mani')
    {
        res.end('Hellow you got a message from Manikandan, HI !!!!!!!!!!!!');
    }
    else
    {
        res.writeHead(404,{
            'Content-type':'text/html',
            'Custom-Header':'Hellow-Mani-Custom-header'
        })
        res.end('<h1>Page not found</h1>');
    } 
}) 
server.listen(8000,'127.0.0.1',()=>{console.log('Node server started listning port 8000')});
//**********File operation********** */
// const input = fs.readFileSync('./inputs/read.txt','utf-8');
// console.log(input);

// const outputString = ` Name of the persons are ${input}.\n Created date ${Date.now()}`
// fs.writeFileSync('./inputs/write.txt',outputString);
// // console.log('File updated');
// fs.readFile('./inputs/read2.txt','utf-8',(err,data1)=>{
//     if(err) return console.log(`Error !!!! ${err}`)
//     fs.readFile('./inputs/read.txt','utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.writeFile('./inputs/write.txt',`${data1}\n${data2}`,(err) =>{
//             console.log('printed')
//         });
//     });
// });
// console.log('processor ready data');
