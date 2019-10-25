
//==================== Todays Date =========================
var thisDay = new Date();
//====================== Get Request for Todays Games ============


var dd = thisDay.getDate();
var mm = thisDay.getMonth() + 1; //January is 0!
var yyyy = thisDay.getFullYear();
var day  = thisDay.getDay();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];
 
todaySchedule = dayNames[day] + ", " + monthNames[mm - 1] + " " + dd + ", " + yyyy
$("#datepicker").val(todaySchedule)

function myTime(time) {
  var hr = ~~(time / 3600);
  var min = ~~((time % 3600) / 60);
  var sec = time % 60;
  var sec_min = "";
  if (hr > 0) {
    sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
  }
  sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
  sec_min += "" + sec;
  return sec_min;
}


function schedule(today, gamebtn) {
  $("#schedule-holder").empty();

var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var day  = today.getDay();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];
 
todaySchedule = dayNames[day] + ", " + monthNames[mm - 1] + " " + dd + ", " + yyyy


if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = String(yyyy) + String(mm) + String(dd);
today = parseInt(today)



// today = currentDate

var gameUrl = "https://api.mysportsfeeds.com/v2.0/pull/nba/2019-2020-regular/date/" + today + "/games.json"


var api = config.MY_KEY;

$.ajax
  ({
    type: "GET",
    url: gameUrl,
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
    },

  })
  .then(function (games) {
    console.log(games)




        for (i = 0; i < games.games.length; i++) {

          var dateFromAPI = games.games[i].schedule.startTime;
          var localDate = new Date(dateFromAPI);
          var localDateString = localDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })

          var localTimeString = localDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })

          var hTeam = games.games[i].schedule.homeTeam.abbreviation;
          var aTeam = games.games[i].schedule.awayTeam.abbreviation;
          var hTeamID = games.games[i].schedule.homeTeam.id;
          var aTeamID = games.games[i].schedule.awayTeam.id;
          var aScore = games.games[i].score.awayScoreTotal;
          var hScore = games.games[i].score.homeScoreTotal;
          var status = games.games[i].schedule.playedStatus;
          var quarter = games.games[i].score.currentQuarter;
          var intermission = games.games[i].score.currentIntermission;
          var gameID = games.games[i].schedule.id;


          var timeRemaining = (myTime(games.games[i].score.currentQuarterSecondsRemaining));

          if (intermission > 0) {
            console.log(intermission)
          }

        if (timeRemaining == "0:00" && quarter == null) {
            timeRemaining = "Starting"
          } else if (timeRemaining == "0:00" && quarter == 1) {
            timeRemaining = "12:00" + " Q" + quarter;
          }else if (timeRemaining == "0:00" && quarter > 0) {
            timeRemaining = "End of"
          }
          else if (quarter > 0 && quarter < 4){
            timeRemaining = timeRemaining + " Q" + quarter;
          } else if (quarter > 4) {
            timeRemaining = timeRemaining + " OT" + quarter -4;

          }

          if (intermission == 2) {
            timeRemaining = "Halftime"
          } else if (intermission > 0 && intermission < 4) {
            timeRemaining = "End of Q" + intermission
          } else if (intermission >4) {
            timeRemaining = "End of OT" + intermission -4
          }
          


          if (status == "COMPLETED_PENDING_REVIEW" || status == "COMPLETED") {
            scoreStatus = "FINAL";
          } else if (status == "UNPLAYED") {
            scoreStatus = localTimeString;
          } else if (status == "LIVE") {
            scoreStatus = timeRemaining;
          }


          if (aScore == null) {
            aScore = "-";
            hScore = "-";
          }

         var aLogo = aTeam.toLowerCase();
         var hLogo = hTeam.toLowerCase();

          var htmlString = '<div class="col-4 col-lg-3 scoreCard px-lg-1 py-lg-1 px-0 py-0">';
          htmlString += '<div type="button" class="card btn toBoxcscore disabled justify-content-center p-1 rounded-0 text-dark m-1" id='+gameID+' >';
          htmlString += '<div class="m-1 m-lg-2">'
          htmlString += '<table class="table table-borderless table-sm w-85 m-0" id='+aTeam + hTeam+"table"+'  >';
          htmlString += '<thead class="table-borderless">';
          htmlString += '<tr>';
          htmlString += '<th class="table-borderless text-left scoreboard-header py-0 pr-0 pl-1" id='+aTeam + hTeam+"clock"+' style=" font-size: 11px;">' + scoreStatus + '</th>';
          htmlString += '<th class="table-borderless  scoreboard-header p-0" ></th>';
          htmlString += '<th class="table-borderless scoreboard-header text-right text-dark p-0" style=" font-size: 11px;" id='+'gs'+aTeam + hTeam+'></th>';
          htmlString += '</tr>';
          htmlString += '</thead>';
          htmlString += '<tbody>';
          htmlString += '<tr>';
          htmlString += '<th scope="row" class="table-borderless scoreboard align-middle text-left pt-0 pb-0 pb-lg-1 pr-0 pl-1" id='+aTeamID+"name"+' style="font-size: 13px;" ><img class="scoreLogo" src="images/logos/' + aLogo + '.png" height="24px" width="24px"></th>'
          htmlString += '<td hidden class="table-borderless p-0 align-middle teamRecord text-center" id="'+aTeam+'record" style=" font-size: 12px;"></td>';
          htmlString += '<td class="table-borderless text-right scoreboard align-middle pt-0 pb-0 pb-lg-1   pr-1 pl-0" id="'+aTeam+'score"  style=" font-size: 13px;"><strong>' + aScore + '</strong></td>';
          htmlString += '</tr>';
          htmlString += '<tr>';
          htmlString += '<th scope="row" class="align-middle text-left scoreboard pt-0 pb-0 pb-lg-1  pr-0 pl-1" id='+hTeamID+"name"+' style="font-size: 13px;"><img class="scoreLogo" src="images/logos/' + hLogo + '.png" height="24px" width="24px"></th>'
          htmlString += '<td hidden class="align-middle text-center p-0 teamRecord " id="'+hTeam+'record" style=" font-size: 12px;"></td>';
          htmlString += '<td class="  align-middle scoreboard  text-right  pt-0 pb-0 pb-lg-1  pr-1" id="'+hTeam+'score" style=" font-size: 13px;"><strong>' + hScore + '</strong></td>';
          htmlString += '</tr>';  
          htmlString += '</tbody>';      
          htmlString += '</table>';
          htmlString += '</div>';
          htmlString += '</div>';
          htmlString += '</div>';
          $("#schedule-holder").append(htmlString);     
          
          


          if (status == "LIVE") {
            $("#"+aTeam+"score").addClass("text-danger")
            $("#"+hTeam+"score").addClass("text-danger")
            $("#"+aTeam+hTeam+"clock").addClass("text-danger")
            $("#"+gameID).removeClass("disabled")

          } 
          if (scoreStatus == "FINAL") {
            $("#"+aTeam+hTeam+"table").addClass("rgba-stylish-light")
            $("#"+gameID).removeClass("disabled")

          }


        $("#yesterday").attr("disabled", false);
        $("#tomorrow").attr("disabled", false);
  }
  for (c = 0; c < games.references.teamReferences.length; c++) {
    $("#"+games.references.teamReferences[c].id+"name").append(" " +games.references.teamReferences[c].city)
  };
  
  $( ".toBoxcscore" ).click(function() {
    $(".toBoxcscore").hide()

    var gamebtn = $(this).attr('id')
    

    if ($("#"+gamebtn).attr("called") == "true") {
      $("#"+gamebtn+"boxscore").show()
    } else {
    boxScoreFunction(gamebtn)
    };
  });
  


})

