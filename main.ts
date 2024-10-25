function JumpingCrabs () {
    let list: Sprite[] = []
    for (let Crab of list) {
        pause(100)
        Crab.ay = 50
        pause(500)
        Crab.vy = -50
    }
}
// Define the rule that when a player sprite (turtle) comes into contact with the enemy sprites a life is lost
// Include this rule into game play
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite) {
    scene.cameraShake(2, 500)
    info.changeLifeBy(-1)
    // Pause is added so only one life is lost per second
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    game.splash("Level 1 complete!")
    // Pause is added so only one life is lost per second
    pause(2000)
    level2()
})
// Used functions to create levels to be able to call differerent features
function Level1 () {
    // I set the sprite on a starting position on the left of the screen
    mySprite.setPosition(20, 79)
    // turtle control using joystick
    controller.moveSprite(mySprite)
    // Create the tilemap for the level with barriers and end flag
    tiles.setCurrentTilemap(tilemap`level1`)
    // Call Crabs function into the level
    MovingCrabs()
    // Call shark enemy into gameplay
    SharkEnemy()
}
function level2 () {
    // Level two welcome
    game.splash("Level 2")
    // open the level with the bubble motif
    effects.bubbles.startScreenEffect(500)
    // I set the sprite on a starting position on the left of the screen
    mySprite.setPosition(20, 79)
}
function SharkEnemy () {
    // set shark as an enemy sprite
    Shark = sprites.create(img`
        .............ccfff..............
        ............cddbbf..............
        ...........cddbbf...............
        ..........fccbbcf............ccc
        ....ffffffccccccff.........ccbbc
        ..ffbbbbbbbbbbbbbcfff.....cdbbc.
        ffbbbbbbbbbcbcbbbbcccff..cddbbf.
        fbcbbbbbffbbcbcbbbcccccfffdbbf..
        fbbb1111ff1bcbcbbbcccccccbbbcf..
        .fb11111111bbbbbbcccccccccbccf..
        ..fccc33cc11bbbbccccccccfffbbcf.
        ...fc131c111bbbcccccbdbc...fbbf.
        ....f33c111cbbbfdddddcc.....fbbf
        .....ff1111fbdbbfddcc........fff
        .......cccccfbdbbfc.............
        .............fffff..............
        `, SpriteKind.Enemy)
    // Set shark position further into the level as enemy
    Shark.setPosition(700, 35)
    // acceleration -5 to travel toward turtle sprite start position
    Shark.ax = -5
    // Have enemy sprite (shark) destroy when it hits the beginning wall to ease game play
    Shark.setFlag(SpriteFlag.DestroyOnWall, true)
}
// creating the function for the crabs to generate on the tilemap
function MovingCrabs () {
    // Set the starting positions for all crab enemy sprites on tiles established in tilemap
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        // set variable myEnemy as Crab (enemy)
        Crab = sprites.create(assets.image`Crab`, SpriteKind.Enemy)
        // Start crab sprites on the tiles
        tiles.placeOnTile(Crab, value)
        // Turn the starting tiles transparent so they do not appear in gameplay
        tiles.setTileAt(value, assets.tile`transparency16`)
        // Set chance 50/50 if sprites will begin to move left or right
        if (Math.percentChance(50)) {
            Crab.vx = 50
        } else {
            Crab.vx = -50
        }
        // Set enemy sprites to bounce on the wall between 'coral' barriers
        Crab.setFlag(SpriteFlag.BounceOnWall, true)
    }
    JumpingCrabs()
}
let Crab: Sprite = null
let Shark: Sprite = null
let mySprite: Sprite = null
// setting the bakground image to the ocean scene designed
scene.setBackgroundImage(assets.image`background`)
// Turtle sprite set as character
mySprite = sprites.create(assets.image`Turtle`, SpriteKind.Player)
// Focus camera on Turtle player sprite at all times
scene.cameraFollowSprite(mySprite)
// Begin the game with three lives
info.setLife(3)
// Call Level 1 function
Level1()
