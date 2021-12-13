var config = {
    type: Phaser.AUTO,
    width: 640,
    height:480,
    backgroundColor: 'black',
    parent: 'juego bitcoin',
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: [{
        preload: preload,
        create: create,
        update: update
    }]
};
var game = new Phaser.Game(config);

var jugador;

var arriba, derecha, izquierda, abajo;

const velocidad = 100;

var mapa;

function  preload() {
    this.load.spritesheet('personaje1', 'assets/sprites/viejoSF.png', {frameWidth: 16, frameHeight:  18});

    this.load.tilemapTiledJSON('interiorMiCasa', 'assets/mapa/interiorMiCasa.json');
    this.load.image('tileSets', 'assets/mapa/Tileset insides.png');
}

function ejecurar(){
    location.replace("http://localhost/juegoB1"); 
}

function create() {
    mapa = this.make.tilemap({ key: 'interiorMiCasa'});
    var tilesets = mapa.addTilesetImage('Tileset insides', 'tileSets');
    
    var capaSuelo = mapa.createDynamicLayer('capaSuelo', tilesets, 0, 0 );
    var capaPared = mapa.createDynamicLayer('capaPared', tilesets, 0, 0 );
    jugador = this.physics.add.sprite(335,364, 'personaje1', 0);
    var capaMuebles = mapa.createDynamicLayer('capaMuebles', tilesets, 0, 0 );
    var capaPuerta = mapa.createDynamicLayer('capaPuerta', tilesets, 0, 0 );

    jugador.setScale(1.5);

    capaMuebles.setCollisionByProperty({ colision: true});
    capaPared.setCollisionByProperty({ colision: true});
    capaPuerta.setCollisionByProperty({ colision: true});

    
    jugador.setCollideWorldBounds(true);
    this.physics.add.collider(jugador, capaPuerta, ejecurar, null, this);


    this.anims.create({
        key: 'caminarI',
        frames: this.anims.generateFrameNumbers('personaje1', {start: 3, end: 5}),
        frameRate: 10
    })

    this.anims.create({
        key: 'caminarD',
        frames: this.anims.generateFrameNumbers('personaje1', {start: 6, end: 8}),
        frameRate: 10
    })

    this.anims.create({
        key: 'arriba',
        frames: this.anims.generateFrameNumbers('personaje1', {start: 9, end: 11}),
        frameRate: 10
    })

    this.anims.create({
        key: 'abajo',
        frames: this.anims.generateFrameNumbers('personaje1', {start: 0, end: 2}),
        frameRate: 10
    })

    this.physics.add.collider(jugador, capaMuebles);
    this.physics.add.collider(jugador, capaPared);
    this.physics.add.collider(jugador, capaPuerta);

    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}

function update() {
    jugador.body.setVelocityX(0);
    jugador.body.setVelocityY(0);

    if(izquierda.isDown){
        jugador.body.setVelocityX(-velocidad);
        jugador.flipx = false;
    }
    if(derecha.isDown){
        jugador.body.setVelocityX(velocidad);
        jugador.flipx = false;

    }
    if(arriba.isDown){
        jugador.body.setVelocityY(-velocidad);
        jugador.flipy = false;

    }
    if(abajo.isDown){
        jugador.body.setVelocityY(velocidad);
        jugador.flipy = false;

    }

    if( izquierda.isDown ){
        jugador.anims.play('caminarI', true);
    } else if( derecha.isDown ) {
        jugador.anims.play('caminarD', true);
    }
    else if( arriba.isDown ) {
        jugador.anims.play('arriba', true);
    }
    else if( abajo.isDown ) {
        jugador.anims.play('abajo', true);
    }
}