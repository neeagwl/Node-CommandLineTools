#!/usr/bin/env node
const fs=require('fs');
const chalk=require('chalk');
const path=require('path');

const targetDir= process.argv[2] || process.cwd();

fs.readdir(targetDir,async (err,files)=>{
    if(err){
        throw new Error(err);
    }
    const allPromise=files.map(file=>{
        return lstat(path.join(targetDir,file));
    });
    const allstats=await Promise.all(allPromise);
    for(let stat of allstats){
        const idx=allstats.indexOf(stat);
        if(stat.isFile()){
            console.log(chalk.cyan(files[idx]));
        }else{
            console.log(chalk.magenta(files[idx]));
        }
    }
});

const lstat= filename=>{
    return new Promise((resolve,reject)=>{
        fs.lstat(filename,(err,stats)=>{
            if(err){
                reject(err);
            }
            resolve(stats);
        })
    })
}