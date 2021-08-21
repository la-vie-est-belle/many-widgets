const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../package.json');

var BeginnerGuide = {
    parentNodeUUID: "",
    bgNodeUUID: "",
    instructionNodeUUID: "",

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
            Editor.Message.request("scene", "create-node", {parent: newParentNodeUUID, name: "background"}).then(function(newChildNodeUUID){self.bgNodeUUID=newChildNodeUUID;});
            Editor.Message.request("scene", "create-node", {parent: newParentNodeUUID, name: "instruction"}).then(function(newChildNodeUUID){self.instructionNodeUUID=newChildNodeUUID});
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
            Editor.Message.request("scene", "create-component", {uuid: self.parentNodeUUID, component: "cc.Mask"});

            /* Add cc.Sprite for child node. */
            Editor.Message.request("scene", "create-component", {uuid: self.bgNodeUUID, component: "cc.Sprite"});
            Editor.Message.request("scene", "create-component", {uuid: self.bgNodeUUID, component: "cc.BlockInputEvents"});
            Editor.Message.request("scene", "create-component", {uuid: self.instructionNodeUUID, component: "cc.Label"});
        }, 500);
    }
}

module.exports = BeginnerGuide;