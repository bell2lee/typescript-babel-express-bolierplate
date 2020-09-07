import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';

export type RestAPIMethod = 'get'|'post'|'patch'|'options'|'put';

function main(){
    const app = express();

    app.use(express.json());

    fs.readdir('./src/api', function(err, filelist){
        filelist.forEach(file => {
            const routeName = file.replace('.ts', '');
            const route = require('./api/' + file);
            // console.log(route);
            route.forEach((rut:{url:string, method: RestAPIMethod, handler:any}) => {
                console.log(rut);
                app[rut.method]('/' + routeName + rut.url, rut.handler);
            });
        });
    });

    app.listen(4000,()=>{
        console.log('start on http://127.0.0.1:4000/')
    });
}

main();
