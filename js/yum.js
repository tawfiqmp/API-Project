<<<<<<< HEAD
window.onload = app;  // does not matter if this is on top or bottom.

// runs when the DOM is loaded

function app() {   //It loads rest of JS file  
=======
window.onload = app;  // does not matter if this is on top or bottom.

// runs when the DOM is loaded

function app() {   //It loads rest of JS file  
>>>>>>> 4322fdca860a11031eb8a94c4e1516ea1ab22f8b

    // load some scripts (uses promises :D)

//http://api.yummly.com/v1/api/recipes?_app_id=ba255115&_app_key=9bf81599ca8a0f15d0f4674ef24342c4&onion+soup&requirePictures=true
    // debugger;
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;   // template for lodash

        var sets = {
                api_key: "9bf81599ca8a0f15d0f4674ef24342c4",
                app_id: "ba255115"
            }
            // start app?
        var client = new YummlyStore(sets);  

    });

}

function YummlyStore(sets) { //constructor function that tests if e give it a API key
<<<<<<< HEAD
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
    this.setupRouting();       //constructor function that tests if e give it a API key
}

YummlyStore.prototype.pullSeasons = function() {
        window.set_metadata = function(){
        console.log(arguments);
        }
        $.get("http://api.yummly.com/v1/api/metadata/holiday.js?_app_id=ba255115&_app_key=9bf81599ca8a0f15d0f4674ef24342c4&callback=set_metadata")
        .then(function(data) {
        });
        //var value = search
}

function randomSeasons(){
var myrandom = Math.round(Math.random()*3)
var seasons = new Array()
seasons[0]="http://www.yummly.com"
seasons[1]="http://www.bandsintown.com"
seasons[2]="http://developer.tmsapi.com/"

// window.location=links[myrandom]

}

YummlyStore.prototype.pullAllActiveListings = function() {
    return $.getJSON(
            this.complete_api_url + "api/recipes?_app_id=" + this.app_id + "&_app_key=" + this.api_key + "&requirePictures=true"
        )
        .then(function(data) {
            console.log(data.matches)
            //console.log(data.images[0].hostedLargeUrl);
            return data.matches;
        });
}
=======
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
    this.setupRouting();       //constructor function that tests if e give it a API key
}

YummlyStore.prototype.pullAllActiveListings = function() {
    return $.getJSON(
            this.complete_api_url + "api/recipes?_app_id=" + this.app_id + "&_app_key=" + this.api_key + "&requirePictures=true"
        )
        .then(function(data) {
            console.log(data.matches)
            //console.log(data.images[0].hostedLargeUrl);
            return data.matches;
        });
}

