/*
File to handle click events of demo html.
*/

$(document).ready(function() {
	$("#nw").customTooltip({
		position: "nw"
	});
	$("#ne").customTooltip({
		position: "ne"
	});
	$("#sw").customTooltip({
		position: "sw"
	});
	$("#se").customTooltip({
		position: "se"
	});
	$("#n").customTooltip({
		position: "n"
	});
	$("#s").customTooltip({
		position: "s"
	});
	$("#e").customTooltip({
		position: "e"
	});
	$("#w").customTooltip({
		position: "w"
	});
	
	$("#click1, #click2").customTooltip({
		events: {
			click: true,
			focus: false,
			hover: false
		}
	});
	$("#hover1,#hover2").customTooltip({
		events: {
			click: false,
			focus: false,
			hover: true
		}
	});
	$("#focus1,#focus2").customTooltip({
		events: {
			click: false,
			focus: true,
			hover: false
		}
	});
	
	
	$("#no-animate1,#no-animate2").customTooltip({
	});
	$("#animate1,#animate2").customTooltip({
		animate: {
			effect: {
				show: "fade",
				hide: "fade"
			},
			duration: 500
		},
	});
	
	
	$("#color1").customTooltip({
		wrapper: {
			"background": "#212121",
            "color": "#ffffff"
		},
		arrowInner: {
			"background": "#212121"
		}
	});
	$("#color2").customTooltip({
		wrapper: {
			"background": "#EFEFEF",
		},
		arrowInner: {
			"background": "#EFEFEF",
		}
	});
	$("#color3").customTooltip({
		wrapper: {
			"background": "#EFEFEF",
		},
		arrowInner: {
			"background": "#EFEFEF",
		}
	});
	$("#color4").customTooltip({
		wrapper: {
			"background": "#EFEFEF",
		},
		arrowInner: {
			"background": "#EFEFEF",
		}
	});
});