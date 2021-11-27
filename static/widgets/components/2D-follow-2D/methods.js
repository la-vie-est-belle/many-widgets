const { join } = require('path');
const { readFileSync } = require('fs');
const packageJSON = require('../../../../package.json');

var _2DFollow2D = {
    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createScript(widgetName);
        })
    },

    createScript: function(widgetName) {
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + "MW_" + widgetName + ".ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        return Editor.Message.request("asset-db", "create-asset", url, content);
    },
}

module.exports = _2DFollow2D;