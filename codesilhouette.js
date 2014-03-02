var drawSilhouette = (function() {
	// Draws a line of code for the silhouette, not an actual line stroke.
	function drawLine(rectY, rectWidth) {
		context.beginPath();
		context.rect(0, rectY, rectWidth, unitSize);
		context.fillStyle = silhouetteColour;
		context.fill();
	};

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	
	var unitSize = 5; 
	var silhouetteColour = "#333";

	return function() {
		s = document.getElementById("codeArea").value;
	
		// Strip carriage returns (Windows platform only), then split on new lines
		var lines = s.replace(/\r/g, "").split("\n"); 
		var allLineLengths = new Array(); 
	
		var longestLine = 0
		for (var i = 0; i < lines.length; i++) { 
			allLineLengths.push(lines[i].length); 
	
			if (lines[i].length > longestLine){
				longestLine = lines[i].length
			}
		};
	
		canvas.width  = Math.floor(longestLine * unitSize / 2)
		canvas.height = allLineLengths.length * unitSize;
	
		for (var i=0;i < allLineLengths.length;i++){
			drawLine(
				i * unitSize, // Line Y position. Increment 
				Math.floor(allLineLengths[i] * unitSize / 2) 
			);
		};
	
		var dataURL = canvas.toDataURL();
	
		var canvasImg = document.getElementById("canvasImg");
		canvasImg.src = dataURL;
		canvasImg.style.display = "inline";
		document.getElementById("permalinkWrapper").style.display = "inline";
		document.getElementById("permalink").href = dataURL;
	}
}());
