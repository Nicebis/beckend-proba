const http = require("http")
const fs = require("fs")
const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        },ms)
    })
}
const readFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err,data) => {
            if(err) reject(err)
            else resolve(data)   
    })    
})}

const server = http.createServer(async (request, response) => {
    switch (request.url){
        case "/home":{
            try {
            const data = await readFiles("HtmlFiles/Sait.html")
            response.write(data)
            response.end()
            break;
            }catch(err) {
                response.write("YOU do not true")
                response.end()    
            }
        }
        case "/about":{
            await wait(3000)
            response.write("ABOUT YOU")
            response.end()
            break;
        }
        default:{
            response.write("404 YOU MISTAKE")
            response.end()
        }

    }
})

server.listen(3003)