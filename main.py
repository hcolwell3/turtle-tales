def JumpingCrabs():
    # function determining how the crab move up and down the y axis
    # pause allows for time between jumps
    pause(100)
    # acceleration that drives crab up the y axis
    Crab.ay = 40
    # pause to allow for the crab to 'drop' back to sea floor
    pause(4000)
    # negative velocity allows for the sprite to travel down the y axis as if falling from a jump
    Crab.vy = -50

def on_on_overlap(sprite2, otherSprite):
    # Define the rule that when a player sprite (turtle) comes into contact with the enemy sprites a life is lost
    scene.camera_shake(2, 500)
    # induce a screen shake when enemy sprite overlaps with player
    # create a custom sound effect when sprites collid
    music.play(music.create_sound_effect(WaveShape.SINE,
            200,   # frequency
            600, # duration 600 milliseconds
            255,    # volume
            0,  # beginning volume
            150, # fade out time
            SoundExpressionEffect.NONE, # No additional effect applied
            InterpolationCurve.LINEAR),    # Linear means it changes at a constant rate, without acceleration or deceleration
        music.PlaybackMode.UNTIL_DONE) # play sound until complete once
    # loss of one life when sprites overlap
    info.change_life_by(-1)
    # Pause is added so only one life is lost per second
    pause(1000)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_left_pressed():
    # looping animation for turtle swimming
    animation.run_image_animation(Turtle,
        assets.animation("""
            Turtle animationL
        """),
        200,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

# Used functions to create levels to be able to call differerent features
def Level1():
    # Set the sprite on a starting position on the left of the screen
    Turtle.set_position(20, 79)
    # Create the tilemap for the level with barriers and end flag
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
    # Call Crabs function into the level
    MovingCrabs()
    # Call shark enemy into gameplay
    SharkEnemy()
# define the function of level 2
def level2():
    # Level two welcome
    game.splash("Level 2")
    # open the level with the bubble motif
    effects.bubbles.start_screen_effect(500)
    # set the sprite on a starting position on the left of the screen
    Turtle.set_position(20, 79)
    
# define the functions of the shark enemy
def SharkEnemy():
    global Shark
    # set shark as an enemy sprite
    Shark = sprites.create(assets.image("""
        shark
    """), SpriteKind.enemy)
    # Set shark position further into the level as enemy
    Shark.set_position(600, 20)
    # acceleration -5 to travel toward turtle sprite start position
    Shark.ax = -15
    # animate shark sprite to mimic swimming through water, changing frames every 0.2 secs and continous repeat
    animation.run_image_animation(Shark, assets.animation("""
        sharky
    """), 200, True)

def on_right_pressed():
    # looping animation for turtle swimming in right direction, framerate 0.2sec
    animation.run_image_animation(Turtle,
        assets.animation("""
            Turtle animation R
        """),
        200,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# define function to end level when sprite reaches 'bubbles' at the end of tile map

def on_overlap_tile(sprite, location):
    # play custom end level music, four notes at tempo 400bmp
    music.play(music.string_playable("B A C5 C5 - - - - ", 400),
        music.PlaybackMode.UNTIL_DONE)
    # display level one end screen
    game.splash("Level 1 complete!")
    # wait two seconds
    pause(2000)
    # call level two
    level2()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        bubble b
    """),
    on_overlap_tile)

# creating the function for the crabs to generate on the tilemap
def MovingCrabs():
    global Crab
    # Set the starting positions for all crab enemy sprites on tiles established in tilemap
    for crabStart in tiles.get_tiles_by_type(assets.tile("""
        myTile0
    """)):
        # set variable myEnemy as Crab (enemy)
        Crab = sprites.create(assets.image("""
            Crab
        """), SpriteKind.enemy)
        # Start crab sprites on the tiles
        tiles.place_on_tile(Crab, crabStart)
        # Turn the starting tiles transparent so they do not appear in gameplay
        tiles.set_tile_at(crabStart, assets.tile("""
            transparency16
        """))
        # looping animation for crab sprite, frame rate 0.2 sec, repeating
        animation.run_image_animation(Crab, assets.animation("""
            crabby
        """), 200, True)
        # call 'jumping crabs' function
        JumpingCrabs()
        # Set chance 50/50 if sprites will begin to move left or right
        if Math.percent_chance(50):
            Crab.vx = 50
        else:
            Crab.vx = -50
        # Set enemy sprites to bounce on the wall between 'coral' barriers
        Crab.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
Shark: Sprite = None
Crab: Sprite = None
Turtle: Sprite = None
# setting the bakground image to the ocean scene designed
scene.set_background_image(assets.image("""
    background
"""))
# Turtle sprite set as character
Turtle = sprites.create(assets.image("""
    Turtle
"""), SpriteKind.player)
# Focus camera on Turtle player sprite at all times
scene.camera_follow_sprite(Turtle)
# turtle control using joystick
controller.move_sprite(Turtle)
# Begin the game with three lives
info.set_life(3)
# Level one welcome
game.splash("Welcome to Turtle Tales", "Level 1")
# open the game with the bubble motif
effects.bubbles.start_screen_effect(500)
# Call Level 1 function
Level1()