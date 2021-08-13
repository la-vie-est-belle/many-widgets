Editor.Message.request("scene", "create-node", {parent: sceneUUID,
                                                components: ["cc.UITransform", "cc.Label"],
                                                name: "label test",
                                                type: "cc.Node",
                                                canvasRequired: true});
