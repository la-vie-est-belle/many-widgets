const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../../package.json');


var Magnifier = {
    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createScript(widgetName);
        })
        .then(function() {
            self.createRT(widgetName);
            self.createPNG(widgetName);
            return Promise.resolve();
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
        console.warn("Many Widgets放大镜效果：Cocos Creator 版本在3.5及以后的用户请把自动生成的render-texture文件删除，再通过右键菜单手动创建一个渲染纹理(Render Texture)文件作为替代即可，文件内容无需作任何修改。");
        console.warn("Many Widgets Magnifier：If you are using Cocos Creator 3.5 or newer, please delete this render-texture file and create one manually in replacement. No need to make any changes to the created file.");
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW_" + widgetName + ".ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        return Editor.Message.request("asset-db", "create-asset", url, content);
    },

    createPrefab: function(widgetName) {
        let source = join(__dirname, "./assets/MW Magnifier.prefab");
        let target = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW Magnifier.prefab";
        return Editor.Message.request("asset-db", "import-asset", source, target);
    },

    createRT: function(widgetName) {
        let source = join(__dirname, "./assets/render-texture.rt");
        let target = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "render-texture.rt";
        return Editor.Message.request("asset-db", "import-asset", source, target);
    },

    createPNG: function(widgetName) {
        let source = join(__dirname, "./assets/magnifier.png");
        let target = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "magnifier.png";
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
        setTimeout(function() {
            /* Add script for parent node. */
            let componentName = "MW"+ widgetName;
            Editor.Message.request("scene", "create-component", {uuid: newNodeUUID, component: componentName});
        }, 500);
    }
}

module.exports = Magnifier;