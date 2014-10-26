window.onload = app;  // does not matter if this is on top or bottom.

// runs when the DOM is loaded

function movie() {   //It loads rest of JS file  

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
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;   // template for lodash

        var options = {
                api_key: "q7d6xxwe8h85b6z7gu3xsdjf",
            }
            // start app?
        var client = new MovieLists(options);  

    });

}

function MovieLists(options) { //constructor function that tests if e give it a API key
    //if (!options.api_key + options.app_id) {
    if (!options.api_key) {
        throw new Error("NO APIKEY!?!?");
    }
    this.movies_url = "http: //data.tmsapi.com";
    this.version = options.api_version || "v1/"; // handle api version... if not given, just use the default "v1"
    this.api_key = options.api_key;
    this.complete_api_url = this.movies_url + this.version;

    // derp.
    this.init();       //constructor function that tests if e give it a API key
}

MovieLists.prototype.pullAllActiveListings = function() {
    return $.getJSON(
            this.complete_api_url + "movies/showings?startDate=2014-10-24&zip=77009" + "&_app_key=" + this.api_key)
        .then(function(data) {
            console.log(data);
            return data;
        });
}



MovieLists.prototype.loadTemplate = function(name) {
    return $.get("./templates/" + name + ".html").then(function() {
        return arguments[0];
    })
}

MovieLists.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#listings");

    var bigHtmlString = data.results.map(function(listing) {
        return _.template(templateString, listing);
    }).join('');

    grid.innerHTML = bigHtmlString;
}

MovieLists.prototype.drawSingleListing = function(id) { //filtering all results 
    var listing = this.latestData.results.filter(function(listing) { // runs it 24 times until it finds the ID.
        return listing.listing_id === parseInt(id);  //returns the data object not just listing.
    });

    var grid = document.querySelector("#listings");

    var bigHtmlString = _.template(this.yumsingleListingHtml, listing[0]);

    grid.innerHTML = bigHtmlString;
}

MovieLists.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() {   // grab the loading listing html and data. Inside this call back function we are not in MovieLists. To access we use instance which is why we use self.
        self.drawListings(self.yumlistingHtml, self.latestData);
    });

    Path.map("#/message/:anymessage").to(function() {
        alert(this.params.anymessage);
    })

    Path.map("#/listing/:id").to(function() {  //
        self.drawSingleListing(this.params.id);
    });

    // set the default hash
    Path.root("#/");  //if there is no hash on url, it will set the default route to be #/
}

MovieLists.prototype.init = function() {
    var self = this;   //stores a reference to the instance


    $.when(                         //(the "listing" or "single-page-listing" we are involinkg the data)
        this.pullAllActiveListings(), //this returns a promise.  getting results and storing property on the instance.  (into self. )
        this.loadTemplate("yumlisting"),
        this.loadTemplate("yum-single-page-listing")
    ).then(function(data, html, yumsinglePageHtml) {  //whatever is passed in here is in order from the top.

        //Create three properties on our Etsy instance
        self.latestData = data;
        self.yumlistingHtml = html;
        self.yumsingleListingHtml = yumsinglePageHtml;


        Path.listen();
    })
}