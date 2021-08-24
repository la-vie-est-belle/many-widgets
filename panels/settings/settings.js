const { join } = require('path');
const { readFileSync } = require('fs');
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
exports.template = readFileSync(join(__dirname, "./settings.html"), "utf-8");

// the panel style
exports.style = readFileSync(join(__dirname, "./settings.css"), "utf-8");

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
                settings: {
                    isChecked: true,
                    currentLanguage: "English",
                    currentShortcut: ""
                }
            }
        },

        created () {
            if(navigator.userAgent.indexOf("Mac OS X") > 0) {
                this.settings.currentShortcut = "cmd+w";
            }
            else {
                this.settings.currentShortcut = "ctrl+w";
            }
        },
        
        methods: {
            changeChecked() {
                this.settings.isChecked = !this.settings.isChecked;
            },

            clearShortcut() {
                this.settings.currentShortcut = "";
            },

            setShortcut() {
                if (this.settings.currentShortcut) {
                    return;
                }
                
                if(navigator.userAgent.indexOf("Mac OS X") > 0) {
                    this.settings.currentShortcut = "cmd+w";
                }
                else {
                    this.settings.currentShortcut = "ctrl+w";
                }
            },

            changeShortcut(e) {
                let key = e.key.toLowerCase();

                if (this.settings.currentShortcut) {
                    this.settings.currentShortcut = this.settings.currentShortcut + "+" + key;             
                }
                else {
                    this.settings.currentShortcut = key;             
                }
                e.pr
            },

            applySettings() {
                console.log(this.settings.isChecked);
                console.log(this.settings.currentLanguage)
                console.log(this.settings.currentShortcut)
                return this.settings;
            }
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