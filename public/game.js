$(document).ready(function() {



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
let disable = true;
let enable = false;
let computerBudget = 200;
let userBudget = 200;
let computerPlayerName = "";
let userPlayerName = "";

// run all the necessary functions to get the game loaded
renderUserTeam();
renderComputerTeam();
renderPositionDropdown();

function start() {
// when user clicks the position selector dropdown
$(document.body).on("click", "div.position-list button", function(e) {
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
    getPlayerIds().then(getPlayerInfo).then(function(data) {
    // set random computer player for later use (the *15 picks top 15 players; can be changed)
    computerPlayer = playerArray[Math.floor(Math.random()*15)].PlayerID;

    // create dynamic list of players for user to choose from
    let playerDropdown = $("<a>");
    // loop through 15 times to give user 15 options
    for (let i = 0; i < 15; i++) {
        playerDropdown.attr("<div>");
        playerDropdown.addClass("dropdown-item");
        playerDropdown.addClass("player-dropdown");
        playerDropdown.attr("data-id", playerArray[i].PlayerID);
        playerDropdown.attr("id", "dd"+i);
        // the kickers didn't have draft values so I made them all $5
        if (!playerArray[i].YahooSalary) {
            playerArray[i].YahooSalary = parseInt(5);
        } 
        // populate dropdown with name and draft value
        playerDropdown.html(playerArray[i].Name + " | $" + playerArray[i].YahooSalary);
        // add the individual players to the dropdown
        playerDropdown.appendTo(".drop-test");
        
        // callback functionn for grabbing image from API
        getImage(function(data){
            // parse the data for use            
            data = JSON.parse(data);
            // prepend it to the div so image appears on the left
            $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);       
        });
    } // end of loop
            
    // click function for selecting a player
    $( ".player-dropdown" ).on("click", function() {
    // grab the player ID from the click
    playerId = ($(this).attr("data-id"));
    // callback function for grabbing the image
        populateUserTeam(function(data){
            // parse the data for use     
            data = JSON.parse(data);
            // function for determining if players have already been selected
            // Found it here https://www.geeksforgeeks.org/javascript-array-findindex-method/
            function isIncluded(element, index, array) {
                return (element.PlayerID === data.PlayerID);
                }
                // variables for the return of the functin to determine if players are already on teams
                let compareUser = userTeam.findIndex(isIncluded);
                let compareComputer = computerTeam.findIndex(isIncluded);

                // if player is not yet on either team
                if ((compareUser < 0) && (compareComputer < 0)) {
                // change the push boolean to true so it will push to computer team
                pushComputer = true;
                // push the object to the user's team array
                userTeam.push({PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, position: localPosition, Position: data.Position, FantasyPoints: FantasyPoints});
                let userSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);

                // if kicker's value is null then make it $5
                if (!userSalary[0]) {
                    console.log("KICKER SALARY " + data.YahooSalary)
                    userSalary = parseInt(5);
                }
                // subtract the value of the player from the user's budget
                userBudget -= userSalary;
                // update the budget div
                $("#user-budget").html("$" + userBudget);
                // change push boolean to false if criteria not met
                } else {
                    // change the push boolean to false
                    pushComputer = false;
                }
            // render the user grid
            renderUserTeam();
            // refresh the position dropdown             
            renderPositionDropdown();      
        });
        
        // callback function for populating the computer's team
        populateComputerTeam(function(data){
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
                return (moreInfo.position === data.Position);
                }
            // variable to hold the return value
            let comparePositionComputer = computerTeam.findIndex(isIncludedC);

            // check all conditions before pushing to computer's team
            if ((computerTeam.length < 6) && (compareUserB < 0) && (compareComputerB < 0) && (comparePositionComputer < 0) && (pushComputer) && (duplicatePlayer.length < 2)) {
                // if met, push
                computerTeam.push({PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, position: localPosition, Position: data.Position});
                // grab the salary from the local array
                let computerSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);
                // console.log(computerSalary);
                // change null to $5
                if (!computerSalary[0]) {
                    computerSalary = parseInt(5);
                }
                // subtract the value of the player's salary from computer's budget
                computerBudget -= computerSalary;
                // update the budget div
                $("#computer-budget").html("$" + computerBudget);
            };
            duplicatePlayer = computerTeam.filter(item => item.Position === data.Position).map(item => item.PlayerID)
            containsQB = computerTeam.filter(item => item.Position === "QB").map(item => item.PlayerID)

            
            // console.log("@@@@@@@@@@@@@@@@@@");
            // console.log(computerTeam);
            // console.log(data.Position);
            // console.log(duplicatePlayer);
            // console.log(containsQB);
            // console.log("@@@@@@@@@@@@@@@@@@");
            // render the team image grid
            renderComputerTeam();
        });   

    }); // end of click function

    // empty the player array
    playerArray = [];
    
    }); // end of callback function
}); // end of click function
    
}; // end of start() function
// call the start function to begin the game 
start();


