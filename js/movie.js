window.onload = app; // does not matter if this is on top or bottom.

// runs when the DOM is loaded

function app() { //It loads rest of JS file  

    // load some scripts (uses promises :D)

    //http://data.tmsapi.com/v1/movies/showings?startDate=2014-10-24&zip=77009&api_key=q7d6xxwe8h85b6z7gu3xsdjf
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g; // template for lodash

        var sets = {
                api_key: "q7d6xxwe8h85b6z7gu3xsdjf",
            }
            // start app?
        var client = new MovieShowtimes(sets);

    });

}


function MovieShowtimes(sets) { //constructor function that tests if e give it a API key
    //if (!sets.api_key + sets.app_id) {
    if (!sets.api_key) {
        throw new Error("NO APIKEY!?!?");
    }
    this.showtimes_url = "http://data.tmsapi.com/";
    this.version = sets.api_version || "v1/"; // handle api version... if not given, just use the default "v1"
    this.api_key = sets.api_key;
    this.complete_api_url = this.showtimes_url + this.version;
    var d = new Date();
    var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
    this.today = today;

    // derp.
    this.setupRouting(); //constructor function that tests if e give it a API key
}




MovieShowtimes.prototype.pullAllActiveListings = function() {
    var d = new Date();
    var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
    Latitude =  position.coords.latitude; 
    Longitude = position.coords.longitude;  
    }

    window.onload  = getLocation();
    return $.getJSON(
            this.complete_api_url + "movies/showings?startDate=" + today + "&zip=78701&api_key=" + this.api_key
        )
        .then(function(data) {
            console.log(data);
            return data;
        });
}

// http://data.tmsapi.com/v1/movies/9128357/showings?startDate=2012-12-08&api_key=1234567890
MovieShowtimes.prototype.pullSingleListing = function(id) {
    var d = new Date();
    var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return $.getJSON(this.complete_api_url + "movies/" + id + "/showings?startDate=" + today + "&zip=78701&api_key=" + this.api_key).then(function(data) {
        return data;
    });
}


MovieShowtimes.prototype.loadTemplate = function(name) {
    if (!this.templates) {
        this.templates = {};
    }

    var self = this;

    if (this.templates[name]) {
        var promise = $.Deferred();
        promise.resolve(this.templates[name]);
        return promise;
    } else {
        return $.get('./templates/' + name + '.html').then(function(data) {
            self.templates[name] = data; // <-- cache it for any subsequent requests to this template
            return data;
        });
    }
}

MovieShowtimes.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#showtimes");

    var bigHtmlString = data.map(function(listing) {
        return _.template(templateString, listing);
    }).join('');

    grid.innerHTML = bigHtmlString;
}

MovieShowtimes.prototype.drawSingleListing = function(template, data) {
    var listing = data[0];

    var grid = document.querySelector("#showtimes");

    var bigHtmlString = _.template(template, listing);

    grid.innerHTML = bigHtmlString;
}

MovieShowtimes.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() {
        $.when(
            self.loadTemplate("movielisting"),
            self.pullAllActiveListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);

            console.dir(self)
        })
    }); // grab the loading listing html and data. Inside this call back function we are not in YummlyStore. To access we use instance which is why we use self.
    // self.drawListings(self.yumlistingHtml, self.latestData);
    //  });

    Path.map("#/message/:anymessage").to(function() {
        alert(this.params.anymessage);
    })

    Path.map("#/showtimes/:rootId").to(function() {
        $.when(
            self.loadTemplate("movieshowtimes"),
            self.pullSingleListing(this.params.rootId)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
        })
    });
    // set the default hash
    Path.root("#/"); //if there is no hash on url, it will set the default route to be #/


    Path.listen();
    // })
}