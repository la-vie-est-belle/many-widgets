const { join } = require('path');
const { readFileSync, existsSync, mkdirSync, writeFileSync, writeFile  } = require('fs');
const packageJSON = require('../../../package.json');

var typer = {
    createComponentsForTyper: function(widgetName) {
        let url = "db://assets/" + packageJSON.name + "/" + widgetName + "/typer.ts";
        let content = readFileSync(join(__dirname, "content.ts"), "utf-8");
        Editor.Message.request("asset-db", "create-asset", url, content);
    }
}

module.exports = typer;