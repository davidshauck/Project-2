$(document).ready(function() {

    APIKEY="t3uiacex9b36"

let result = {};
let playerArray = [];
let playersDraftIndex = 0;
let playerIdIndex = 0;
let playerImageIndex = 0;
// let playerIds = ["19781","20841","12841","19781","20841","12841","19781","20841","12841","19781","20841","12841","20841"]

let playerIds = [];
let playerId = "";

let players = [
    {
    "PlayerID": 19781,
    "Date": "2019-12-12T20:20:00",
    "ShortName": "L.Jackson",
    "Name": "Lamar Jackson",
    "Team": "BAL",
    "Opponent": "NYJ",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 7500,
    "LastGameFantasyPoints": 60.4,
    "ProjectedFantasyPoints": 39.4,
    "OpponentRank": 20,
    "OpponentPositionRank": 26,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 14670,
    "DraftKingsSalary": 12225,
    "YahooSalary": 65,
    "FantasyDataSalary": 12225,
    "FantasyDraftSalary": 23798
    },
    {
    "PlayerID": 18890,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "P.Mahomes",
    "Name": "Patrick Mahomes",
    "Team": "KC",
    "Opponent": "DEN",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 7100,
    "LastGameFantasyPoints": 37,
    "ProjectedFantasyPoints": 32.5,
    "OpponentRank": 13,
    "OpponentPositionRank": 15,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13529,
    "DraftKingsSalary": 11573,
    "YahooSalary": 59,
    "FantasyDataSalary": 11573,
    "FantasyDraftSalary": 21679
    },
    {
    "PlayerID": 18857,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "D.Watson",
    "Name": "Deshaun Watson",
    "Team": "HOU",
    "Opponent": "TEN",
    "HomeOrAway": "AWAY",
    "Position": "QB",
    "Salary": 6800,
    "LastGameFantasyPoints": 14.8,
    "ProjectedFantasyPoints": 32.1,
    "OpponentRank": 23,
    "OpponentPositionRank": 23,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13366,
    "DraftKingsSalary": 11084,
    "YahooSalary": 57,
    "FantasyDataSalary": 11084,
    "FantasyDraftSalary": 20701
    },
    {
    "PlayerID": 18055,
    "Date": "2019-12-15T16:25:00",
    "ShortName": "D.Prescott",
    "Name": "Dak Prescott",
    "Team": "DAL",
    "Opponent": "LAR",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 6300,
    "LastGameFantasyPoints": 28.8,
    "ProjectedFantasyPoints": 31.6,
    "OpponentRank": 15,
    "OpponentPositionRank": 20,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 12714,
    "DraftKingsSalary": 10269,
    "YahooSalary": 54,
    "FantasyDataSalary": 10269,
    "FantasyDraftSalary": 19560
    },
    {
    "PlayerID": 7242,
    "Date": "2019-12-16T20:15:00",
    "ShortName": "D.Brees",
    "Name": "Drew Brees",
    "Team": "NO",
    "Opponent": "IND",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 6900,
    "LastGameFantasyPoints": 46.1,
    "ProjectedFantasyPoints": 31.1,
    "OpponentRank": 21,
    "OpponentPositionRank": 31,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13366,
    "DraftKingsSalary": 11247,
    "YahooSalary": 52,
    "FantasyDataSalary": 11247,
    "FantasyDraftSalary": 21842
    },
    {
    "PlayerID": 18877,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "C.McCaffrey",
    "Name": "Christian McCaffrey",
    "Team": "CAR",
    "Opponent": "SEA",
    "HomeOrAway": "HOME",
    "Position": "RB",
    "Salary": 10000,
    "LastGameFantasyPoints": 48.1,
    "ProjectedFantasyPoints": 31.1,
    "OpponentRank": 31,
    "OpponentPositionRank": 24,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 16952,
    "DraftKingsSalary": 16300,
    "YahooSalary": 72,
    "FantasyDataSalary": 16300,
    "FantasyDraftSalary": 30970
    },
    {
    "PlayerID": 14536,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "R.Wilson",
    "Name": "Russell Wilson",
    "Team": "SEA",
    "Opponent": "CAR",
    "HomeOrAway": "AWAY",
    "Position": "QB",
    "Salary": 7000,
    "LastGameFantasyPoints": 31.5,
    "ProjectedFantasyPoints": 30.7,
    "OpponentRank": 41,
    "OpponentPositionRank": 16,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13203,
    "DraftKingsSalary": 11410,
    "YahooSalary": 49,
    "FantasyDataSalary": 11410,
    "FantasyDraftSalary": 21516
    },
    {
    "PlayerID": 16762,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "J.Winston",
    "Name": "Jameis Winston",
    "Team": "TB",
    "Opponent": "DET",
    "HomeOrAway": "AWAY",
    "Position": "QB",
    "Salary": 6900,
    "LastGameFantasyPoints": 17.9,
    "ProjectedFantasyPoints": 29.9,
    "OpponentRank": 46,
    "OpponentPositionRank": 41,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13366,
    "DraftKingsSalary": 11247,
    "YahooSalary": 54,
    "FantasyDataSalary": 11247,
    "FantasyDraftSalary": 21190
    },
    {
    "PlayerID": 13799,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "R.Tannehill",
    "Name": "Ryan Tannehill",
    "Team": "TEN",
    "Opponent": "HOU",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 6500,
    "LastGameFantasyPoints": 39.4,
    "ProjectedFantasyPoints": 29.8,
    "OpponentRank": 42,
    "OpponentPositionRank": 44,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 12388,
    "DraftKingsSalary": 10595,
    "YahooSalary": 49,
    "FantasyDataSalary": 10595,
    "FantasyDraftSalary": 20212
    },
    {
    "PlayerID": 16041,
    "Date": "2019-12-15T16:25:00",
    "ShortName": "J.Garoppolo",
    "Name": "Jimmy Garoppolo",
    "Team": "SF",
    "Opponent": "ATL",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 6100,
    "LastGameFantasyPoints": 17,
    "ProjectedFantasyPoints": 29.2,
    "OpponentRank": 39,
    "OpponentPositionRank": 47,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13692,
    "DraftKingsSalary": 9943,
    "YahooSalary": 51,
    "FantasyDataSalary": 9943,
    "FantasyDraftSalary": 19397
    },
    {
    "PlayerID": 2593,
    "Date": "2019-12-15T13:00:00",
    "ShortName": "A.Rodgers",
    "Name": "Aaron Rodgers",
    "Team": "GB",
    "Opponent": "CHI",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 6300,
    "LastGameFantasyPoints": 23.5,
    "ProjectedFantasyPoints": 27.9,
    "OpponentRank": 11,
    "OpponentPositionRank": 11,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 13040,
    "DraftKingsSalary": 10269,
    "YahooSalary": 51,
    "FantasyDataSalary": 10269,
    "FantasyDraftSalary": 19397
    },
    {
    "PlayerID": 19790,
    "Date": "2019-12-15T16:05:00",
    "ShortName": "B.Mayfield",
    "Name": "Baker Mayfield",
    "Team": "CLE",
    "Opponent": "ARI",
    "HomeOrAway": "AWAY",
    "Position": "QB",
    "Salary": 6400,
    "LastGameFantasyPoints": 27.7,
    "ProjectedFantasyPoints": 27.8,
    "OpponentRank": 52,
    "OpponentPositionRank": 52,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 12551,
    "DraftKingsSalary": 10432,
    "YahooSalary": 47,
    "FantasyDataSalary": 10432,
    "FantasyDraftSalary": 19560
    },
    {
    "PlayerID": 20889,
    "Date": "2019-12-15T16:05:00",
    "ShortName": "K.Murray",
    "Name": "Kyler Murray",
    "Team": "ARI",
    "Opponent": "CLE",
    "HomeOrAway": "HOME",
    "Position": "QB",
    "Salary": 5600,
    "LastGameFantasyPoints": 26.7,
    "ProjectedFantasyPoints": 27.6,
    "OpponentRank": 20,
    "OpponentPositionRank": 29,
    "Status": "Scrambled",
    "StatusCode": "Scrambled",
    "StatusColor": "Scrambled",
    "FanDuelSalary": 12388,
    "DraftKingsSalary": 9128,
    "YahooSalary": 44,
    "FantasyDataSalary": 9128,
    "FantasyDraftSalary": 18093
    }
    ];

    
    // players.sort((a, b) => (a.PlayerID > b.PlayerID) ? 1 : -1);
    // console.log(players);
    


    // playerImage();
    // console.log(fantasyPlayers);

    var playerDropdown = $("<a>");



        getPlayerIds().then(getPlayerInfo).then(function(data) {
            console.log("**************");
            console.log(playerArray);
            console.log(data.ShortName);
            console.log("**************");

            for (let i = 0; i < 15; i++) {
                // console.log(players.ShortName);
                // playerDropdown.attr("<a>");
                playerDropdown.attr("<div>");
                playerDropdown.attr("href", "#");
                playerDropdown.addClass("dropdown-item");
                // playerDropdown.addClass("dd"+i);
                playerDropdown.attr("data-id", playerArray[i].PlayerID);
                playerDropdown.attr("id", "dd"+i);
                playerDropdown.html(playerArray[i].Name + " | $" + playerArray[i].YahooSalary);
                playerDropdown.appendTo(".drop-test");
                getPlayerIds().then(getPlayerInfo).then(function(data) {
                $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
                });
            }

        
                // playerDropdown.attr("<src>", "https://api.sportsdata.io/v3/nfl/scores/json/Player/19781?key=11e7e6cab8c84674a144d406b28e561d")
                // playerDropdown.html(players[i].ShortName + " | " + players[i].LastGameFantasyPoints + " | $" + players[i].YahooSalary);
            // }
            // data from the weather(userLocation).json file is available here
          

            // data = JSON.parse(data);
            // // console.log(dataId);
            // result = data;
            // // console.log(result);
            // playerIds = [];

            
            // playerIds.push(result[playerImageIndex].PlayerID);
            // playerImageIndex += 1;
            // if (playerImageIndex > 10) {
            //     playerImageIndex = 10;
            // };
            
            // // console.log(playerIds);
            // playerDropdown.html(result[i].ShortName + " | $" + result[i].YahooSalary);

        
        });
        

        // console.log("<img src=" + playerImage());
        // playerDropdown.appendTo(".drop-test");
        // getImage(function(data){

        //     data = JSON.parse(data);
        //     // console.log(data.PhotoUrl);
        //     // result.push(data.PhotoUrl)
        //     // console.log(result);
        //     $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
        //     $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);

            
        // });

        function getImage(cb){

            
            // console.log(playerIdIndex)
            // console.log(cb);
            playerId = playerIds[playerIdIndex];
            // console.log(playerId);
            let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/20841?key=87259770c8654c4aa8d0dd12658e7d93";
            // playerIdIndex += 1;
            if (playerIdIndex > 10) {
                playerIdIndex = 10;
            }
            // console.log(playerIdIndex);
    
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


        // getId(function(data){

        //     data = JSON.parse(data);
        //     // console.log(dataId);
        //     result = data;
        //     // console.log(result);
        //     // playerIds = [];

            
        //     playerIds.push(result[playerIdIndex].PlayerID);
        //     playerIdIndex += 1;
        //     if (playerIdIndex > 10) {
        //         playerIdIndex = 10;
        //     }
        //     console.log(playerIds);
        
        // });


        // function getId(callbackId){

        //     // console.log(callbackId);
        //     let position = "QB";
        //     let week = "16";
        //     let imageUrl = "https://api.sportsdata.io/v3/nfl/stats/json/GameLeagueLeaders/2019REG/" + week +"/" + position + "/FantasyPoints?key=87259770c8654c4aa8d0dd12658e7d93";
    
        //     $.ajax({
        //         url: imageUrl,
        //         type: "GET",
        //         dataType: "text",
        //         cache: false,
        //         success: function(data){
        //             // call the callback passed
        //             callbackId(data);
        //         }
        //    });
        // }

    
    
    

    var userLocation;

    function getPlayerIds() {
        let position = "QB";
        let week = "16";
        let queryUrl = "https://api.sportsdata.io/v3/nfl/stats/json/GameLeagueLeaders/2019REG/" + week +"/" + position + "/FantasyPoints?key=87259770c8654c4aa8d0dd12658e7d93";

      return $.ajax(queryUrl)
      .then(function(response) {

        console.log(response)
        return response;
        
      }).then(function(json) {
        // data from the location.json file is available here
        playerId = json[playerIdIndex].PlayerID;
        playerArray = json;
        playerIdIndex += 1;
        console.log(playerIdIndex);
        if (playerIdIndex > 10) {
            playerIdIndex = 10;
        }

      })
    }
    
    function getPlayerInfo() {
        
        console.log("------------------");
        console.log(playerArray);
        console.log("------------------");

      return $.ajax("https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93");
    }
    
    
    // getPlayerIds().then(getPlayerInfo).then(function(data) {
    //   // data from the weather(userLocation).json file is available here
    // });




});

