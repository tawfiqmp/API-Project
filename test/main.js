


//YUMMLY TEST
//
//
//
_.templateSettings.interpolate = /{([\s\S]+?)}/g;

mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
});

var assert = chai.assert;
var expect = chai.expect;


//--- your setup code goes here (i.e. create test instances of your Constructors)
//--- your setup code goes here
// describe("Array", function(){
//     describe("#indexOf()", function(){
//         it("should return -1 when the value is not present", function(){
//             expect([1,2,3].indexOf(5)).to.equal(-1);
//             expect([1,2,3].indexOf(0)).to.equal(-1);
//         })
//     })
// })
  var sets = {
                api_key: "9bf81599ca8a0f15d0f4674ef24342c4",
                app_id: "ba255115"
            }

var client = new YummlyStore(sets) 

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

    // derp.
  //  this.setupRouting();       //constructor function that tests if e give it a API key


            // start app?



//an example test suite
// describe("Array", function(){
//     describe("#indexOf()", function(){
//         it("should return -1 when the value is not present", function(){
//             expect([1,2,3].indexOf(5)).to.equal(-1);
//             expect([1,2,3].indexOf(0)).to.equal(-1);
//         })
//     })
// })
//--- Yummly Testing


describe("YUMMLY", function(){
  it("should return Api-Key", function(){
expect(sets.api_key).to.equal('9bf81599ca8a0f15d0f4674ef24342c4');
})
})

describe("URL", function(){
  it("should return a string", function(){
    expect(client.yummly_url).to.be.a('string');
  })
})

describe("Testing Data", function(){
  it("we should have a returned object", function(){
    expect(YummlyStore.prototype.pullAllActiveListings()).to.be.a("object");
  })
}) 

 describe("Testing Templates", function(){
  it("we should be returning template data", function(){
    expect(YummlyStore.prototype.loadTemplate(name)).to.be.a("object");
  })
 }) 

mocha.globals(["jQuery"]);
mocha.run();

