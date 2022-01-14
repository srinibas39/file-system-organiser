const fs=require("fs");
const path=require("path")
const types={
    media:["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents:["docx","doc","pdf","xlsx","xls","odt","ods","odp","odf","txt","ps","tex","ipynb"],
    app:["exe","dmg","pkg","deb"]
}

const organizefn=(dirPath)=>{
    //input->directory path given
    //create your own organized directory.
    //Inside the organized directory , create particular directory for particular kind of files
    //copy and cut to the required folder in the organized directory.   
    let destPath;
    if(dirPath===undefined){
        destPath=process.cwd();
        return;
    }
    else{

        //Now path might be wrong or right
        let pathExist=fs.existsSync(dirPath);
        if(pathExist){
           //Now create destination path
           destPath=path.join(dirPath,"organized_folder");
           if(fs.existsSync(destPath)===false){
                fs.mkdirSync(destPath)
           }  
        }
        else{
            console.log("kindly enter the correct path");
            return;
        }

    }
    organizeHelper(dirPath,destPath);
}

const organizeHelper=(src,dest)=>{
    let childNames=fs.readdirSync(src);
    for(let i=0;i<childNames.length;i++){
        let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile(); // differentiating b/w files and folders.
        if(isFile){
            // console.log(childNames[i]);
            let category=getCategory(childNames[i]);
            console.log(childNames[i]+"--->"+category);
            //organize in respective folder
            sendFiles(childAddress,dest,category);
        }
    }
}
const getCategory=(file)=>{
   
    let ext=path.extname(file);
    //remove the dot from the extension
    ext=ext.slice(1);
    for(let type in types){
        let cArr=types[type];
        for(let i=0;i<cArr.length;i++){
            if(ext==cArr[i]){
               return ext;
            }
        }
    }
    return "others";
}

const sendFiles=(src,dest,category)=>{   
    
  let categoryPath=path.join(dest,category);
  if(fs.existsSync(categoryPath)==false){
     fs.mkdirSync(categoryPath);
  }  
  let fileName=path.basename(src);
  let destPath=path.join(categoryPath,fileName);
//   console.log(destPath)
  fs.copyFileSync(src,destPath);
  fs.unlinkSync(src);
  console.log(fileName,"copied to",category);
}

module.exports={
    organizeKey:organizefn
} 