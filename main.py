def JumpingCrabs():
    list2: List[Sprite] = []
    for Crab in list2:
        Crab.vy = 50
# Define the rule that when a player sprite (turtle) comes into contact with the enemy sprites a life is lost
# Include this rule into game play

def on_on_overlap(sprite2, otherSprite):
    scene.camera_shake(2, 500)
    info.change_life_by(-1)
    # Pause is added so only one life is lost per second
    pause(1000)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_overlap_tile(sprite, location):
    game.splash("Level 1 complete!")
    # Pause is added so only one life is lost per second
    pause(2000)
    level2()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile3
    """),
    on_overlap_tile)

# Used functions to create levels to be able to call differerent features
def Level1():
    # I set the sprite on a starting position on the left of the screen
    mySprite.set_position(20, 79)
    # turtle control using joystick
    controller.move_sprite(mySprite)
    # Create the tilemap for the level with barriers and end flag
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
    # Call Crabs function into the level
    MovingCrabs()
    # Call shark enemy into gameplay
    SharkEnemy()
def level2():
    # Level two welcome
    game.splash("Level 2")
    # open the level with the bubble motif
    effects.bubbles.start_screen_effect(500)
    # I set the sprite on a starting position on the left of the screen
    mySprite.set_position(20, 79)
def SharkEnemy():
    global Shark
    # set shark as an enemy sprite
    Shark = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    # Set shark position further into the level as enemy
    Shark.set_position(700, 35)
    # acceleration -5 to travel toward turtle sprite start position
    Shark.ax = -5
    # Have enemy sprite (shark) destroy when it hits the beginning wall to ease game play
    Shark.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
# creating the function for the crabs to generate on the tilemap
def MovingCrabs():
    global Crab2
    # Set the starting positions for all crab enemy sprites on tiles established in tilemap
    for value in tiles.get_tiles_by_type(assets.tile("""
        myTile0
    """)):
        # set variable myEnemy as Crab (enemy)
        Crab2 = sprites.create(assets.image("""
            Crab
        """), SpriteKind.enemy)
        # Start crab sprites on the tiles
        tiles.place_on_tile(Crab2, value)
        # Turn the starting tiles transparent so they do not appear in gameplay
        tiles.set_tile_at(value, assets.tile("""
            transparency16
        """))
        # Set chance 50/50 if sprites will begin to move left or right
        if Math.percent_chance(50):
            Crab2.vx = 50
        else:
            Crab2.vx = -50
        # Set enemy sprites to bounce on the wall between 'coral' barriers
        Crab2.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
    JumpingCrabs()
Crab2: Sprite = None
Shark: Sprite = None
mySprite: Sprite = None
# setting the bakground image to the ocean scene designed
scene.set_background_image(assets.image("""
    background
"""))
# Turtle sprite set as character
mySprite = sprites.create(assets.image("""
    Turtle
"""), SpriteKind.player)
# Focus camera on Turtle player sprite at all times
scene.camera_follow_sprite(mySprite)
# Begin the game with three lives
info.set_life(3)
# Call Level 1 function
Level1()