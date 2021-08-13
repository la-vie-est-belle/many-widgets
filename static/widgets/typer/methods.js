const { join } = require('path');
const { readFileSync, existsSync, mkdirSync, writeFileSync, writeFile  } = require('fs');
const packageJSON = require('../../../package.json');

var typer = {
    createComponentsForTyper: function(widgetName) {
        // this.createScriptForTyper(widgetName);
        this.creatreNodeForTyper(widgetName);
    },

    createScriptForTyper: function(widgetName) {
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "mw_" + widgetName + ".ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        Editor.Message.request("asset-db", "create-asset", url, content);
    },

    creatreNodeForTyper: function(widgetName) {
        // first get current scene uuid 
        Editor.Message.request("scene", "query-node-tree").then(function(allNodesInfo) {
            console.log(allNodesInfo.children[0].components)
            let sceneUUID = allNodesInfo.uuid;

            // create a label node under the scene
            Editor.Message.request("scene", "create-node", {parent: sceneUUID,
                                                            components: ["cc.UITransform", "cc.Label"],
                                                            name: "label test",
                                                            type: "cc.Node",
                                                            canvasRequired: true});
        });
    }
}

module.exports = typer;