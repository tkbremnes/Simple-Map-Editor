var selectedType = -1;

function drawMap(){
	mapGrid.cells.forEach(function(c){
		context.drawImage(
			spriteSheet,
			spriteSheetPositions[c.type].x,
			spriteSheetPositions[c.type].y,
			spriteSheetPositions[c.type].w,
			spriteSheetPositions[c.type].h,
			c.x*cellSize,
			c.y*cellSize,
			spriteSheetPositions[c.type].w,
			spriteSheetPositions[c.type].h
		);
	});
}

function addTile(xPos, yPos){
	for(var i=0; i<mapGrid.cells.length; i++){
		var c = mapGrid.cells[i];
		if(c.x==xPos && c.y==yPos){
			mapGrid.cells.splice(i, 1);
		}
	}
	if(selectedType>=0){
		mapGrid.cells.push({x:xPos, y:yPos, type: selectedType});
	}
	
	updateMap();
}

function selectTile(xPos, yPos){
	selectedType = xPos+(yPos*3);
}