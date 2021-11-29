module.exports = {
    /* Package.json */
    "open": "打开",

    /* 通用 */
    "updateWarn": `Many Widgets新版本(包含Shader)已上线，快去Cocos商店下载吧。:)`,
    "githubStar": "GitHub上标个星吧:)",
    "author": "© ren_meng",
    "use": "使用",
    "demoHeader": "演示",
    "demoIntro": "点击下方链接，或扫描二维码来查看示例。",
    "videoDemo": "视频讲解",
    "projectDemo": "项目演示",
    "howToUse": "如何使用",
    "step1": "步骤 1",
    "step2": "步骤 2",
    "step3": "步骤 3",

    /* 组件 */
    "component": "组件",
    "beginnerGuide": "新手引导",
    "beginnerGuideIntro": "快速生成新手引导。",
    "beginnerGuideStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW BeginnerGuide</strong>及其子节点<strong style='color:#f90'>background</strong>和<strong style='color:#f90'>instruction</strong>。在资源管理器中可以看到一个<strong style='color:#f90'>MW_BeginnerGuide</strong>脚本。",
    "beginnerGuideStep2": "MW BeginnerGuide节点必须在Canvas节点下，而且必须放在最下面，否则遮罩无法覆盖一些节点。在给background节点设置好图片后运行项目即可。",
    "beginnerGuideStep3": "在其他脚本中，你可以调用<strong style='color:#f90'>setInstructions()</strong>和<strong style='color:#f90'>setClickNodes()</strong>来设置指示文本和要点击的节点。设置完毕后，调用<strong style='color:#f90'>show()</strong>就可以啦。",

    "bulletScreen": "弹幕",
    "bulletScreenIntro": "快速生成弹幕。",
    "bulletScreenStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW BulletScreen</strong>节点，在资源管理器中可以看到一个<strong style='color:#f90'>Bullet Screen</strong>预制和一个<strong style='color:#f90'>MW_BulletScreen</strong>脚本。",
    "bulletScreenStep2": "将MW BulletScreen节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。最后将Bullet Screen预制拖入<strong style='color:#f90'>MWBulletScreen</strong>组件中即可。",

    "comboBox": "组合框",
    "comboBoxIntro": "快速生成一个组合框。",
    "comboBoxStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW ComboBox</strong>节点，该节点是从资源管理器里的<strong style='color:#f90'>MW ComboBox</strong>预制中创建出来的。",
    "comboBoxStep2": "将MW ComboBox节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。现在运行项目，你就可以看到一个组合框了。",

    "joystick2D": "2D摇杆",
    "joystick2DIntro": "快速建立摇杆来控制一个2D节点。",
    "joystick2DStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW Joystick2D</strong>节点及其子节点<strong style='color:#f90'>Center Button</strong>。在资源管理器中可以看到一个<strong style='color:#f90'>MW_Joystick2D</strong>脚本。",
    "joystick2DStep2": "将MW Joystick2D节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。接着给父节点和子节点分别添加上摇杆背景和按钮图片, 并将要被控制的节点拖到<strong style='color:#f90'>MWJoystick2D</strong>组件上。现在运行项目就可以用摇杆控制目标节点了。",

    "joystick3D": "3D摇杆",
    "joystick3DIntro": "快速建立摇杆来控制一个3D节点。",
    "joystick3DStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW Joystick3D</strong>节点及其子节点<strong style='color:#f90'>Center Button</strong>。在资源管理器中可以看到一个<strong style='color:#f90'>MW_Joystick3D</strong>脚本。",
    "joystick3DStep2": "将MW Joystick3D节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。接着给父节点和子节点分别添加上摇杆背景和按钮图片, 并将要被控制的3D节点和主相机拖到<strong style='color:#f90'>MWJoystick3D</strong>组件上。现在运行项目就可以用摇杆控制目标节点了。",
    "joystick3DStep3": "如果调用<strong style='color:#f90'>isCameraMovable()</strong> 并传入一个true, 那么就可以通过滑动来控制主相机视角。",

    "magnifier": "放大镜",
    "magnifierIntro": "快速生成一个放大镜。",
    "magnifierStep1": "点击使用按钮后. 在层级窗口中可以发现一个<strong style='color:#f90'>MW Magnifier</strong>节点. 该节点是从资源管理器里的<strong style='color:#f90'>MW Magnifier</strong>预制中创建出来的。",
    "magnifierStep2": "将MW Magnifier节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。现在给MW Magnifier节点添加一张放大镜图片，图片是资源管理器中的<strong style='color:#f90'>magnifier png</strong>， 再把<strong style='color:#f90'>render-texture</strong>文件设置为摄像机的目标纹理。",
    "magnifierStep3": "运行项目就可以看到放大镜效果了，你还可以移动这个放大镜。",

    "movingBackground": "移动背景",
    "movingBackgroundIntro": "快速生成无限背景移动(无黑边)。",
    "movingBackgroundStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW MovingBackground</strong>节点及其子节点点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>Background 1</strong>和点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>Background 2</strong>。在资源管理器中可以看到一个点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW_MovingBackground</strong>脚本。",
    "movingBackgroundStep2": "将MW MovingBackground节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。给两个子节点添加图片后，运行项目就能看到背景无限移动了。",
    
    "phantom": "幻影",
    "phantomIntro": "快速生成拖尾效果.",
    "phantomStep1": "点击使用按钮后，在层级窗口中我们可以发现一个<strong style='color:#f90'>MW Phantom</strong>节点，在资源管理中有一个<strong style='color:#f90'>MW_Phantom</strong>脚本。",
    "phantomStep2": "将MW Phantom节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。然后将要添加拖尾效果的节点拖到<strong style='color:#f90'>MWPhantom</strong>组件上。",
    "phantomStep3": "在你自己的脚本中, 让目标节点动起来。此时运行项目，你就可以看到拖尾效果了。",

    "rollingNumber": "滚动数字",
    "rollingNumberIntro": "快速生成滚动数字。",
    "rollingNumberStep1": "点击使用按钮后，在层级窗口窗口中可以发现一个<strong style='color:#f90'>MW RollingNumber</strong>节点，在资源管理器中可以看到<strong style='color:#f90'>Child Layout</strong>预制和一个<strong style='color:#f90'>MW_RollingNumber</strong>脚本。",
    "rollingNumberStep2": "将MW RollingNumber节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。最后将Child Layout预制拖入<strong style='color:#f90'>MWRollingNumber</strong>组件中即可。",

    "spinBox": "数字调节框",
    "spinBoxIntro": "快速生成一个数字调节框。",
    "spinBoxStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW SpinBox</strong>节点，该节点是从资源管理器里的<strong style='color:#f90'>MW SpinBox</strong>预制中创建出来的。",
    "spinBoxStep2": "将MW SpinBox节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。现在运行项目，你就可以看到一个数字调节框了。",

    "tooltip": "工具提示",
    "tooltipIntro": "快速生成节点工具提示。",
    "tooltipStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW Tooltip</strong>，该节点是从资源管理器里的<strong style='color:#f90'>MW Tooltip</strong>预制中创建出来的。",
    "tooltipStep2": "将MW Tooltip节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。",
    "tooltipStep3": "在其他脚本中，你可以调用<strong style='color:#f90'>setTooltip()</strong>来给一个节点设置工具提示，也可以调用<strong style='color:#f90'>cancelTooltip()</strong>来去除某个节点的工具提示。",    

    "typer": "打字机",
    "typerIntro": "快速生成打字机文本效果。",
    "typerStep1": "点击使用按钮后，在层级窗口中我们可以发现一个<strong style='color:#f90'>MW Typer</strong>节点，在资源管理中有一个<strong style='color:#f90'>MW_Typer</strong>脚本。",
    "typerStep2": "将MW Typer节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。此时运行项目你将会看到打字机效果。",

    "zoomView": "手势缩放图",
    "zoomViewIntro": "快速生成手势缩放功能。",
    "zoomViewStep1": "点击使用按钮后，在层级窗口中可以发现一个<strong style='color:#f90'>MW ZoomView</strong>节点和一个<strong style='color:#f90'>Sprite</strong>子节点，在资源管理器中可以看到一个<strong style='color:#f90'>MW_ZoomView</strong>脚本。",
    "zoomViewStep2": "将MW ZoomView节点拖到Canvas节点下。如果没有Canvas节点的话，请创建一个。给Sprite节点加一个图片后，在带触屏的设备上运行该项目就可以体验手势缩放功能啦。",

    "2Dfollow2D": "2D节点跟随2D节点",
    "2Dfollow2DIntro": "2D节点跟随另一个2D节点，可用于导弹跟踪或其他类似的物体。",
    "2Dfollow2DStep1": "点击使用按钮后，在资源管理中会有一个<strong style='color:#f90'>MW_2DFollow3D</strong>脚本。",
    "2Dfollow2DStep2": "将MW_2DFollow2D脚本挂载到要实现跟随效果的节点上. 在你自己的代码中，调用<strong style='color:#f90'>startFollow()</strong>让它跟随目标节点。现在运行项目，你就可以看到跟随效果了。",
    
    "2Dfollow3D": "2D节点跟随3D节点",
    "2Dfollow3DIntro": "让一个2D节点跟随一个3D节点，可用于人物名称和血条。",
    "2Dfollow3DStep1": "点击使用按钮后，在层级窗口中我们可以发现一个<strong style='color:#f90'>MW 2DFollow3D</strong>节点，在资源管理中有一个<strong style='color:#f90'>MW_2DFollow3D</strong>脚本。",
    "2Dfollow3DStep2": "MW 2DFollow3D(初始时是空节点), 记得要将它拖到Canvas节点下，现在你可以给MW 2DFollow3D节点加上Label组件或者Progress Bar组件。",
    "2Dfollow3DStep3": "在其他脚本中，调用<strong style='color:#f90'>follow()</strong>方法让2D节点(调用者)跟随一个3D节点。",

    /* Shader */  
    "shader": "着色器",
    "shaderStep3": "在代码中改变效果：",

    "aging": "老化",
    "agingIntro": "让照片老旧化。",
    "agingStep1": "点击使用按钮后，你可以在资源管理器中看到<strong style='color:#f90'>MW_Aging 效果文件</strong>以及<strong style='color:#f90'>MW_Aging 材质</strong>。",
    "agingStep2": "点击材质并将MW_Aging选为效果，接着让MW_Aging材质成为精灵节点的自定义材质。现在通过改变<strong style='color:#f90'>agingThreshold</strong>的值就可以看到老化效果了。",

    "gray": "灰色",
    "grayIntro": "灰色也很美。",
    "grayStep1": "点击使用按钮后，你可以在资源管理器中看到<strong style='color:#f90'>MW_Gray 效果文件</strong>以及<strong style='color:#f90'>MW_Gray 材质</strong>。",
    "grayStep2": "点击材质并将MW_Gray选为效果，接着让MW_Gray材质成为精灵节点的自定义材质。现在通过改变<strong style='color:#f90'>grayThreshold</strong>的值就可以看到灰色效果了。",

    "frozen": "冰冻",
    "frozenIntro": "太冷了。",
    "frozenStep1": "点击使用按钮后，你可以在资源管理器中看到<strong style='color:#f90'>MW_Frozen 效果文件</strong>以及<strong style='color:#f90'>MW_Frozen 材质</strong>。",
    "frozenStep2": "点击材质并将MW_Frozen选为效果，接着让MW_Frozen材质成为精灵节点的自定义材质。现在通过改变<strong style='color:#f90'>frozenThreshold</strong>的值就可以看到冰冻效果了。",

    "inverse": "反色",
    "inverseIntro": "使其变得不同。",
    "inverseStep1": "点击使用按钮后，你可以在资源管理器中看到<strong style='color:#f90'>MW_Inverse 效果文件</strong>以及<strong style='color:#f90'>MW_Inverse 材质</strong>。",
    "inverseStep2": "点击材质并将MW_Inverse选为效果，接着让MW_Inverse材质成为精灵节点的自定义材质。现在通过改变<strong style='color:#f90'>inverseThreshold</strong>的值就可以看到反色效果了。",

    "poisonous": "中毒",
    "poisonousIntro": "你竟然在代码里下毒。。。",
    "poisonousStep1": "点击使用按钮后，你可以在资源管理器中看到<strong style='color:#f90'>MW_Poisonous 效果文件</strong>以及<strong style='color:#f90'>MW_Poisonous 材质</strong>。",
    "poisonousStep2": "点击材质并将MW_Poisonous选为效果，接着让MW_Poisonous材质成为精灵节点的自定义材质。现在通过改变<strong style='color:#f90'>poisonousThreshold</strong>的值就可以看到中毒效果了。",

    /* 3D Model */
    "3Dmodel": "3D 模型",
    "axe": "斧头",
    "axeIntro": "砍些柴火吧。",

    "basketball": "篮球",
    "basketballIntro": "三分球，漂亮！",

    "bat": "球棒",
    "batIntro": "全垒打！",

    "cartoonTree": "卡通树",
    "cartoonTreeIntro": "这是棵树，没开玩笑。",

    "dice": "骰子",
    "diceIntro": "来！扔骰子！",

    "football": "足球",
    "footballIntro": "你喜欢踢足球吗？",
    
    "heart": "爱心",
    "heartIntro": "爱你3000遍。",

    "kitchenKnife": "菜刀",
    "kitchenKnifeIntro": "你做饭吗？",

    "pickStarMonster": "摘星星的怪物",
    "pickStarMonsterIntro": "在摘星星游戏里面的紫色怪物。",

    "rubik'sCube": "魔方",
    "rubik'sCubeIntro": "你能拼多快？",

    "shield": "盾牌",
    "shieldIntro": "保护好自己。",

    "star": "星星",
    "starIntro": "黄色五角星。",

    "sword": "剑",
    "swordIntro": "我代表正义。",
}