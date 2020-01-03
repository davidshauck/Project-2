$(document).ready(function() {

// THESE 3 OBJECTS WILL EVENTUALLY COME FROM THE TABLES BUT THIS WILL SHOW YOU THE SCHEMA
// THIS IS THE OBJECT WE'LL BE SAVING FROM THE GAME.JS FILE
// WE'LL SAVE ALL THIS DATA TO THE TABLE, THEN WE'LL ACCESS IT FOR USE HERE
let userTestScores = [
    {
        Name: "Daniel Jones", PlayerID: 20841, Position: "QB", YahooSalary: 29, week: 16, FantasyPointsYahoo: 54.2
    },
    {
        Name: "Saquon Barkley", PlayerID: 19766, Position: "RB", YahooSalary: 47, week: 16, FantasyPointsYahoo: 16.8
    },
    {
        Name: "Aaron Jones", PlayerID: 19045, Position: "RB", YahooSalary: 54, week: 16, FantasyPointsYahoo: 22.4
    },
    {
        Name: "Michael Thomas", PlayerID: 17960, Position: "WR", YahooSalary: 13, week: 16, FantasyPointsYahoo: 9.6
    },
    {
        Name: "Devante Parker", PlayerID: 16775, Position: "WR", YahooSalary: 3, week: 16, FantasyPointsYahoo: 44.2
    },
    {
        Name: "Ka'imi Fairbairn", PlayerID: 18215, Position: "K", YahooSalary: 5, week: 16, FantasyPointsYahoo: 12
    }
 
];

let computerTestScores = [
    {
        Name: "Computer Jones", PlayerID: 20841, Position: "QB", YahooSalary: 29, week: 16, FantasyPointsYahoo: 34.2
    },
    {
        Name: "Computer Barkley", PlayerID: 19766, Position: "RB", YahooSalary: 47, week: 16, FantasyPointsYahoo: 26.8
    },
    {
        Name: "Computer Jones", PlayerID: 19045, Position: "RB", YahooSalary: 54, week: 16, FantasyPointsYahoo: 24.4
    },
    {
        Name: "Computer Thomas", PlayerID: 17960, Position: "WR", YahooSalary: 13, week: 16, FantasyPointsYahoo: 27.6
    },
    {
        Name: "Computer Parker", PlayerID: 16775, Position: "WR", YahooSalary: 3, week: 16, FantasyPointsYahoo: 32.2
    },
    {
        Name: "Computer Fairbairn", PlayerID: 18215, Position: "K", YahooSalary: 5, week: 16, FantasyPointsYahoo: 8
    }
 
];

let resultsTable = [
    {
        week: 16, teamOne: "Team Rodney", teamOnePoints: 176.11, teamTwo: "Computer", teamTwoPoints: 287.87
    },
    {
        week: 12, teamOne: "Team Rodney", teamOnePoints: 222.54, teamTwo: "Computer", teamTwoPoints: 160.36
    },
    {
        week: 14, teamOne: "Team Rodney", teamOnePoints: 186.13, teamTwo: "Computer", teamTwoPoints: 324.81
    },
    {
        week: 8, teamOne: "Team Rodney", teamOnePoints: 213.11, teamTwo: "Computer", teamTwoPoints: 144.22
    }
];

let week = "99";
let playerId = "";
let computerId = "";
let userScore = 0;
let computerScore = 0;
let userTeamName = "Team Rodney"; // this will eventually come from the user SQL table

// dynamically populate the table with whatever user name is coming from the SQL table
$("#user-team").html(userTeamName)
$("#week-number").html("<h1>WEEK " + week + "</h1>");


// create the past games dropdown
let weekDropdown = $("<a>");

// sort resultsTable so the weeks are in order in case they come in out of order
// got this here https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
resultsTable.sort((a, b) => (a.week > b.week) ? 1 : -1)

for (let i = 0; i < resultsTable.length; i++) {
    console.log(resultsTable[i].week);
        weekDropdown.attr("<div>");
        weekDropdown.addClass("dropdown-item");
        // weekDropdown.addClass("week-dropdown");
        weekDropdown.attr("data-id", resultsTable[i].week);
        weekDropdown.attr("id", "week"+i);

        // populate dropdown with name and draft value
        weekDropdown.html(resultsTable[i].week);
        weekDropdown.appendTo(".week-dropdown");

}

function populateTables() {

for (let i = 0; i < userTestScores.length; i++) {
    // grab the playerId from the saved table
    playerId = userTestScores[i].PlayerID;
    // grab the week from the saved table
    week = userTestScores[i].week;
    // call the results API
    getUserResults(function(info){
        // parse the data for use     
        info = JSON.parse(info);

        // console.log(info);
        // console.log(info.Name);

        let playerRow = $("<tr id='user-row" + i + "'>").append(
            // $("<td><img src='" + data.PhotoUrl + "' style='width: 35px'>"),
            $("<td>").text(info.Name),
            $("<td>").text(" "),
            $("<td>").text(info.FantasyPoints)
            );
            $("#current-user-results > tbody").append(playerRow);

            // add up the user points column
            userScore += parseFloat(info.FantasyPoints);
            // update the score div
            $("#user-points").html(userScore.toFixed(2));

    });

}

setTimeout(function(){ 

    for (let i = 0; i<userTestScores.length; i++) {
        playerId = userTestScores[i].PlayerID;

        getUserImage(function(data){
            // parse the data for use            
            data = JSON.parse(data);
            // console.log(data);
            
                $("<td><img src='" + data.PhotoUrl + "' style='width: 35px'>").prependTo("#user-row"+i);
                
            // prepend it to the div so image appears on the left
        });

    }


}, 500);

// loop for populating most recent computer results
for (let i = 0; i < computerTestScores.length; i++) {
    // grab the playerId from the saved table
    computerId = computerTestScores[i].PlayerID;
    // grab the week from the saved table
    week = computerTestScores[i].week;
    // call the results API
    getComputerResults(function(info){
        // parse the data for use     
        info = JSON.parse(info);

        // console.log(info);
        // console.log(info.Name);

        let computerRow = $("<tr id='computer-row-" + i + "'>").append(
            // $("<td><img src='" + data.PhotoUrl + "' style='width: 35px'>"),
            $("<td>").text(info.Name),
            $("<td>").text(" "),
            $("<td>").text(info.FantasyPoints)
            );
            $("#current-computer-results > tbody").append(computerRow);

        // callback function for grabbing image from API

            // add up the columns
            computerScore += parseFloat(info.FantasyPoints);
            // update the score div
            // $("#user-points").html(userScore);
            $("#computer-points").html(computerScore.toFixed(2));

    });

}

// setting a delay to cheat on the API in case it hasn't been loaded yet
setTimeout(function(){ 

    for (let i = 0; i<computerTestScores.length; i++) {
        computerId = computerTestScores[i].PlayerID;

        getComputerImage(function(data){
            // parse the data for use            
            data = JSON.parse(data);
            console.log(data);
            
                $("<td><img src='" + data.PhotoUrl + "' style='width: 35px'>").appendTo("#computer-row-"+i);
                
            // prepend it to the div so image appears on the left
        });

    }


    }, 500);

} // end of populate tables function

// POPULATE THE TABLES
populateTables();


// function for calling on API that gets the player images
function getUserImage(cb){
// set the url being queried
let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
// increment the index so it grabs the next one 
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

// same but for computer images
function getComputerImage(cb){
    // set the url being queried
    let computerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+computerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
    // increment the index so it grabs the next one 
        $.ajax({
            url: computerUrl,
            type: "GET",
            dataType: "text",
            cache: false,
            success: function(info){
                // call the callback passed
                cb(info);
            }
        });
    }

    // LEAVING THIS HERE IN CASE WE WANT TO TRY TO CREATE A PAST GAMES TABLE
    // // function that renders the past results table
    // function renderPastResults() {
    // for (let i = 0; i<resultsTable.length; i++) {
    //     let resultsRow = $("<tr>").append(
    //         $("<td>").text(resultsTable[i].week),
    //         $("<td>").text(resultsTable[i].teamOne),
    //         $("<td>").text(resultsTable[i].teamOnePoints),
    //         $("<td>").text(resultsTable[i].teamTwo),
    //         $("<td>").text(resultsTable[i].teamTwoPoints),
    //         );
    //         $("#results-table > tbody").append(resultsRow);
    //         // console.log(resultsTable);
    //     }
    // }


// Ajax request for grabbing score info for user
function getUserResults(cb){
    
    let playerUrl = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByPlayerID/2019/"+week+"/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";

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

// Ajax request for grabbing score info for computer
function getComputerResults(cb){
    
    let playerUrl = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByPlayerID/2019/"+week+"/"+computerId+"?key=87259770c8654c4aa8d0dd12658e7d93";

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








});