# 1. BackgroundLayer
# 2. Scroll Component
# 3. For Loop
# 4. Adding items using a for loop
# 5. Set Constraints, Events
# 6. States / Animation

# Append Script

appendScript = (src) ->
	parseScr = Utils.domLoadDataSync src
	script = document.createElement 'script'
	script.type = 'text/javascript'
	script.innerHTML = parseScr
	document.head.appendChild(script)
	
appendScript('https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js')

# Set background
Canvas.backgroundColor = "#FFFFFF"

# New scroll component
scroll = new ScrollComponent
# Set size of scroll component
# scroll.width = Screen.width
scroll.size = Screen.size

# Fix dragging behaviour to vertical only
scroll.scrollHorizontal = false

# Enable mouse scrolling
scroll.mouseWheelEnabled = true


names = ["Adi", "Vincent"]
# 
# for name, i in names
# 	print i
# 	
# Number of items to populate
items = 10

# Initialize for loop
for item in [0..items]
	
# 	print 10 + 210 * item

	# Create layer
	layer = new Layer
		parent: scroll.content
# 		backgroundColor: Utils.randomColor()
		borderRadius: 4
		width: Screen.width-20
		height: 200
		x: Align.center()
		y: 10 + 210 * item
		image: Utils.randomImage()
	
	headLine = new TextLayer
		parent: layer
		width: 200
		color: "white"
		fontFamily: "Helvetica"
		fontSize: 18
		x: 21
		y: Align.center
		text: faker.lorem.sentence()
		
	# Create a new state 
	layer.states =
		changeImage:
			image: Utils.randomImage()

	layer.onTap ->
		@.image = Utils.randomImage()
		
		