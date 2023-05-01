AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");
        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 1,
          z: pos.z - 0.5,
        });

        var camera = document.querySelector("#camera").object3D;

        //Obtener la dirección de la cámara como vector Three.js 
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //Establecer la velocidad y su dirección
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        //Establecer las balas como entidades dinámicas
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "50",
        });

        //Agregar el evento de escucha de colisión a la bala
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //Sonido de disparo
        this.shootSound();
      }
    });
  },
 removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    
    //Elemento de bala
    var element = e.detail.target.el;

    //Elemento que es golpeado
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("enemy")) {
      //Agrega código aquí
      var countTankText = document.querySelector("#countTank")
      var tankText = parseInt(countTankText.getAttribute("text").value)

      tankText -= 1
      countTankText.setAttribute("text", {value: tankText})

      if(tankText <= 0){
        var winGame = document.querySelector("#completed")
        winGame.setAttribute("visible", true)
      }

      
      scene.removeChild(elementHit);
    }
    //Elimina evento de escucha
    element.removeEventListener("collide", this.removeBullet);

    //Eliminar las balas de la escena   
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  }
});

