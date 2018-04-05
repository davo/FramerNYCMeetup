# 1. CofeeScript Basics (spaces, vars, functions, comments)
# 2. BackgroundLayer
# 3. Layer Properties, Centering
# 4. Draggable
# 5. Constraints Layer, Frame
# 6. Set Constraints, Events
# 7. States / Animation

# This is a comment

# Variables
string = "Hello there, "
number = 42

framerSaysHelloWorld = (message, person) ->
	print message + person
	
# framerSaysHelloWorld(string, 'Laine')

sayHi = (message) ->
	print message

# sayHi(string)




# Set background

Canvas.backgroundColor = "rgba(0, 85, 255, 0.9)"

# Layers are the building blocks for pretty much everything in Framer.
# Create layer
layerA = new Layer
	backgroundColor: "#fff"
	borderRadius: 4
	opacity: 0
	scale: 0.5

	


# Center layer
layerA.center()

# Trigger animation with a delay
Utils.delay 0.5, ->
	layerA.animate
		opacity: 0.9
		scale: 1

# Create a new state 
layerA.states =
	changeColor:
		rotation: 0
		scale: 0.5
		backgroundColor: "red"
		
	rotateAndChangeColor:
		rotation: 180
		backgroundColor: "white"

# Utils.delay 0.5, ->
# 	layerA.animate "changeColor"
# 	layerA.onAnimationEnd ->
# 		layerA.animate "rotateAndChangeColor"



# layerA.onTap ->
# 	layerA.animate "changeColor"
# 	layerA.onAnimationEnd ->
# 		layerA.animate "rotateAndChangeColor"

# Enable dragging
layerA.draggable.enabled = true

# Create constraints layer
constraints = new Layer 
	backgroundColor: "rgba(255,255,255,0.2)"
	width: Screen.width
	height: Screen.height
	borderRadius: 8
	
constraints.center()

# print constraints.frame
 
# Set constraints
# Frame: x, y, width, height 
layerA.draggable.constraints = constraints.frame