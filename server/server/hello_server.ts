/**
 * Created by mac on 2018/8/1.
 */
import * as http from 'http'

const server = http.createServer((request,response) =>{
    response.end("Hello Node!");
});

server.listen(8000);