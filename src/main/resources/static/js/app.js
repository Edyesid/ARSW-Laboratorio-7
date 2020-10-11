var app = (function() {

	var cinema_;
	var fecha_;
	var listFunctions_;
	var actualFunction;
	var stompClient = null;
	var identificador_;
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

    class Seat {
        constructor(row, col) {
            this.row = row;
            this.col = col;
        }
    }

    var init = function (mvname) {
        identificador_ = "." + cinema_ + "." +  fecha_ + "." + mvname;
        connectAndSubscribe(getSeat(mvname));
    }

    var verifyAvailability = function (row,col) {
        var st = new Seat(row, col);
        if (actualFunction.seats[row][col]===true) {
            putBuyTicket(row,col);
            actualFunction.seats[row][col]=false;
            console.info("purchased ticket");
            stompClient.send("/topic/buyticket", + identificador_, {}, JSON.stringify(st));
        }
        else{
            console.info("Ticket not available");
        }
    };

    var connectAndSubscribe = function (callback) {

        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/buyticket' + identificador_, function (eventbody) {
               var theObject=JSON.parse(eventbody.body);
               callback();
            });
        });
    };


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
    				'<td>' + "<button onclick = 'app.getSeat(\"" + listFunctions_[i].name +"\"),app.connectInit(\"" + listFunctions_[i].name +"\")'>Open Seats</button>" + '</td></tr>');
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
		$("#divcanvas").append("<canvas id=\"myCanvas\" width=\"500\" height=\"400\" style=\"border: 1px solid #000000;\"></canvas>");
    	var lugares = funcion.seats;
    	var sillas = lugares.length * lugares[0].length;
    	var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = "#001933";
        ctx.fillRect(100, 20, 300, 80);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "40px Arial";
        ctx.fillText("Screen", 180, 70);
        var row = 5;
        var col = 0;
        for (var i = 0; i < lugares.length; i++) {
            row++;
            col = 0;
            for (j = 0; j < lugares[i].length; j++) {
                if (lugares[i][j]) {
                    ctx.fillStyle = "#009900";
                } else {
                    ctx.fillStyle = "#FF0000";
                }
                col++;
                ctx.fillRect(20 * col, 20 * row, 20, 20);
                col++;
            }
            row++;
        }

		$("#number").text("Number of available chairs:");
    	$("#chairs").text(sillas);

		$("#hbuyticket").empty();
		$("#buttonBuy").empty();

		var boton3 = '<button id="buttonBuyTicket" onClick = "app.getMousePosition()">Buy</button>'

		$("#hbuyticket").append("Buy Ticket");
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
	function putBuyTicket(row,col) {

		var value = $.ajax({
			url: "http://localhost:8080/cinemas/" + cinema_ + "/" + fecha_ + "/" + actualFunction.movie.name  + "/" + row + "/" + col,
			type: 'PUT',
		})
		value.then(
			function () {
				console.log("OK");
				getfuctionsByNameData(cinema_, fecha_)
				getSeat(actualFunction.movie.name);
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

    var getMousePosition = function (evt) {
        console.log("entro getmouse");
        var xrow = null;
        var ycol = null;
        $('#myCanvas').click(function (e) {
            var rect = myCanvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            console.info(x);
            console.info(y);
            for (var i = 0; i < actualFunction.seats.length; i++) {
                for (var j = 0; j < actualFunction.seats[i].length; j++) {
                    if ((j*40)+20 <= x && x <= (j*40)+40 && (i*40)+120 <= y && y <= (i*40)+140) {
                        console.log("x encontrada" + i);
                        console.log("y encontrada" + j);
                        xrow = i;
                        ycol = j;
                        verifyAvailability(xrow,ycol);
                    }
                }
            }
        });
    };

    function callbackSubscribe(mvname) {
            console.log("entro callbacksubscribe");
            $.getScript(cliente, function () {
                client.getfuncion(cinema_, fecha_, mvname, redraw);
            });
    }


    function getSeat(mvname) {
        console.log(mvname);
        $.getScript(cliente, function () {
            client.getfuncion(cinema_, fecha_, mvname, seats);
        });
        favailability(mvname);
        administrator(mvname);
    }

	return {
		getFuctionsByNameData: function (cinema, fecha) {
			setcinema(cinema);
			setfecha(fecha);
			getfuctionsByNameData(cinema, fecha);
		},

		getSeat: function (mvname) {
		    getSeat(mvname);
		},

		connectInit: function(mvname) {
		    init(mvname);
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

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        },
        getMousePosition: function () {
            getMousePosition();
        }
	}
})();