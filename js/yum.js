window.onload = app; // does not matter if this is on top or bottom.

// runs when the DOM is loaded

function app() { //It loads rest of JS file  

    // load some scripts (uses promises :D)

    //http://api.yummly.com/v1/api/recipes?_app_id=ba255115&_app_key=9bf81599ca8a0f15d0f4674ef24342c4&onion+soup&requirePictures=true
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g; // template for lodash

        var sets = {
                api_key: "9bf81599ca8a0f15d0f4674ef24342c4",
                app_id: "ba255115"
            }
            // start app?
        var client = new YummlyStore(sets);

    });

}

function YummlyStore(sets) { //constructor function that tests if e give it a API key
    //if (!sets.api_key + sets.app_id) {
    if (!sets.api_key) {
        throw new Error("NO APIKEY!?!?");
    }
    this.yummly_url = "http://api.yummly.com/";
    this.version = sets.api_version || "v1/"; // handle api version... if not given, just use the default "v1"
    this.api_key = sets.api_key;
    this.app_id = sets.app_id;
    this.complete_api_url = this.yummly_url + this.version;

    // derp.
    this.setupRouting(); //constructor function that tests if e give it a API key
}

YummlyStore.prototype.pullSeasons = function() {
    window.set_metadata = function() {
        console.log(arguments);
    }
    $.get(this.complete_api_url + "api/metadata/holiday.js?_app_id=" + this.app_id +"&_app_key="+ this.api_key + "&callback=set_metadata")
        .then(function(x) {});
}

var randomSeason = function (obj) {
    var keys = x.matches.searchValue(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
    console.log(randomSeason);
}

YummlyStore.prototype.pullAllActiveListings = function() {
    return $.getJSON(
            this.complete_api_url + "api/recipes?_app_id=" + this.app_id + "&_app_key=" + this.api_key + "&requirePictures=true&allowedHoliday[]=" + randomSeason
        )
        .then(function(data) {
            console.log(data.matches)
            return data.matches;
        });
}

YummlyStore.prototype.pullSingleListing = function(id) {
    return $.getJSON(this.complete_api_url + "api/recipe/" + id + "?_app_id=" + this.app_id + "&_app_key=" + this.api_key).then(function(data) {
        console.log(data);
        return data;
    });
}

YummlyStore.prototype.loadTemplate = function(name) {
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

YummlyStore.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#yumlistings");

    var bigHtmlString = data.map(function(listing) {
        return _.template(templateString, listing);
    }).join('');

    grid.innerHTML = bigHtmlString;
}

YummlyStore.prototype.drawSingleListing = function(template, data) {
    var listing = data;

    var grid = document.querySelector("#yumlistings");

    var bigHtmlString = _.template(template, listing);

    grid.innerHTML = bigHtmlString;
}

YummlyStore.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() {
        $.when(
            self.loadTemplate("yumlisting"),
            self.pullAllActiveListings(),
            self.pullSeasons()
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

    Path.map("#/recipe/:id").to(function() {
        $.when(
            self.loadTemplate("yum-single-page-listing"),
            self.pullSingleListing(this.params.id)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
        })
    });
    // set the default hash
    Path.root("#/"); //if there is no hash on url, it will set the default route to be #/


    Path.listen();
    // })
}
