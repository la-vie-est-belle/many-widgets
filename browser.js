"use strict";
const { join } = require('path');
const { existsSync } = require('fs');
const packageJSON = require('./package.json');


exports.methods = {
    openPanel() {  
        Editor.Panel.open(packageJSON.name);
    },
},

exports.load = function() {
    console.log('many widgets loaded');
    createFolderForPlugin();

},

exports.unload = function(){
    console.log('many widgets unloaded')
};


let createFolderForPlugin = function() {
    /*
        create a special folder for plugin more-widgets
        assests created by this plugin will be put here
    */
    let pluginFolderPath = join(Editor.Project.path, "assets/many-widgets");

    if (!existsSync(pluginFolderPath)){
        let url = "db://assets/" + packageJSON.name;
        Editor.Message.request("asset-db", "create-asset", url);
        console.log("The folder for plugin more-widgets has been created.")
    }


}