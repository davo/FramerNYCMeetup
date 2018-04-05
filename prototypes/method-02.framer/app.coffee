# Set up FlowComponent
flow = new FlowComponent
	backgroundColor: "#F2F2F2"
	
flow.footer = menu

# Show the layer 
flow.showNext(feedView)

# Allow scrolling with mouse
flow.scroll.mouseWheelEnabled = true

card01.onTap ->
	flow.showOverlayCenter(fullImageView)

back_btn.onTap ->
	flow.showPrevious()
	
photo.draggable = true
photo.draggable.vertical = false

# Set dragging constraints 
photo.draggable.constraints =
	x: -69
	width: photo.width