// ///////////Boxscore/////////////////////////////////



};

schedule(thisDay);
// Navigation///////////////
// Arrow Buttons////////////
$("#yesterday").click(function() {
  $(this).attr("disabled", true);
  $(".boxscorebutton").hide()
  var dateChange = new Date($("#datepicker").val())
  dateChange.setDate(dateChange.getDate()-1)
  $("#datepicker").datepicker( "setDate", dateChange )
  console.log(dateChange)
  schedule(dateChange)
  
});
$("#tomorrow").click(function() {
  $(this).attr("disabled", true);
  $(".boxscorebutton").hide()
  var dateChange = new Date($("#datepicker").val())
  dateChange.setDate(dateChange.getDate()+1)
  $("#datepicker").datepicker( "setDate", dateChange )
  console.log(dateChange)

  schedule(dateChange)
});

// Datepicker Calendar///////////
$("#datepicker").datepicker({
  onSelect: function(date, inst) {
    var pickerDate = new Date(date);

    schedule(pickerDate)
},
  defaultDate: null,
  dateFormat: "DD, MM d, yy ",
  autoSize: true,
  altField: "#alternate",
  altFormat: "@",
  showAnim: "slideDown",
}, 
);


function boxScoreFunction(gamebtn) {

  var boxscoreURL = " https://api.mysportsfeeds.com/v2.1/pull/nba/current/games/"+gamebtn+"/boxscore.json"


  var api = config.MY_KEY;

$.ajax
  ({
    type: "GET",
    url: boxscoreURL,
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
    },

  })
  .then(function (boxscore) {
    console.log(boxscore)

    
    var awayTeamBoxScoreAbv = boxscore.game.awayTeam.abbreviation
    var homeTeamBoxScoreAbv = boxscore.game.homeTeam.abbreviation
    var awayTeamBoxScoreID = boxscore.game.awayTeam.id
    var homeTeamBoxScoreID = boxscore.game.homeTeam.id
    var boxScoreGameid = boxscore.game.id

    for (g = 0; g < boxscore.references.teamReferences.length; g++) {
      if (boxscore.references.teamReferences[g].id == awayTeamBoxScoreID) {
        var awayTeamFullName = boxscore.references.teamReferences[g].city + " " + boxscore.references.teamReferences[g].name
      }
      if (boxscore.references.teamReferences[g].id == homeTeamBoxScoreID) {
        var homeTeamFullName = boxscore.references.teamReferences[g].city + " " + boxscore.references.teamReferences[g].name
      }
    };


    var boxscoreString = '<div type="button" called="false" class="row m-0 p-0 container-fluid  boxscorebutton btn text-dark " id='+boxScoreGameid+"boxscore"+'>'
    boxscoreString += '<div class=" container-fluid p-0 d-flex" >';
    boxscoreString += '<div class="col-6 py-0 container-fluid px-1  " >';
    boxscoreString += '<div class="jumbotron  p-0 jumbotron-fluid"><div class="container p-0">'
    boxscoreString += '<h4 id="'+awayTeamBoxScoreID+'awayBoxscoreName" class="p-0" ><img  src="images/logos/' + awayTeamBoxScoreAbv + '.png" height="80px" width="80px">'+" " +awayTeamFullName+'</h4>'
    boxscoreString += '<p class="lead">Boxscore</p>';
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '<div class="col-6 container-fluid py-0 px-1">';
    boxscoreString += '<div class="jumbotron  p-0 jumbotron-fluid"><div class="container p-0">'
    boxscoreString += '<h4 id="'+homeTeamBoxScoreID+'awayBoxscoreName" ><img  src="images/logos/' + homeTeamBoxScoreAbv + '.png" height="80px" width="80px">' + " " + homeTeamFullName+'</h4>'
    boxscoreString += '<p class="lead">Boxscore</p>';
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '</div>'


    $("#boxscoreCard").append(boxscoreString)
    $("#"+boxScoreGameid+"boxscore").attr("called", "true")



    $(".boxscorebutton").click(function() {
      $(".boxscorebutton").hide()
      $(".toBoxcscore").show()
      console.log($("#"+boxScoreGameid+"boxscore").attr("called")
      )

    });
  
  

  });

}

