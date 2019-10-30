
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


        if (timeRemaining == "0:00" && quarter == null) {
          timeRemaining = "12:00" + " Q1";
        } else if (timeRemaining == "0:00" && quarter == 1) {
            timeRemaining = "12:00" + " Q" + quarter;
          }else if (timeRemaining == "0:00" && quarter > 0) {
            timeRemaining = "End of"
          }
          else if (quarter > 0 && quarter <= 4){
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

          scoreStatus.toString()

          if (aScore == null) {
            aScore = "-";
            hScore = "-";
          }

         var aLogo = aTeam.toLowerCase();
         var hLogo = hTeam.toLowerCase();

          var htmlString = '<div class="col-4 col-lg-3 scoreCard px-lg-1 py-lg-1 px-0 py-0">';
          htmlString += '<div  class="card  toBoxcscore disabled justify-content-center p-0  rounded-0 text-dark m-1" time="'+scoreStatus+'" id='+gameID+' >';
          htmlString += '<div class="m-1 m-lg-2">'
          htmlString += '<table class="table table-borderless table-sm w-85 m-0 white innerTable" id='+aTeam + hTeam+"table"+'  >';
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
          
          teamRecords(aTeamID, hTeamID, gameID)




          if (status == "LIVE") {
            $("#"+aTeam+"score").addClass("text-danger")
            $("#"+hTeam+"score").addClass("text-danger")
            $("#"+aTeam+hTeam+"clock").addClass("text-danger")
            $("#"+gameID).removeClass("disabled")

          } 
          if (scoreStatus == "FINAL") {
            $("#"+aTeam+hTeam+"table").addClass("grey lighten-1")
            $("#"+aTeam+hTeam+"table").removeClass("white")
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
    var boxstatus = $(this).attr("time")

    console.log(boxstatus)

    if ($("#"+gamebtn).attr("called") == "true") {
      $("#"+gamebtn+"boxscore").show()
    } else {
    boxScoreFunction(gamebtn, boxstatus)
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
    $(".boxscorebutton").hide()

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


function boxScoreFunction(gamebtn, boxstatus) {

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
    var awayTotalScore = boxscore.scoring.awayScoreTotal;
    var homeScoreTotal = boxscore.scoring.homeScoreTotal;
    var ifLive = boxscore.game.playedStatus;
console.log(ifLive)
    var awayScores =[0,0,0,0];
    var homeScores = [0,0,0,0];

    var boxtimeRemaining = boxstatus;

    for (g = 0; g < boxscore.references.teamReferences.length; g++) {
      if (boxscore.references.teamReferences[g].id == awayTeamBoxScoreID) {
        var awayTeamFullName = boxscore.references.teamReferences[g].city + " " + boxscore.references.teamReferences[g].name
      }
      if (boxscore.references.teamReferences[g].id == homeTeamBoxScoreID) {
        var homeTeamFullName = boxscore.references.teamReferences[g].city + " " + boxscore.references.teamReferences[g].name
      }
    };

    for (x=0; x < boxscore.scoring.quarters.length; x++) {
        awayScores[x] = boxscore.scoring.quarters[x].awayScore
        homeScores[x] = boxscore.scoring.quarters[x].homeScore
    }




    var boxscoreString = '<div called="false" class=" container-fluid justify-content-center white boxscorebutton  text-dark " id='+boxScoreGameid+"boxscore"+'>'
    boxscoreString += '<div class=" row  white pb-0 pt-1 m-0 justify-content-center" >';
    boxscoreString += '<p class="boxtable pb-1 pt-0 m-0 text-danger" id='+boxScoreGameid+ "time"+'>'+boxtimeRemaining+'</p>'
    boxscoreString += '</div>'
    boxscoreString += '<div class=" row  white py-0 justify-content-center" >';
    boxscoreString += '<div class="col-2 col-lg-3 py-3 py-lg-1  text-left  px-1  " >';
    boxscoreString += '<h4 class="p-0 mobileHide px-1" >'+" " +awayTeamFullName+'<img  src="images/logos/' + awayTeamBoxScoreAbv.toLowerCase() + '.png" height="80px" width="80px"></h4>'
    boxscoreString += '<p  class="p-0 deskHide " style="font-size: 12px;">'+" " +awayTeamBoxScoreAbv+'<img  src="images/logos/' + awayTeamBoxScoreAbv.toLowerCase() + '.png" height="20px" width="20px"></p>'
    boxscoreString += '</div>'
    boxscoreString += '<div class="col-1 px-1 largeBoxScore font-weight-bold text-center pt-3">'+awayTotalScore+'</div>';
    boxscoreString += '<div class="col-6 col-lg-3 " >';
    boxscoreString += '<table class="table boxtable">';
    boxscoreString += '<thead>';
    boxscoreString += '<tr>';
    boxscoreString += '<th class="py-0 boxtable"></th>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">1</th>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">2</th>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">3</th>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">4</th>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">T</th>';
    boxscoreString += '</tr>';
    boxscoreString += '</thead>';
    boxscoreString += '<tbody>';
    boxscoreString += '<tr>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">'+awayTeamBoxScoreAbv+'</th>';
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+awayScores[0]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+awayScores[1]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+awayScores[2]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+awayScores[3]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center font-weight-bold boxtable">'+awayTotalScore+'</td>'
    boxscoreString += '</tr>';
    boxscoreString += '<tr>';
    boxscoreString += '<th class="py-0 px-1 text-center boxtable">'+homeTeamBoxScoreAbv+'</th>';
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+homeScores[0]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+homeScores[1]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+homeScores[2]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable">'+homeScores[3]+'</td>'
    boxscoreString += '<td class="py-0 px-1 text-center boxtable font-weight-bold">'+homeScoreTotal+'</td>'
    boxscoreString += '</tr>';
    boxscoreString += '</tbody>';
    boxscoreString += '</table>';
    boxscoreString += '</div>'

    boxscoreString += '<div class="col-1 largeBoxScore  text-center pt-3 font-weight-bold px-1">'+homeScoreTotal+'</div>';
    boxscoreString += '<div class="col-2 col-lg-3  text-right py-3 py-lg-1 px-1"><div>';
    boxscoreString += '<h4 class="p-0 mobileHide "><img  src="images/logos/' + homeTeamBoxScoreAbv.toLowerCase() + '.png" height="80px" width="80px">' + " " + homeTeamFullName+'</h4>'
    boxscoreString += '<p class="p-0 deskHide px-1" style="font-size: 12px;"><img  src="images/logos/' + homeTeamBoxScoreAbv.toLowerCase() + '.png" height="20px" width="20px">' + " " + homeTeamBoxScoreAbv+'</p>'
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '</div>'
    boxscoreString += '<div class=" row  white " >';
    boxscoreString += '</div>'




    $("#boxscoreCard").append(boxscoreString)
    $("#"+boxScoreGameid+"boxscore").attr("called", "true")



    $(".boxscorebutton").click(function() {
      $(".boxscorebutton").hide()
      $(".toBoxcscore").show()

    });
  
  

  });

}

function teamRecords(aTeamID, hTeamID, gameID) {

  var standingsURL = " https://api.mysportsfeeds.com/v2.1/pull/nba/current/standings.json"


  var api = config.MY_KEY;

$.ajax
  ({
    type: "GET",
    url: standingsURL,
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
    },

  })
  .then(function (teamStandings) {

    var awayWinPct = 0;
    var homeWinPct = 0;

    for (s = 0; s < teamStandings.teams.length; s++) {

      if (teamStandings.teams[s].team.id == aTeamID) {
          awayWinPct = teamStandings.teams[s].stats.standings.winPct
      } else if (teamStandings.teams[s].team.id == hTeamID) {
        homeWinPct = teamStandings.teams[s].stats.standings.winPct
    }
    }

    var combinedPCt = awayWinPct+homeWinPct;

    if (combinedPCt >= 1.3) {
      $("#"+gameID).addClass("cyan")
    } else if (combinedPCt < 1.3 && combinedPCt >= 1.1) {
      $("#"+gameID).addClass("green")
    }else if (combinedPCt < 1.1 && combinedPCt >= .9) {
      $("#"+gameID).addClass("yellow")
    }else if (combinedPCt < .9 && combinedPCt >= .7) {
      $("#"+gameID).addClass("orange")
    }else if (combinedPCt < .7 ) {
      $("#"+gameID).addClass("red")
    }


  });
}