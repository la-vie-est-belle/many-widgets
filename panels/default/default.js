const { join } = require('path');
const { readFileSync, existsSync, mkdirSync  } = require('fs');
const typer = require('../../static/widgets/typer/methods');
const Vue = require('../../static/third-modules/vue');
const packageJSON = require('../../package.json');

// panel event listener
exports.listeners = {
    // triggered when the panel shows
    show() {},

    // triggered when the panel hides
    hide() {},

    // triggered when the panel resizes
    resize() {
        console.log(this.clientHeight);
        console.log(this.clientWidth);
    }
};

// the panel content
exports.template = readFileSync(join(__dirname, "./default.html"), "utf-8");

// the panel style
exports.style = readFileSync(join(__dirname, "./default.css"), "utf-8");

// quick selector
exports.$ = {
    app: "#app"
};

// when panel is ready
exports.ready = function() {
    new Vue({
        el: this.$.app,
        data () {
            return {
                allWidgets: [
                    {categoryId: 1, categoryName: "Label", widgets: [
                        {widgetId: 1, widgetName: "Typer", intro: "Help you create the typer effect.", exampleLink: "http://baidu.com", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: "typer2", intro: "Help you create the typer effect.", exampleLink: "http://baidu.com", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")}
                    ]},
                    {categoryId: 2, categoryName: "Button", widgets: [
                        {widgetId: 1, widgetName: "typer", intro: "Help you create the typer effect.", exampleLink: "http://baidu.com", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")}
                    ]},
                ]
            }
        },
        
        methods: {
            createComponentsForWidget(widgetName) {

                switch (widgetName) {
                    case this.allWidgets[0].widgets[0].widgetName:
                        typer.createTyper(widgetName);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
            },

            createFolderForWidget(widgetName) {
                /*
                    create a special folder for a widget
                    all assests of this widget will be put here
                */
                let url = "db://assets/" + packageJSON.name + "/" + widgetName;
                Editor.Message.request("asset-db", "create-asset", url);
            },

        },

        computed: {
            
        },

        watch: {
            
        }
    })
};

// when the panel is about to close (return false to prevent)
exports.beforeClose = function() {};

// hooks after the panel is closed
exports.close = function() {};