// THIS WORKS FOR ONE RECORD BUT NOT FOR THE FINAL RECORD WHEN THERE ARE MULTIPLE PLAYERS
    // function for removing the players from the team
    $(document.body).on("click","#player-name", function(e) {
        e.preventDefault()
        // set a variable for the clicked image
        let deleteRecord = ($(this).text().trim());
        console.log($(this));
        console.log("DELETE ID " + deleteRecord)

         // https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
         userSalary = playerIds.filter(item => item.Name === deleteRecord).map(item => item.YahooSalary)
         console.log("SALARY");
         console.log(userSalary)
         if (!userSalary) {
             userSalary = parseInt(5);
         }
         userBudget += parseInt(userSalary);
        //  if (!userBudget) {
        //      userBudget = 200;
        //  }
        // loop through the user's team to find the corresponding player and splice it out
        for (let i = 0; i < userTeam.length; i++){ 
            console.log(userTeam[i].name);
            console.log("###################")
            console.log(userTeam);
            console.log("###################")
            if (userTeam[i].name === deleteRecord) {
                // alert("SAME");
              userTeam.splice(i, 1); 
            }
         }
        if (userTeam.length === 0) {
            userBudget = 200;
        }
         $("#user-budget").html("$" + userBudget);


    // update the team grid
    renderPositionDropdown();
    renderUserTeam();
    start();
});


// function for calling on API that gets the player image
function getImage(cb){
// set the current player ID from the array we populated earlier    
playerId = playerIds[playerIdIndex].PlayerID;
// set the url being queried
let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
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
        success: function(data){
            // call the callback passed
            cb(data);
        }
    });
}
    // function for grabbing the top 15 players and storing their player IDs in an array (got this from Stack Overflow)
    function getPlayerIds() {
        // let position = "QB";
        let week = "16";
        let queryUrl = "https://api.sportsdata.io/v3/nfl/stats/json/GameLeagueLeaders/2019REG/" + week +"/" + position + "/FantasyPoints?key=87259770c8654c4aa8d0dd12658e7d93";

        return $.ajax(queryUrl)
        .then(function(response) {

            return response;
        
        }).then(function(json) {
        // grab playerId from the returned data
        playerId = json[playerIdIndex].PlayerID;
        // put all the returned data into a local array
        playerArray = json;
        // loop through that array and push them to a new playerIds array
        playerIds = [];
        for (let i = 0; i < 15; i++) {
            playerIds.push({Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary})
        }
        console.log("*******************")
        console.log(playerIds);
        console.log("*******************")

        

        // stop at the top 15
        if (playerIdIndex > 15) {
            playerIdIndex = 15;
        }

        })
    }
    // use the playerId to use in the ajax call to grab player info
    function getPlayerInfo() {
        return $.ajax("https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93");
    }
    // part of the whole callback function
    function populateUserTeam(cb){

        console.log("playerId" + playerId);
        // console.log(playerId);
        let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";

        $.ajax({
            url: playerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            success: function(data){
                // call the callback passed
                cb(data);
            }
        });
    };
    // a repeat of the function but this time for the computer's team
    function populateComputerTeam(cb){

        console.log("playerId" + computerPlayer);
        // console.log(playerId);
        let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+computerPlayer+"?key=87259770c8654c4aa8d0dd12658e7d93";

        $.ajax({
            url: playerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            success: function(data){
                // call the callback passed
                cb(data);
            }
        });
    }

    

    // function that renders the user's image grid
    function renderUserTeam() {
        $(".player-button").prop("disabled", disable);
        playerIdIndex = 0;
        $(".drop-test").empty();
        // empty the div first
        $("#player-image-grid").empty();
        // loop through until we've hit 6
        for (let i = 0; i < ((6 - userTeam.length) + parseInt(userTeam.length)); i ++) {
            // console.log("user team length " + userTeam.length);
            let userImages = $("<img>");
            let userPlayerBox = $("<div>");
            userPlayerBox.addClass("rounded float-left images");


            if (i >= userTeam.length) {
                userImages.attr("src", "./images/150px.jpg");
                userImages.css({ width: "128px", height: "177px"})
                userPlayerName = "   ";
            } else {
                userImages.attr("src", userTeam[i].url);
                userImages.attr("id", "player-image");
                userImages.attr("data-id", userTeam[i].PlayerID);
                // images.css({height: "100px"})
                userPlayerName = (userTeam[i].name);
            };
            // playerBox.attr({ width: "100%", margin: "50px" });
            let p = $("<p>").text(userPlayerName);
            p.attr("id", "player-name");
            $(userPlayerBox).append(userImages);
            $(userPlayerBox).append(p);
            $("#player-image-grid").append(userPlayerBox);
            // $("#computer-image-grid").append(computerPlayerName);
            playerIdIndex = 0;
            $(".drop-test").empty();
            start();
        };
        
        }
        // same deal for the computer
        function renderComputerTeam() {
            $("#computer-image-grid").empty();
            
            for (let i = 0; i < ((6 - computerTeam.length) + parseInt(computerTeam.length)); i ++) {
                console.log("computer team length " + computerTeam.length);
                let computerImages = $("<img>");
                let computerPlayerBox = $("<div>");
                $(computerPlayerBox).addClass("rounded float-right images");

                if (i >= computerTeam.length) {
                    computerImages.attr("src", "./images/150px.jpg");
                    computerImages.css({ width: "128px", height: "177px"})
                    computerPlayerName = "   ";
                } else {
                    computerImages.attr("src", computerTeam[i].url);
                    computerImages.attr("id", "player-image");
                    computerPlayerName = computerTeam[i].name;
                };
                let p = $("<p>").text(computerPlayerName);
                $(computerPlayerBox).append(computerImages);
                $(computerPlayerBox).append(p);
                $("#computer-image-grid").append(computerPlayerBox);
                playerIdIndex = 0;
                $(".drop-test").empty();
                start();
            };
            console.log("rendering computer");
    
            }
