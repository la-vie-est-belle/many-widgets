/* Built-in and third modules */
const { join } = require('path');
const { readFileSync } = require('fs');
const Vue = require('../../static/third-modules/vue');
const axios = require('../../static/third-modules/axios');
const packageJSON = require('../../package.json');

/* Component */
const BeginnerGuide = require('../../static/widgets/components/beginner-guide/methods');
const BulletScreen = require('../../static/widgets/components/bullet-screen/methods');
const ComboBox = require('../../static/widgets/components/combo-box/methods');
const Joystick2D = require('../../static/widgets/components/joystick2D/methods');
const Joystick3D = require('../../static/widgets/components/joystick3D/methods');
const Magnifier = require('../../static/widgets/components/magnifier/methods');
const MovingBackground = require('../../static/widgets/components/moving-background/methods');
const Phantom = require('../../static/widgets/components/phantom/methods');
const RollingNumber = require('../../static/widgets/components/rolling-number/methods');
const SpinBox = require('../../static/widgets/components/spin-box/methods');
const Tooltip = require('../../static/widgets/components/tooltip/methods');
const Typer = require('../../static/widgets/components/typer/methods');
const ZoomView = require('../../static/widgets/components/zoom-view/methods');
const _2DFollow2D = require('../../static/widgets/components/2D-follow-2D/methods');
const _2DFollow3D = require('../../static/widgets/components/2D-follow-3D/methods');

/* Shader */
const Aging = require('../../static/widgets/shaders/aging/methods');
const Frozen = require('../../static/widgets/shaders/frozen/methods');
const Gray = require('../../static/widgets/shaders/gray/methods');
const Inverse = require('../../static/widgets/shaders/inverse/methods');
const Poisonous = require('../../static/widgets/shaders/poisonous/methods');
const Relief = require('../../static/widgets/shaders/relief/methods');
const Sharpen = require('../../static/widgets/shaders/sharpen/methods');
const Blur = require('../../static/widgets/shaders/blur/methods');

