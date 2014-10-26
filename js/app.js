
window.onload = app;

// runs when the DOM is loaded
function app(){

    // load some scripts (uses promises :D)
    loader.load(
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./bower_components/pathjs/path.min.js"}
    ).then(function(){
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;


<<<<<<< HEAD

=======
>>>>>>> 31739340ca396ff7d9d5e46b85ab101eb12f4051
        // start app?
    })

}

