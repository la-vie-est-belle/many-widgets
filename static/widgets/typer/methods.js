const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../package.json');

var Typer = {
    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createScript(widgetName);
        })
        .then(function() {
            return self.createNode(widgetName);
        })
        .then(function(newNodeUUID) {
            self.addComponentsForNode(newNodeUUID, widgetName);
        });
    },

    createScript: function(widgetName) {
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW_" + widgetName + ".ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        return Editor.Message.request("asset-db", "create-asset", url, content);
    },

    createNode: function(widgetName) {
        /* 
        This new node will be added under the currently selected node.
        If no node selected, scene will the new node's parent.
        */
        let newNodeName = "MW " + widgetName;
        return Editor.Message.request("scene", "create-node", {name: newNodeName});
    },

    addComponentsForNode: function(newNodeUUID, widgetName) {
        /*
        Add components for this node.
        Thought I could just use create-node to add components, but failed. Don't know why.
        */
        Editor.Message.request("scene", "create-component", {uuid: newNodeUUID, component: "cc.Label"});

        /* 
        Must use setTimeout. 
        Otherwise, the editor will report <fail to get class>. 
        */
        setTimeout(function() {
            let componentName = "MW"+ widgetName;
            Editor.Message.request("scene", "create-component", {uuid: newNodeUUID, component: componentName});
        }, 500);
    }
}

module.exports = Typer;