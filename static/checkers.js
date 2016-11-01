var gameboard = [[ 1, 5, 1, 5, 1, 5, 1, 5],
[ 5, 1, 5, 1, 5, 1, 5, 1],
[ 1, 5, 1, 5, 1, 5, 1, 5],
[ 5, 0, 5, 0, 5, 0, 5, 0],
[ 0, 5, 0, 5, 0, 5, 0, 5],
[ 5,-1, 5,-1, 5,-1, 5,-1],
[-1, 5,-1, 5,-1, 5,-1, 5],
[ 5,-1, 5,-1, 5,-1, 5,-1] ]

var curPlayer = 0;

function draw() {

	var board = document.getElementById("board");
	var tableText = "";
	for(var row = 0; row < 8; row++) {
		tableText += "<tr>";
		
		for(var col = 0; col < 8; col++) {
			var id = row*8 + col;
			var cl;
			if(row%2!=col%2)
				cl = "black";
			else
				cl = "white";
			tableText +="<td id='"+id+"' class ='"+cl+"' onclick=move("+id+")>"
			if(gameboard[row][col] != 5 && gameboard[row][col] != 0) 
			{
				tableText += "<p>"+gameboard[row][col]+"</p>";
			}
			tableText +="</td>"
		}
		tableText += "</tr>";
	}
	board.innerHTML = tableText;
}

function move(id) {
	var x = Math.floor(id/8);
	var y = id%8;
	
	if(gameboard[x][y] == -1 && curPlayer == 0) {
		console.log(x, y);
		//change the gameboard
		draw();
		curPlayer = 1;
		getAIMove();
	}
}
var gameOb = {"data": gameboard};

function getAIMove() {
	//send an ajax request to /moves
	$.ajax({
	    type: "POST",
	    url: "/moves",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: gameOb,
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data){alert(data);},
	    failure: function(errMsg) {
	        alert(errMsg);
	    }
});

	//get Response
	//change gameboard
	curPlayer = 0;
	draw();
}

window.onload = function () {
	draw();
}