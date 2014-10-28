


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

'use strict';

var yummlyListings;// originally recipe

describe('yummlyListings', function () {

  it('should be fast', function (done) {
    yummly.recipe({
      credentials: credentials,
      id: 'Meyer-Lemon-Semifreddo-With-Summer-Berries-Epicurious'
    }, function (error, response, json) {
      if (error) {
        console.error(error);
      } else {
        recipe = json;
        done();
      }
    });
  });

  it('should have an id', function () {
    expect(recipe.id).to.be.ok();
    console.log(recipe.id);
  });

  it('should have a name', function () {
    expect(recipe.name).to.be.ok();
    console.log(recipe.name);
  });

  it('should have an ingredient', function () {
    expect(recipe.ingredientLines).to.be.an(Array);
    expect(recipe.ingredientLines[0]).to.be.ok();
    console.log(recipe.ingredientLines[0]);
  });

  it('should have calories', function () {
    expect(recipe.nutritionEstimates).to.be.an(Array);
    expect(recipe.nutritionEstimates[0].attribute).to.equal('ENERC_KCAL');
    console.log(recipe.nutritionEstimates[0].unit.plural + ':', recipe.nutritionEstimates[0].value);
  });

  it('should have images', function () {
    expect(recipe.images).to.be.an(Array);
  });

  it('should have a small image', function () {
    expect(recipe.images[0].hostedSmallUrl).to.be.ok();
    console.log(recipe.images[0].hostedSmallUrl);
  });

  it('should have a large image', function () {
    expect(recipe.images[0].hostedLargeUrl).to.be.ok();
    console.log(recipe.images[0].hostedLargeUrl);
  });

});
// an example test suite
describe("Array", function(){
    describe("#indexOf()", function(){
        it("should return -1 when the value is not present", function(){
            expect([1,2,3].indexOf(5)).to.equal(-1);
            expect([1,2,3].indexOf(0)).to.equal(-1);
        })
    })
})
//--- MOVIE TESTS

'use strict';

var movies;

describe('movies', function () {

  it('should be fast', function (done) {
    yummly.recipe({
      credentials: credentials,
      id: 'Meyer-Lemon-Semifreddo-With-Summer-Berries-Epicurious'
    }, function (error, response, json) {
      if (error) {
        console.error(error);
      } else {
        recipe = json;
        done();
      }
    });
  });

  it('should have an id', function () {
    expect(recipe.id).to.be.ok();
    console.log(recipe.id);
  });

  it('should have a name', function () {
    expect(recipe.name).to.be.ok();
    console.log(recipe.name);
  });

  it('should have an ingredient', function () {
    expect(recipe.ingredientLines).to.be.an(Array);
    expect(recipe.ingredientLines[0]).to.be.ok();
    console.log(recipe.ingredientLines[0]);
  });

  it('should have calories', function () {
    expect(recipe.nutritionEstimates).to.be.an(Array);
    expect(recipe.nutritionEstimates[0].attribute).to.equal('ENERC_KCAL');
    console.log(recipe.nutritionEstimates[0].unit.plural + ':', recipe.nutritionEstimates[0].value);
  });

  it('should have images', function () {
    expect(recipe.images).to.be.an(Array);
  });

  it('should have a small image', function () {
    expect(recipe.images[0].hostedSmallUrl).to.be.ok();
    console.log(recipe.images[0].hostedSmallUrl);
  });

  it('should have a large image', function () {
    expect(recipe.images[0].hostedLargeUrl).to.be.ok();
    console.log(recipe.images[0].hostedLargeUrl);
  });

});

mocha.globals(["jQuery"]);
mocha.run();

