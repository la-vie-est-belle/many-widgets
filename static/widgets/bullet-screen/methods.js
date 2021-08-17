const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../package.json');

var BulletSceen = {
    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createScript(widgetName);
        })
        .then(function() {
            return self.createPrefab(widgetName);
        });
    },

    createScript: function(widgetName) {
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW_" + widgetName + ".ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        return Editor.Message.request("asset-db", "create-asset", url, content);
    },

    createPrefab: function(widgetName) {
        let source = join(__dirname, "./assets/Bullet Screen.prefab");
        let target = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "Bullet Screen.prefab";
        return Editor.Message.request("asset-db", "import-asset", source, target);
    },
}

module.exports = BulletSceen;