


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

// an example test suite
describe("Array", function(){
    describe("#indexOf()", function(){
        it("should return -1 when the value is not present", function(){
            expect([1,2,3].indexOf(5)).to.equal(-1);
            expect([1,2,3].indexOf(0)).to.equal(-1);
        })
    })
})
//--- Yummly Testing


var set = { api_key: '9bf81599ca8a0f15d0f4674ef24342c4' };
describe("YUMMLY", function(){
  it("should return Api-Key", function()
expect(set).to.equal('9bf81599ca8a0f15d0f4674ef24342c4');
})
})

  

mocha.globals(["jQuery"]);
mocha.run();

