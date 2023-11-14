const http = require('http')
const Eventemitter = require("events")
const fs = require('fs/promises')


//Handle requests and I am assuming that it handles Response too
const server = http.createServer((request,response) => {
    console.log(request.url)
    //Alter this function so that it will return the requested file
    //consider making it accept a url and then passing that to the readFile method
    let asyncFunction = async (filePath) => {
        console.log(`Initial Path: ${filePath}`)
        try{
            if(filePath === "/"){
                filePath = "./index.html"
                let content = await fs.readFile(`${filePath}`,"utf8")
                console.log(`Final Path: ${filePath}`)
                return content
            }else{
                let content = await fs.readFile(`.${filePath}`,"utf8")
                console.log(`Final Path: .${filePath}`)
                return content
            }
        }catch{
            console.log("read unsuccessful")
        }
    }
    console.log(request.url)
    asyncFunction(request.url).then((content) =>{
        response.end(content)
    })   
})
server.listen(3003, () => {
    console.log("Server 2 is listening on port localhost30...");
  });