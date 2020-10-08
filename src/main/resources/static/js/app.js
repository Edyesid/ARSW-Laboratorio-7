var app = (function() {

	var cinema_;

	var fecha_;
	
	var listFunctions_;

	var actualFunction;
	
	var cliente = "js/apiclient.js";

	var setcinema = function(cinema) {
		cinema_ = cinema;
	}

	var setfecha = function(fecha) {
		fecha_ = fecha;
	}

	var setFunction = function (newfuncion) {
		actualFunction = newfuncion;
	}

	var getfuctionsByNameData = function(cinema, fecha) {
		console.log(cinema);
		console.log(fecha);
		$.getScript(cliente, function() {
			client.getFunctionsByCinemaAndDate(cinema,fecha,call);
		});
		fcinema(cinema);
	}

    function call(functions){
    	listFunctions_ = [];
        functions.map(function (fun) {
        	listFunctions_.push({
        		name: fun.movie.name,
        		genre: fun.movie.genre,
        		hour: fun.date.split(" ")[1]}); 
        });
        updateTable();
    }

    function updateTable() {
    	$("#idtable > tbody").empty();
    	for (i = 0; i < listFunctions_.length; i++) {
    		console.log(listFunctions_[i]);
    		$("#idtable > tbody").append(
    				'<tr><td>' + listFunctions_[i].name + '</td>' + 
    				'<td>' + listFunctions_[i].genre + '</td>' + 
    				'<td>' + listFunctions_[i].hour + '</td>' + 
    				'<td>' + "<button onclick = 'app.getSeat(\"" + listFunctions_[i].name +"\")'>Open Seats</button>" + '</td></tr>');
    		}
    }
    
    function fcinema(cinema) {
    	$("#cinemaSelected").text(cinema);
    }
    function favailability(name) {
		$("#availabilityh1").text("Availability of:");
    	$("#availability").text(name);
    }
    function seats(funcion) {
		setFunction(funcion);
		$("#divcanvas").empty();
		$("#divcanvas").append("<canvas id=\"myCanvas\" width=\"510\" height=\"300\" style=\"border: 3px solid #000000;\"></canvas>");
    	var lugares = funcion.seats;
    	var sillas = lugares.length * lugares[0].length;
    	var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var img = new Image();
		var img2 = new Image();
		img.src = "imagenes/azul.png";
		img2.src = "imagenes/roja.png";
		img.onload = function() {
			img2.onload = function() {
				for (i = 0; i < lugares.length; i++) {
					for (j = 0; j < lugares[i].length; j++) {
						if (lugares[i][j]) {
							var a = (j * 40) + 25;
							var b = (i * 35) + 30;
							ctx.drawImage(img, a, b);
						} else {
							sillas = sillas - 1;
							var c = (j * 40) + 25;
							var d = (i * 35) + 30;
							ctx.drawImage(img2, c, d);
						}
					}
				}
			}
		}
		$("#number").text("Number of available chairs:");
    	$("#chairs").text(sillas);

		$("#hbuyticket").empty();
		$("#inputrow").empty();
		$("#inputcol").empty();
		$("#buttonBuy").empty();

		var input1 = '<input type="text" id="editrow" placeholder="row"/>'
		var input2 = '<input type="text" id="editcol" placeholder="column"/>'
		var boton3 = '<button id="buttonBuyTicket" onClick = "app.putBuyTicket()">Buy</button>'


		$("#hbuyticket").append("Buy Ticket");
		$("#inputrow").append(input1);
		$("#inputcol").append(input2);
		$("#buttonBuy").append(boton3);

    }
    
    function administrator(mvname) {
		$("#admon").empty();
    	$("#saveupdate").empty();
    	$("#cfunction").empty();
    	$("#dfunction").empty();
		$("#editText").empty();
    	$("#editfunction").empty();
    	
    	var input = '<input type="text" id="edit" placeholder="New Hour"/>'
    	var boton1 = '<button id="saveupdateB" onClick = "app.putFunction(\'' + mvname + '\')">Save/Update</button>'
		var boton2 = '<button id="cfunctionB" onClick = "app.createNewFunction()">Create new function</button>'
		var boton3 = '<button id="dfunctionB" onClick = "app.deleteFunction()">Delete Function</button>'

		$("#admon").append("Administrator Mode");
		$("#editText").append("Edit function:");
    	$("#editfunction").append(input);
		$("#saveupdate").append(boton1);
    	$("#cfunction").append(boton2);
    	$("#dfunction").append(boton3);
    }
	function putBuyTicket() {
		var row = $("#editrow").val();
		var col = $("#editcol").val();
		var value = $.ajax({
			url: "http://localhost:8080/cinemas/" + cinema_ + "/" + fecha_ + "/" + actualFunction.movie.name  + "/" + row + "/" + col,
			type: 'PUT',
		})
		value.then(
			function () {
				console.log("OK");
				getfuctionsByNameData(cinema_, fecha_)
			},
			function (e) {

				console.log("ERROR", e);
			}
		);
		return value;
	}

	function putCinema(data) {
		var value = $.ajax({
			url: "http://localhost:8080/cinemas/" + cinema_,
			type: 'PUT',
			data: data,
			contentType: "application/json"
		})
		value.then(
			function () {
				console.log("OK");
				getfuctionsByNameData(cinema_, fecha_)
			},
			function (e) {

				console.log("ERROR", e);
			}
		);
		return value;
	}

	function clearCanvas() {

		$("#availabilityh1").empty();
		$("#availability").empty();
		$("#number").empty();
		$("#chairs").empty();
		document.getElementById('myCanvas').style.visibility = "hidden";
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
	}
	function postFunction(data) {
		var value = $.ajax({
			url: "http://localhost:8080/cinemas/" + cinema_,
			type: 'POST',
			data: data,
			contentType: "application/json"
		})
		value.then(
			function () {
				console.log("OK");
				getfuctionsByNameData(cinema_, fecha_)
			},
			function (e) {

				console.log("ERROR", e);
			}
		);
		return value;
	}

	function deleteFunction(data) {
		var value = $.ajax({
			url: "http://localhost:8080/cinemas/" + cinema_,
			type: 'DELETE',
			data: data,
			contentType: "application/json"
		})
		value.then(
			function () {
				console.log("OK");
				getfuctionsByNameData(cinema_, fecha_)
			},
			function (e) {

				console.log("ERROR", e);
			}
		);
		return value;
	}

	return {
		getFuctionsByNameData: function (cinema, fecha) {
			setcinema(cinema);
			setfecha(fecha);
			getfuctionsByNameData(cinema, fecha);
		},

		getSeat: function (mvname) {
			console.log(mvname);
			$.getScript(cliente, function () {
				client.getfuncion(cinema_, fecha_, mvname, seats);
			});
			favailability(mvname);
			administrator(mvname);
		},
		createNewFunction : function () {
			clearCanvas();
			$("#newfunction").empty();
			$("#inputnombre").empty();
			$("#inputgenero").empty();
			$("#inputhora").empty();
			var input1 = '<input type="text" id="inputname" placeholder="Name"/>'
			var input2 = '<input type="text" id="inputgenre" placeholder="Genre"/>'
			var input3 = '<input type="text" id="inputhour" placeholder="Hour"/>'
			var boton = '<button id="createbutton" onClick = "app.createFunction()">Create</button>'
			$("#newfunction").append("new Function");
			$("#inputnombre").append(input1);
			$("#inputgenero").append(input2);
			$("#inputhora").append(input3);
			$("#createid").append(boton);
		},
		createFunction : function () {
			var inname = $("#inputname").val();
			var ingenre = $("#inputgenre").val();
			var inhour = $("#inputhour").val();
			var infecha = fecha_ + " " + inhour;
			var sillasnuevas = [[true,true,true,true,true,true,true,true,true,true,true,true],
								[true,true,true,true,true,true,true,true,true,true,true,true],
								[true,true,true,true,true,true,true,true,true,true,true,true],
								[true,true,true,true,true,true,true,true,true,true,true,true],
								[true,true,true,true,true,true,true,true,true,true,true,true],
								[true,true,true,true,true,true,true,true,true,true,true,true],
								[true,true,true,true,true,true,true,true,true,true,true,true]];

			var data = JSON.stringify({movie: {name: inname,genre:ingenre},seats:sillasnuevas,date:infecha});
			console.log("----------------------------------------------------");
			console.log(data);
			console.log("----------------------------------------------------");
			postFunction(data);
		},

		putFunction: function (mvname) {
			console.log(mvname);
			var fechaVal = $("#edit").val();
			console.log(fechaVal);

			var nuevaFecha = actualFunction.date.split(" ")[0] + " " + fechaVal;
			console.log(nuevaFecha);

			var data = JSON.stringify({movie: actualFunction.movie, seats: actualFunction.seats, date: nuevaFecha});

			putCinema(data)

		},

		deleteFunction : function () {
			var data = JSON.stringify({movie: actualFunction.movie, seats: actualFunction.seats, date: actualFunction.date});
			console.log(data);
			deleteFunction(data);
		},
		putBuyTicket : function () {
			putBuyTicket();
		}
	}

})();