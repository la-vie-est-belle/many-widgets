const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../package.json');

var ComboBox = {
    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createScript(widgetName);
        })
        .then(function() {
            return self.createPrefab(widgetName);
        })
        .then(function(assetData) {
            return self.createNode(assetData.uuid, widgetName);
        })
        .then(function(newNodeUUID) {
            self.addComponentsForNode(newNodeUUID, widgetName);
        })
    },

    createScript: function(widgetName) {
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW_" + widgetName + ".ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        return Editor.Message.request("asset-db", "create-asset", url, content);
    },

    createPrefab: function(widgetName) {
        let source = join(__dirname, "./assets/MW ComboBox.prefab");
        let target = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW ComboBox.prefab";
        return Editor.Message.request("asset-db", "import-asset", source, target);
    },

    createNode: function(assetUUID, widgetName) {
        /* 
        This new node will be added under the currently selected node.
        If no node selected, scene will the new node's parent.
        */
        let newNodeName = "MW " + widgetName;
        return Editor.Message.request("scene", "create-node", {name: newNodeName, assetUuid: assetUUID});
    },

    addComponentsForNode: function(newNodeUUID, widgetName) {
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
            Editor.Message.request("scene", "create-component", {uuid: newNodeUUID, component: componentName});
        }, 500);
    }
}

module.exports = ComboBox;