import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

window.addEventListener('DOMContentLoaded', function () {
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
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.7, 0.3); // Warna hijau rumput untuk ground
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // Material untuk kucing
    var mainFurMaterial = new BABYLON.StandardMaterial("mainFurMat", scene);
    mainFurMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.8, 0.6); // Warna kuning/coklat muda

    var darkFurMaterial = new BABYLON.StandardMaterial("darkFurMat", scene);
    darkFurMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.1); // Warna coklat tua

    var whiteFurMaterial = new BABYLON.StandardMaterial("whiteFurMat", scene);
    whiteFurMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1); // Warna putih

    var eyeMaterial = new BABYLON.StandardMaterial("eyeMat", scene);
    eyeMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.8, 0.2); // Warna mata hijau

    var noseMaterial = new BABYLON.StandardMaterial("noseMat", scene);
    noseMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.5); // Warna hidung merah muda

    // Material untuk rumput
    var grassMaterial = new BABYLON.StandardMaterial("grassMat", scene);
    grassMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.8, 0.2); // Warna hijau untuk rumput

    var grassTipMaterial = new BABYLON.StandardMaterial("grassTipMat", scene);
    grassTipMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.9, 0.3); // Warna hijau lebih terang untuk ujung rumput

    // Membuat parent node untuk semua bagian kucing untuk animasi berjalan
    var catRoot = new BABYLON.TransformNode("catRoot");
    
    // Badan kucing
    var catBody = BABYLON.MeshBuilder.CreateSphere("catBody", { 
        diameterX: 4,
        diameterY: 3,
        diameterZ: 5
    }, scene);
    catBody.position.y = 2;
    catBody.material = mainFurMaterial;
    catBody.parent = catRoot;
    shadowGenerator.addShadowCaster(catBody);

    // Kepala kucing
    var catHead = BABYLON.MeshBuilder.CreateSphere("catHead", { diameter: 3 }, scene);
    catHead.position.set(0, 3.5, 3);
    catHead.material = mainFurMaterial;
    catHead.parent = catRoot;
    shadowGenerator.addShadowCaster(catHead);

    // Telinga kiri
    var leftEar = BABYLON.MeshBuilder.CreateCylinder("leftEar", { 
        height: 1.5, 
        diameterTop: 0, 
        diameterBottom: 1.2 
    }, scene);
    leftEar.position.set(-1, 5, 3);
    leftEar.rotation = new BABYLON.Vector3(0.3, 0, -0.3);
    leftEar.material = darkFurMaterial;
    leftEar.parent = catRoot;
    shadowGenerator.addShadowCaster(leftEar);

    // Telinga kanan
    var rightEar = BABYLON.MeshBuilder.CreateCylinder("rightEar", { 
        height: 1.5, 
        diameterTop: 0, 
        diameterBottom: 1.2 
    }, scene);
    rightEar.position.set(1, 5, 3);
    rightEar.rotation = new BABYLON.Vector3(0.3, 0, 0.3);
    rightEar.material = darkFurMaterial;
    rightEar.parent = catRoot;
    shadowGenerator.addShadowCaster(rightEar);

    // Mata kiri
    var leftEye = BABYLON.MeshBuilder.CreateSphere("leftEye", { diameter: 0.6 }, scene);
    leftEye.position.set(-0.8, 3.7, 4.2);
    leftEye.material = eyeMaterial;
    leftEye.parent = catRoot;
    shadowGenerator.addShadowCaster(leftEye);

    // Mata kanan
    var rightEye = BABYLON.MeshBuilder.CreateSphere("rightEye", { diameter: 0.6 }, scene);
    rightEye.position.set(0.8, 3.7, 4.2);
    rightEye.material = eyeMaterial;
    rightEye.parent = catRoot;
    shadowGenerator.addShadowCaster(rightEye);

    // Pupil kiri
    var leftPupil = BABYLON.MeshBuilder.CreateSphere("leftPupil", { diameter: 0.3 }, scene);
    leftPupil.position.set(-0.8, 3.7, 4.5);
    leftPupil.material = new BABYLON.StandardMaterial("pupilMat", scene);
    leftPupil.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    leftPupil.parent = catRoot;
    shadowGenerator.addShadowCaster(leftPupil);

    // Pupil kanan
    var rightPupil = BABYLON.MeshBuilder.CreateSphere("rightPupil", { diameter: 0.3 }, scene);
    rightPupil.position.set(0.8, 3.7, 4.5);
    rightPupil.material = new BABYLON.StandardMaterial("pupilMat", scene);
    rightPupil.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    rightPupil.parent = catRoot;
    shadowGenerator.addShadowCaster(rightPupil);

    // Hidung
    var nose = BABYLON.MeshBuilder.CreateSphere("nose", { diameter: 0.5 }, scene);
    nose.position.set(0, 3.2, 4.5);
    nose.material = noseMaterial;
    nose.parent = catRoot;
    shadowGenerator.addShadowCaster(nose);

    // Bercak putih di dada
    var chestPatch = BABYLON.MeshBuilder.CreateSphere("chestPatch", {
        diameterX: 2.5,
        diameterY: 2,
        diameterZ: 1
    }, scene);
    chestPatch.position.set(0, 1.8, 2.5);
    chestPatch.material = whiteFurMaterial;
    chestPatch.parent = catRoot;
    shadowGenerator.addShadowCaster(chestPatch);

    // Bercak hitam di punggung
    var backPatch = BABYLON.MeshBuilder.CreateSphere("backPatch", {
        diameterX: 2,
        diameterY: 1,
        diameterZ: 3
    }, scene);
    backPatch.position.set(0, 3.2, 0);
    backPatch.material = darkFurMaterial;
    backPatch.parent = catRoot;
    shadowGenerator.addShadowCaster(backPatch);

    // Ekor kucing - PERBAIKAN POSISI
    var tail = BABYLON.MeshBuilder.CreateCylinder("tail", {
        height: 4.5,
        diameterTop: 0.3,
        diameterBottom: 0.7,
        tessellation: 8,
        arc: 1
    }, scene);
    
    // Posisi ekor diperbaiki agar terhubung dengan tubuh kucing
    tail.position.set(0, 2.5, -2.5); // Diposisikan lebih dekat dengan badan
    
    // Membuat ekor sedikit melengkung ke atas
    tail.rotation = new BABYLON.Vector3(-0.8, 0, 0);  // Rotasi lebih condong ke atas
    
    tail.material = darkFurMaterial;
    tail.parent = catRoot;
    shadowGenerator.addShadowCaster(tail);

    // Kaki-kaki dengan transform node untuk animasi

    // Kaki depan kiri
    var frontLeftLegRoot = new BABYLON.TransformNode("frontLeftLegRoot", scene);
    frontLeftLegRoot.position = new BABYLON.Vector3(-1.5, 2, 2);
    frontLeftLegRoot.parent = catRoot;
    
    var frontLeftLeg = BABYLON.MeshBuilder.CreateCylinder("frontLeftLeg", {
        height: 2,
        diameter: 0.7
    }, scene);
    frontLeftLeg.position.y = -1;
    frontLeftLeg.material = mainFurMaterial;
    frontLeftLeg.parent = frontLeftLegRoot;
    shadowGenerator.addShadowCaster(frontLeftLeg);

    // Kaki depan kanan
    var frontRightLegRoot = new BABYLON.TransformNode("frontRightLegRoot", scene);
    frontRightLegRoot.position = new BABYLON.Vector3(1.5, 2, 2);
    frontRightLegRoot.parent = catRoot;
    
    var frontRightLeg = BABYLON.MeshBuilder.CreateCylinder("frontRightLeg", {
        height: 2,
        diameter: 0.7
    }, scene);
    frontRightLeg.position.y = -1;
    frontRightLeg.material = mainFurMaterial;
    frontRightLeg.parent = frontRightLegRoot;
    shadowGenerator.addShadowCaster(frontRightLeg);

    // Kaki belakang kiri
    var backLeftLegRoot = new BABYLON.TransformNode("backLeftLegRoot", scene);
    backLeftLegRoot.position = new BABYLON.Vector3(-1.5, 2, -1.5);
    backLeftLegRoot.parent = catRoot;
    
    var backLeftLeg = BABYLON.MeshBuilder.CreateCylinder("backLeftLeg", {
        height: 2,
        diameter: 0.7
    }, scene);
    backLeftLeg.position.y = -1;
    backLeftLeg.material = whiteFurMaterial;
    backLeftLeg.parent = backLeftLegRoot;
    shadowGenerator.addShadowCaster(backLeftLeg);

    // Kaki belakang kanan
    var backRightLegRoot = new BABYLON.TransformNode("backRightLegRoot", scene);
    backRightLegRoot.position = new BABYLON.Vector3(1.5, 2, -1.5);
    backRightLegRoot.parent = catRoot;
    
    var backRightLeg = BABYLON.MeshBuilder.CreateCylinder("backRightLeg", {
        height: 2,
        diameter: 0.7
    }, scene);
    backRightLeg.position.y = -1;
    backRightLeg.material = whiteFurMaterial;
    backRightLeg.parent = backRightLegRoot;
    shadowGenerator.addShadowCaster(backRightLeg);

    // Tambahkan animasi yang lebih natural untuk ekor
    var tailAnimation = new BABYLON.Animation(
        "tailAnimation", 
        "rotation.z", 
        30, 
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var tailKeys = [];
    tailKeys.push({ frame: 0, value: -0.1 });
    tailKeys.push({ frame: 15, value: 0.1 });
    tailKeys.push({ frame: 30, value: -0.1 });
    tailAnimation.setKeys(tailKeys);
    
    tail.animations = [tailAnimation];
    scene.beginAnimation(tail, 0, 30, true);

    // ANIMASI KAKI KUCING - UBAH FPS UNTUK GERAKAN LEBIH LAMBAT
    // Kecepatan animasi lebih lambat, menggunakan 15 FPS (dari 30)
    var animationFPS = 15;

    // Animasi berjalan untuk kucing
    
    // 1. Gerakan badan (sedikit naik turun)
    var bodyBobAnimation = new BABYLON.Animation(
        "bodyBobAnimation",
        "position.y",
        animationFPS,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    var bodyBobKeys = [];
    bodyBobKeys.push({ frame: 0, value: 2.0 });
    bodyBobKeys.push({ frame: animationFPS/2, value: 2.1 });  // Lebih sedikit gerakan naik turun
    bodyBobKeys.push({ frame: animationFPS, value: 2.0 });
    bodyBobAnimation.setKeys(bodyBobKeys);
    
    catBody.animations = [bodyBobAnimation];
    
    // 2. Gerakan seluruh kucing maju ke depan
    var walkDistance = 10; // Jarak berjalan
    var walkSpeed = 0.05; // Kecepatan berjalan, diperlambat dari 0.15 ke 0.05
    
    scene.registerBeforeRender(function() {
        catRoot.position.z += walkSpeed;
        
        // Reset posisi kucing jika terlalu jauh
        if (catRoot.position.z > walkDistance) {
            catRoot.position.z = -walkDistance;
        }
    });
    
    // 3. Animasi kaki-kaki - lebih lambat
    // Kaki depan kiri
    var frontLeftLegAnimation = new BABYLON.Animation(
        "frontLeftLegAnimation",
        "rotation.x",
        animationFPS,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    var frontLeftLegKeys = [];
    frontLeftLegKeys.push({ frame: 0, value: 0.4 });  // Dikurangi dari 0.5
    frontLeftLegKeys.push({ frame: animationFPS/4, value: -0.4 });  // Dikurangi dari -0.5
    frontLeftLegKeys.push({ frame: animationFPS/2, value: 0.4 });
    frontLeftLegKeys.push({ frame: 3*animationFPS/4, value: 0.0 });
    frontLeftLegKeys.push({ frame: animationFPS, value: 0.4 });
    frontLeftLegAnimation.setKeys(frontLeftLegKeys);
    
    frontLeftLegRoot.animations = [frontLeftLegAnimation];
    
    // Kaki depan kanan (berlawanan dengan kaki depan kiri)
    var frontRightLegAnimation = new BABYLON.Animation(
        "frontRightLegAnimation",
        "rotation.x",
        animationFPS,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    var frontRightLegKeys = [];
    frontRightLegKeys.push({ frame: 0, value: -0.4 });  // Dikurangi dari -0.5
    frontRightLegKeys.push({ frame: animationFPS/4, value: 0.0 });
    frontRightLegKeys.push({ frame: animationFPS/2, value: 0.4 });  // Dikurangi dari 0.5
    frontRightLegKeys.push({ frame: 3*animationFPS/4, value: -0.4 });
    frontRightLegKeys.push({ frame: animationFPS, value: -0.4 });
    frontRightLegAnimation.setKeys(frontRightLegKeys);
    
    frontRightLegRoot.animations = [frontRightLegAnimation];
    
    // Kaki belakang kiri (berlawanan dengan kaki depan kiri)
    var backLeftLegAnimation = new BABYLON.Animation(
        "backLeftLegAnimation",
        "rotation.x",
        animationFPS,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    var backLeftLegKeys = [];
    backLeftLegKeys.push({ frame: 0, value: -0.4 });  // Dikurangi dari -0.5
    backLeftLegKeys.push({ frame: animationFPS/4, value: 0.0 });
    backLeftLegKeys.push({ frame: animationFPS/2, value: 0.4 });  // Dikurangi dari 0.5
    backLeftLegKeys.push({ frame: 3*animationFPS/4, value: -0.4 });
    backLeftLegKeys.push({ frame: animationFPS, value: -0.4 });
    backLeftLegAnimation.setKeys(backLeftLegKeys);
    
    backLeftLegRoot.animations = [backLeftLegAnimation];
    
    // Kaki belakang kanan (berlawanan dengan kaki belakang kiri)
    var backRightLegAnimation = new BABYLON.Animation(
        "backRightLegAnimation",
        "rotation.x",
        animationFPS,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    
    var backRightLegKeys = [];
    backRightLegKeys.push({ frame: 0, value: 0.4 });  // Dikurangi dari 0.5
    backRightLegKeys.push({ frame: animationFPS/4, value: -0.4 });  // Dikurangi dari -0.5
    backRightLegKeys.push({ frame: animationFPS/2, value: 0.4 });
    backRightLegKeys.push({ frame: 3*animationFPS/4, value: 0.0 });
    backRightLegKeys.push({ frame: animationFPS, value: 0.4 });
    backRightLegAnimation.setKeys(backRightLegKeys);
    
    backRightLegRoot.animations = [backRightLegAnimation];
    
    // Mulai animasi kaki
    scene.beginAnimation(frontLeftLegRoot, 0, animationFPS, true);
    scene.beginAnimation(frontRightLegRoot, 0, animationFPS, true);
    scene.beginAnimation(backLeftLegRoot, 0, animationFPS, true);
    scene.beginAnimation(backRightLegRoot, 0, animationFPS, true);
    scene.beginAnimation(catBody, 0, animationFPS, true);

    // TAMBAHKAN RUMPUT DI SEKITAR KUCING
    // Fungsi untuk membuat sehelai rumput
    function createGrassStrand(posX, posZ, height, thickness, randomAngle) {
        // Batang rumput
        var grassStrand = BABYLON.MeshBuilder.CreateCylinder("grassStrand", {
            height: height,
            diameterTop: thickness * 0.5,
            diameterBottom: thickness,
            tessellation: 4
        }, scene);
        
        grassStrand.position = new BABYLON.Vector3(posX, height/2, posZ);
        
        // Kemiringan acak untuk rumput
        grassStrand.rotation.x = Math.random() * 0.3;
        grassStrand.rotation.z = randomAngle;
        
        // Warna rumput
        if (Math.random() > 0.4) {
            grassStrand.material = grassMaterial;
        } else {
            grassStrand.material = grassTipMaterial;
        }
        
        shadowGenerator.addShadowCaster(grassStrand);
        
        return grassStrand;
    }
    
    // Membuat kelompok rumput di sekitar kucing
    function createGrassGroup(centerX, centerZ, radius, count) {
        for (var i = 0; i < count; i++) {
            var angle = Math.random() * Math.PI * 2;
            var distance = Math.random() * radius;
            var posX = centerX + Math.cos(angle) * distance;
            var posZ = centerZ + Math.sin(angle) * distance;
            
            // Variasi tinggi dan ketebalan rumput
            var height = 0.5 + Math.random() * 1.0;
            var thickness = 0.05 + Math.random() * 0.1;
            var rotationAngle = Math.random() * Math.PI * 2;
            
            createGrassStrand(posX, posZ, height, thickness, rotationAngle);
        }
    }
    
    // Membuat beberapa kelompok rumput di seluruh area
    for (var i = 0; i < 15; i++) {
        var randomX = (Math.random() - 0.5) * 25;
        var randomZ = (Math.random() - 0.5) * 25;
        createGrassGroup(randomX, randomZ, 3, 10);
    }
    
    // Tambahan rumput acak di seluruh area
    for (var i = 0; i < 100; i++) {
        var randomX = (Math.random() - 0.5) * 28;
        var randomZ = (Math.random() - 0.5) * 28;
        
        var randomHeight = 0.3 + Math.random() * 1.2;
        var randomThickness = 0.04 + Math.random() * 0.08;
        var randomRotation = Math.random() * Math.PI * 2;
        
        createGrassStrand(randomX, randomZ, randomHeight, randomThickness, randomRotation);
    }

    return scene;
};
});
