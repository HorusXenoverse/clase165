AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //obtener todos los enemigos usando el nombre de la clase
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //Entidad de la bala del enemigo
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var vector1 = new THREE.Vector3()
            var vector2 = new THREE.Vector3()

            //Obtener la posición del enemigo y jugador usando el método Three.js
            var positionEnemy = els[i].object3D
            var positionMe = document.querySelector("#weapon").object3D

            positionEnemy.getWorldPosition(vector2)
            positionMe.getWorldPosition(vector1)

            //Establecer la velocidad y su dirección
            var vector3 = new THREE.Vector3()
            vector3.subVectors(vector1, vector2).normalize()
            enemyBullet.setAttribute("velocity", vector3.multiplyScalar(10))

            
            //Establecer el atributo del cuerpo dinámico
            enemyBullet.setAttribute("dynamic-body", {shape: "sphere", mass: "0"})
            

            //Obtener atributo de texto
            var lifeCountText = document.querySelector("#countLife")
            var lifeText = parseInt(lifeCountText.getAttribute("text").value)
            

            //Evento de colisión con las balas enemigas
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Agrega las condiciones aquí
                    console.log("golpe")
                    if(lifeText > 0){
                        lifeText -= 1
                        lifeCountText.setAttribute("text", {value: lifeText})
                    }

                    if(lifeText <= 0){
                        var gameOver = document.querySelector("#over")
                        gameOver.setAttribute("visible", true)
                        var removeEnemy = document.querySelectorAll(".enemy")
                        for(var i = 0; i< removeEnemy.length; i++){
                            scene.removeChild(removeEnemy[i])
                        }
                    }



                }
            });

        }
    },

});
