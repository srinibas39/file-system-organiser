#!/usr/bin/env node
const fs=require("fs");
const path=require("path")
const helpObj=require("./commands/help");
const organizeObj=require("./commands/organize");
const treeObj=require("./commands/tree")

let inputArr = process.argv.slice(2);



// console.log(inputArr);

//command which we will make tree,organize,help;

let command = inputArr[0];

// Now I will create function for tree , organise and help;





switch (command) {
    case "tree":
       treeObj.treeKey(inputArr[1])
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1])
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please enter correct command");
        break;
}