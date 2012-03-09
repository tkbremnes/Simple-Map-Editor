
function initBottomBar(){
	cellTypes[0] = [0,1,2];
	cellTypes[1] = [3,4,5];
	cellTypes[2] = [6,7,8];
	cellTypes[3] = [9,10,11];
	cellTypes[4] = [12,13,14];
}

function drawBottomBar(){
	context.fillStyle = 'rgb(0,0,200)';
	context.fillRect(bottomBar.x, bottomBar.y, bottomBar.w, bottomBar.h);

	var xPos = (bottomBar.x)+5;
	var yPos = (bottomBar.y)+5;
	for(var i=0; i<15; i++){
		context.drawImage(
			spriteSheet,
			spriteSheetPositions[i].x,
			spriteSheetPositions[i].y,
			spriteSheetPositions[i].w,
			spriteSheetPositions[i].h,
			bottomBar.x + spriteSheetPositions[i].x,
			bottomBar.y + spriteSheetPositions[i].y,
			spriteSheetPositions[i].w,
			spriteSheetPositions[i].h
		);
		xPos += cellSize + 5;
	}
}