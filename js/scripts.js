var canvas;
var context;
var targetFps = 30;
var drawInterval;
var drawGrid = false;
var cellSize = 16;
var boardDirty = true;
var rightSideBarDirty = true;
var bottomBarDirty = true;

var board = {
	x: 0,
	y: 0,
	w: 512,
	h: 512
};

var rightSideBar = {
	x: 512,
	y: 0,
	w: 88,
	h: 512
};

var bottomBar = {
	x: 0,
	y: 512,
	w: 600,
	h: 88
};

function init(){
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	context.lineWidth = 1;
	initSpriteSheet();
	initMouseListener();

	drawInterval = setInterval(function(){
		draw();
	}, 200);

}

var spriteSheet;
function initSpriteSheet(){
	spriteSheet = new Image();
	spriteSheet.src = '../img/spritesheet.gif';
}

function draw(){
	if(boardDirty){
		context.clearRect(0,0,500,500);
		drawBoard();
		drawMousePosition();
		boardDirty = false;
	}
	if(rightSideBarDirty){
		drawRightSideBar();
		rightSideBarDirty = false;
	}
	if(bottomBarDirty){
		drawBottomBar();
		bottomBarDirty = false;
	}
}

function drawBoard(){
		context.fillStyle = 'rgb(128,128,128)';
		context.fillRect(board.x, board.y, board.w, board.h);
		if(drawGrid){
			context.strokeStyle = 'rgb(128,128,128)';
			context.beginPath();
			for(var i=0; i<25; i++){
				context.moveTo(0, cellSize*i);
				context.lineTo(500, cellSize*i);

				context.moveTo(cellSize*i, 0);
				context.lineTo(cellSize*i, 500);
			
			}
			context.stroke();
		}
		drawMap();
	
}

function drawRightSideBar(){
	context.fillStyle = 'rgb(255,0,0)';
	context.fillRect(rightSideBar.x, rightSideBar.y, rightSideBar.w, rightSideBar.h);

	context.fillStyle = 'rgb(0,0,0)';
	context.textBaseline = 'top';
	context.font = 'bold 14px sans-serif';
	context.fillText('Selected:', rightSideBar.x, rightSideBar.y);

	if(selectedType>=0){
	context.drawImage(
			spriteSheet,
			spriteSheetPositions[selectedType].x,
			spriteSheetPositions[selectedType].y,
			spriteSheetPositions[selectedType].w,
			spriteSheetPositions[selectedType].h,
			rightSideBar.x+40,
			rightSideBar.y+20,
			spriteSheetPositions[selectedType].w,
			spriteSheetPositions[selectedType].h
		);
	}
	else{
		context.fillText('delete', rightSideBar.x, rightSideBar.y+18);
	}
	rightSideBarDirty = false;
}

function updateMap(){
	$('#saveMap').text(JSON.stringify(mapGrid));
}

function deleteMode(){
	rightSideBarDirty = true;
	selectedType = -1;
}

function saveButtonPressed(){
	sortMapGrid();
	var uriContent = "data:application/json," + encodeURIComponent(JSON.stringify(mapGrid));
	location.href = uriContent;
}

function sortMapGrid(){
	mapGrid.cells.sort(function(a, b){
		return a.y-b.y;
	});
	mapGrid.cells.sort(function(a, b){
		return a.x-b.x;
	});
}