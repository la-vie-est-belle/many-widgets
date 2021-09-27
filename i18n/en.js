module.exports = {
    /* Package.json */
    "open": "open",

    /* Common */
    "updateWarn": `New version of Many Widgets is on. Check it in Cocos Store now. :)`,
    "githubStar": "Star me on GitHub :)",
    "author": "© still dream",
    "use": "Use",
    "demoHeader": "Demo",
    "demoIntro": "You may click the link or scan the QR code to view the effect of this widget.",
    "videoDemo": "Video Demo",
    "projectDemo": "Project Demo",
    "howToUse": "How to use",
    "step1": "Step 1",
    "step2": "Step 2",
    "step3": "Step 3",

    /* Label */
    "label": "Label",
    "typer": "Typer",
    "typerIntro": "Quick set-up of a typer effect.",
    "typerStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW Typer node</strong> in the Hierarchy tab and the <strong style='color:#f90'>MW_Typer script</strong> in the assets.",
    "typerStep2": "Drag the MW Typer node to under the Canvas. If there is no Canvas, please create one. Now, run the project and you will see the typer effect.",

    "bulletScreen": "Bullet Screen",
    "bulletScreenIntro": "Quick set-up of a bullet screen.",
    "bulletScreenStep1": "Click the use button. Now you will find the <strong style='color:#f90'>Bullet Screen prefab</strong> and the <strong style='color:#f90'>MW_BulletScreen script</strong> in the assets, as well as the <strong style='color:#f90'>MW BulletScreen node</strong> in the hierarchy tab.",
    "bulletScreenStep2": "Make sure the MW BulletScreen is the child of the Canvas. If there is no Canvas, please create one. Then drag the Bullet Screen prefab onto the <strong style='color:#f90'>MWBulletScreen</strong> component.",

    "rollingNumber": "Rolling Number",
    "rollingNumberIntro": "Quick set-up of a rolling number.",
    "rollingNumberStep1": "Click the use button. Now you will find the <strong style='color:#f90'>Child Layout prefab</strong> and the <strong style='color:#f90'>MW_RollingNumber script</strong> in the assets. You will also find the <strong style='color:#f90'>MW RollingNumber node</strong> in the Hierarchy tab.",
    "rollingNumberStep2": "Drag the MW RollingNumber node under the Canvas and at last drag the Child Layout prefab onto the <strong style='color:#f90'>MWRollingNumber</strong> component.",

    "tooltip": "Tooltip",
    "tooltipIntro": "Quick set-up of tooltips for other widgets.",
    "tooltipStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW Tooltip node</strong> in the Hierarchy tab. This node is created from the <strong style='color:#f90'>MW Tooltip prefab</strong> in the assets.",
    "tooltipStep2": "Drag the MW Tooltip node to under the Canvas. If there is no Canvas, please create one.",
    "tooltipStep3": "In your own script, you can call <strong style='color:#f90'>setTooltip()</strong> to set a tooltip for a node, and call <strong style='color:#f90'>cancelTooltip()</strong> to kill the tooltip of a node.",
    
    /* Button */
    "button": "Button",
    "comboBox": "Combo Box",
    "comboBoxIntro": "Quick set-up of a combo box.",
    "comboBoxStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW ComboBox node</strong> in the Hierarchy tab. This node is created from the <strong style='color:#f90'>MW ComboBox prefab</strong> in the assets.",
    "comboBoxStep2": "Drag the MW ComboBox node to under the Canvas. If there is no Canvas, please create one. Now, run the project and you will see the combo box.",

    "spinBox": "Spin Box",
    "spinBoxIntro": "Quick set-up of a spin box.",
    "spinBoxStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW SpinBox node</strong> in the Hierarchy tab. This node is created from the <strong style='color:#f90'>MW SpinBox prefab</strong> in the assets.",
    "spinBoxStep2": "Drag the MW SpinBox node to under the Canvas. If there is no Canvas, please create one. Now, run the project and you will see the spin box.",

    "joystick2D": "Joystick 2D",
    "joystick2DIntro": "Quick set-up of a joystick to control a 2D node.",
    "joystick2DStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW Joystick2D node</strong> as well as its child <strong style='color:#f90'>Center Button node</strong>. <strong style='color:#f90'>MW_Joystick2D script</strong> is created in the assets.",
    "joystick2DStep2": "Drag the MW Joystick2D node to under the Canvas. If there is no Canvas, please create one. Then, fill the parent and child nodes with sprite frames(joystick background and its button), and drag the target node onto the <strong style='color:#f90'>MWJoystick2D</strong> component. Now run the project and you will can control the target node with the joystick.",

    "joystick3D": "Joystick 3D",
    "joystick3DIntro": "Quick set-up of a joystick to control a 3D node.",
    "joystick3DStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW Joystick3D node</strong> as well as its child <strong style='color:#f90'>Center Button node</strong>. <strong style='color:#f90'>MW_Joystick3D script</strong> is created in the assets.",
    "joystick3DStep2": "Drag the MW Joystick3D node to under the Canvas. If there is no Canvas, please create one. Then, fill the parent and child nodes with sprite frames(joystick background and its button). Drag the target 2D node and the Main Camera onto the <strong style='color:#f90'>MWJoystick3D</strong> component. Now run the project and you will can control the target node with the joystick.",
    "joystick3DStep3": "If you call <strong style='color:#f90'>isCameraMovable()</strong> and pass true to is, you can change the main camera's view angle by sliding on the Canvas.",

    /* Sprite */
    "sprite": "Sprite",
    "movingBackground": "Moving Background",
    "movingBackgroundIntro": "Infinite Background movement.",
    "movingBackgroundStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW MovingBackground node</strong> as well as its children <strong style='color:#f90'>Background 1</strong> and <strong style='color:#f90'>Background 2</strong> in the Hierarchy tab. A <strong style='color:#f90'>MW_MovingBackground script</strong> is created in the assets.",
    "movingBackgroundStep2": "Drag the MW MovingBackground node to under the Canvas. If there is no Canvas, please create one. Now, fill the two children node with sprite frames. Run the project and you will see the moving sprites.",

    "magnifier": "Magnifier",
    "magnifierIntro": "Quick set-up of a magnifying glass.",
    "magnifierStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW Magnifier node</strong> in the Hierarchy tab. This node is created from the <strong style='color:#f90'>MW Magnifier prefab</strong> in the assets.",
    "magnifierStep2": "Drag the MW Magnifier node to under the Canvas. If there is no Canvas, please create one. Now, set the MW Magnifier's spriteframe with <strong style='color:#f90'>magnifier png</strong> in the assets, and set the Camera's target texture with the <strong style='color:#f90'>render-texture</strong>.",
    "magnifierStep3": "Run the project, and you will see the magnifying effect. You can also move the magnifier.",

    "phantom": "Phantom",
    "phantomIntro": "Quick set-up of trailing effect.",
    "phantomStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW Phantom node</strong> in the Hierarchy tab and the <strong style='color:#f90'>MW_Phantom script</strong> in the assets.",
    "phantomStep2": "Drag the MW Phantom node to under the Canvas. If there is no Canvas, please create one. Then drag to <strong style='color:#f90'>MWPhantom</strong> component the target node where you want to add the phantom.",
    "phantomStep3": "In you own script, make the target node move and you will see the trailing effect after running the project.",

    /* View */
    "view": "View",
    "zoomView": "Zoom View",
    "zoomViewIntro": "Quick set-up of a zoom view.",
    "zoomViewStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW ZoomView node</strong> and the child node <strong style='color:#f90'>Sprite</strong> in the Hierarchy tab. A <strong style='color:#f90'>MW_ZoomView script</strong> is created in the assets.",
    "zoomViewStep2": "Drag the MW ZoomView node to under the Canvas. If there is no Canvas, please create one. Now, fill the sprite node with a sprite frame. Run the project on a devic with touch screen and you will see the zoom effect.",

    "beginnerGuide": "Beginner Guide",
    "beginnerGuideIntro": "Quick set-up of a beginner guide.",
    "beginnerGuideStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW BeginnerGuide node</strong> as well as its children <strong style='color:#f90'>background</strong> and <strong style='color:#f90'>instruction</strong> in the Hierarchy tab. A <strong style='color:#f90'>MW_BeginnerGuide script</strong> is created in the assets.",
    "beginnerGuideStep2": "The MW BeginnerGuide node must be placed under the Canvas and should be its last child. Otherwise the mask won't cover some nodes. Now set the background  a plain sprite frame.",
    "beginnerGuideStep3": "In your own script, call the <strong style='color:#f90'>setInstructions()</strong> and the <strong style='color:#f90'>setClickNodes()</strong> API to set the instructions and the nodes to click, and at last call <strong style='color:#f90'>show()</strong>. The project is good to go.",

    "2Dfollow3D": "2D Follow 3D",
    "2Dfollow3DIntro": "Make a 2D node follow a 3D node. You may use it on the player's name or the progress bar.",
    "2Dfollow3DStep1": "Click the use button. Now you will find the <strong style='color:#f90'>MW 2DFollow3D node</strong> in the Hierarchy tab and the <strong style='color:#f90'>MW_2DFollow3D script</strong> in the assets.",
    "2Dfollow3DStep2": "MW 2DFollow3D node, which is empty, should be under the Canvas node. Now add the label component or progress bar component or any other 2D component you like onto MW 2DFollow3D node.",
    "2Dfollow3DStep3": "In your script, call <strong style='color:#f90'>follow()</strong> to let the 2D node (caller) follow a 3D node.",

    /* 3D Model */  
    "3Dmodel": "3D Model",
    "pickStarMonster": "Pick Star Monster",
    "pickStarMonsterIntro": "The purple monster in the pick star game.",

    "star": "Star",
    "starIntro": "A star with five points.",

    "heart": "Heart",
    "heartIntro": "Love you 3000.",

    "dice": "Dice",
    "diceIntro": "Let's throw the dice!",

    "football": "Football",
    "footballIntro": "Are you a fan of football?",

    "cartoonTree": "Cartoon Tree",
    "cartoonTreeIntro": "This is a tree. No kidding.",

    "basketball": "Basketball",
    "basketballIntro": "A three-point shot, nice!",

    "axe": "Axe",
    "axeIntro": "Let's chop some firewood.",
}