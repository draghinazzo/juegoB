
var config = {
    type: Phaser.AUTO,
    width: 480,
    height:640,
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

    this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
    this.load.image('tileSets', 'assets/mapa/tileset-shinygold2.png');
}

function ejecurar(){
    location.replace("http://localhost/juegoB/miCasa.html"); 
}

function create() {
    socket.on('jugadorIzquirda', () => {
        console.log('alguien camina');
    });

    mapa = this.make.tilemap({ key: 'mapa'});
    var tilesets = mapa.addTilesetImage('tileset-shinygold2', 'tileSets');
    
    var capaPasto = mapa.createDynamicLayer('capaPasto', tilesets, 0, 0 );
    var capaArbol = mapa.createDynamicLayer('capaArbol', tilesets, 0, 0 );
    var capaCasa = mapa.createDynamicLayer('capaCasa', tilesets, 0, 0 );
    var capaMiCasa = mapa.createDynamicLayer('capaMiCasa', tilesets, 0, 0 );
    var capaPuertaMiCasa = mapa.createDynamicLayer('capaPuertaMiCasa', tilesets, 0, 0 );

    jugador = this.physics.add.sprite(241,301, 'personaje1', 0);
    jugador.setScale(1.5);
    var capaTecho = mapa.createDynamicLayer('capaTecho', tilesets, 0, 0 );

    capaArbol.setCollisionByProperty({ solido: true});
    capaCasa.setCollisionByProperty({ solido: true});
    capaMiCasa.setCollisionByProperty({ solido: true});
    capaPuertaMiCasa.setCollisionByProperty({ solido: true});

    
    jugador.setCollideWorldBounds(true);

    this.physics.add.collider(jugador, capaPuertaMiCasa, ejecurar, null, this);

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

    this.physics.add.collider(jugador, capaArbol);
    this.physics.add.collider(jugador, capaCasa);
    this.physics.add.collider(jugador, capaPuertaMiCasa);
    this.physics.add.collider(jugador, capaMiCasa);

    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}

function update() {
    // console.log('x', jugador.x)
    // console.log('y', jugador.y)
    jugador.body.setVelocityX(0);
    jugador.body.setVelocityY(0);
    
    if(izquierda.isDown){
        jugador.body.setVelocityX(-velocidad);
        jugador.flipx = false;
        socket.emit('izquierda');
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