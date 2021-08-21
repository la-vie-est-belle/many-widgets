const { join } = require('path');
const { readFileSync } = require('fs');
const Typer = require('../../static/widgets/typer/methods');
const BulletScreen = require('../../static/widgets/bullet-screen/methods');
const RollingNumber = require('../../static/widgets/rolling-number/methods');
const MovingBackground = require('../../static/widgets/moving-background/methods');
const ZoomView = require('../../static/widgets/zoom-view/methods');
const ComboBox = require('../../static/widgets/combo-box/methods');
const SpinBox = require('../../static/widgets/spin-box/methods');
const BeginnerGuide = require('../../static/widgets/beginner-guide/methods');
const Vue = require('../../static/third-modules/vue');

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
                        {widgetId: 0, widgetName: "Typer", intro: "Qicuk set-up of a typer effect.", videoLink: "https://www.bilibili.com/video/BV1df4y137gY/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/typer/", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: "Bullet Screen", intro: "Qicuk set-up of a bullet screen.", videoLink: "https://www.bilibili.com/video/BV1g341167jA/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/bullet-screen/", usage: readFileSync(join(__dirname, "../../static/widgets/bullet-screen/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: "Rolling Number", intro: "Qicuk set-up of a rolling number.", videoLink: "https://www.bilibili.com/video/BV1jP4y1s7DY/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/rolling-number", usage: readFileSync(join(__dirname, "../../static/widgets/rolling-number/usage.html"), "utf-8")}
                    ]},
                    {categoryId: 1, categoryName: "Button", widgets: [
                        {widgetId: 0, widgetName: "Combo Box", intro: "Quick set-up of a combo box.", videoLink: "https://www.bilibili.com/video/BV113411q7vJ/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/combo-box/", usage: readFileSync(join(__dirname, "../../static/widgets/combo-box/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: "Spin Box", intro: "Quick set-up of a spin box.", videoLink: "https://www.bilibili.com/video/BV1df4y137gY/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/spin-box/", usage: readFileSync(join(__dirname, "../../static/widgets/spin-box/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 2, categoryName: "Sprite", widgets: [
                        {widgetId: 0, widgetName: "Moving Background", intro: "Infinite Background movement.", videoLink: "https://www.bilibili.com/video/BV1a64y1e7Wz/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/moving-background/", usage: readFileSync(join(__dirname, "../../static/widgets/moving-background/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 3, categoryName: "View", widgets: [
                        {widgetId: 0, widgetName: "Zoom View", intro: "Qucik set-up of a zoom view.", videoLink: "https://www.bilibili.com/video/BV1BM4y1L7wT/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/zoom-view/", usage: readFileSync(join(__dirname, "../../static/widgets/zoom-view/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: "Beginner Guide", intro: "Qucik set-up of a beginner guide.", videoLink: "https://www.bilibili.com/video/BV1g64y1e7R6/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/beginner-guide/", usage: readFileSync(join(__dirname, "../../static/widgets/beginner-guide/usage.html"), "utf-8")}
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
                    case this.allWidgets[1].widgets[1].widgetName:
                        SpinBox.create(widgetName.replace(/\s/g, ""))
                        break;

                    /* Sprite */
                    case this.allWidgets[2].widgets[0].widgetName:
                        MovingBackground.create(widgetName.replace(/\s/g, ""))
                        break;

                    /* View */
                    case this.allWidgets[3].widgets[0].widgetName:
                        ZoomView.create(widgetName.replace(/\s/g, ""))
                        break;
                    
                    case this.allWidgets[3].widgets[1].widgetName:
                        BeginnerGuide.create(widgetName.replace(/\s/g, ""))
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