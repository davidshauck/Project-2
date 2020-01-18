$(document).ready(function () {

    // set email and team name from local storage
    let userEmail = sessionStorage.getItem("email");
    let teamName = sessionStorage.getItem("team name");

    // if there's no user email in session storage redirect to login page
    if ((!userEmail) || (userEmail === "")) {
        window.location.href = "/login";
    };

    // set up universal variables
    let loadingGif = $("<img src='../images/loading_football.gif'>").css({width: "556px", "margin-left": "25%"});
    let playerArray = [];
    let playerIdIndex = 0;
    let playerIds = [];
    let position = "";
    let userTeam = [];
    let duplicatePlayer = [];
    let playerId = "";
    let computerTeam = [];
    let computerPlayer = "";
    let localPosition = "";
    let pushComputer = false;
    let deleteRecord = "";
    let disable = true;
    let enable = false;
    let computerBudget = 150;
    let userBudget = 150;
    let computerPlayerName = "";
    let userPlayerName = "";
    let dataPosition = "";
    let userSalary;
    let gameObject = {};
    let userScore = 0;
    let computerScore = 0;
    // create a random week on every new game
    let week = parseInt([Math.floor(Math.random()*17)]);
    
    // call all the necessary functions to get the game loaded
    renderUserTeam();
    renderComputerTeam();
    renderPositionDropdown();

    // Rules button slider
    $("p#instructions-text").hide();
    $(".instructions").click(function () {
        $("p#instructions-text").slideToggle();
    });

    // main game function, this starts the cycle every time a new player is being picked
    function start() {
        // populate the team name div
        $(".user-title").html(teamName);
        // when user clicks the position selector dropdown
        $(document.body).on("click", "div.position-list button", function (e) {
            e.preventDefault();
            // enable the player dropdown list when the position list is clicked
            $(".player-button").prop("disabled", enable);
            // reset all variables and divs
            position = "";
            playerArray = [];
            playerIdIndex = 0;
            playerIds = [];
            playerId = "";
            playerIdIndex = 0;
            pushComputer = true;
            deleteRecord = "";
            // set the API's position to be the clicked position value
            position = $(this).attr("value");
            // set the local name of the player's position RB1, RB2, WR1, WR2, etc.)
            localPosition = $(this).attr("data-position");
            // empty the player dropdown div
            $(".drop-test").empty();
            // call the function that creates the position dropdown
            renderPositionDropdown();
            // callback function for getting player IDs from API
            getPlayerIds().then(getPlayerInfo).then(function (data) {
                // set random computer player for later use (the *20 picks top 20 players per position; can be changed)
                computerPlayer = playerArray[Math.floor(Math.random() * 20)].PlayerID;
                // create dynamic list of players for user to choose from
                let playerDropdown = $("<a>");
                // loop through 15 times to give user 15 options
                for (let i = 0; i < 15; i++) {
                    playerDropdown.attr("<div>");
                    playerDropdown.addClass("dropdown-item");
                    playerDropdown.addClass("player-dropdown");
                    playerDropdown.attr("data-id", playerArray[i].PlayerID);
                    playerDropdown.attr("id", "dd" + i);
                    // for some reason the kickers didn't have draft values, so I made them all $5
                    if (!playerArray[i].YahooSalary) {
                        playerArray[i].YahooSalary = parseInt(5);
                    }
                    // populate dropdown with name and draft value
                    playerDropdown.html(playerArray[i].Name + " | $" + playerArray[i].YahooSalary);
                    // add the individual players to the dropdown
                    playerDropdown.appendTo(".drop-test");

                    // callback functionn for grabbing image from API
                    getImage(function (data) {
                        // parse the data for use            
                        data = JSON.parse(data);
                        // prepend it to the div so image appears on the left
                        $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd" + i);
                    });
                } // end of loop

                // click function for selecting a player
                $(".player-dropdown").on("click", function () {
                    // grab the player ID from the click
                    playerId = ($(this).attr("data-id"));
                    
                    // callback function for grabbing the image
                    populateUserTeam(function (data) {
                        // parse the data for use     
                        data = JSON.parse(data);

                        // function for determining if players have already been selected
                        // found it here https://www.geeksforgeeks.org/javascript-array-findindex-method/
                        function isIncluded(element, index, array) {
                            return (element.PlayerID === data.PlayerID);
                        }
                        // variables for the return of the function to determine if players are already on teams
                        let compareUser = userTeam.findIndex(isIncluded);
                        let compareComputer = computerTeam.findIndex(isIncluded);
                        // got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
                        userSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);
                        // if player is not yet on either team (its index would be -1, thus the < 0 to determine if it's in the array)
                        if ((compareUser < 0) && (compareComputer < 0) && ((userBudget - userSalary) >= 0)) {
                            // change the push boolean to true so it will push to computer team
                            pushComputer = true;
                            // got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
                            userSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);
                            // if kicker's value is null then make it $5
                            if (data.Position === "K") {
                                userSalary = 5;
                            };
                            // push the object to the user's team array
                            userTeam.push({ week: week, PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, localPosition: localPosition, Position: data.Position, salary: userSalary, email: userEmail, teamName: teamName });
                            // subtract the value of the player from the user's budget
                            userBudget -= userSalary;
                            // update the budget div
                            $("#user-budget").html("$" + userBudget);
                            // change push boolean to false if criteria not met
                        } else {
                            // change the push boolean to false
                            $('#myModal').modal('show');
                            pushComputer = false;
                        }
                        // render the user grid
                        renderUserTeam();
                        // refresh the position dropdown             
                        renderPositionDropdown();
                    });

                    // callback function for populating the computer's team
                    populateComputerTeam(function(data) {
                        // parse the data for use
                        data = JSON.parse(data);
                        // callback function to determine if computer player is in user's team
                        function isIncludedUser(info, index, array) {
                            return (info.PlayerID === data.PlayerID);
                        }
                        // variables that contain the value of the returned function
                        let compareUserB = userTeam.findIndex(isIncludedUser);
                        let compareComputerB = computerTeam.findIndex(isIncludedUser);
                        // function to determine if RB1/RB2 or WR1/WR2 have been duplicated
                        function isIncludedC(moreInfo, index, array) {
                            return (moreInfo.localPosition === data.Position);
                        }
                        // variable to hold the return value
                        let comparePositionComputer = computerTeam.findIndex(isIncludedC);
                        // got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
                        duplicatePlayer = computerTeam.filter(item => item.Position === data.Position).map(item => item.PlayerID)

                        // check all conditions before pushing to computer's team
                        if (computerTeam.length >= 5 && computerBudget < 0) {
                            // alert("OVER");
                            computerBudget = 50;
                            testTwo();
                        }
                         else if ((computerTeam.length < 6) && (compareUserB < 0) && (compareComputerB < 0) && (comparePositionComputer < 0) && (pushComputer) && (duplicatePlayer.length < 2) && (userBudget >= 0)) {
                            // if met, push
                            computerTeam.push({ week: week, PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, localPosition: localPosition, Position: data.Position, email: userEmail, teamName: "The Computer" });
                            //got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
                            let computerSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);
                            // if the user salary is null (which all the kickers are) change it to $5
                            if (!computerSalary[0]) {
                                computerSalary = parseInt(5);
                            }
                            // subtract the value of the player's salary from computer's budget
                            computerBudget -= computerSalary;
                            // update the budget div
                            $("#computer-budget").html("$" + computerBudget);
                        };
                        // clear the array each time through
                        duplicatePlayer = [];
                        // not sure I'm using this but am leaving it here just in case
                        containsQB = computerTeam.filter(item => item.Position === "QB").map(item => item.PlayerID)
                        // render the team after all these checks
                        renderComputerTeam();

                        });  // end of populate function 

                    }); // end of click function

                // empty the player array
                playerArray = [];

            }); // end of the populate callback function

        }); // end of click function

    }; // end of start() function

    // call the start function to begin the game 
    start();

    // function for removing the players from the team
    $(document.body).on("click", "#user-player-name", function (e) {
        e.preventDefault()
        // set a variable for the clicked image
        deleteRecord = ($(this).text().trim());

        //got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
        userSalary = playerIds.filter(item => item.Name === deleteRecord).map(item => item.YahooSalary)
        // if the player is a kicker set the salary to $5
        if ($(this).attr("data-pos") === "K") {
            userSalary = 5;
        }
        // add the deleted salary back to the budget;
        userBudget += parseInt(userSalary);

        // loop through the user's team to find the corresponding player and splice it out
        for (let i = 0; i < userTeam.length; i++) {
            if (userTeam[i].name === deleteRecord) {
                userTeam.splice(i, 1);
            }
        }
        // reset the budget and loop through to subtract the player salaries in the array
        userBudget = 150;
        for (let i = 0; i < userTeam.length; i++) {
            userBudget -= userTeam[i].salary;
        }
        // when array has 0 objects reset the budget back to $150
        if (userTeam.length === 0) {
            userBudget = 150;
        }
        $("#user-budget").html("$" + userBudget);

        // update the team grid
        renderPositionDropdown();
        renderUserTeam();
        start();

    }); // end of remove player click function

    // function for calling on API that gets the player image
    function getImage(cb) {
        // set the current player ID from the array we populated earlier    
        playerId = playerIds[playerIdIndex].PlayerID;
        // set the url being queried
        let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/" + playerId + "?key=87259770c8654c4aa8d0dd12658e7d93";
        // increment the index so it grabs the next one
        playerIdIndex += 1;
        // set it to stop at the top 15
        if (playerIdIndex > 15) {
            playerIdIndex = 15;
        }
        $.ajax({
            url: playerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            success: function (data) {
                // call the callback passed
                cb(data);
            }
        });
    };
    // function for grabbing the top 15 players and storing their player IDs in an array (got this from Stack Overflow)
    function getPlayerIds() {

        let queryUrl = "https://api.sportsdata.io/v3/nfl/stats/json/GameLeagueLeaders/2019REG/" + week + "/" + position + "/FantasyPoints?key=87259770c8654c4aa8d0dd12658e7d93";

        return $.ajax(queryUrl).then(function(json) {
                // put all the returned data into a local array
                playerArray = json;
                // grab playerId from the returned data
                playerId = playerArray[playerIdIndex].PlayerID;
                // need to clear out array before each loop through
                playerIds = []; 
                // ** THIS IS US STARTING TO WORK ON REPOPULATING COMPUTER TEAM IF IT GOES BELOW $0, NEED TO FINISH
                // if (qbArray.length > 15) {
                //     qbArray = [];
                // };
                // if (rbArray.length > 15) {
                //     qbArray = [];
                // };
                // if (wrArray.length > 15) {
                //     wrArray = [];
                // };
                // if (kArray.length > 15) {
                //     kArray = [];
                // };
                // loop through that array and push them to a new playerIds array
                for (let i = 0; i < 15; i++) {
                    // if the salary is null make it $5
                    if (!playerArray[i].YahooSalary) {
                        playerArray[i].YahooSalary = 5;
                    }
                    // push needed info into the playerIds object
                    playerIds.push({ Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary });
                    // if (position === "QB") {
                    //     qbArray.push({ Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary });
                    // } else if (position === "RB") {
                    //     rbArray.push({ Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary });
                    // } else if (position === "WR") {
                    //     wrArray.push({ Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary });
                    // } else {
                    //     kArray.push({ Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary });   
                    // }
                    // console.log(qbArray, rbArray, wrArray, kArray);
                }
                // stop at the top 15
                if (playerIdIndex > 20) {
                    playerIdIndex = 20;
                };
            });
    };
    // use the playerId we just got in the ajax call to grab player info
    function getPlayerInfo() {
        return $.ajax("https://api.sportsdata.io/v3/nfl/scores/json/Player/" + playerId + "?key=87259770c8654c4aa8d0dd12658e7d93");
    };
    // part of the whole callback function
    function populateUserTeam(cb) {

        let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/" + playerId + "?key=87259770c8654c4aa8d0dd12658e7d93";

        $.ajax({
            url: playerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            success: function (data) {
                // call the callback passed
                cb(data);
            }
        });
    }; // end of populate user team function

    // a repeat of the function but this time for the computer's team
    function populateComputerTeam(cb) {

        let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/" + computerPlayer + "?key=87259770c8654c4aa8d0dd12658e7d93";

        $.ajax({
            url: playerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            success: function (data) {
                // call the callback passed
                cb(data);
            }
        });
    }; // end of populate computer function

    // function that renders the user's image grid
    function renderUserTeam() {
        $(".player-button").prop("disabled", disable);
        playerIdIndex = 0;
        // empty the dropdown to be clear for next time
        $(".drop-test").empty();
        // empty the div first
        $("#player-image-grid").empty();
        // loop through until we've hit 6 players. This formula is set up to still work if the team is less than 6
        for (let i = 0; i < ((6 - userTeam.length) + parseInt(userTeam.length)); i++) {
            let userImages = $("<img>");
            let userPlayerBox = $("<div>");
            userPlayerBox.addClass("rounded float-left images");

            // loop for adding images to grid
            if (i >= userTeam.length) {
                // add the placeholder if the team hasn't filled out all players yet
                userImages.attr("src", "./images/player_placeholder.jpg");
                userImages.css({ width: "128px", height: "177px" })
                userPlayerName = "PLAYER " + (i + 1);
                // poulate with image and player name if a player has been selected
            } else {
                userImages.attr("src", userTeam[i].url);
                userImages.attr("id", "player-image");
                userImages.attr("data-id", userTeam[i].PlayerID);
                userPlayerName = (userTeam[i].name);
                dataPosition = userTeam[i].Position;
            };
            // append playyer name under the images
            let p = $("<p>").text(userPlayerName);
            p.attr("id", "user-player-name");
            p.attr("data-pos", dataPosition);
            $(userPlayerBox).append(userImages);
            $(userPlayerBox).append(p);
            $("#player-image-grid").append(userPlayerBox);
            // reset the Id index to 0
            playerIdIndex = 0;
            // empty the div
            $(".drop-test").empty();
            // restart for next selection
            start();

        }; // end of loop

    }; // end of render user team function 

    // same deal for the computer
    function renderComputerTeam() {
        // first empty of the the grid
        $("#computer-image-grid").empty();
        // loop through until we've hit 6 players. This formula is set up to still work if the team is less than 6
        for (let i = 0; i < ((6 - computerTeam.length) + parseInt(computerTeam.length)); i++) {
            let computerImages = $("<img>");
            let computerPlayerBox = $("<div>");
            $(computerPlayerBox).addClass("rounded float-right images");
            // add the placeholder if the team hasn't filled out all players yet
            if (i >= computerTeam.length) {
                computerImages.attr("src", "./images/player_placeholder.jpg");
                computerImages.css({ width: "128px", height: "177px" })
                computerPlayerName = "PLAYER " + (i + 1);
                // poulate with image and player name if a player has been selected
            } else {
                computerImages.attr("src", computerTeam[i].url);
                computerImages.attr("id", "player-image");
                computerPlayerName = computerTeam[i].name;
            };
            // append playyer name under the images
            let p = $("<p>").text(computerPlayerName);
            p.attr("id", "computer-player-name");
            $(computerPlayerBox).append(computerImages);
            $(computerPlayerBox).append(p);
            // append div to grid
            $("#computer-image-grid").append(computerPlayerBox);
            // reset the index
            playerIdIndex = 0;
            // empty the player dropdown
            $(".drop-test").empty();
            start();

        }; // end of loop

        // once both teams have 6 players, enable the submit button
        if ((userTeam.length >= 5) && (computerTeam.length > 5)) {
            $(".submit-button").prop("disabled", false);
        } else {
            $(".submit-button").prop("disabled", true);
        };

    }; // end of render computer team function

    // function for rendering the positions dropdown
    function renderPositionDropdown() {
        $(".position-list").empty();

        let qbBtn = $("<button class='dropdown-item' data-position='QB' id='QB' value='QB'>");
        qbBtn.html("QB");
        qbBtn.css({ "padding-top": "0px" })
        let rb1Btn = $("<button class='dropdown-item' data-position='RB1' id='RB1' value='RB'>");
        rb1Btn.html("RB1");
        let rb2Btn = $("<button class='dropdown-item' data-position='RB2' id='RB2' value='RB'>");
        rb2Btn.html("RB2");
        let wr1Btn = $("<button class='dropdown-item' data-position='WR1' id='WR1' value='WR'>");
        wr1Btn.html("WR1");
        let wr2Btn = $("<button class='dropdown-item' data-position='WR2' id='WR2' value='WR'>");
        wr2Btn.html("WR2");
        let kickBtn = $("<button class='dropdown-item' data-position='K' id='K' value='K'>");
        kickBtn.html("K");
        kickBtn.css({ "padding-bottom": "5px", "border-bottom": "0px" })
        // loop to disable buttons
        for (let i = 0; i < userTeam.length; i++) {
            if (userTeam[i].localPosition === "QB") {
                qbBtn.addClass("disabled");
                $("").data("toggle", "");
            };
            if (userTeam[i].localPosition === "RB1") {
                rb1Btn.addClass("disabled");
            };
            if (userTeam[i].localPosition === "RB2") {
                rb2Btn.addClass("disabled");
            };
            if (userTeam[i].localPosition === "WR1") {
                wr1Btn.addClass("disabled");
            };
            if (userTeam[i].localPosition === "WR2") {
                wr2Btn.addClass("disabled");
            };
            if (userTeam[i].localPosition === "K") {
                kickBtn.addClass("disabled");
            };
        };
        $(".position-list").append(qbBtn).append(rb1Btn).append(rb2Btn).append(wr1Btn).append(wr2Btn).append(kickBtn);

    }; // end of render position dropdown loop

    // submit button function
    $(document.body).on("click", ".submit-button", function (e) {
        e.preventDefault();
        // empty the grid
        

        $(".matchup-grid").empty();
        // insert loading gif while results are fetched
        // $(".matchup-grid").append(loadingGif);
        // combine the user & computer intoo one object
        gameObject = { user: userTeam, computer: computerTeam };
        // pass the object into the submit game function
        getScores(gameObject).then(calculateWin(gameObject)).then(submitGame(gameObject));

    });

    $(document.body).on("click", ".logout", function (e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = "/login";
    });

    // **** RESULTS FUNCTION ***

    function getScores(data) {
        return new Promise(function(resolve) {
        console.log("DATA ", data);
        // debugger;
        for (let i = 1; i < 7; i++) {
            // grab the right player id so we can get their image and points from the API
            playerId = data.user[i-1].PlayerID;
            // update the week variable for the same reason
            week = data.user[0].week;
            // call the results API
            getUserResults(function(info){
                // parse the data for use     
                info = JSON.parse(info);

                data.user[i-1]["PlayerPoints"] = info.FantasyPoints;
            
            }); // end of the callback

        }; // end of the loop

        // loop for populating computer table
        for (let j = 1; j < 7; j++) {
            // grab the playerId from the saved table
            computerId = data.computer[j-1].PlayerID;
            console.log("COMPUTER ID ", computerId)
            // update the week (may not be needed)
            week = data.computer[0].week;
            console.log("WEEK ", week);
            // call the results API
            getComputerResults(function(info){

                data.computer[j-1]["PlayerPoints"] = info.FantasyPoints;

            }); // end of callback
    
        }; // end of loop

        resolve(data);

        });
    }

    // Ajax request for grabbing score info for user
    function getUserResults(cb){
        
        let playerUrl = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByPlayerID/2019/"+week+"/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
    
        $.ajax({
            url: playerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            async: false,
            success: function(data){
                // call the callback passed
                cb(data);
            }
        });
    }; // end of populate user team function

      // Ajax request for grabbing score info for computer
      function getComputerResults(cb){
        let playerUrl = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByPlayerID/2019/"+week+"/"+computerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
            $.ajax({
                url: playerUrl,
                type: "GET",
                dataType: "json",
                cache: false,
                async: false, 
                success: function(data){
                    // call the callback passed
                    cb(data);
                }
            });
        }; // end of function

    function calculateWin(data) {
        $(".matchup-grid").append(loadingGif);
        return new Promise(function(resolve) {

         // clear out scores
         userScore = 0
         computerScore = 0;
         // loop through to add up the player points
         for (let i = 0; i<data.length; i++) {
             userScore += data.user[i].PlayerPoints;
             computerScore += data.computer[i].PlayerPoints;
         };
         // check to see who won and add the appropriate key value to the array
         if (userScore > computerScore) {
             data.computer[0]["win"] = 0;
             data.user[0]["win"] = 1;
         } else {
             data.computer[0]["win"] = 1;
             data.user[0]["win"] = 0;
         };
         console.log("A", data)
         console.log(userScore, computerScore)
         resolve(data);
        });
    };

    // Submits a new post and brings user to blog page upon completion
    function submitGame(Post) {
        console.log("SUBMIT ", Post);
        $(".matchup-grid").append(loadingGif);
        $.post("/api/submit/", Post, function() {

          window.location.href = "/results";
        });
    
    };

});