YummlyStore.prototype.pullSingleListing = function(id) {
    return $.getJSON(this.complete_api_url + "api/recipe/" + id +"?_app_id=" + this.app_id + "&_app_key=" + this.api_key).then(function(data) {
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

/*YummlyStore.prototype.loadTemplate = function(name) {
    return $.get("./templates/" + name + ".html").then(function() {
        return arguments[0];
    })
}*/

YummlyStore.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#yumlistings");

    var bigHtmlString = data.map(function(listing) {
        return _.template(templateString, listing);
    }).join('');

    grid.innerHTML = bigHtmlString;
}

YummlyStore.prototype.drawSingleListing = function(template, data) {
    var listing = data;
 
/*YummlyStore.prototype.drawSingleListing = function(id) { //filtering all results 
    var listing = this.latestData.results.filter(function(yumlistings) { // runs it 24 times until it finds the ID.
        return listings.listings_id === parseInt(id);  //returns the data object not just listing.
    });*/

    var grid = document.querySelector("#yumlistings");

    var bigHtmlString = _.template(template, listing);
>>>>>>> 4322fdca860a11031eb8a94c4e1516ea1ab22f8b

YummlyStore.prototype.pullSingleListing = function(id) {
    return $.getJSON(this.complete_api_url + "api/recipe/" + id +"?_app_id=" + this.app_id + "&_app_key=" + this.api_key).then(function(data) {        
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

<<<<<<< HEAD
/*YummlyStore.prototype.loadTemplate = function(name) {
    return $.get("./templates/" + name + ".html").then(function() {
        return arguments[0];
    })
}*/
=======
    Path.map("#/").to(function() { 
		$.when(
			self.loadTemplate("yumlisting"),
            self.pullAllActiveListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);

            console.dir(self)
        })
    });  // grab the loading listing html and data. Inside this call back function we are not in YummlyStore. To access we use instance which is why we use self.
       // self.drawListings(self.yumlistingHtml, self.latestData);
  //  });
>>>>>>> 4322fdca860a11031eb8a94c4e1516ea1ab22f8b

YummlyStore.prototype.drawListings = function(templateString, data) {
    var grid = document.querySelector("#yumlistings");

<<<<<<< HEAD
    var bigHtmlString = data.map(function(listing) {
        return _.template(templateString, listing);
    }).join('');

    grid.innerHTML = bigHtmlString;
}

YummlyStore.prototype.drawSingleListing = function(template, data) {
    var listing = data;
 
/*YummlyStore.prototype.drawSingleListing = function(id) { //filtering all results 
    var listing = this.latestData.results.filter(function(yumlistings) { // runs it 24 times until it finds the ID.
        return listings.listings_id === parseInt(id);  //returns the data object not just listing.
    });*/
=======
   // Path.map("#/listing/:id").to(function() {  //
  //      self.drawSingleListing(this.params.id);
  //  });
Path.map("#/recipe/:id").to(function() {
        $.when(
            self.loadTemplate("yum-single-page-listing"),
            self.pullSingleListing(this.params.id)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
        })
    });
    // set the default hash
    Path.root("#/");  //if there is no hash on url, it will set the default route to be #/
/*}

 YummlyStore.prototype.init = function() {
    var self = this;   //stores a reference to the instance
>>>>>>> 4322fdca860a11031eb8a94c4e1516ea1ab22f8b

    var grid = document.querySelector("#yumlistings");

<<<<<<< HEAD
    var bigHtmlString = _.template(template, listing);

    grid.innerHTML = bigHtmlString;
=======
   $.when(                         //(the "listing" or "single-page-listing" we are involinkg the data)
        this.pullAllActiveListings(), //this returns a promise.  getting results and storing property on the instance.  (into self. )
        this.loadTemplate("yumlisting"),
        this.loadTemplate("yum-single-page-listing")
    ).then(function(data, html, yumsinglePageHtml) {  //whatever is passed in here is in order from the top.

        //Create three properties on our Etsy instance
        self.latestData = data;
        self.yumlistingHtml = html;
        self.yumsingleListingHtml = yumsinglePageHtml; */


        Path.listen();
   // })
>>>>>>> 4322fdca860a11031eb8a94c4e1516ea1ab22f8b
}

YummlyStore.prototype.setupRouting = function() {
    var self = this;

    Path.map("#/").to(function() { 
        $.when(
            self.loadTemplate("yumlisting"),
            self.pullAllActiveListings()
        ).then(function() {
            self.drawListings(arguments[0], arguments[1]);

            console.dir(self)
        })
    });  // grab the loading listing html and data. Inside this call back function we are not in YummlyStore. To access we use instance which is why we use self.
       // self.drawListings(self.yumlistingHtml, self.latestData);
  //  });

    Path.map("#/message/:anymessage").to(function() {
        alert(this.params.anymessage);
    })

   // Path.map("#/listing/:id").to(function() {  //
  //      self.drawSingleListing(this.params.id);
  //  });
Path.map("#/recipe/:id").to(function() {
        $.when(
            self.loadTemplate("yum-single-page-listing"),
            self.pullSingleListing(this.params.id)
        ).then(function() {
            self.drawSingleListing(arguments[0], arguments[1]);
        })
    });
    // set the default hash
    Path.root("#/");  //if there is no hash on url, it will set the default route to be #/
/*}

 YummlyStore.prototype.init = function() {
    var self = this;   //stores a reference to the instance


   $.when(                         //(the "listing" or "single-page-listing" we are involinkg the data)
        this.pullAllActiveListings(), //this returns a promise.  getting results and storing property on the instance.  (into self. )
        this.loadTemplate("yumlisting"),
        this.loadTemplate("yum-single-page-listing")
    ).then(function(data, html, yumsinglePageHtml) {  //whatever is passed in here is in order from the top.

        //Create three properties on our Etsy instance
        self.latestData = data;
        self.yumlistingHtml = html;
        self.yumsingleListingHtml = yumsinglePageHtml; */


        Path.listen();
   // })
}
