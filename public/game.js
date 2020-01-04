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
let deleteRecord = "";
let disable = true;
let enable = false;
let computerBudget = 150;
let userBudget = 150;
let computerPlayerName = "";
let userPlayerName = "";
let userSalary;
let userName = "Team Rodney"; // this will be dynamic once we create the login process
let week = parseInt([Math.floor(Math.random()*17)]);


// run all the necessary functions to get the game loaded
renderUserTeam();
renderComputerTeam();
renderPositionDropdown();

// Rules button
$(".instructions").click(function() {
    $("p").slideToggle(); 
});

function start() {
// populate the team name div
$(".user-title").html(userName);
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
    // set random computer player for later use (the *20 picks top 20 players; can be changed)
    computerPlayer = playerArray[Math.floor(Math.random()*20)].PlayerID;
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
                // variables for the return of the function to determine if players are already on teams
                let compareUser = userTeam.findIndex(isIncluded);
                let compareComputer = computerTeam.findIndex(isIncluded);

                // if player is not yet on either team (its index would be -1, thus the < 0 to determine if it's in the array)
                if ((compareUser < 0) && (compareComputer < 0)) {
                // change the push boolean to true so it will push to computer team
                pushComputer = true;
                // push the object to the user's team array
                userTeam.push({week: week, PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, localPosition: localPosition, Position: data.Position});
                 //got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
                userSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);
                console.log(playerIds);
                // if kicker's value is null then make it $5
                console.log("USER SALARY ADD BEFORE " + userSalary + "XX");
                if ((!userSalary) || (userSalary === "") || (userSalary === NaN)) {
                    userSalary = parseInt(5);
                }
                console.log("USER SALARY ADD AFTER " + userSalary + "XX");
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
                return (moreInfo.localPosition === data.Position);
                }
            // variable to hold the return value
            let comparePositionComputer = computerTeam.findIndex(isIncludedC);

            // check all conditions before pushing to computer's team
            if ((computerTeam.length < 6) && (compareUserB < 0) && (compareComputerB < 0) && (comparePositionComputer < 0) && (pushComputer) && (duplicatePlayer.length < 2)) {
                // if met, push
                computerTeam.push({week: week, PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, localPosition: localPosition, Position: data.Position});
                //got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
                let computerSalary = playerIds.filter(item => item.PlayerID === data.PlayerID).map(item => item.YahooSalary);
                // change null to $5
                if (!computerSalary[0]) {
                    computerSalary = parseInt(5);
                }
                // subtract the value of the player's salary from computer's budget
                computerBudget -= computerSalary;
                // update the budget div
                $("#computer-budget").html("$" + computerBudget);
            };
            //got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
            duplicatePlayer = computerTeam.filter(item => item.Position === data.Position).map(item => item.PlayerID)
            containsQB = computerTeam.filter(item => item.Position === "QB").map(item => item.PlayerID)
            // render the team after all these checks
            renderComputerTeam();
   
        });  // end of populate function 

    }); // end of click function

    // empty the player array
    playerArray = [];
    
    }); // end of callback function
}); // end of click function
    
}; // end of start() function

