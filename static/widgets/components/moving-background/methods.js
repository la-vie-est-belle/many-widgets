const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../../package.json');

var MovingBackground = {
    parentNodeUUID: "",
    bg1NodeUUID: "",
    bg2NodeUUID: "",

    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createScript(widgetName);
        })
        .then(function() {
            return self.createNode(widgetName);
        })
        .then(function() {
            self.addComponentsForNode(widgetName);
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
        let self = this;
        let newNodeName = "MW " + widgetName;
        return Editor.Message.request("scene", "create-node", {name: newNodeName}).then(function(newParentNodeUUID) {
            self.parentNodeUUID = newParentNodeUUID;
            Editor.Message.request("scene", "create-node", {parent: newParentNodeUUID, name: "Backgraound 1"}).then(function(newChildNodeUUID){self.bg1NodeUUID=newChildNodeUUID;});
            Editor.Message.request("scene", "create-node", {parent: newParentNodeUUID, name: "Backgraound 2"}).then(function(newChildNodeUUID){self.bg2NodeUUID=newChildNodeUUID});
        });
    },

    addComponentsForNode: function(widgetName) {
        /*
        Add components for this node.
        Thought I could just use create-node to add components, but failed. Don't know why.
        */

        /* 
        Must use setTimeout. 
        Otherwise, the editor will report <fail to get class>. 
        */
        let self = this;
        setTimeout(function() {
            /* Add script for parent node. */
            let componentName = "MW"+ widgetName;
            Editor.Message.request("scene", "create-component", {uuid: self.parentNodeUUID, component: componentName});
            
            /* Add cc.Sprite for child node. */
            Editor.Message.request("scene", "create-component", {uuid: self.bg1NodeUUID, component: "cc.Sprite"});
            Editor.Message.request("scene", "create-component", {uuid: self.bg2NodeUUID, component: "cc.Sprite"});
        }, 500);
    }
}

module.exports = MovingBackground;