// function for rendering the positions dropdown
function renderPositionDropdown() {
    $(".position-list").empty();

    let qbBtn = $("<button class='dropdown-item' data-position='QB' id='QB' value='QB'>");
    qbBtn.html("QB");
    qbBtn.css({"padding-top": "0px"})
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
    kickBtn.css({"padding-bottom": "5px", "border-bottom":"0px"})
    // loop to disable buttons
    for (let i = 0; i < userTeam.length; i++) {
        if (userTeam[i].position === "QB") {
            qbBtn.addClass("disabled");
            $("").data("toggle","");   
        }
        if (userTeam[i].position === "RB1") {
            rb1Btn.addClass("disabled");    
        }
        if (userTeam[i].position === "RB2") {
            rb2Btn.addClass("disabled");    
        }
        if (userTeam[i].position === "WR1") {
            wr1Btn.addClass("disabled");    
        }
        if (userTeam[i].position === "WR2") {
            wr2Btn.addClass("disabled");    
        }
        if (userTeam[i].position === "K") {
            kickBtn.addClass("disabled");    
        }
    }

    $(".position-list").append(qbBtn).append(rb1Btn).append(rb2Btn).append(wr1Btn).append(wr2Btn).append(kickBtn);
    }

//     $(document.body).on("click", ".submit-button", function(e) {
//         e.preventDefault();

//     // If the file didn't exist, then it gets created on the fly.
// fs.appendFile("user.txt", userTeam, function(err) {

//     // If an error was experienced we will log it.
//     if (err) {
//       console.log(err);
//     }
  
//     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//     else {
//       console.log("Content Added!");
//     }
  
//   });

//   fs.appendFile("computer.txt", computerTeam, function(err) {

//     // If an error was experienced we will log it.
//     if (err) {
//       console.log(err);
//     }
  
//     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//     else {
//       console.log("Content Added!");
//     }
  
//   });
// });
        

    // players.sort((a, b) => (a.PlayerID > b.PlayerID) ? 1 : -1);
    // console.log(players);

    // APIKEY="t3uiacex9b36"
// let arr = ['Gavin', 'Richard', 'Erlich', 'Gilfoyle'];
// console.log(arr.includes('Erlich'));




// let playerBox = $("<div class='player-box'>");
// let p = $("<p>").text("Name " + userPlayerName + " | Position | " + userTeam[i].position);
// $(playerBox).addClass("rounded mx-auto d-block");
// $(playerBox).append(images);
// $(playerBox).append(p);
// $(playerBox).css({"display": "inline-block"})


});