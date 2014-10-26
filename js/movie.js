window.onload = movies;  // does not matter if this is on top or bottom.

// runs when the DOM is loaded

function movie() {  //It loads rest of JS file  

           // load some scripts (uses promises :D)

        //http: //data.tmsapi.com/v1/movies/showings?startDate=2014-10-24&zip=77009&api_key=q7d6xxwe8h85b6z7gu3xsdjf
           // debugger;
          
        loader.load({    
                url: "./bower_components/jquery/dist/jquery.min.js"  
            }, {    
                url: "./bower_components/lodash/dist/lodash.min.js"  
            }, {    
                url: "./bower_components/pathjs/path.min.js"  
            }).then(function() {    
                    _.templateSettings.interpolate = /{([\s\S]+?)}/g;  // template for lodash

                    var apikey = "q7d6xxwe8h85b6z7gu3xsdjf";
                    var baseUrl = "http://data.tmsapi.com/v1";

                    var showtimesUrl = baseUrl + '/movies/showings';

                    var zipCode = "77009";

                    var d = new Date();

                    var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

                    $(document).ready(function() {

                        // send off the query

                        $.ajax({

                            url: showtimesUrl,

                            data: {
                                    startDate: today,

                                    zip: zipCode,

                                    jsonp: "dataHandler",

                                    api_key: apikey

                                },
                              
                            dataType: "jsonp",
                               
                        });
                        
                    });
             

                    function dataHandler(data) {

                        $(document.body).append('<p>Found ' + data.length + ' movies showing within 5 miles of ' + zipCode + ':</p>');
                    
                        var movies = data.hits;
                        
                        $.each(data, function(index, movie) {

                            var movieData = '<div class="tile"><img src="http://developer.tmsimg.com/' + movie.preferredImage.uri + '?api_key=' + apikey + '"><br/>';

                            movieData += movie.title;

                            if (movie.ratings) {
                                movieData += ' (' + movie.ratings[0].code + ') </div>'
                            };

                            $(document.body).append(movieData);

                        });

                    }
