var drawSilhouette = (function() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	
	var unitSize = 5; 
	var silhouetteColour = "#333";

	return function() {
		s = $("#codeArea").val();
	
		var lines = s.split("\n"); 
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
	
		function drawLine(rectY, rectWidth){ // Draws a line of code for the silhouette, not an actual line stroke.
			context.beginPath();
			context.rect(0, rectY, rectWidth, unitSize);
			context.fillStyle = silhouetteColour;
			context.fill();
		};
	
		for (var i=0;i < allLineLengths.length;i++){
			drawLine(
				i * unitSize, // Line Y position. Increment 
				Math.floor(allLineLengths[i] * unitSize / 2) 
			);
		};
	
		var dataURL = canvas.toDataURL();
	
		$("#canvasImg").css("display", "inline");
		$("#permalinkWrapper").css("display", "inline");
		document.getElementById('canvasImg').src = dataURL;
		$("#permalink").attr("href", dataURL);	
	}
}());
