const { join } = require('path');
const { readFileSync, existsSync, mkdirSync  } = require('fs');
const Typer = require('../../static/widgets/typer/methods');
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
                        {widgetId: 1, widgetName: "Typer", intro: "Qicuk set-up of typer effect.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Typer/", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: "Bullet Screen", intro: "Qicuk set-up of bullet screen.", exampleLink: "http://baidu.com", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")}
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
                        Typer.create(widgetName);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
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