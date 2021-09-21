const { join } = require('path');
const packageJSON = require('../../../../package.json');

var PickStarMonster = {
    create: function(widgetName) {
        let self = this;
        Promise.resolve().then(function() {
            return self.createModel(widgetName);
        });
    },

    createModel: function(widgetName) {
        let source = join(__dirname, `./assets/MW ${widgetName}.glb`);
        let target = "db://assets/" + packageJSON.name + "/" + widgetName + "/" + `MW ${widgetName}.glb`;
        return Editor.Message.request("asset-db", "import-asset", source, target);
    },
}

module.exports = PickStarMonster;