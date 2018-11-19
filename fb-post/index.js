const FB = require('fb');

exports.fbPost = function fbPost(event, context) {

  var token = "EAAH7pkz5qYIBAFcyd1QZC9ZAilUUHdihHxtElNjMZCS29Ra6QNtUWW0teK0MTgtYF2VHR7qSSuWu55k1oRD8RtKIgZAZAQZCBvd1rPc2UHurxG6VUa95hJZCb1U8Q64ylKZCVGHjmXNgth49hjPkoTzPSy9IWHLmGLBrubBPgnCasecdeZBJrkmxt7THNHAkx72kZD";
  var url = "http://www.youtube.com";
  var m = "Hello world!";

  let message =  m;

    // These fields should always stay the same.
    FB.api(
        '/263674121151608/feed',
        'POST', {
            "fields":"id,name,permalink_url",
          "link": url,
            "message": message,
            "access_token": token
        },
      );

    console.log("Success");
};
