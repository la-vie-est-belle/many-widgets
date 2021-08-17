const { join } = require('path');
const { readFileSync } = require('fs');
const Typer = require('../../static/widgets/typer/methods');
const BulletScreen = require('../../static/widgets/bullet-screen/methods');
const RollingNumber = require('../../static/widgets/rolling-number/methods');
const MovingBackground = require('../../static/widgets/moving-background/methods');
const ZoomView = require('../../static/widgets/zoom-view/methods');
const ComboBox = require('../../static/widgets/combo-box/methods');
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
                    {categoryId: 0, categoryName: "Label", widgets: [
                        {widgetId: 0, widgetName: "Typer", intro: "Qicuk set-up of typer effect.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Typer/", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: "Bullet Screen", intro: "Qicuk set-up of bullet screen.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Bullet%20Screen/", usage: readFileSync(join(__dirname, "../../static/widgets/bullet-screen/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: "Rolling Number", intro: "Qicuk set-up of rolling number.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Rolling%20Number", usage: readFileSync(join(__dirname, "../../static/widgets/rolling-number/usage.html"), "utf-8")}
                    ]},
                    {categoryId: 1, categoryName: "Button", widgets: [
                        {widgetId: 0, widgetName: "Combo Box", intro: "Quick set-up of combo box.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Combo%20Box/", usage: readFileSync(join(__dirname, "../../static/widgets/combo-box/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 2, categoryName: "Sprite", widgets: [
                        {widgetId: 0, widgetName: "Moving Background", intro: "Infinite Background movement.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Moving%20Background/", usage: readFileSync(join(__dirname, "../../static/widgets/moving-background/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 3, categoryName: "View", widgets: [
                        {widgetId: 0, widgetName: "Zoom View", intro: "Qucik set-up of zoom view.", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/Zoom%20View/", usage: readFileSync(join(__dirname, "../../static/widgets/zoom-view/usage.html"), "utf-8")}
                    ]},
                ]
            }
        },
        
        methods: {
            createComponentsForWidget(widgetName) {

                switch (widgetName) {
                    /* Label */
                    case this.allWidgets[0].widgets[0].widgetName:
                        Typer.create(widgetName.replace(/\s/g, ""));
                        break;
                    case this.allWidgets[0].widgets[1].widgetName:
                        BulletScreen.create(widgetName.replace(/\s/g, ""));
                        break;
                    case this.allWidgets[0].widgets[2].widgetName:
                        RollingNumber.create(widgetName.replace(/\s/g, ""))
                        break;

                    /* Button */
                    case this.allWidgets[1].widgets[0].widgetName:
                        ComboBox.create(widgetName.replace(/\s/g, ""))
                        break;

                    /* Sprite */
                    case this.allWidgets[2].widgets[0].widgetName:
                        MovingBackground.create(widgetName.replace(/\s/g, ""))
                        break;

                    /* View */
                    case this.allWidgets[3].widgets[0].widgetName:
                        ZoomView.create(widgetName.replace(/\s/g, ""))
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