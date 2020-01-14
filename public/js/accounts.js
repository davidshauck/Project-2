$(document).ready(function () {

    // clear session storage when going to login page
    sessionStorage.clear();
    // functions for the two modal pages
    $('#myModal').modal('show');
    $('#accountModal').modal('show');
    // universal new account variable
    let newAccount = {};

    // click function for submitting a new account
    $(document.body).on("click", ".submit-account", function (e) {
        e.preventDefault();

        newAccount = 
            {
            usernamesignup: $("#name").val(),
            emailsignup: $("#email").val(),
            passwordsignup: $("#password").val()
            };
            // call the submit account function with the new account variable
            submitAccount(newAccount);
        });

    // click function for submitting login
    $(document.body).on("click", ".submit-login", function (e) {
        e.preventDefault();

        let loginCredentials = 
            {
            email: $("#email-login").val(),
            password: $("#password-login").val()
            };
            // call the submit login function with the login credentials
            submitLogin(loginCredentials);
        });

    // new account post
    function submitAccount(Post) {
        // set team name and email in session storage
        sessionStorage.setItem("team name", Post.usernamesignup);
        sessionStorage.setItem("email", Post.emailsignup);
        $.post("/api/user/create/", Post, function() {
        // redirect to play game page
        window.location.href = "/play";
        });
    };

    // login post
    function submitLogin(Post) {
        $.post("/api/user/", Post, function(response) {
            console.log(response);
        // if response comes back empty, clear session storage and redirect to account page
        if (!response) {
            sessionStorage.clear();
            window.location.href = "/account";
        } else {
            console.log(response);
            // set the email and team name into session storage
            sessionStorage.setItem("email", response.email); 
            sessionStorage.setItem("team name", response.name);
            // load the play page after successful login
            window.location.href = "/play";
        }
        });
    };

    // logout function
    $(document.body).on("click", ".logout", function (e) {
        e.preventDefault();
        // clear session storage
        sessionStorage.clear();
        // redirect to account page for next user
        window.location.href = "/account";

    });

    // create account click function that's on the login page (if user doesn't have credentials yet)
    $(document.body).on("click", ".create-account", function (e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = "/account";
    });

});