// call the start function to begin the game 
start();

    // function for removing the players from the team
    $(document.body).on("click","#player-name", function(e) {
        e.preventDefault()
        // set a variable for the clicked image
        deleteRecord = ($(this).text().trim());

         //got this here https://stackoverflow.com/questions/42756724/get-key-value-based-on-value-of-another-key-in-object
         userSalary = playerIds.filter(item => item.Name === deleteRecord).map(item => item.YahooSalary)
         console.log("USER SALARY REMOVE BEFORE " + userSalary);
         // *** GETTING ERROR WHEN DELETING KICKER
         if ((!userSalary) || (userSalary === "") || (userSalary === NaN)) {
                userSalary = parseInt(5);
            }
        console.log("USER SALARY REMOVE AFTER " + userSalary);

         userBudget += parseInt(userSalary);
   
        // loop through the user's team to find the corresponding player and splice it out
        for (let i = 0; i < userTeam.length; i++){ 
            if (userTeam[i].name === deleteRecord) {
              userTeam.splice(i, 1); 
            }
         }
        // when array has 0 objects reset the budget back to $200
        if (userTeam.length === 0) {
            userBudget = 150;
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
        console.log("WEEK " + week)
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
        playerIds = []; // need to clear it out each loop through
        for (let i = 0; i < 15; i++) {
            playerIds.push({Name: playerArray[i].Name, PlayerID: playerArray[i].PlayerID, Position: playerArray[i].Position, YahooSalary: playerArray[i].YahooSalary})
        }
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
    }; // end of populate user team function

    // a repeat of the function but this time for the computer's team
    function populateComputerTeam(cb){

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
    } // end of populate computer function

    // function that renders the user's image grid
    function renderUserTeam() {
        $(".player-button").prop("disabled", disable);
        playerIdIndex = 0;
        // empty the dropdown to be clear for next time
        $(".drop-test").empty();
        // empty the div first
        $("#player-image-grid").empty();
        // loop through until we've hit 6 players. This formula is set up to still work if the team is less than 6
        for (let i = 0; i < ((6 - userTeam.length) + parseInt(userTeam.length)); i ++) {
            let userImages = $("<img>");
            let userPlayerBox = $("<div>");
            userPlayerBox.addClass("rounded float-left images");

            // loop for adding images to grid
            if (i >= userTeam.length) {
                // add the placeholder if the team hasn't filled out all players yet
                userImages.attr("src", "./images/player_placeholder.jpg");
                userImages.css({ width: "128px", height: "177px"})
                userPlayerName = "   ";
            // poulate with image and player name if a player has been selected
            } else {
                userImages.attr("src", userTeam[i].url);
                userImages.attr("id", "player-image");
                userImages.attr("data-id", userTeam[i].PlayerID);
                userPlayerName = (userTeam[i].name);
            };
            // append playyer name under the images
            let p = $("<p>").text(userPlayerName);
            p.attr("id", "player-name");
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
        
    } // end of render user team function 

    // same deal for the computer
    function renderComputerTeam() {
        // first empty of the the grid
        $("#computer-image-grid").empty();
        // loop through until we've hit 6 players. This formula is set up to still work if the team is less than 6
        for (let i = 0; i < ((6 - computerTeam.length) + parseInt(computerTeam.length)); i ++) {
            let computerImages = $("<img>");
            let computerPlayerBox = $("<div>");
            $(computerPlayerBox).addClass("rounded float-right images");
            // add the placeholder if the team hasn't filled out all players yet
            if (i >= computerTeam.length) {
                computerImages.attr("src", "./images/player_placeholder.jpg");
                computerImages.css({ width: "128px", height: "177px"})
                computerPlayerName = "   ";
            // poulate with image and player name if a player has been selected
            } else {
                computerImages.attr("src", computerTeam[i].url);
                computerImages.attr("id", "player-image");
                computerPlayerName = computerTeam[i].name;
            };
            // append playyer name under the images
            let p = $("<p>").text(computerPlayerName);
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
        if ((userTeam.length >= 5) && (computerTeam.length >=5)) {
            $(".submit-button").prop("disabled", false);
        } else {
            $(".submit-button").prop("disabled", true);
        }
        $(document.body).on("click", ".submit-button", function(e) {
            e.preventDefault();
            console.log("*******USER TEAM*********")
            console.log(userTeam);
            console.log("********************")
            console.log("*****COMPUTER TEAM*******")
            console.log(computerTeam);
            console.log("********************")
        });

    } // end of render function

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
        if (userTeam[i].localPosition === "QB") {
            qbBtn.addClass("disabled");
            $("").data("toggle","");   
        }
        if (userTeam[i].localPosition === "RB1") {
            rb1Btn.addClass("disabled");    
        }
        if (userTeam[i].localPosition === "RB2") {
            rb2Btn.addClass("disabled");    
        }
        if (userTeam[i].localPosition === "WR1") {
            wr1Btn.addClass("disabled");    
        }
        if (userTeam[i].localPosition === "WR2") {
            wr2Btn.addClass("disabled");    
        }
        if (userTeam[i].localPosition === "K") {
            kickBtn.addClass("disabled");    
        }
    }
        $(".position-list").append(qbBtn).append(rb1Btn).append(rb2Btn).append(wr1Btn).append(wr2Btn).append(kickBtn);
    
    } // end position dropdown loop

});