$(document).ready(function() {

    // APIKEY="t3uiacex9b36"

let playerArray = [];
let playerIdIndex = 0;
let playerIds = [];
let position = "";
let imagePosition = 1;
let splicePosition = 0;
let imageUrls = [];
let playerId = "";

renderImages();

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

            for (let i = 0; i < 15; i++) {
                playerDropdown.attr("<div>");
                playerDropdown.addClass("dropdown-item");
                playerDropdown.addClass("player-dropdown");
                playerDropdown.attr("data-id", playerArray[i].PlayerID);
                playerDropdown.attr("id", "dd"+i);
                playerDropdown.html(playerArray[i].Name + " | $" + playerArray[i].YahooSalary);
                playerDropdown.appendTo(".drop-test");
  
                getImage(function(data){
                    
                    data = JSON.parse(data);

                    $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
        
                    
                });
            }
            $( ".player-dropdown" ).on( "click", function() {
                playerId = ($(this).attr("data-id"));
                
                populateImageDiv(function(data){
                    
                    data = JSON.parse(data);
                    // console.log(data.PhotoUrl);
                    // result.push(data.PhotoUrl)
                    // console.log(result);
                    imageUrls.push(data.PhotoUrl);

                    // let arr2 = imageUrls.filter(a => a !== 'e')
                    renderImages();
                    // imagePosition += 1;
                    console.log(imageUrls);
                    // console.log(imagePosition);

                    // alert( "success")
                    // $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
        
                    
                });
        
        });
            playerArray = [];
        });



           // removes images
    $("#image-grid").on("click",".images", function(e) {
        e.preventDefault()
        // imagePosition+=1;
        splicePosition = $(this).attr("data-position");
        let imageSrc = ($(this).attr("src"));
    console.log("splice " + splicePosition);
    // console.log(array);
    // $("#img" + $(this).attr("data-position")).attr("src", "./images/150px.png");
    // array.splice(removeBtn, 1);
    // console.log(array);
    // imageUrls.splice(splicePosition);
    let imageUrls2 = imageUrls.filter(a => a !== imageSrc); 
    imageUrls = imageUrls2;
    console.log("&&&&&&&&&&&&&&&&&")
    console.log(imageUrls2);
    console.log("&&&&&&&&&&&&&&&&&")



    // imageUrls = imageUrls.filter(emp => emp.name.localeCompare(name));

// console.log(employees);
    // imagePosition -= 1;
    console.log(imageUrls);
    // updatedImagePosition = imagePosition - 1;
    // imagePosition = updatedImagePosition;
    ;

    renderImages();




  });

        

        
        });
        

        function getImage(cb){
            
            // console.log(playerIdIndex)
            // console.log(cb);
            playerId = playerIds[playerIdIndex];
            // console.log("playerId" + playerId);
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
        // console.log(playerIds);
        // playerIdIndex += 1;
        // console.log(playerIdIndex);
        if (playerIdIndex > 10) {
            playerIdIndex = 10;
        }

      })
    }
    
    function getPlayerInfo() {
        
        // console.log("------------------");
        // console.log(playerArray);
        // console.log("------------------");

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



    function renderImages() {
        $("#image-grid").empty();

        for (let i = 0; i < ((6 - imageUrls.length) + parseInt(imageUrls.length)); i ++) {
            console.log("image urls length " + imageUrls.length);
            let images = $("<img>");
            images.addClass("images");
            images.attr("id", "img"+i);
            images.attr("value", i)
            images.attr("data-position", i);
            if (i >= imageUrls.length) {
                images.attr("src", "./images/150px.png");
            } else {
                images.attr("src", imageUrls[i]);
            }
            images.attr({ width: "33%", padding: "10px" });
            $("#image-grid").append(images);
        };
        console.log("rendering");

        }




});

