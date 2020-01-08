$(document).ready(function() {

// THESE 3 OBJECTS WILL EVENTUALLY COME FROM THE TABLES BUT THIS WILL SHOW YOU THE SCHEMA
// THIS IS THE OBJECT WE'LL BE SAVING FROM THE GAME.JS FILE
// WE'LL SAVE ALL THIS DATA TO THE TABLE, THEN WE'LL ACCESS IT FOR USE HERE
let userTestScores = [
    {
        gameId: 1, week: 10, PlayerID: 14536, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14536.png", name: "Russell Wilson", email: "test@test.com"
    },
    {
        gameId: 1, week: 10, PlayerID: 18375, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18375.png", name: "Peyton Barber", email: "test@test.com"
    },
    {
        gameId: 1, week: 10, PlayerID: 20824, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20824.png", name: "Josh Jacobs", email: "test@test.com"
    },
    {
        gameId: 1, week: 10, PlayerID: 11611, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/11611.png", name: "Golden Tate", email: "test@test.com"
    },
    {
        gameId: 1, week: 10, PlayerID: 16020, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16020.png", name: "Jarvis Landry", email: "test@test.com"
    },
    {
        gameId: 1, week: 10, PlayerID: 549, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/549.png", name: "Matt Prater", email: "test@test.com"
    }
 
];

let computerTestScores = [
    {
        gameId: 1, week: 10, PlayerID: 13799, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/13799.png", name: "Ryan Tannehill", localPosition: "QB", Position: "QB"
    },
    {
        gameId: 1, week: 10, PlayerID: 19798, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19798.png", name: "Nick Chubb", localPosition: "RB1", Position: "RB"
    },
    {
        gameId: 1, week: 10, PlayerID: 18944, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18944.png", name: "Kareem Hunt", localPosition: "RB2", Position: "RB"    
    },
    {
        gameId: 1, week: 10, PlayerID: 13227, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/13227.png", name: "Randall Cobb", localPosition: "WR1", Position: "WR"
    },
    {
        gameId: 1, week: 10, PlayerID: 19867, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19867.png", name: "Michael Gallup", localPosition: "WR1", Position: "WR"    
    },
    {
        gameId: 1, week: 10, PlayerID: 15854, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/15854.png", name: "Brett Maher", localPosition: "K", Position: "K"
    }
];

// this object will be all games played by the current logged-in user
let usersTable = [
    {
        email: "test@test.com", teamName: "Team Rodney"
    },
    {
        email: "test@test.com", teamName: "Team Rodney"
    },
    {
        email: "test@test.com", teamName: "Team Rodney"
    },
    {
        email: "test@test.com", teamName: "Team Rodney"
    }
];

let week = "";
let playerId = "";
let computerId = "";
let userScore = 0;
let computerScore = 0;

// dynamically populate the table with whatever user name is coming from the SQL table
$("#user-team").html(resultsTable[0].teamName);
$("#week-number").html("<h1>WEEK " + week + "</h1>").css("style='z-index: -1");

// create the past games dropdown
let weekDropdown = $("<a>");

// sort resultsTable so the weeks are in order in case they come in out of order
// got this here https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
resultsTable.sort((a, b) => (a.week > b.week) ? 1 : -1)

for (let i = 0; i < resultsTable.length; i++) {
    console.log(resultsTable[i].week);
        weekDropdown.attr("<div>");
        weekDropdown.addClass("dropdown-item");
        weekDropdown.attr("data-id", resultsTable[i].week);
        weekDropdown.attr("id", "week"+i);
        weekDropdown.html("WEEK " + resultsTable[i].week);
        weekDropdown.appendTo(".week-dropdown");
}

function populateTables() {

for (let i = 0; i < userTestScores.length; i++) {

    $("#week-number").html("<h1>WEEK " + userTestScores[i].week + "</h1>");

    // grab the playerId from the saved table
    playerId = userTestScores[i].PlayerID;
    // grab the week from the saved table
    week = userTestScores[i].week;
    // call the results API
    getUserResults(function(info){
        // parse the data for use     
        info = JSON.parse(info);

        let playerRow = $("<tr id='user-row" + i + "'>").append(
            $("<td><img src='" + userTestScores[i].url + "' style='width: 40px'>"),
            $("<td style='text-align: left'>").addClass("table-text").text(info.Name),
            $("<td>").text(" "),
            $("<td>").addClass("align-right table-points").text(info.FantasyPoints)
            );
            $("#current-user-results > tbody").append(playerRow);

            // add up the user points column
            userScore += parseFloat(info.FantasyPoints);
            // update the score div
            $("#user-points").html(userScore.toFixed(2));

    });

}

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
            $("<td>").addClass("table-points").text(info.FantasyPoints),
            $("<td>").text(" "),
            $("<td>").addClass("align-right table-text").text(info.Name),
            $("<td><img src='" + computerTestScores[i].url + "' style='width: 40px'> style='float: right'").addClass("align-right"),
            );
            $("#current-computer-results > tbody").append(computerRow);

            // add up the columns
            computerScore += parseFloat(info.FantasyPoints);
            // update the score div
            $("#computer-points").html(computerScore.toFixed(2));

    });

}


} // end of populate tables function

// POPULATE THE TABLES
populateTables();


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