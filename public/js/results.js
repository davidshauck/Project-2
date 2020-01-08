$(document).ready(function() {

// THESE 3 OBJECTS WILL EVENTUALLY COME FROM THE TABLES BUT THIS WILL SHOW YOU THE SCHEMA
// THIS IS THE OBJECT WE'LL BE SAVING FROM THE GAME.JS FILE
// WE'LL SAVE ALL THIS DATA TO THE TABLE, THEN WE'LL ACCESS IT FOR USE HERE
let userTestScores = [
    {
        gameId: 1, week: 10, PlayerID: 14536, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14536.png", name: "Russell Wilson", localPosition: "QB", Position: "QB"
    },
    {
        gameId: 1, week: 10, PlayerID: 18375, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18375.png", name: "Peyton Barber", localPosition: "RB1", Position: "RB"
    },
    {
        gameId: 1, week: 10, PlayerID: 20824, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20824.png", name: "Josh Jacobs", localPosition: "RB2", Position: "RB"
    },
    {
        gameId: 1, week: 10, PlayerID: 11611, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/11611.png", name: "Golden Tate", localPosition: "WR1", Position: "WR"
    },
    {
        gameId: 1, week: 10, PlayerID: 16020, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16020.png", name: "Jarvis Landry", localPosition: "WR2", Position: "WR"    
    },
    {
        gameId: 1, week: 10, PlayerID: 549, url: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/549.png", name: "Matt Prater", localPosition: "K", Position: "K"
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
let resultsTable = [
    {
        week: 16, teamName: "Team Rodney", gameId: 1
    },
    {
        week: 12, teamName: "Team Rodney", gameId: 2
    },
    {
        week: 14, teamName: "Team Rodney", gameId: 3
    },
    {
        week: 8, teamName: "Team Rodney", gameId: 4
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

        // console.log(info);
        // console.log(info.Name);

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

// ** LEAVING THIS HERE, MAY NEED IT LATER
// setTimeout(function(){ 

//     for (let i = 0; i<userTestScores.length; i++) {
//         playerId = userTestScores[i].PlayerID;

//         getUserImage(function(data){
//             // parse the data for use            
//             data = JSON.parse(data);
//             // console.log(data);
            
//                 $("<td><img src='" + data.PhotoUrl + "' style='width: 35px'>").prependTo("#user-row"+i);
                
//             // prepend it to the div so image appears on the left
//         });

//     }


// }, 500);

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

        // callback function for grabbing image from API

            // add up the columns
            computerScore += parseFloat(info.FantasyPoints);
            // update the score div
            $("#computer-points").html(computerScore.toFixed(2));

    });

}


} // end of populate tables function

// POPULATE THE TABLES
populateTables();


// // function for calling on API that gets the player images
// function getUserImage(cb){
// // set the url being queried
// let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
// // increment the index so it grabs the next one 
//     $.ajax({
//         url: playerUrl,
//         type: "GET",
//         dataType: "text",
//         cache: false,
//         success: function(data){
//             // call the callback passed
//             cb(data);
//         }
//     });
// }

// // same but for computer images
// function getComputerImage(cb){
//     // set the url being queried
//     let computerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+computerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
//     // increment the index so it grabs the next one 
//         $.ajax({
//             url: computerUrl,
//             type: "GET",
//             dataType: "text",
//             cache: false,
//             success: function(info){
//                 // call the callback passed
//                 cb(info);
//             }
//         });
//     }

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