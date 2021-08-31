/* Built-in and third modules */
const { join } = require('path');
const { readFileSync } = require('fs');
const Vue = require('../../static/third-modules/vue');
const axios = require('../../static/third-modules/axios');
const packageJSON = require('../../package.json');

/* Label */
const Typer = require('../../static/widgets/typer/methods');
const BulletScreen = require('../../static/widgets/bullet-screen/methods');
const RollingNumber = require('../../static/widgets/rolling-number/methods');
const Tooltip = require('../../static/widgets/tooltip/methods');

/* Button */
const ComboBox = require('../../static/widgets/combo-box/methods');
const SpinBox = require('../../static/widgets/spin-box/methods');
const Joystick2D = require('../../static/widgets/joystick2D/methods');

/* Sprite */
const MovingBackground = require('../../static/widgets/moving-background/methods');

/* View */
const ZoomView = require('../../static/widgets/zoom-view/methods');
const BeginnerGuide = require('../../static/widgets/beginner-guide/methods');
const _2DFollow3D = require('../../static/widgets/2D-follow-3D/methods');

/* 3D Model */
const PickStarMonster = require('../../static/widgets/models/pick-star-monster/methods');
const Star = require('../../static/widgets/models/star/methods');

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

/* i18n */
const translate = (key) => Editor.I18n.t(`${packageJSON.name}.${key}`);

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
                currentVersion: packageJSON.version,

                allWidgets: [
                    {categoryId: 0, categoryName: translate("label"), widgets: [
                        {widgetId: 0, widgetName: translate("typer"), intro: translate("typerIntro"), videoLink: "https://www.bilibili.com/video/BV1df4y137gY/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/typer/", usage: readFileSync(join(__dirname, "../../static/widgets/typer/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: translate("bulletScreen"), intro: translate("bulletScreenIntro"), videoLink: "https://www.bilibili.com/video/BV1g341167jA/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/bullet-screen/", usage: readFileSync(join(__dirname, "../../static/widgets/bullet-screen/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: translate("rollingNumber"), intro: translate("rollingNumberIntro"), videoLink: "https://www.bilibili.com/video/BV1jP4y1s7DY/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/rolling-number", usage: readFileSync(join(__dirname, "../../static/widgets/rolling-number/usage.html"), "utf-8")},
                        {widgetId: 3, widgetName: translate("tooltip"), intro: translate("tooltipIntro"), videoLink: "https://www.bilibili.com/video/BV1zv411N79f/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/tooltip", usage: readFileSync(join(__dirname, "../../static/widgets/tooltip/usage.html"), "utf-8")}
                    ]},
                    {categoryId: 1, categoryName: translate("button"), widgets: [
                        {widgetId: 0, widgetName: translate("comboBox"), intro: translate("comboBoxIntro"), videoLink: "https://www.bilibili.com/video/BV113411q7vJ/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/combo-box/", usage: readFileSync(join(__dirname, "../../static/widgets/combo-box/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: translate("spinBox"), intro: translate("spinBoxIntro"), videoLink: "https://www.bilibili.com/video/BV1df4y137gY/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/spin-box/", usage: readFileSync(join(__dirname, "../../static/widgets/spin-box/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: translate("joystick2D"), intro: translate("joystick2DIntro"), videoLink: "https://www.bilibili.com/video/BV1LP4y1W73z/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/joystick2D/", usage: readFileSync(join(__dirname, "../../static/widgets/joystick2D/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 2, categoryName: translate("sprite"), widgets: [
                        {widgetId: 0, widgetName: translate("movingBackground"), intro: translate("movingBackgroundIntro"), videoLink: "https://www.bilibili.com/video/BV1a64y1e7Wz/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/moving-background/", usage: readFileSync(join(__dirname, "../../static/widgets/moving-background/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 3, categoryName: translate("view"), widgets: [
                        {widgetId: 0, widgetName: translate("zoomView"), intro: translate("zoomViewIntro"), videoLink: "https://www.bilibili.com/video/BV1BM4y1L7wT/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/zoom-view/", usage: readFileSync(join(__dirname, "../../static/widgets/zoom-view/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: translate("beginnerGuide"), intro: translate("beginnerGuideIntro"), videoLink: "https://www.bilibili.com/video/BV1g64y1e7R6/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/beginner-guide/", usage: readFileSync(join(__dirname, "../../static/widgets/beginner-guide/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: translate("2Dfollow3D"), intro: translate("2Dfollow3DIntro"), videoLink: "https://www.bilibili.com/video/BV1nU4y177Qh/", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/2D-follow-3D/", usage: readFileSync(join(__dirname, "../../static/widgets/2D-follow-3D/usage.html"), "utf-8")}
                    ]},
                    {categoryId: 4, categoryName: translate("3Dmodel"), widgets: [
                        {widgetId: 0, widgetName: translate("pickStarMonster"), intro: translate("pickStarMonsterIntro"), videoLink: "", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/pick-star-monster-3Dmodel/", usage: "" },
                        {widgetId: 1, widgetName: translate("star"), intro: translate("starIntro"), videoLink: "", exampleLink: "https://la-vie-est-belle.github.io/many-widgets-demo/star-3Dmodel/", usage: "" },
                    ]},
                ],
            }
        },

        created () {
            /* 
            Delete this method if you don't want to check update.
            */
            this.checkUpdate();
        },
        
        methods: {
            checkUpdate() {
                let self = this;
                axios.get('https://la-vie.gitee.io/many-widgets/package.json', {headers: {'Cache-Control': 'no-cache'}})
                     .then(function(response) {
                         let remoteVersion = response.data.version;
                         if (self.currentVersion != remoteVersion) {
                             console.warn(`[v${remoteVersion}] ${translate("updateWarn")}`);
                         }
                     });
            },

            createWidget(widgetName) {
                
                /*
                Originally, I passed 'widgetName.replace(/\s/g, "")' to create() method below,
                but as I added i18n, I found the widgetName will be translated into another language.
                This will mess up the script in assets. So, I need to pass the widget name explicitly.
                */
                switch (widgetName) {
                    /* Label */
                    case this.allWidgets[0].widgets[0].widgetName:
                        Typer.create("Typer");
                        break;
                    case this.allWidgets[0].widgets[1].widgetName:
                        BulletScreen.create("BulletScreen");
                        break;
                    case this.allWidgets[0].widgets[2].widgetName:
                        RollingNumber.create("RollingNumber");
                        break;
                    case this.allWidgets[0].widgets[3].widgetName:
                        Tooltip.create("Tooltip");
                        break;

                    /* Button */
                    case this.allWidgets[1].widgets[0].widgetName:
                        ComboBox.create("ComboBox");
                        break;
                    case this.allWidgets[1].widgets[1].widgetName:
                        SpinBox.create("SpinBox");
                        break;
                    case this.allWidgets[1].widgets[2].widgetName:
                        Joystick2D.create("Joystick2D");
                        break;

                    /* Sprite */
                    case this.allWidgets[2].widgets[0].widgetName:
                        MovingBackground.create("MovingBackground");
                        break;

                    /* View */
                    case this.allWidgets[3].widgets[0].widgetName:
                        ZoomView.create("ZoomView");
                        break;
                    case this.allWidgets[3].widgets[1].widgetName:
                        BeginnerGuide.create("BeginnerGuide");
                        break;
                    case this.allWidgets[3].widgets[2].widgetName:
                        _2DFollow3D.create("2DFollow3D");
                        break;

                    /* 3D Model */
                    case this.allWidgets[4].widgets[0].widgetName:
                        PickStarMonster.create("PickStarMonster");
                        break;
                    case this.allWidgets[4].widgets[1].widgetName:
                        Star.create("Star");
                        break;
                }
            },

            /* In development */
            showSettings() {
                Editor.Panel.open(`${packageJSON.name}.settings`);
            }
        },
    })
};

// when the panel is about to close (return false to prevent)
exports.beforeClose = function() {};

// hooks after the panel is closed
exports.close = function() {};