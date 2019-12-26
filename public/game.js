$(document).ready(function() {

    // APIKEY="t3uiacex9b36"

let playerArray = [];
let playerIdIndex = 0;
let playerIds = [];
let position = "";
let splicePosition = 0;
let imageUrls = [];
let playerId = "";
let computerTeam = [];
let computerPlayer = "";
let computerBudget = 250;
let playerBudget = 250;

renderUserTeam();
renderComputerTeam();

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
    
    // players.sort((a, b) => (a.PlayerID > b.PlayerID) ? 1 : -1);
    // console.log(players);


        getPlayerIds().then(getPlayerInfo).then(function(data) {
            computerPlayer = playerArray[Math.floor(Math.random()*playerArray.length)].PlayerID;


            let playerDropdown = $("<a>");

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
                    console.log("*************");
                    console.log(data);
                    console.log("**************");


                    $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
             
                });
            }
            $( ".player-dropdown" ).on( "click", function() {
                playerId = ($(this).attr("data-id"));
                
                populateImageDiv(function(data){

                    
                    data = JSON.parse(data);

   
                    imageUrls.push({id: data.PlayerID, url: data.PhotoUrl});
                    // computerTeam.push({id: data.PlayerID, url: data.PhotoUrl});


                    renderUserTeam();
                    // renderComputerTeam();
 
                    console.log(imageUrls);
        
                });
                populateComputerTeam(function(data){

                    
                    data = JSON.parse(data);

   
                    computerTeam.push({id: data.PlayerID, url: data.PhotoUrl});
                    // computerTeam.push({id: data.PlayerID, url: data.PhotoUrl});


                    // renderUserTeam();
                    renderComputerTeam();
 
                    console.log(computerTeam);
        
                });
        
        });
            playerArray = [];
        });



           // removes images
    $("#player-image-grid").on("click",".images", function(e) {
        e.preventDefault()
        // imagePosition+=1;
        splicePosition = $(this).attr("data-position");
        let imageSrc = ($(this).attr("src"));
        console.log("###############")
        console.log(imageSrc);
        console.log("###############")

    // console.log("splice " + splicePosition);

    for( let i = 0; i < imageUrls.length; i++){ 
        if ( imageUrls[i].url === imageSrc) {
          imageUrls.splice(i, 1); 
        }
     }
    // let imageUrls2 = imageUrls.url.filter(a => a !== imageSrc); 
    // imageUrls = imageUrls2;


    console.log(imageUrls);

    renderUserTeam();




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
      return $.ajax("https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93");
    }
    
    
    // getPlayerIds().then(getPlayerInfo).then(function(data) {
    //   // data from the weather(userLocation).json file is available here
    // });


    function populateImageDiv(cb){

        console.log("playerId" + playerId);
        // console.log(playerId);
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
    };

    function populateComputerTeam(cb){

        console.log("playerId" + computerPlayer);
        // console.log(playerId);
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
    }



    function renderUserTeam() {
        $("#player-image-grid").empty();

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
                images.attr("src", imageUrls[i].url);
            }
            images.attr({ width: "33%", padding: "10px" });
            $("#player-image-grid").append(images);
        };
        console.log("rendering player");

        }

        function renderComputerTeam() {
            $("#computer-image-grid").empty();
    
            for (let i = 0; i < ((6 - computerTeam.length) + parseInt(computerTeam.length)); i ++) {
                console.log("computer team length " + computerTeam.length);
                let images = $("<img>");
                images.addClass("images");
                images.attr("id-comp", "img"+i);
                images.attr("value", i)
                images.attr("data-position", i);
                if (i >= computerTeam.length) {
                    images.attr("src", "./images/150px.png");
                } else {
                    images.attr("src", computerTeam[i].url);
                }
                images.attr({ width: "33%", padding: "10px" });
                $("#computer-image-grid").append(images);
            };
            console.log("rendering computer");
    
            }

            // function computerPick() {
            //     populateImageDiv(function(data){
                    
            //         data = JSON.parse(data);

            //         let computerPlayer = playerArray[Math.floor(Math.random()*playerArray.length)]

   
            //         computerTeam.push({id: data.PlayerID, url: data.PhotoUrl});

            //         renderComputerTeam();
 
            //         console.log(imageUrls);




        
            //     });

            // }

        




});

