window.fbAsyncInit = function() {
    FB.init({
      appId      : '680848835421990',
      xfbml      : true,
      version    : 'v2.8',
      status     : true,
      cookie     : true,
      oauth      : true
    });
    FB.AppEvents.logPageView();
    FB.Event.subscribe('auth.authResponseChange', function(response)
    {
     if (response.status === 'connected')
    {
        console.log("<br>Connected to Facebook");
        //SUCCESS
        FB.api('/me', { locale: 'tr_TR', fields: 'name, email,birthday, hometown,education,gender,website,work' },
          function(response) {
            console.log(JSON.stringify(response));
            console.log(response.email);
            console.log(response.name);
            console.log(response.gender);
            console.log(response.birthday);
            console.log(response.hometown);
            console.log(response.education);
            console.log(response.website);
            console.log(response.work);
            localStorage.setItem("user", response.name);
            document.cookie = response.name;
            window.open("./home.html","_self");

          }
        );

    }
    else if (response.status === 'not_authorized')
    {
        console.log("Failed to Connect");

        //FAILED
    } else
    {
        console.log("Logged Out");

        //UNKNOWN ERROR
    }
    });

  };

  (function(d, s, id){

    console.log("fbAsyncInit");
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
