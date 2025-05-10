// app.js
window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
  
    const createScene = function () {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera("Camera", 
          Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
      camera.attachControl(canvas, true);
      const light = new BABYLON.HemisphericLight("light", 
          new BABYLON.Vector3(1, 1, 0), scene);
  
      // Badan
      const body = BABYLON.MeshBuilder.CreateSphere("body", 
          {diameter: 2}, scene);
  
      // Kepala
      const head = BABYLON.MeshBuilder.CreateSphere("head", 
          {diameter: 1}, scene);
      head.position.y = 1.5;
  
      // Telinga kiri
      const earLeft = BABYLON.MeshBuilder.CreateCylinder("earLeft", 
          {diameterTop: 0, diameterBottom: 0.3, height: 0.5}, scene);
      earLeft.rotation.z = Math.PI / 4;
      earLeft.position.y = 2.1;
      earLeft.position.x = -0.3;
  
      // Telinga kanan
      const earRight = BABYLON.MeshBuilder.CreateCylinder("earRight", 
          {diameterTop: 0, diameterBottom: 0.3, height: 0.5}, scene);
      earRight.rotation.z = -Math.PI / 4;
      earRight.position.y = 2.1;
      earRight.position.x = 0.3;
  
      // Gabungkan semua bagian ke dalam satu parent object (TransformNode)
      const cat = new BABYLON.TransformNode("cat", scene);
      body.parent = cat;
      head.parent = cat;
      earLeft.parent = cat;
      earRight.parent = cat;
  
      return scene;
    };
  
    const scene = createScene();
    engine.runRenderLoop(function () {
      scene.render();
    });
  
    window.addEventListener('resize', function () {
      engine.resize();
    });
  });
  