/* 3D Model */
const Model = require('../../static/widgets/models/methods');

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
                    {categoryId: 0, categoryName: translate("component"), widgets: [
                        {widgetId: 0, widgetName: translate("beginnerGuide"), intro: translate("beginnerGuideIntro"), videoLink: "https://www.bilibili.com/video/BV1g64y1e7R6/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/beginner-guide/", usage: readFileSync(join(__dirname, "../../static/widgets/components/beginner-guide/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: translate("bulletScreen"), intro: translate("bulletScreenIntro"), videoLink: "https://www.bilibili.com/video/BV1g341167jA/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/bullet-screen/", usage: readFileSync(join(__dirname, "../../static/widgets/components/bullet-screen/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: translate("comboBox"), intro: translate("comboBoxIntro"), videoLink: "https://www.bilibili.com/video/BV113411q7vJ/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/combo-box/", usage: readFileSync(join(__dirname, "../../static/widgets/components/combo-box/usage.html"), "utf-8")},
                        {widgetId: 3, widgetName: translate("joystick2D"), intro: translate("joystick2DIntro"), videoLink: "https://www.bilibili.com/video/BV1LP4y1W73z/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/joystick2D/", usage: readFileSync(join(__dirname, "../../static/widgets/components/joystick2D/usage.html"), "utf-8")},
                        {widgetId: 4, widgetName: translate("joystick3D"), intro: translate("joystick3DIntro"), videoLink: "https://www.bilibili.com/video/BV1w64y1Y7Xm/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/joystick3D/", usage: readFileSync(join(__dirname, "../../static/widgets/components/joystick3D/usage.html"), "utf-8")},
                        {widgetId: 5, widgetName: translate("magnifier"), intro: translate("magnifierIntro"), videoLink: "https://www.bilibili.com/video/BV1sL4y1a7Rq/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/magnifier/", usage: readFileSync(join(__dirname, "../../static/widgets/components/magnifier/usage.html"), "utf-8")},
                        {widgetId: 6, widgetName: translate("movingBackground"), intro: translate("movingBackgroundIntro"), videoLink: "https://www.bilibili.com/video/BV1a64y1e7Wz/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/moving-background/", usage: readFileSync(join(__dirname, "../../static/widgets/components/moving-background/usage.html"), "utf-8")},
                        {widgetId: 7, widgetName: translate("phantom"), intro: translate("phantomIntro"), videoLink: "https://www.bilibili.com/video/BV19b4y1y7E4/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/phantom/", usage: readFileSync(join(__dirname, "../../static/widgets/components/phantom/usage.html"), "utf-8")},
                        {widgetId: 8, widgetName: translate("rollingNumber"), intro: translate("rollingNumberIntro"), videoLink: "https://www.bilibili.com/video/BV1jP4y1s7DY/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/rolling-number", usage: readFileSync(join(__dirname, "../../static/widgets/components/rolling-number/usage.html"), "utf-8")},
                        {widgetId: 9, widgetName: translate("spinBox"), intro: translate("spinBoxIntro"), videoLink: "https://www.bilibili.com/video/BV1df4y137gY/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/spin-box/", usage: readFileSync(join(__dirname, "../../static/widgets/components/spin-box/usage.html"), "utf-8")},
                        {widgetId: 10, widgetName: translate("tooltip"), intro: translate("tooltipIntro"), videoLink: "https://www.bilibili.com/video/BV1zv411N79f/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/tooltip", usage: readFileSync(join(__dirname, "../../static/widgets/components/tooltip/usage.html"), "utf-8")},
                        {widgetId: 11, widgetName: translate("typer"), intro: translate("typerIntro"), videoLink: "https://www.bilibili.com/video/BV1df4y137gY/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/typer/", usage: readFileSync(join(__dirname, "../../static/widgets/components/typer/usage.html"), "utf-8")},
                        {widgetId: 12, widgetName: translate("zoomView"), intro: translate("zoomViewIntro"), videoLink: "https://www.bilibili.com/video/BV1BM4y1L7wT/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/zoom-view/", usage: readFileSync(join(__dirname, "../../static/widgets/components/zoom-view/usage.html"), "utf-8")},
                        {widgetId: 13, widgetName: translate("2Dfollow2D"), intro: translate("2Dfollow2DIntro"), videoLink: "https://www.bilibili.com/video/BV1mL4y1q7vG/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/2D-follow-2D/", usage: readFileSync(join(__dirname, "../../static/widgets/components/2D-follow-2D/usage.html"), "utf-8")},
                        {widgetId: 14, widgetName: translate("2Dfollow3D"), intro: translate("2Dfollow3DIntro"), videoLink: "https://www.bilibili.com/video/BV1nU4y177Qh/", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/2D-follow-3D/", usage: readFileSync(join(__dirname, "../../static/widgets/components/2D-follow-3D/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 1, categoryName: translate("shader"), widgets: [
                        {widgetId: 0, widgetName: translate("aging"), intro: translate("agingIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-aging/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/aging/usage.html"), "utf-8")},
                        {widgetId: 1, widgetName: translate("blur"), intro: translate("blurIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-blur/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/blur/usage.html"), "utf-8")},
                        {widgetId: 2, widgetName: translate("frozen"), intro: translate("frozenIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-frozen/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/frozen/usage.html"), "utf-8")},
                        {widgetId: 3, widgetName: translate("gray"), intro: translate("grayIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-gray/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/gray/usage.html"), "utf-8")},
                        {widgetId: 4, widgetName: translate("inverse"), intro: translate("inverseIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-inverse/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/inverse/usage.html"), "utf-8")},
                        {widgetId: 5, widgetName: translate("poisonous"), intro: translate("poisonousIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-poisonous/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/poisonous/usage.html"), "utf-8")},
                        {widgetId: 6, widgetName: translate("relief"), intro: translate("reliefIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-relief/", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/relief/usage.html"), "utf-8")},
                        {widgetId: 7, widgetName: translate("sharpen"), intro: translate("sharpenIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shader-sharpen", usage: readFileSync(join(__dirname, "../../static/widgets/shaders/sharpen/usage.html"), "utf-8")},
                    ]},
                    {categoryId: 2, categoryName: translate("3Dmodel"), widgets: [
                        {widgetId: 0, widgetName: translate("axe"), intro: translate("axeIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/axe-3Dmodel/", usage: "" },
                        {widgetId: 1, widgetName: translate("basketball"), intro: translate("basketballIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/basketball-3Dmodel/", usage: "" },
                        {widgetId: 2, widgetName: translate("bat"), intro: translate("batIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/bat-3Dmodel/", usage: "" },
                        {widgetId: 3, widgetName: translate("cartoonTree"), intro: translate("cartoonTreeIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/cartoon-tree-3Dmodel/", usage: "" },
                        {widgetId: 4, widgetName: translate("dice"), intro: translate("diceIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/dice-3Dmodel/", usage: "" },
                        {widgetId: 5, widgetName: translate("football"), intro: translate("footballIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/football-3Dmodel/", usage: "" },
                        {widgetId: 6, widgetName: translate("heart"), intro: translate("heartIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/heart-3Dmodel/", usage: "" },
                        {widgetId: 7, widgetName: translate("kitchenKnife"), intro: translate("kitchenKnifeIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/kitchen-knife-3Dmodel/", usage: "" },
                        {widgetId: 8, widgetName: translate("pickStarMonster"), intro: translate("pickStarMonsterIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/pick-star-monster-3Dmodel/", usage: "" },
                        {widgetId: 9, widgetName: translate("rubik'sCube"), intro: translate("rubik'sCubeIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/rubik-cube-3Dmodel/", usage: "" },
                        {widgetId: 10, widgetName: translate("shield"), intro: translate("shieldIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/shield-3Dmodel/", usage: "" },
                        {widgetId: 11, widgetName: translate("star"), intro: translate("starIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/star-3Dmodel/", usage: "" },
                        {widgetId: 12, widgetName: translate("sword"), intro: translate("swordIntro"), videoLink: "", exampleLink: "https://la-vie.gitee.io/many-widgets-demo/sword-3Dmodel/", usage: "" },
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
                    /* Component */
                    case this.allWidgets[0].widgets[0].widgetName:
                        BeginnerGuide.create("BeginnerGuide");
                        break;
                    case this.allWidgets[0].widgets[1].widgetName:
                        BulletScreen.create("BulletScreen");
                        break;
                    case this.allWidgets[0].widgets[2].widgetName:
                        ComboBox.create("ComboBox");
                        break;
                    case this.allWidgets[0].widgets[3].widgetName:
                        Joystick2D.create("Joystick2D");
                        break;
                    case this.allWidgets[0].widgets[4].widgetName:
                        Joystick3D.create("Joystick3D");
                        break;
                    case this.allWidgets[0].widgets[5].widgetName:
                        Magnifier.create("Magnifier");
                        break;
                    case this.allWidgets[0].widgets[6].widgetName:
                        MovingBackground.create("MovingBackground");
                        break;
                    case this.allWidgets[0].widgets[7].widgetName:
                        Phantom.create("Phantom");
                        break;
                    case this.allWidgets[0].widgets[8].widgetName:
                        RollingNumber.create("RollingNumber");
                        break;
                    case this.allWidgets[0].widgets[9].widgetName:
                        SpinBox.create("SpinBox");
                        break;
                    case this.allWidgets[0].widgets[10].widgetName:
                        Tooltip.create("Tooltip");
                        break;
                    case this.allWidgets[0].widgets[11].widgetName:
                        Typer.create("Typer");
                        break;
                    case this.allWidgets[0].widgets[12].widgetName:
                        ZoomView.create("ZoomView");
                        break;
                    case this.allWidgets[0].widgets[13].widgetName:
                        _2DFollow2D.create("2DFollow2D");
                        break;
                    case this.allWidgets[0].widgets[14].widgetName:
                        _2DFollow3D.create("2DFollow3D");
                        break;
                        
                    /* Shader */ 
                    case this.allWidgets[1].widgets[0].widgetName:
                        Aging.create("Aging");
                        break;
                    case this.allWidgets[1].widgets[1].widgetName:
                        Blur.create("Blur");
                        break;
                    case this.allWidgets[1].widgets[2].widgetName:
                        Frozen.create("Frozen");
                        break;
                    case this.allWidgets[1].widgets[3].widgetName:
                        Gray.create("Gray");
                        break;
                    case this.allWidgets[1].widgets[4].widgetName:
                        Inverse.create("Inverse");
                        break;
                    case this.allWidgets[1].widgets[5].widgetName:
                        Poisonous.create("Poisonous");
                        break;
                    case this.allWidgets[1].widgets[6].widgetName:
                        Relief.create("Relief");
                        break;
                    case this.allWidgets[1].widgets[7].widgetName:
                        Sharpen.create("Sharpen");
                        break;    
                    
                    /* 3D Model */
                    case this.allWidgets[2].widgets[0].widgetName:
                        Model.create("Axe");
                        break;
                    case this.allWidgets[2].widgets[1].widgetName:
                        Model.create("Bat");
                        break;
                    case this.allWidgets[2].widgets[2].widgetName:
                        Model.create("Basketball");
                        break;
                    case this.allWidgets[2].widgets[3].widgetName:
                        Model.create("CartoonTree");
                        break;
                    case this.allWidgets[2].widgets[4].widgetName:
                        Model.create("Dice");
                        break;
                    case this.allWidgets[2].widgets[5].widgetName:
                        Model.create("Football");
                        break;
                    case this.allWidgets[2].widgets[6].widgetName:
                        Model.create("Heart");
                        break;
                    case this.allWidgets[2].widgets[7].widgetName:
                        Model.create("KitchenKnife");
                        break;
                    case this.allWidgets[2].widgets[8].widgetName:
                        Model.create("PickStarMonster");
                        break;
                    case this.allWidgets[2].widgets[9].widgetName:
                        Model.create("Rubik'sCube");
                        break;
                    case this.allWidgets[2].widgets[10].widgetName:
                        Model.create("Shield");
                        break;
                    case this.allWidgets[2].widgets[11].widgetName:
                        Model.create("Star");
                        break;
                    case this.allWidgets[2].widgets[12].widgetName:
                        Model.create("Sword");
                        break;
                }
            },

            /* In development */
            // showSettings() {
            //     Editor.Panel.open(`${packageJSON.name}.settings`);
            // }
        },
    })
};

// when the panel is about to close (return false to prevent)
exports.beforeClose = function() {};

// hooks after the panel is closed
exports.close = function() {};