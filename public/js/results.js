$(document).ready(function() {

// THESE 3 OBJECTS WILL EVENTUALLY COME FROM THE TABLES BUT THIS WILL SHOW YOU THE SCHEMA
// THIS IS THE OBJECT WE'LL BE SAVING FROM THE GAME.JS FILE
// WE'LL SAVE ALL THIS DATA TO THE TABLE, THEN WE'LL ACCESS IT FOR USE HERE
let userTestScores = 
    {
        gameId: 1, 
        week: 2, 
        teamName: "Team Rodney",
        email: "test@test.com",
        playerName1: "Tom Brady HARDCODE",
        PlayerID1: 4314,
        url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/4314.png",
        playerName2: "Dalvin Cook HARDCODE",
        PlayerID2: 18872,
        url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18872.png",
        playerName3: "Aaron Jones HARDCODE",
        PlayerID3: 19045,
        url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19045.png",
        playerName4: "Emmanuel Sanders HARDCODE",
        PlayerID4: 11063,
        url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/11063.png",
        playerName5: "Kenny Golladay HARDCODE",
        PlayerID5: 18977,
        url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18977.png",
        playerName6: "Austin Seibert HARDCODE",
        PlayerID6: 21114,
        url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/21114.png"
 
    };

    let computerTestScores = 
    {
        gameId: 1, 
        week: 2, 
        teamName: "Team Rodney",
        email: "test@test.com",
        playerName1: "Tom Brady HARDCODE",
        PlayerID1: 4314,
        url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/4314.png",
        playerName2: "Dalvin Cook HARDCODE",
        PlayerID2: 18872,
        url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18872.png",
        playerName3: "Aaron Jones HARDCODE",
        PlayerID3: 19045,
        url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19045.png",
        playerName4: "Emmanuel Sanders HARDCODE",
        PlayerID4: 11063,
        url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/11063.png",
        playerName5: "Kenny Golladay HARDCODE",
        PlayerID5: 18977,
        url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18977.png",
        playerName6: "Austin Seibert HARDCODE",
        PlayerID6: 21114,
        url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/21114.png"
 
    };

// this object will be all games played by the current logged-in user. It will come from the SQL table.
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
$("#user-team").html(usersTable[0].teamName);
$("#week-number").html("<h1>WEEK " + week + "</h1>");

// sort usersTable so the weeks are in order in case they come in out of order
// got this here https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
usersTable.sort((a, b) => (a.week > b.week) ? 1 : -1)

// create the past games dropdown
let weekDropdown = $("<a>");

// *** THIS WILL EVENTUALLY NEED TO COME FROM THE SQL TABLE. WE WILL HAVE TO PULL UP ALL THE GAMES WHERE EMAIL = LOGGED-IN USER AND LOOP THROUGH.
for (let i = 0; i < usersTable.length; i++) {
    console.log(usersTable[i].week);
        weekDropdown.attr("<div>");
        weekDropdown.addClass("dropdown-item");
        weekDropdown.attr("data-id", usersTable[i].week);
        weekDropdown.attr("id", "week"+i);
        weekDropdown.html("WEEK " + usersTable[i].week);
        weekDropdown.appendTo(".week-dropdown");
}

function populateTables() {
    console.log("UPPER", userTestScores);

// loop through to populate the most recent user results
for (let i = 1; i < 7; i++) {

    $("#week-number").html("<h1>WEEK " + userTestScores.week + "</h1>");
    console.log(userTestScores.week);
    // grab the playerId from the saved table
    playerId = userTestScores['PlayerID'+i];
    console.log(playerId);
    // grab the week from the saved table
    week = userTestScores.week;
    // call the results API
    getUserResults(function(info){
        // parse the data for use     
        info = JSON.parse(info);
        // create each row
        let playerRow = $("<tr id='user-row" + i + "'>").append(
            $("<td><img src='" + userTestScores["url"+i] + "' style='width: 40px'>"),
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
for (let i = 1; i < 7; i++) {
    // grab the playerId from the saved table
    computerId = computerTestScores['PlayerID'+i];
    console.log(playerId);
    // grab the week from the saved table
    week = computerTestScores.week;
    // call the results API
    getComputerResults(function(info){
        // parse the data for use     
        info = JSON.parse(info);

        let computerRow = $("<tr id='user-row" + i + "'>").append(
            $("<td><img src='" + computerTestScores["url"+i] + "' style='width: 40px'>"),
            $("<td style='text-align: left'>").addClass("table-text").text(info.Name),
            $("<td>").text(" "),
            $("<td>").addClass("align-right table-points").text(info.FantasyPoints)
            );
            $("#current-computer-results > tbody").append(computerRow);

            // add up the user points column
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

    $(document.body).on("click", ".submit-button", function(e) {
        e.preventDefault();
    
        
            $.get("/api/results/", gameResults);
          
    
    });


    function gameResults(data) {
        computerTestScores = data;
        $("tbody").empty();
        populateTables();
       console.log(computerTestScores);
      }


});