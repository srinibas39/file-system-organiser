const fs=require("fs");
const path=require("path")
const treefn=(dirPath)=>{
   
    if(dirPath==undefined){
       treeHelper(process.cwd(),"");
        return;
    }
    else{
        let dirPathExist=fs.existsSync(dirPath);
        if(dirPathExist){
            treeHelper(dirPath,"")             
        }
        else{
            console.log("Enter correct directory path");
            return;
        }
    }
}
const treeHelper=(dirPath,indent)=>{
    //check whether it is a file or folder
   let isFile=fs.lstatSync(dirPath).isFile();
   if(isFile){
       //file
       let fileName=path.basename(dirPath);
       console.log(indent+"|---"+fileName);

   }
   else{
       //folder
       let dirName=path.basename(dirPath);
       console.log(indent+"|___"+dirName);
       let children=fs.readdirSync(dirPath);
       for(let i=0;i<children.length;i++){
           let childPath=path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t");
       }

   }
}

module.exports={
    treeKey:treefn
}