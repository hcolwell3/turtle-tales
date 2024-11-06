function JumpingCrabs() {
    //  function determining how the crab moves up and down the y-axis
    //  pause allows for time between jumps
    pause(100)
    //  acceleration that drives crab up the y-axis
    Crab.ay = 40
    //  Pause to allow for the crab to 'drop' back to the seafloor
    pause(4000)
    //  Negative velocity allows for the sprite to travel down the y-axis as if falling from a jump
    Crab.vy = -50
}

//  Pause is added so only one life is lost per second
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite2: Sprite, otherSprite: Sprite) {
    //  Define the rule that when a player sprite (turtle) comes into contact with the enemy sprites a life is lost
    scene.cameraShake(2, 500)
    //  induce a screen shake when an enemy sprite overlaps with player
    //  create a custom sound effect when sprites collide
    music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    //  sine wave shape creates smooth sound
    //  frequency
    //  duration 600 milliseconds
    //  volume
    //  beginning volume
    //  fade out time
    //  No additional effect applied
    //  Linear means it changes at a constant rate, without acceleration or deceleration
    //  play sound until complete once
    info.changeLifeBy(-1)
    //  loss of one life when sprites overlap
    pause(1000)
})
// framerate 0.2seconds
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    //  looping animation for turtle swimming in left direction
    animation.runImageAnimation(Turtle, assets.animation`
            Turtle animationL
        `, 200, true)
})
// when left button pressed turtle changes direction
// framerate 0.2seconds
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    //  looping animation for turtle swimming in right direction
    animation.runImageAnimation(Turtle, assets.animation`
            Turtle animation R
        `, 200, true)
})
// when right button pressed turtle changes direction
//  Used functions to create level to be able to call differerent features
function Level1() {
    //  Set the sprite on a starting position on the left of the screen
    Turtle.setPosition(20, 79)
    //  Create the tilemap for the level with barriers and end flag
    tiles.setCurrentTilemap(tilemap`
        level1
    `)
    //  Call Crabs function into the level
    MovingCrabs()
    //  Call shark enemy into gameplay
    SharkEnemy()
}

//  define the function of level 2
function level2() {
    //  Level two welcome
    game.splash("Level 2")
    //  open the level with the bubble motif
    effects.bubbles.startScreenEffect(500)
    //  set the sprite on a starting position on the left of the screen
    Turtle.setPosition(20, 79)
}

//  define the functions of the shark enemy
function SharkEnemy() {
    
    //  set shark as an enemy sprite
    Shark = sprites.create(assets.image`
        shark
    `, SpriteKind.Enemy)
    //  Set shark position further into the level as enemy
    Shark.setPosition(600, 20)
    //  acceleration -5 to travel toward turtle sprite start position
    Shark.ax = -15
    //  Animate shark sprite to mimic swimming through water, changing frames every 0.2 seconds and continuous repeat
    animation.runImageAnimation(Shark, assets.animation`
        sharky
    `, 200, true)
}

//  define function to end level when sprite reaches 'bubbles' at the end of tile map
scene.onOverlapTile(SpriteKind.Player, assets.tile`
        bubble b #bubble b is asset name of bubble wall
    `, function on_overlap_tile(sprite: Sprite, location: tiles.Location) {
    music.play(music.stringPlayable("B A C5 C5 - - - - ", 400), music.PlaybackMode.UntilDone)
    //  Display level one end screen
    game.splash("Level 1 complete!")
    //  wait two seconds
    pause(2000)
    //  call level two
    level2()
})
//  Creating the function for the crabs to generate on the tilemap
function MovingCrabs() {
    
    //  Set the starting positions for all crab enemy sprites on tiles established in tilemap
    for (let crabStart of tiles.getTilesByType(assets.tile`
        myTile0
    `)) {
        //  set variable myEnemy as Crab (enemy)
        Crab = sprites.create(assets.image`
            Crab
        `, SpriteKind.Enemy)
        //  Start crab sprites on the tiles
        tiles.placeOnTile(Crab, crabStart)
        //  Turn the starting tiles transparent so they do not appear in gameplay
        tiles.setTileAt(crabStart, assets.tile`
            transparency16
        `)
        //  looping animation for crab sprite, frame rate 0.2 sec, repeating
        animation.runImageAnimation(Crab, assets.animation`
            crabby
        `, 200, true)
        //  call 'jumping crabs' function
        JumpingCrabs()
        //  Set chance 50/50 if sprites will begin to move left or right
        if (Math.percentChance(50)) {
            Crab.vx = 50
        } else {
            Crab.vx = -50
        }
        
        //  Set enemy sprites to bounce on the wall between 'coral' barriers
        Crab.setFlag(SpriteFlag.BounceOnWall, true)
    }
}

let Shark : Sprite = null
let Crab : Sprite = null
let Turtle : Sprite = null
//  setting the background image to the ocean scene designed
scene.setBackgroundImage(assets.image`
    background
`)
//  Turtle sprite set as a character
Turtle = sprites.create(assets.image`
    Turtle
`, SpriteKind.Player)
//  Focus camera on Turtle player sprite at all times
scene.cameraFollowSprite(Turtle)
//  turtle control using joystick
controller.moveSprite(Turtle)
//  Begin the game with three lives
info.setLife(3)
//  Level one welcome
game.splash("Welcome to Turtle Tales", "Level 1")
//  open the game with the bubble motif
effects.bubbles.startScreenEffect(500)
//  Call Level 1 function
Level1()
