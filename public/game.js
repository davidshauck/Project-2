$(document).ready(function() {

    let playerArray = [];
    let playerIdIndex = 0;
    let playerIds = [];
    let position = "";
    let userTeam = [];
    let playerId = "";
    let computerTeam = [];
    let computerPlayer = "";
    let localPosition = "";
    let pushComputer = false;
    let disable = true;
    let enable = false;
    let computerBudget = 250;
    let playerBudget = 250;
    let cname = "";
    let uname = "";

    // run all the necessary functions to get the game loaded
    renderUserTeam();
    renderComputerTeam();
    renderPositionDropdown();
    
    function start() {
    // when user clicks the position selector dropdown
    $(document.body).on("click", "div.position-list button", function(e) {
        // enable the player dropdown list
        $(".player-button").prop("disabled", enable);
    // $('div.position-list a').click(function(e){  
        e.preventDefault();
        position = "";
        playerArray = [];
        playerIdIndex = 0;
        playerIds = [];
        playerId = "";
        playerIdIndex = 0;
        position = $(this).attr("value");
        localPosition = $(this).attr("data-position");
        // console.log("local position " + localPosition);
        $(".drop-test").empty();
    
        gameBody();
    
    });
    };
    
    // main game play function
    function gameBody() {
        pushComputer = false;
        // reset playerIdIndex to 0
        playerIdIndex = 0;
        // call the function that creates the position dropdown
        renderPositionDropdown();
        // empty the player list dropdown div
        $( ".drop-test" ).empty();
        // console.log("position " + position);
        // callback function for getting player IDs from API
        getPlayerIds().then(getPlayerInfo).then(function(data) {
        // set random computer player for later use
        computerPlayer = playerArray[Math.floor(Math.random()*30)].PlayerID;
        console.log("COMPUTER PLAYER " + computerPlayer);
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
        $( ".player-dropdown" ).on("click", function() {
        // grab the player ID from the click
        playerId = ($(this).attr("data-id"));
        // callback function for grabbing the image
            populateUserTeam(function(data){
                // parse the data for use     
                data = JSON.parse(data);
                // push the necessary player info to the user's team array

  
                
                function isIncluded(element, index, array) {
                    console.log("ELEMENT UPPER")
                    console.log(element);
                    return (element.PlayerID === data.PlayerID);
                  }
                  
                  let compareUser = userTeam.findIndex(isIncluded);
                  let compareComputer = computerTeam.findIndex(isIncluded); 
                  console.log("COMPARE COMPUTER UPPER " + compareComputer);
                //   console.log("COMPARE " + compareUser);
                  if ((compareUser < 0) && (compareComputer < 0)) {
                    userTeam.push({PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, position: localPosition});
                    pushComputer = true;
                    console.log("PUSH UPPER " + pushComputer)
                  } else {
                      alert("already on team");
                  }
                  
                renderUserTeam();
                // start next selection             
                renderPositionDropdown();      
            });
            // callback function for populating the computer's team
            populateComputerTeam(function(data){
                // parse the data for use
                data = JSON.parse(data);

                function isIncludedB(element, index, array) {
                    console.log("ELEMENT LOWER")
                    console.log(element);
                    return (element.PlayerID === data.PlayerID);
                  }

                    let compareUserB = userTeam.findIndex(isIncludedB);
                  let compareComputerB = computerTeam.findIndex(isIncludedB); 
                  
                  console.log("USERTEAM" + compareUserB);
                  console.log("COMPUTER TEAM" + compareComputerB); 


                // **** NEED TO MAKE SURE IT ONLY PUSHES 1 QB, 2 RBS AND 2 WRS. IF PLAYERS ARE DELTED THIS BECOMES AN ISSUE ***
                if ((computerTeam.length < 6) && (compareUserB < 0) && (compareComputerB < 0) && (pushComputer)) {
                    console.log("PUSH LOWER2 " + pushComputer)
                    computerTeam.push({PlayerID: data.PlayerID, url: data.PhotoUrl, name: data.Name, position: data.Position});
                };
                // render the team image grid
                renderComputerTeam();
            });   

        }); // end of click function
    
        // empty the player array
        playerArray = [];
        
        }); // end of callback function
    
    } // end of gameBody() function
    
    start();
    
    // function for removing the players from the team
    $("#player-image-grid").on("click","#player-image", function(e) {
        e.preventDefault()
        // set a variable for the clicked image
        let imageSrc = ($(this).attr("src"));
        // console.log("src " + imageSrc);
        // loop through the user's team to find the corresponding player and splice it out
        for (let i = 0; i < userTeam.length; i++){ 
            if (userTeam[i].url === imageSrc) {
              userTeam.splice(i, 1); 
            }
         }

        // update the team grid
        renderPositionDropdown();
        renderUserTeam();
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
            // for (let i = 0; i < userTeam.length; i++){
            //     let includedId = userTeam[i].PlayerId; 
            //     for (let j = 0; j<playerArray.length; j++) {
            //         if (playerArray[i].PlayerID === includedId) {
            //         playerArray.splice(i, 1); 
            //         }
            //     }
            // }


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
        function populateUserTeam(cb){
    
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
            $(".player-button").prop("disabled", disable);
            playerIdIndex = 0;
            $(".drop-test").empty();
            // empty the div first
            $("#player-image-grid").empty();
            // loop through until we've hit 6
            for (let i = 0; i < ((6 - userTeam.length) + parseInt(userTeam.length)); i ++) {
                // console.log("user team length " + userTeam.length);
                let uimages = $("<img>");
                let uplayerBox = $("<div>");
                // images.css({ "max-width": "100%"});
                // uimages.addClass("images");
                uplayerBox.addClass("rounded float-left images");

                if (i >= userTeam.length) {
                    uimages.attr("src", "./images/150px.png");
                    uimages.css({ width: "128px", height: "177px"})
                    uname = "   ";
                } else {
                    uimages.attr("src", userTeam[i].url);
                    uimages.attr("id", "player-image");
                    // images.css({height: "100px"})
                    uname = userTeam[i].name;
                };
                // playerBox.attr({ width: "100%", margin: "50px" });
                let p = $("<p>").text(uname);
                $(uplayerBox).append(uimages);
                $(uplayerBox).append(p);
                // $(playerBox).css({"display": "inline-block"})
                // $("#computer-image-grid").attr({ padding: "20px"});
                $("#player-image-grid").append(uplayerBox);
                // $("#computer-image-grid").append(cname);
                playerIdIndex = 0;
                $(".drop-test").empty();
                start();
            };
           
            }
            // same deal for the computer
            function renderComputerTeam() {
                $("#computer-image-grid").empty();
                
                for (let i = 0; i < ((6 - computerTeam.length) + parseInt(computerTeam.length)); i ++) {
                    console.log("computer team length " + computerTeam.length);
                    let cimages = $("<img>");
                    let cplayerBox = $("<div>");
                    // cimages.addClass("images");
                    // cplayerBox.attr("id", "cimg"+i);
                    // images.css({ "max-width": "100%"});
                    $(cplayerBox).addClass("rounded float-right images");

                    if (i >= computerTeam.length) {
                        cimages.attr("src", "./images/150px.png");
                        cimages.css({ width: "128px", height: "177px"})
                        cname = "   ";
                    } else {
                        cimages.attr("src", computerTeam[i].url);
                        cimages.attr("id", "player-image");
                        // images.css({height: "100px"})
                        cname = computerTeam[i].name;
                    };
                    // playerBox.attr({ width: "100%", margin: "50px" });
                    let p = $("<p>").text(cname);
                    $(cplayerBox).append(cimages);
                    $(cplayerBox).append(p);
                    // $(playerBox).css({"display": "inline-block"})
                    // $("#computer-image-grid").attr({ padding: "20px"});
                    $("#computer-image-grid").append(cplayerBox);
                    // $("#computer-image-grid").append(cname);
                    playerIdIndex = 0;
                    $(".drop-test").empty();
                    start();
                };
                console.log("rendering computer");
        
                }
    // function for rendering the positions dropdown
    function renderPositionDropdown() {
        $(".position-list").empty();
        // console.log("**********************")
        // console.log(Object.values(userTeam));
        // console.log(userTeam);
        // console.log("**********************")

    
        let qbBtn = $("<button class='dropdown-item' data-position='QB' id='QB' value='QB'>");
        qbBtn.html("QB");
        qbBtn.css({"padding-top": "0px"})
        let rb1Btn = $("<button class='dropdown-item' data-position='RB1' id='RB1' value='RB'>");
        rb1Btn.html("RB1");
        let rb2Btn = $("<button class='dropdown-item' data-position='RB2' id='RB2' value='RB'>");
        rb2Btn.html("RB2");
        let wr1Btn = $("<button class='dropdown-item' data-position='WR1' id='WR1' value='WR'>");
        wr1Btn.html("WR1");
        let wr2Btn = $("<button class='dropdown-item' data-position='WR2' id='WR2' value='WR'>");
        wr2Btn.html("WR2");
        let kickBtn = $("<button class='dropdown-item' data-position='K' id='K' value='K'>");
        kickBtn.html("K");
        kickBtn.css({"padding-bottom": "5px", "border-bottom":"0px"})
        // loop to disable buttons
        for (let i = 0; i < userTeam.length; i++) {
            if (userTeam[i].position === "QB") {
                qbBtn.addClass("disabled");
                $("").data("toggle","");   
            }
            if (userTeam[i].position === "RB1") {
                rb1Btn.addClass("disabled");    
            }
            if (userTeam[i].position === "RB2") {
                rb2Btn.addClass("disabled");    
            }
            if (userTeam[i].position === "WR1") {
                wr1Btn.addClass("disabled");    
            }
            if (userTeam[i].position === "WR2") {
                wr2Btn.addClass("disabled");    
            }
            if (userTeam[i].position === "K") {
                kickBtn.addClass("disabled");    
            }
        }
    
        // for (let i = 0; i < userTeam.length; i++){ 
            
        //     if (userTeam[i].position === "RB") {
        //         rb1Btn.addClass("disabled"); 
        //     } else if (userTeam[i].position === "WR") {
        //         wr1Btn.addClass("disabled"); 
        //     } else if (userTeam[i].position === "K") {
        //         kickBtn.addClass("disabled"); 
        //     } 
        //  }
    
        $(".position-list").append(qbBtn).append(rb1Btn).append(rb2Btn).append(wr1Btn).append(wr2Btn).append(kickBtn);
        }
            
    
        // players.sort((a, b) => (a.PlayerID > b.PlayerID) ? 1 : -1);
        // console.log(players);
    
        // APIKEY="t3uiacex9b36"
    // let arr = ['Gavin', 'Richard', 'Erlich', 'Gilfoyle'];
    // console.log(arr.includes('Erlich'));




    // let playerBox = $("<div class='player-box'>");
    // let p = $("<p>").text("Name " + uname + " | Position | " + userTeam[i].position);
    // $(playerBox).addClass("rounded mx-auto d-block");
    // $(playerBox).append(images);
    // $(playerBox).append(p);
    // $(playerBox).css({"display": "inline-block"})
    
    
    });