$(document).ready(function() {

    // THESE 3 OBJECTS WILL EVENTUALLY COME FROM THE TABLES BUT THIS WILL SHOW YOU THE SCHEMA
    // THIS IS THE OBJECT WE'LL BE SAVING FROM THE GAME.JS FILE
    // WE'LL SAVE ALL THIS DATA TO THE TABLE, THEN WE'LL ACCESS IT FOR USE HERE
    
    
let joinedResults = [
    {
        week: 7,
        teamName: "Team Rodney",
        email: "test@test.com",
        playerName1: "Jacoby Brissett HARDCODE",
        PlayerID1: 18018,
        url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18018.png",
        playerName2: "Chase Edmonds HARDCODE",
        PlayerID2: 19919,
        url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19919.png",
        playerName3: "Ezekiel Elliott HARDCODE",
        PlayerID3: 17923,
        url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/17923.png",
        playerName4: "DeAndre Hopkins HARDCODE",
        PlayerID4: 14986,
        url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14986.png",
        playerName5: "Allen Robinson HARDCODE",
        PlayerID5: 16263,
        url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16263.png",
        playerName6: "Justin Tucker HARDCODE",
        PlayerID6: 14688,
        url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14688.png",
        ComputerGame: {
                gameId: 2,
                week: 16,
                teamName: "The Computer",
                email: "test@test.com",
                playerName1: "Drew Brees HARDCODE",
                PlayerID1: 7242,
                url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/7242.png",
                playerName2: "Phillip Lindsay HARDCODE",
                PlayerID2: 20128,
                url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20128.png",
                playerName3: "Myles Gaskin HARDCODE",
                PlayerID3: 20768,
                url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20768.png",
                playerName4: "Devante Parker HARDCODE",
                PlayerID4: 16775,
                url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16775.png",
                playerName5: "Kenny Golladay HARDCODE",
                PlayerID5: 18977,
                url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18977.png",
                playerName6: "Jason Sanders HARDCODE",
                PlayerID6: 20033,
                url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20033.png"
        }
    },
    {
        week: 7,
        teamName: "Team Rodney",
        email: "test@test.com",
        playerName1: "Jacoby Brissett HARDCODE",
        PlayerID1: 18018,
        url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18018.png",
        playerName2: "Chase Edmonds HARDCODE",
        PlayerID2: 19919,
        url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19919.png",
        playerName3: "Ezekiel Elliott HARDCODE",
        PlayerID3: 17923,
        url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/17923.png",
        playerName4: "DeAndre Hopkins HARDCODE",
        PlayerID4: 14986,
        url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14986.png",
        playerName5: "Allen Robinson HARDCODE",
        PlayerID5: 16263,
        url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16263.png",
        playerName6: "Justin Tucker HARDCODE",
        PlayerID6: 14688,
        url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/14688.png",
        ComputerGame: {
                gameId: 2,
                week: 16,
                teamName: "The Computer",
                email: "test@test.com",
                playerName1: "Drew Brees HARDCODE",
                PlayerID1: 7242,
                url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/7242.png",
                playerName2: "Phillip Lindsay HARDCODE",
                PlayerID2: 20128,
                url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20128.png",
                playerName3: "Myles Gaskin HARDCODE",
                PlayerID3: 20768,
                url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20768.png",
                playerName4: "Devante Parker HARDCODE",
                PlayerID4: 16775,
                url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/16775.png",
                playerName5: "Kenny Golladay HARDCODE",
                PlayerID5: 18977,
                url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18977.png",
                playerName6: "Jason Sanders HARDCODE",
                PlayerID6: 20033,
                url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/20033.png"
        }
    }
]
    
    
    let week = joinedResults[1].week;
    let playerId = "";
    let computerId = "";
    let userScore = 0;
    let computerScore = 0;

    
    // dynamically populate the table with whatever user name is coming from the SQL table
    $("#user-team").html(joinedResults[1].teamName);
    $("#week-number").html("<h1>WEEK " + week + "</h1>");
    
    // sort usersTable so the weeks are in order in case they come in out of order
    // got this here https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    // usersTable.sort((a, b) => (a.week > b.week) ? 1 : -1)
    
    // create the past games dropdown
    let weekDropdown = $("<a>");
    
    // *** THIS WILL EVENTUALLY NEED TO COME FROM THE SQL TABLE. WE WILL HAVE TO PULL UP ALL THE GAMES WHERE EMAIL = LOGGED-IN USER AND LOOP THROUGH.
    for (let i = 0; i < joinedResults.length; i++) {
        console.log(joinedResults[i].week);
            weekDropdown.attr("<div>");
            weekDropdown.addClass("dropdown-item");
            weekDropdown.attr("data-id", joinedResults[i].week);
            weekDropdown.attr("id", "week"+i);
            weekDropdown.html("WEEK " + joinedResults[i].week);
            weekDropdown.appendTo(".week-dropdown");
    }
    
    function populateTables() {
        console.log("UPPER", joinedResults);
    
    // loop through to populate the most recent user results
    for (let i = 1; i < 7; i++) {
    
        $("#week-number").html("<h1>WEEK " + joinedResults[1].week + "</h1>");
        console.log(joinedResults[1].week);
        // grab the playerId from the saved table
        playerId = joinedResults[1]['PlayerID'+i];
        console.log(playerId);
        // grab the week from the saved table
        week = joinedResults[1].week;
        // call the results API
        getUserResults(function(info){
            // parse the data for use     
            info = JSON.parse(info);
            // create each row
            let playerRow = $("<tr id='user-row" + i + "'>").append(
                $("<td><img src='" + joinedResults[1]["url"+i] + "' style='width: 40px'>"),
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
        computerId = joinedResults[1].ComputerGame['PlayerID'+i];
        console.log(playerId);
        // grab the week from the saved table
        week = joinedResults[1].ComputerGame.week;
        // call the results API
        getComputerResults(function(info){
            // parse the data for use     
            info = JSON.parse(info);
    
            let computerRow = $("<tr id='user-row" + i + "'>").append(
                $("<td>").addClass("table-points").text(info.FantasyPoints),
                $("<td>").text(" "),
                $("<td style='text-align: right'>").addClass("table-text").text(info.Name),
                $("<td><img src='" + joinedResults[1].ComputerGame["url"+i] + "' style='width: 40px'>").addClass("align-right"),
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
            joinedResults = data;
            $("tbody").empty();
            populateTables();
           console.log(joinedResults);
          }
          
        //   let userTestScores = 
        //   {
        //       gameId: 1, 
        //       week: 2, 
        //       teamName: "Team Rodney",
        //       email: "test@test.com",
        //       playerName1: "Tom Brady HARDCODE",
        //       PlayerID1: 4314,
        //       url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/4314.png",
        //       playerName2: "Dalvin Cook HARDCODE",
        //       PlayerID2: 18872,
        //       url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18872.png",
        //       playerName3: "Aaron Jones HARDCODE",
        //       PlayerID3: 19045,
        //       url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19045.png",
        //       playerName4: "Emmanuel Sanders HARDCODE",
        //       PlayerID4: 11063,
        //       url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/11063.png",
        //       playerName5: "Kenny Golladay HARDCODE",
        //       PlayerID5: 18977,
        //       url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18977.png",
        //       playerName6: "Austin Seibert HARDCODE",
        //       PlayerID6: 21114,
        //       url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/21114.png"
       
        //   };
      
        //   let computerTestScores = 
        //   {
        //       gameId: 1, 
        //       week: 2, 
        //       teamName: "Team Rodney",
        //       email: "test@test.com",
        //       playerName1: "Tom Brady HARDCODE",
        //       PlayerID1: 4314,
        //       url1: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/4314.png",
        //       playerName2: "Dalvin Cook HARDCODE",
        //       PlayerID2: 18872,
        //       url2: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18872.png",
        //       playerName3: "Aaron Jones HARDCODE",
        //       PlayerID3: 19045,
        //       url3: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/19045.png",
        //       playerName4: "Emmanuel Sanders HARDCODE",
        //       PlayerID4: 11063,
        //       url4: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/11063.png",
        //       playerName5: "Kenny Golladay HARDCODE",
        //       PlayerID5: 18977,
        //       url5: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/18977.png",
        //       playerName6: "Austin Seibert HARDCODE",
        //       PlayerID6: 21114,
        //       url6: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nfl/low-res/21114.png"
       
        //   };
    
    });