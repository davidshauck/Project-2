$(document).ready(function() {

    // APIKEY="t3uiacex9b36"

let result = {};
let playerArray = [];
let playersDraftIndex = 0;
let playerIdIndex = 0;
let playerImageIndex = 0;
let playerIds = [];
let position = "QB";
let imagePosition = 1;

let playerId = "";



// document.getElementById("myImg").src = "assets/images/scaffold.gif";


$( ".position-dropdown" ).on( "click", function() {
    // alert( $( this ).text() );
    playerArray = [];
    playerIndex = 0;
    playerIds = [];
    playerId = "";
    playerIdIndex = 0;
    position = $(this).text();
    $( ".drop-test" ).empty();
    console.log("position " + position);
  
//   $( ".dropdown-item" ).trigger( "click" );



    
    // players.sort((a, b) => (a.PlayerID > b.PlayerID) ? 1 : -1);
    // console.log(players);
    
let playerDropdown = $("<a>");



        getPlayerIds().then(getPlayerInfo).then(function(data) {
            console.log("**************");
            console.log(playerArray);
            console.log(data.ShortName);
            console.log("**************");

            for (let i = 0; i < 15; i++) {
                playerDropdown.attr("<div>");
                // playerDropdown.attr("href", "#");
                playerDropdown.addClass("dropdown-item");
                playerDropdown.addClass("player-dropdown");
                playerDropdown.attr("data-id", playerArray[i].PlayerID);
                playerDropdown.attr("id", "dd"+i);
                playerDropdown.html(playerArray[i].Name + " | $" + playerArray[i].YahooSalary);
                playerDropdown.appendTo(".drop-test");
  
                getImage(function(data){
                    
                    data = JSON.parse(data);
                    // console.log(data.PhotoUrl);
                    // result.push(data.PhotoUrl)
                    // console.log(result);
                    $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
                    // $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
        
                    
                });
            }
            $( ".player-dropdown" ).on( "click", function() {
                playerId = ($(this).attr("data-id"));
                populateImageDiv(function(data){
                    
                    data = JSON.parse(data);
                    // console.log(data.PhotoUrl);
                    // result.push(data.PhotoUrl)
                    // console.log(result);
                    $("#img"+imagePosition).attr("src", data.PhotoUrl);
                    imagePosition += 1;
                    console.log(data.PhotoUrl);
                    console.log(imagePosition);

                    // alert( "success")
                    // $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
        
                    
                });
        
        });
            playerArray = [];
        });



        

        
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
        //     // $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
        //     // $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);

            
        // });

        function getImage(cb){

            
            // console.log(playerIdIndex)
            // console.log(cb);
            playerId = playerIds[playerIdIndex];
            console.log("playerId" + playerId);
            // console.log(playerId);
            let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
            playerIdIndex += 1;
            if (playerIdIndex > 15) {
                playerIdIndex = 15;
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

    function getPlayerIds() {
        // let position = "QB";
        let week = "16";
        let queryUrl = "https://api.sportsdata.io/v3/nfl/stats/json/GameLeagueLeaders/2019REG/" + week +"/" + position + "/FantasyPoints?key=87259770c8654c4aa8d0dd12658e7d93";

      return $.ajax(queryUrl)
      .then(function(response) {

        // console.log(response)
        return response;
        
      }).then(function(json) {
        // data from the location.json file is available here
        playerId = json[playerIdIndex].PlayerID;
        playerArray = json;
        for (let i = 0; i < 15; i++) {
            playerIds.push(playerArray[i].PlayerID)
        }
        console.log(playerIds);
        // playerIdIndex += 1;
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


    function populateImageDiv(cb){

            
        // console.log(playerIdIndex)
        // console.log(cb);
        console.log("playerId" + playerId);
        // console.log(playerId);
        let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";

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




});

