$(document).ready(function() {

    // set universal variables
    let week = "";
    let userScore = 0;
    let computerScore = 0;
    let weekArray = [];
    let liveGameId = "";
    let index;
    let newArray;
    let gameCount = 0;
    let userRecord = 0;
    let computerRecord = 0;
    let userEmail = sessionStorage.getItem("email");
    let teamName = sessionStorage.getItem("team name") + " ("+userRecord+"-"+computerRecord+")";
    let computerName = "The Computer ("+computerRecord+"-"+userRecord+")";

// loading the SQL table first
$.ajax({
    // this queries the API and passes the user's
    url: "/api/results?key="+userEmail,
    type: "GET",
    dataType: "json",
    }).then(function(data) {
    // converting the returned data to a new object
    joinedResults = data;
    // this is a loop through an array buried within an object
    for (i in joinedResults[0].UserGames) {
        // pulling the results out to make a more manageable mini array of weeks and gameIds
        weekArray.push({week: joinedResults[0].UserGames[i].week, gameId: joinedResults[0].UserGames[i].gameId});
        };
        // setting the week variable to the most recent game played (need to start with the 2nd to last record to keep the logic straight)
        week = joinedResults[0].UserGames[weekArray.length-2].week;
        // setting a variable for the corresponding gameId
        liveGameId = joinedResults[0].UserGames[weekArray.length-2].gameId;
        // creating another mini array from an array buried in the user results array
        newArray = joinedResults[0].UserGames;
        // pulling out the index of the game we're displaying
        index = newArray.findIndex(x => x.gameId === liveGameId);

    // populating the div with the name of the team of the user who is playing
    $("#user-team").html(teamName);
    // run the populateTables function passing in 3 parameters that we need
    populateTables(joinedResults, week, index);
    // populate the week number with whatever week is being played
    $("#week-number").html("<h1>WEEK " + week + "</h1>");

    // create the past games dropdown
    let weekDropdown = $("<a>");
    // loop through the total number of games played
    for (let i = 0; i < weekArray.length; i+=2) {
        // create a div within the a record
        weekDropdown.attr("<div>");
        // add a bootstrap class
        weekDropdown.addClass("dropdown-item");
        // add some data-attributes to pull info later
        weekDropdown.attr("data-week", weekArray[i].week);
        weekDropdown.attr("data-game", weekArray[i].gameId);
        // increment gameCount
        gameCount += 1;
        // add the text
        weekDropdown.html("GAME " + parseInt(gameCount));
        // append to the dropdown list
        weekDropdown.appendTo(".week-list");
    };

}); // end of the SQL load

    // click function for selecting which results we want to see
    $(document.body).on("click", ".dropdown-item", function(e) {
        e.preventDefault();
        // empty some stuff out
        computerRow = "";
        playerRow = "";
        // set the new liveGameId and week to whatever game was clicked
        liveGameId = $(this).attr("data-game");
        week = $(this).attr("data-week");
        // set the new index
        index = newArray.findIndex(x => x.gameId == liveGameId);
        // clear out the tables before populating
        $("#current-user-results > body").empty();
        $("#current-computer-results > body").empty();
        // once we have all this info call on the results to pull up the new info  
        $.ajax({
            url: "/api/results?key="+userEmail,
            type: "GET",
            dataType: "json",
            }).then(function(data) {
                gameResults(data);
            });

    }); // end of click function
        
    // function for populating the tables, passing 3 parameters that we need
    function populateTables(joinedResults, week, index) {
        // not sure I need to do this newArray again, will check
        newArray = joinedResults[0].UserGames;
        console.log(newArray);
        // loop for calculating team records
        for (let i = 0; i < newArray.length; i+=2) {
            // check to see if sum of user scores is > sum of computer scores
            if ((parseInt(newArray[i].PlayerPoints1) + parseInt(newArray[i].PlayerPoints2) + parseInt(newArray[i].PlayerPoints3) + parseInt(newArray[i].PlayerPoints4) + parseInt(newArray[i].PlayerPoints5) + parseInt(newArray[i].PlayerPoints6)) >
            (parseInt(newArray[i+1].PlayerPoints1) + parseInt(newArray[i+1].PlayerPoints2) + parseInt(newArray[i+1].PlayerPoints3) + parseInt(newArray[i+1].PlayerPoints4) + parseInt(newArray[i+1].PlayerPoints5) + parseInt(newArray[i+1].PlayerPoints6))) {
                // if so increment user record
                userRecord += 1;
                console.log(userRecord)
            } else {
                // otherwise increment computer record
                computerRecord += 1;
            };
            // update team name div with new record
            teamName = sessionStorage.getItem("team name") + " ("+userRecord+"-"+computerRecord+")";
            computerName = "The Computer ("+computerRecord+"-"+userRecord+")";
            $("#user-team").html(teamName);
            $("#computer-team").html(computerName);
    
        };

        // clear junk out
        computerRow = "";
        playerRow = "";
        $("#current-user-results > body").empty();
        $("#current-computer-results > body").empty();
        // update the week number in the div
        $("#week-number").html("<h1>WEEK " + week + "</h1>");
        // loop for populating player table. We start index at 1 because of how we have variable named
        for (let i = 1; i < 7; i++) {
            // grab the right player id so we can get their image and points from the API
            playerId = joinedResults[0].UserGames[index]['PlayerID'+i];
            // update the week variable for the same reason
            week = joinedResults[0].UserGames[index].week;
                // create each row
                let playerRow = $("<tr id='user-row" + i + "'>").append(
                    // add the image
                    $("<td><img src='" + joinedResults[0].UserGames[index]["url"+i] + "' style='width: 40px'>"),
                    // add the player name and some styling
                    $("<td style='text-align: left'>").addClass("table-text").text(joinedResults[0].UserGames[index]["playerName"+i]),
                    // add a blank div to get the spacig right
                    $("<td>").text(" "),
                    // div for points
                    $("<td>").addClass("align-right table-points").text(joinedResults[0].UserGames[index]["PlayerPoints"+i])
                    ); // end of append to row, then add it to the table body
                    $("#current-user-results > tbody").append(playerRow);
                    // add up the user points column
                    userScore += parseFloat(joinedResults[0].UserGames[index]["PlayerPoints"+i]);
                    // update the score div
                    $("#user-points").html(userScore.toFixed(2));
        }; // end of the loop
        
        // loop for populating computer table
        for (let i = 1; i < 7; i++) {
            // grab the playerId from the saved table
            computerId = joinedResults[0].UserGames[index+1]['PlayerID'+i];
            // update the week (may not be needed)
            week = joinedResults[0].UserGames[index+1].week;
            // call the results API
            // getComputerResults(function(info){
                // create each row
                let computerRow = $("<tr id='computer-row" + i + "'>").append(
                    // div for points
                    $("<td>").addClass("table-points").text(joinedResults[0].UserGames[index+1]["PlayerPoints"+i]),
                    // add a blank div to get the spacig right
                    $("<td>").text(" "),
                    // add the player name and some styling
                    $("<td style='text-align: right'>").addClass("table-text").text(joinedResults[0].UserGames[index+1]["playerName"+i]),
                    // add the image
                    $("<td><img src='" + joinedResults[0].UserGames[index+1]["url"+i] + "' style='width: 40px'>").addClass("align-right"),
                    ); // end of append, then add it to the table body
                    $("#current-computer-results > tbody").append(computerRow);
                    // add up the user points column
                    computerScore += parseFloat(joinedResults[0].UserGames[index+1]["PlayerPoints"+i]);
                    // update the score div
                    $("#computer-points").html(computerScore.toFixed(2));
            // }); // end of callback

        }; // end of loop

    }; // end of populate tables function
    
    // // function for each time table is updated
    function gameResults(data) {
        // clear stuff out
        userScore = 0;
        computerScore = 0;
        // update main variable with the data
        joinedResults = data;
        // Jim's version of my function above
        index = newArray.findIndex(y => {
            return y.gameId == liveGameId;
        });
        // clear the table out
        $("tbody").empty();
        // run the populate table with the new variables;
        populateTables(joinedResults, week, index);
    };

    $(document.body).on("click", ".logout", function (e) {
        e.preventDefault();
        sessionStorage.clear();

    });

});