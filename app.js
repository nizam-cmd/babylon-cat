var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Camera
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Lighting
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.3;

    var shadowLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
    shadowLight.position = new BABYLON.Vector3(10, 10, 10);
    shadowLight.intensity = 0.5;

    // Shadow generator
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, shadowLight);
    shadowGenerator.useExponentialShadowMap = true;

    // Ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 30 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.7, 0.3);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // Materials
    var mainFurMaterial = new BABYLON.StandardMaterial("mainFurMat", scene);
    mainFurMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.8, 0.6);

    var darkFurMaterial = new BABYLON.StandardMaterial("darkFurMat", scene);
    darkFurMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.1);

    var whiteFurMaterial = new BABYLON.StandardMaterial("whiteFurMat", scene);
    whiteFurMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var eyeMaterial = new BABYLON.StandardMaterial("eyeMat", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.8, 0.2);

    var noseMaterial = new BABYLON.StandardMaterial("noseMat", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.5);

    // Cat root
    var catRoot = new BABYLON.TransformNode("catRoot");

    // Cat body and parts...
    // (semua bagian badan, kepala, mata, telinga, kaki, ekor, dll — SAMA seperti di script kamu sebelumnya, sudah termasuk semua shadowCaster dan parenting)

    // Mulai animasi tail
    scene.beginAnimation(tail, 0, 30, true);

    // FPS dan setup animasi
    var animationFPS = 15;

    // Animasi bob badan kucing
    var bodyBobAnimation = new BABYLON.Animation(
        "bodyBobAnimation", "position.y", animationFPS,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    bodyBobAnimation.setKeys([
        { frame: 0, value: 2.0 },
        { frame: animationFPS / 2, value: 2.1 },
        { frame: animationFPS, value: 2.0 }
    ]);
    catBody.animations = [bodyBobAnimation];
    scene.beginAnimation(catBody, 0, animationFPS, true);

    // Pergerakan ke depan
    var walkDistance = 10;
    var walkSpeed = 0.05;
    scene.registerBeforeRender(function () {
        catRoot.position.z += walkSpeed;
        if (catRoot.position.z > walkDistance) {
            catRoot.position.z = -walkDistance;
        }
    });

    // Fungsi bantu buat animasi kaki
    function createLegAnimation(name, frames) {
        var animation = new BABYLON.Animation(name, "rotation.x", animationFPS,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animation.setKeys(frames);
        return animation;
    }

    // Kaki depan kiri
    frontLeftLegRoot.animations = [createLegAnimation("frontLeftLegAnim", [
        { frame: 0, value: 0.4 },
        { frame: animationFPS / 4, value: -0.4 },
        { frame: animationFPS / 2, value: 0.4 },
        { frame: 3 * animationFPS / 4, value: 0.0 },
        { frame: animationFPS, value: 0.4 }
    ])];

    // Kaki depan kanan
    frontRightLegRoot.animations = [createLegAnimation("frontRightLegAnim", [
        { frame: 0, value: -0.4 },
        { frame: animationFPS / 4, value: 0.0 },
        { frame: animationFPS / 2, value: 0.4 },
        { frame: 3 * animationFPS / 4, value: -0.4 },
        { frame: animationFPS, value: -0.4 }
    ])];

    // Kaki belakang kiri
    backLeftLegRoot.animations = [createLegAnimation("backLeftLegAnim", [
        { frame: 0, value: -0.4 },
        { frame: animationFPS / 4, value: 0.0 },
        { frame: animationFPS / 2, value: 0.4 },
        { frame: 3 * animationFPS / 4, value: -0.4 },
        { frame: animationFPS, value: -0.4 }
    ])];

    // Kaki belakang kanan
    backRightLegRoot.animations = [createLegAnimation("backRightLegAnim", [
        { frame: 0, value: 0.4 },
        { frame: animationFPS / 4, value: -0.4 },
        { frame: animationFPS / 2, value: 0.4 },
        { frame: 3 * animationFPS / 4, value: 0.0 },
        { frame: animationFPS, value: 0.4 }
    ])];

    // Mulai animasi semua kaki
    scene.beginAnimation(frontLeftLegRoot, 0, animationFPS, true);
    scene.beginAnimation(frontRightLegRoot, 0, animationFPS, true);
    scene.beginAnimation(backLeftLegRoot, 0, animationFPS, true);
    scene.beginAnimation(backRightLegRoot, 0, animationFPS, true);

    return scene;
};
