$(document).ready(function() {

let playerArray = [];
let playerIdIndex = 0;
let playerIds = [];
let position = "";
let userTeam = [];
let playerId = "";
let computerTeam = [];
let computerPlayer = "";
let computerBudget = 250;
let playerBudget = 250;

// run all the necessary functions to get the game loaded
renderUserTeam();
renderComputerTeam();
renderPositionDropdown();

function start() {
    $(".drop-test").empty();
// when user clicks the position selector dropdown
$('div.position-list a').click(function(e){  
    e.preventDefault();

    playerArray = [];
    playerIdIndex = 0;
    playerIds = [];
    playerId = "";
    playerIdIndex = 0;
    position = $(this).attr("value");
    $(".drop-test").empty();

    gameBody();

});
};

// main game play function
function gameBody() {

    renderPositionDropdown();

    $( ".drop-test" ).empty();
    console.log("position " + position);
    // callback function for getting player IDs from API
    getPlayerIds().then(getPlayerInfo).then(function(data) {
    // set random computer player for later use
    console.log("************");
    console.log(playerArray);
    console.log(computerPlayer);
    console.log("************");
    computerPlayer = playerArray[Math.floor(Math.random()*playerArray.length)].PlayerID;
    // create dynamic list of players for user to choose from
    let playerDropdown = $("<a>");
    // loop through 15 times to give user 15 options
    for (let i = 0; i < 15; i++) {
        playerDropdown.attr("<div>");
        playerDropdown.addClass("dropdown-item");
        playerDropdown.addClass("player-dropdown");
        playerDropdown.attr("data-id", playerArray[i].PlayerID);
        playerDropdown.attr("id", "dd"+i);
        playerDropdown.html(playerArray[i].Name + " | $" + playerArray[i].YahooSalary);
        playerDropdown.appendTo(".drop-test");
        
        // callback functionn for grabbing image from API
        getImage(function(data){
            // parse the data for use            
            data = JSON.parse(data);
            // prepend it to the div so image appears on the left
            $("<img src='" + data.PhotoUrl + "'>").prependTo("#dd"+i);
                
        });
    } // end of loop
            
    // click function for selecting a player
    $( ".player-dropdown" ).on( "click", function() {
    // grab the player ID from the click
    playerId = ($(this).attr("data-id"));
    // callback function for grabbing the image
        populateImageDiv(function(data){
            // parse the data for use     
            data = JSON.parse(data);
            // push the necessary player info to the user's team array
            userTeam.push({id: data.PlayerID, url: data.PhotoUrl, position: data.Position});
            // call the function that renders the images in the user grid
            renderUserTeam();
            $(".position-list").empty();
            // start             
            gameBody();       
        });
        // callback function for populating the computer's team
        populateComputerTeam(function(data){
            // parse the data for use
            data = JSON.parse(data);
            // push relevant info to the computer's team array
            computerTeam.push({id: data.PlayerID, url: data.PhotoUrl});
            // render the team image grid
            renderComputerTeam();
            //
            // start();
        });   
    }); // end of click function

    // empty the player array
    playerArray = [];
    
    }); // end of callback function

} // end of gameBody() function

start();

// function for removing the players from the team
$("#player-image-grid").on("click",".images", function(e) {
    e.preventDefault()
    // set a variable for the clicked image
    let imageSrc = ($(this).attr("src"));
    // loop through the user's team to find the corresponding player and splice it out
    for (let i = 0; i < userTeam.length; i++){ 
        if (userTeam[i].url === imageSrc) {
          userTeam.splice(i, 1); 
        }
     }
    console.log(userTeam);
    // update the team grid
    start();
});
    // function for calling on API that gets the player image
    function getImage(cb){
    // set the current player ID from the array we populated earlier    
    playerId = playerIds[playerIdIndex];
    // set the url being queried
    let playerUrl = "https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93";
    // increment the index so it grabs the next one
    playerIdIndex += 1;
    // set it to stop at the top 15
    if (playerIdIndex > 15) {
        playerIdIndex = 15;
    }    
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
    // function for grabbing the top 15 players and storing their player IDs in an array (got this from Stack Overflow)
    function getPlayerIds() {
        // let position = "QB";
        let week = "16";
        let queryUrl = "https://api.sportsdata.io/v3/nfl/stats/json/GameLeagueLeaders/2019REG/" + week +"/" + position + "/FantasyPoints?key=87259770c8654c4aa8d0dd12658e7d93";

        return $.ajax(queryUrl)
        .then(function(response) {

        return response;
        
      }).then(function(json) {
        // grab playerId from the returned data
        playerId = json[playerIdIndex].PlayerID;
        // put all the returned data into a local array
        playerArray = json;
        // loop through that array and push them to a new playerIds array
        for (let i = 0; i < 15; i++) {
            playerIds.push(playerArray[i].PlayerID)
        }
        // stop at the top 15
        if (playerIdIndex > 15) {
            playerIdIndex = 15;
        }

      })
    }
    // use the playerId to use in the ajax call to grab player info
    function getPlayerInfo() {
      return $.ajax("https://api.sportsdata.io/v3/nfl/scores/json/Player/"+playerId+"?key=87259770c8654c4aa8d0dd12658e7d93");
    }
    // part of the whole callback function
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
    // a repeat of the function but this time for the computer's team
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

    // function that renders the user's image grid
    function renderUserTeam() {
        // empty the div first
        $("#player-image-grid").empty();
        // loop through until we've hit 6
        for (let i = 0; i < ((6 - userTeam.length) + parseInt(userTeam.length)); i ++) {
            console.log("image urls length " + userTeam.length);
            let images = $("<img>");
            images.addClass("images");
            images.attr("id", "img"+i);
            images.attr("value", i)
            images.attr("data-position", i);
            // if the user's team has fewer than 6 players put a placeholder in
            if (i >= userTeam.length) {
                images.attr("src", "./images/150px.png");
            // if it has players in the array already grab the url from the array
            } else {
                images.attr("src", userTeam[i].url);
            }
            // add some attributes
            images.attr({ width: "33%", padding: "10px" });
            $("#player-image-grid").append(images);
            playerIdIndex = 0;
            $(".drop-test").empty();
            start();
        };
        console.log("rendering player");
       
        }
        // same deal for the computer
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
                playerIdIndex = 0;
                $(".drop-test").empty();
                start();
            };
            console.log("rendering computer");
    
            }
// function for rendering the positions dropdown
function renderPositionDropdown() {
    console.log(Object.values(userTeam));

    let qbBtn = $("<a class='dropdown-item' data-position='QB' id='QB' value='QB'>");
    qbBtn.html("QB");
    
    let rb1Btn = $("<a class='dropdown-item' data-position='RB' id='RB1' value='RB'>");
    rb1Btn.html("RB1");
    let rb2Btn = $("<a class='dropdown-item' data-position='RB' id='RB2' value='RB'>");
    rb2Btn.html("RB2");
    let wr1Btn = $("<a class='dropdown-item' data-position='WR' id='WR1' value='WR'>");
    wr1Btn.html("WR1");
    let wr2Btn = $("<a class='dropdown-item' data-position='WR' id='WR2' value='WR'>");
    wr2Btn.html("WR2");
    let kickBtn = $("<a class='dropdown-item' data-position='Kd' id='K' value='K'>");
    kickBtn.html("K");

    for (let i = 0; i < userTeam.length; i++){ 
        if (userTeam[i].position === "QB") {
            qbBtn.addClass("disabled");  
        } else if (userTeam[i].position === "RB") {
            rb1Btn.addClass("disabled"); 
        } else if (userTeam[i].position === "WR") {
            wr1Btn.addClass("disabled"); 
        } else if (userTeam[i].position === "K") {
            kickBtn.addClass("disabled"); 
        } 
     }

    $(".position-list").append(qbBtn).append(rb1Btn).append(rb2Btn).append(wr1Btn).append(wr2Btn).append(kickBtn);
    }
        

    // players.sort((a, b) => (a.PlayerID > b.PlayerID) ? 1 : -1);
    // console.log(players);

    // APIKEY="t3uiacex9b36"
// let arr = ['Gavin', 'Richard', 'Erlich', 'Gilfoyle'];
// console.log(arr.includes('Erlich'));


});
