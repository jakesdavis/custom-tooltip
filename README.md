# Custom Tooltip Plugin
Custom Tooltip plugin is able to create dynamic tooltips for a container.

#### Version: 
1.0

#### Author: 
jakesdavis (Jakes Davis)

## How to use:

Include jQuery ,

	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js" />

Include plugin ,

	<script type="text/javascript" src="custom-tooltip.js" />
	
Enable Tooltip for an element,

	var tooltipOptions = {
		"position": "n"
	};
	$("#elementID").customTooltip(tooltipOptions);
	
Optional configurations,

	"border": "1px",
	"position": "n",
	events: {
		hover: true,
		focus: false,
		click: false
	},
	animate: {
		effect: {
			show: "fade",
			hide: "fade"
		},
		duration: 500
	},
	"wrapper": {
		"min-width": "50px",
		"max-width": "200px",
		"padding": "5px",
		"border-radius": "5px",
		"box-shadow": "0px 0px 5px 0px #777",
		"background": "#F2F2F2",
		"color": "#000000"
	},
	"content": {
		"padding": "2px",
	},
	"arrow": {
		"height": "15px",
		"width": "15px"
	},
	"arrowInner": {
		"box-shadow": "0px 0px 5px 0px #777",
		"background": "#F2F2F2"
	}
	
Optional configurations in detail,

####border

 - Default: `1px`  
 - Expected: border-width in `px`
 - Function: Set border width of tooltip-box
 
####position

 - Default: `n`  
 - Expected: n|e|w|s|nw|ne|sw|se|g
 - Function: default position of tooltip wrt container
 
####events - hover

 - Default: `true`  
 - Expected: Boolean values
 - Function: Set trigger for displaying the tooltip

####events - click

 - Default: `true`  
 - Expected: Boolean values
 - Function: Set trigger for displaying the tooltip
 
####events - focus

 - Default: `true`  
 - Expected: Boolean values
 - Function: Set trigger for displaying the tooltip

####animate - effect - show

 - Default: `fade`
 - Expected: `fade` // More options to be added 
 - Function: effect to show on display of tooltip
 
####animate - effect - hide

 - Default: `fade`
 - Expected: `fade` // More options to be added 
 - Function: effect to show on hide of tooltip
 
####animate - duration

 - Default: `500`  
 - Expected: Integer
 - Function: Duration of effect
 
####wrapper

 - Basic Css Styles for the tooltip wrapper
 
####content

 - Basic Css Styles for the tooltip content area
 
####arrow

 - Basic Css Styles for the tooltip arrow container
 
####arrow-inner

 - Basic Css Styles for the tooltip arrow
