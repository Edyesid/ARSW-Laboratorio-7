var client = (function(){

    return {
        getFunctionsByCinema: function(cinema_name, callback) {
           $.getJSON("http://localhost:8080/cinemas/" + cinema_name, function (data) {
               callback(data);
           });
       },
   
       getFunctionsByCinemaAndDate: function(cinema_name, fdate, callback) {
           $.getJSON("http://localhost:8080/cinemas/" + cinema_name +"/"+ fdate, function (data) {
               callback(data);
           });
       },
   
       getfuncion: function (cinema_name, fdate, mvname, callback) {
           $.getJSON("http://localhost:8080/cinemas/"+cinema_name+"/"+ fdate+"/"+mvname, function (data) {
               callback(data);
           });
       }
   }

})();