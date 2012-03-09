
var mousePos = {x:0, y:0};
function initMouseListener(){
	canvas.addEventListener('mousemove', mouseMoveListener, false);
	canvas.addEventListener('mouseup', mouseClickListener, false);
}

function mouseMoveListener(ev)
{
	var x, y;
   	if ((ev.offsetX || ev.offsetX == 0) && ev.offsetX<512 && ev.offsetY<512)
   	{
    	mousePos.x = (Math.floor(ev.offsetX/cellSize))*cellSize;
     	mousePos.y = (Math.floor(ev.offsetY/cellSize))*cellSize;
     	boardDirty = true;
  	}
  	else if(ev.offsetY>512){
  		mousePos.x = (Math.floor(ev.offsetX/cellSize))*cellSize;
     	mousePos.y = (Math.floor(ev.offsetY/cellSize))*cellSize;
     	bottomBarDirty = true;
  	}
}

function mouseClickListener(ev)
{
	var x, y;
   	if (ev.offsetX || ev.offsetX == 0)
   	{
    	x = ev.offsetX;
     	y = ev.offsetY;
     	
  	}
  	if(ev.offsetX<512 && ev.offsetY<512){
  		addTile(Math.floor(x/cellSize), Math.floor(y/cellSize));
  		boardDirty = true;
  	}
  	else if(ev.offsetY>512){
  		rightSideBarDirty = true;
  		selectTile(Math.floor(x/cellSize),Math.floor((y-512)/cellSize));
  	}

}

function drawMousePosition(){
	context.strokeStyle = 'rgb(255,0,0)';
	context.strokeRect(mousePos.x, mousePos.y, cellSize, cellSize);
}

