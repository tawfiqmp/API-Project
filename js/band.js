window.onload = app;

// runs when the DOM is loaded

function app() {

    // load some scripts (uses promises :D)
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;

        var options = {
            app_id: "Moose"
        }
        // start app?
        var client = new BandClient(options);
    })

}

// http://api.bandsintown.com/venues/1700/events.json?app_id=YOUR_APP_ID
function BandClient(options) {
    if (!options.app_id) {
        throw new Error("Y U NO APIKEY!?!?");
    }
    this.band_url = "/bands/venues/774287/events.json?";
    this.app_id = options.app_id;
    this.complete_api_url = this.band_url + "app_id=" + this.app_id;

    // derp.
    this.setupRouting();
}

BandClient.prototype.pullAllActiveListings = function() {
    return $.getJSON(
        this.complete_api_url
    )
        .then(function(data) {
            console.log(data);
            return data;
        });
}

//BandClient.prototype.pullSingleListing = function(id) {
   // return $.getJSON(this.complete_api_url + "listings/"+id+".js?app_id=" + this.app_id + "&includes=Images&callback=?").then(function(data) {
    //    return data;
  //  });
//}

BandClient.prototype.loadTemplate = function(name) {
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

BandClient.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#bandListings");

    var bigHtmlString = data.results.map(function(listing) {
        return _.template(templateString, listing);
    }).join('');

    grid.innerHTML = bigHtmlString;
}

BandClient.prototype.drawSingleListing = function(template, data) {
    var listing = data.results[0];
    var grid = document.querySelector("#bandListings");
    var bigHtmlString = _.template(template, listing);

    grid.innerHTML = bigHtmlString;
}

BandClient.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() {
        $.when(
            self.loadTemplate("bandlisting"),
            self.pullAllActiveListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);

            console.dir(self)
        })
    });

    Path.map("#/message/:anymessage").to(function() {
        alert(this.params.anymessage);
    })

    Path.map("#/listing/:id").to(function() {
        $.when(
            self.loadTemplate("band-single-listing"),
            self.pullSingleListing(this.params.id)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
        })
    });

    // set the default hash to draw all listings
    Path.root("#/");
    Path.listen();
}
