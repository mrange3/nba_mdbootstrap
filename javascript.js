
//==================== Todays Date =========================
var thisDay = new Date();
//====================== Get Request for Todays Games ============


var dd = thisDay.getDate();
var mm = thisDay.getMonth() + 1; //January is 0!
var yyyy = thisDay.getFullYear();
var day = thisDay.getDay();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"];

todaySchedule =  monthNames[mm - 1] + " " + dd + ", " + yyyy
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
  $("#schedule-holder").hide();

  $("#schedule-holder").empty();

  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var day = today.getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

  todaySchedule =  monthNames[mm - 1] + " " + dd + ", " + yyyy


  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = String(yyyy) + String(mm) + String(dd);
  today = parseInt(today)

  var gameUrl ="https://data.nba.net/10s/prod/v2/"+today+"/scoreboard.json"



  $.ajax
    ({
      type: "GET",
      url: gameUrl,
      dataType: 'json',

    })
    .then(function (games) {

      console.log(games)

      if (games.games == null) {
        $("#schedule-holder").addClass("justify-content-center")
        $("#schedule-holder").html("<div class='justify-content-center ncaa border-top border-bottom border-dark text-center mt-5' style='font-size: 36px;'>No Games Scheduled</div>")
        console.log("no games")
      } else {
        $("#schedule-holder").removeClass("justify-content-center")

        for (i = 0; i < games.games.length; i++) {

          var hTeam = games.games[i].hTeam.triCode;
          var aTeam = games.games[i].vTeam.triCode;
          var hWins = Number(games.games[i].hTeam.win);
          var hLoss = Number(games.games[i].hTeam.loss);
          var aWins = Number(games.games[i].vTeam.win);
          var aLoss = Number(games.games[i].vTeam.loss);
          // var hTeamID = games.games[i].schedule.homeTeam.id;
          // var aTeamID = games.games[i].schedule.awayTeam.id;
          var aScore = games.games[i].vTeam.score
          var hScore = games.games[i].hTeam.score
          var status = "TBD"
          var quarter = 0
          // var intermission = games.games[i].score.currentIntermission;
          var gameID = games.games[i].gameId;
          var natBroadcast = games.games[i].watch.broadcast.broadcasters.national

          if (natBroadcast.length == 0) {
            natBroadcast = "";
          } else {
            natBroadcast = natBroadcast[0].shortName;
          }

          if (natBroadcast == "TNTOT") {
            natBroadcast = "TNT"
          }
          // var timeRemaining = (myTime(games.games[i].score.currentQuarterSecondsRemaining));


          // if (timeRemaining == "0:00" && quarter == null) {
          //   timeRemaining = "12:00" + " Q1";
          // } else if (timeRemaining == "0:00" && quarter == 1) {
          //   timeRemaining = "12:00" + " Q" + quarter;
          // } else if (timeRemaining == "0:00" && quarter > 0) {
          //   timeRemaining = "End of"
          // }
          // else if (quarter > 0 && quarter <= 4) {
          //   timeRemaining = timeRemaining + " Q" + quarter;
          // } else if (quarter > 4) {
          //   timeRemaining = timeRemaining + " OT" + quarter - 4;

          // }

          // if (intermission == 2) {
          //   timeRemaining = "Halftime"
          // } else if (intermission > 0 && intermission < 4) {
          //   timeRemaining = "End of Q" + intermission
          // } else if (intermission > 4) {
          //   timeRemaining = "End of OT" + intermission - 4
          // }



          if (status == "COMPLETED_PENDING_REVIEW" || status == "COMPLETED") {
            scoreStatus = "FINAL";
          } else if (status == "UNPLAYED") {
            scoreStatus = localTimeString;
          } else if (status == "TBD") {
            scoreStatus = games.games[i].startTimeEastern;
          }

          scoreStatus.toString()

          // if (aScore == null) {
          //   aScore = "-";
          //   hScore = "-";
          // }

          var aLogo = aTeam.toLowerCase();
          var hLogo = hTeam.toLowerCase();

          var htmlString = '<div  class="col-6 col-lg-4 scoreCard disabled toBoxcscore mt-0 pt-0 mb-1 mb-lg-2 px-0 px-lg-1 ">';
          htmlString += '<div   class="  toBoxcscore  justify-content-center py-0 rounded text-dark mx-0 px-1 my-0 dateFont border-1" style="background: rgba(255, 255, 255, .5);" time="' + scoreStatus + '" id=' + gameID + ' >';
          htmlString += '<table class="table table-borderless  table-sm w-85 my-0 py-0 px-2 mx-1  innerTable"  id="' + aTeam + hTeam + "table" + '"  >';
          htmlString += '<thead class="table-borderless p-0 m-0">';
          htmlString += '<tr>';
          htmlString += '<th class="table-borderless text-left scoreboard-header py-0 pr-0 pl-2 dateFont" id=' + aTeam + hTeam + "clock" + ' style=" font-size: 8px;">' + scoreStatus + '</th>';
          htmlString += '<th class="table-borderless  scoreboard-header p-0" ></th>';
          htmlString += '<th class="table-borderless scoreboard-header text-right py-0 pr-2 text-danger dateFont" style=" font-size: 11px;" id=' + 'gs' + aTeam + hTeam + '>'+natBroadcast+'</th>';
          htmlString += '</tr>';
          htmlString += '</thead>';
          htmlString += '<tbody>';
          htmlString += '<tr>';
          htmlString += '<th scope="row" class="table-borderless scoreboard align-middle text-left pt-0 pb-0 pb-lg-1 pr-0 pl-2 " id=' +  + "name" + ' style="font-size: 13px;" ><img class="scoreLogo" src="images/logos/' + aLogo + '.png" height="24px" width="24px">&nbsp;'+aTeam+'&nbsp;('+aWins+ '-' +aLoss+')</th>'
          htmlString += '<td class="table-borderless p-0 align-middle teamRecord text-center" style=" font-size: 14px;"></td>';
          htmlString += '<td class="table-borderless text-right scoreboard align-middle pt-0 pb-0 pb-lg-1   pr-2 pr-lg-3 pl-0" id="' + aTeam + 'score"  style=" font-size: 13px;"><strong>' + aScore + '</strong></td>';
          htmlString += '</tr>';
          htmlString += '<tr>';
          htmlString += '<th scope="row" class="align-middle text-left scoreboard pt-0 pb-0 pb-lg-1 dateFont pr-0 pl-2" id=' +  + "name" + ' style="font-size: 13px;"><img class="scoreLogo" src="images/logos/' + hLogo + '.png" height="24px" width="24px">&nbsp;'+hTeam+'&nbsp;('+hWins+'-'+hLoss+')</th>'
          htmlString += '<td class="align-middle text-center p-0 teamRecord "  style=" font-size: 14px;"></td>';
          htmlString += '<td class="  align-middle scoreboard  text-right  pt-0 pb-0 pb-lg-1 dateFont pr-2 pr-lg-3" id="' + hTeam + 'score" style=" font-size: 13px;"><strong>' + hScore + '</strong></td>';
          htmlString += '</tr>';
          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';
          htmlString += '</div>';

          var combinedPCt =  (hWins/(hLoss+hWins)) + aWins/(aLoss+aWins) ;
          $("#schedule-holder").append(htmlString);

          if (combinedPCt >= 1.2) {
            $("#" + gameID).addClass("border border-info")
          } else if (combinedPCt >= .95) {
            $("#" + gameID).addClass("border border-success")
          } else if (combinedPCt >= .85 ) {
            $("#" + gameID).addClass("border border-dark")
          } else if (combinedPCt >= .7) {
            $("#" + gameID).addClass("border border-warning")
          } else if (combinedPCt < .7) {
            $("#" + gameID).addClass("border border-danger")
          }
          
    // console.log(combinedPCt);
          // teamRecords(aTeamID, hTeamID, gameID)




          // if (status == "LIVE") {
          //   $("#" + aTeam + "score").addClass("text-danger")
          //   $("#" + hTeam + "score").addClass("text-danger")
          //   $("#" + aTeam + hTeam + "clock").addClass("text-danger")
          //   $(".toBoxcscore").removeClass("disabled")


          // }
          // if (scoreStatus == "FINAL") {
          //   $("#" + aTeam + hTeam + "table").addClass("grey lighten-1")
          //   $("#" + aTeam + hTeam + "table").removeClass("white")
          //   $(".toBoxcscore").removeClass("disabled")

          // }


          // $("#yesterday").attr("disabled", false);
          // $("#tomorrow").attr("disabled", false);
        }

          
        $(".toBoxcscore").click(function () {
          $(".toBoxcscore").hide()


          var gamebtn = $(this).attr('id')
          var boxstatus = $(this).attr("time")

          var awayboxrecord = $(this).attr("awayRecord")
          var homeboxrecord = $(this).attr("homeRecord")


          if ($("#" + gamebtn).attr("called") == "true") {
            $("#" + gamebtn + "boxscore")
          } else {
            boxScoreFunction(gamebtn, boxstatus, awayboxrecord, homeboxrecord, todaySchedule)
          };
        });



      }
    })

  // ///////////Boxscore/////////////////////////////////
  $("#schedule-holder");



};

schedule(thisDay);
// Navigation///////////////
// Arrow Buttons////////////
$("#yesterday").click(function () {
  $(this).attr("disabled", true);
  $(".boxscorebutton").hide()
  var dateChange = new Date($("#datepicker").val())
  dateChange.setDate(dateChange.getDate() - 1)
  $("#datepicker").datepicker("setDate", dateChange)
  schedule(dateChange)

});
$("#tomorrow").click(function () {
  $(this).attr("disabled", true);
  $(".boxscorebutton").hide()
  var dateChange = new Date($("#datepicker").val())
  dateChange.setDate(dateChange.getDate() + 1)
  $("#datepicker").datepicker("setDate", dateChange)

  schedule(dateChange)
});
datepicker
// Datepicker Calendar///////////

$("#dateButton").click(function () {
  $('#datepicker').focus()
})


$("#datepicker").datepicker({
  onSelect: function (date, inst) {
    $(".boxscorebutton").hide()

    var pickerDate = new Date(date);

    schedule(pickerDate)
  },
  defaultDate: null,
  dateFormat: "MM d, yy ",
  altField: "#alternate",
  altFormat: "@",
  showAnim: "slideDown",
},
);


// function boxScoreFunction(gamebtn, boxstatus, awayboxrecord, homeboxrecord, todaySchedule) {

//   var boxscoreURL = " https://api.mysportsfeeds.com/v2.1/pull/nba/current/games/" + gamebtn + "/boxscore.json"


//   var api = config.MY_KEY;

//   $.ajax
//     ({
//       type: "GET",
//       url: boxscoreURL,
//       dataType: 'json',
//       headers: {
//         "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
//       },

//     })
//     .then(function (boxscore) {
//       console.log(boxscore)


//       var awayTeamBoxScoreAbv = boxscore.game.awayTeam.abbreviation
//       var homeTeamBoxScoreAbv = boxscore.game.homeTeam.abbreviation
//       var awayTeamBoxScoreID = boxscore.game.awayTeam.id
//       var homeTeamBoxScoreID = boxscore.game.homeTeam.id
//       var boxScoreGameid = boxscore.game.id
//       var awayTotalScore = boxscore.scoring.awayScoreTotal;
//       var homeScoreTotal = boxscore.scoring.homeScoreTotal;
//       var venue = boxscore.game.venue.name
//       var venueCity = boxscore.references.venueReferences[0].city


//       var awayLogo = awayTeamBoxScoreAbv.toLowerCase();
//       var homeLogo = homeTeamBoxScoreAbv.toLowerCase();


//       if (awayTeamBoxScoreAbv == "OKL") {
//         awayTeamBoxScoreAbv = "OKC"
//       }
//       if (awayTeamBoxScoreAbv == "BRO") {
//         awayTeamBoxScoreAbv = "BKN"
//       }
//       if (homeTeamBoxScoreAbv == "OKL") {
//         homeTeamBoxScoreAbv = "OKC"
//       }
//       if (homeTeamBoxScoreAbv == "BRO") {
//         homeTeamBoxScoreAbv = "BKN"
//       }



//       var awayScores = [0, 0, 0, 0];
//       var homeScores = [0, 0, 0, 0];

//       var boxtimeRemaining = boxstatus;

//       for (g = 0; g < boxscore.references.teamReferences.length; g++) {
//         if (boxscore.references.teamReferences[g].id == awayTeamBoxScoreID) {
//           var awayTeamFullName = boxscore.references.teamReferences[g].city + " " + boxscore.references.teamReferences[g].name
//         }
//         if (boxscore.references.teamReferences[g].id == homeTeamBoxScoreID) {
//           var homeTeamFullName = boxscore.references.teamReferences[g].city + " " + boxscore.references.teamReferences[g].name
//         }
//       };

//       for (x = 0; x < boxscore.scoring.quarters.length; x++) {
//         awayScores[x] = boxscore.scoring.quarters[x].awayScore
//         homeScores[x] = boxscore.scoring.quarters[x].homeScore
//       }
//       // ///////Away Player Stats
//       var awayPlayerStatsArray = "";
//       for (s = 0; s < boxscore.stats.away.players.length; s++) {
//         var awayPlayerName = boxscore.stats.away.players[s].player.firstName + " " + boxscore.stats.away.players[s].player.lastName;
//         var awayPlayerPos = boxscore.stats.away.players[s].player.position;
//         var awayPlayerMin = Math.round((boxscore.stats.away.players[s].playerStats[0].miscellaneous.minSeconds) / 60);
//         var awayPlayerFG = boxscore.stats.away.players[s].playerStats[0].fieldGoals.fgMade + "-" + boxscore.stats.away.players[s].playerStats[0].fieldGoals.fgAtt;
//         var awayPlayer3PT = boxscore.stats.away.players[s].playerStats[0].fieldGoals.fg3PtMade + "-" + boxscore.stats.away.players[s].playerStats[0].fieldGoals.fg3PtAtt;
//         var awayPlayerFT = boxscore.stats.away.players[s].playerStats[0].freeThrows.ftMade + "-" + boxscore.stats.away.players[s].playerStats[0].freeThrows.ftAtt;
//         var awayPlayerOffReb = boxscore.stats.away.players[s].playerStats[0].rebounds.offReb
//         var awayPlayerDefReb = boxscore.stats.away.players[s].playerStats[0].rebounds.defReb
//         var awayPlayerReb = boxscore.stats.away.players[s].playerStats[0].rebounds.reb
//         var awayPlayerAst = boxscore.stats.away.players[s].playerStats[0].offense.ast
//         var awayPlayerStl = boxscore.stats.away.players[s].playerStats[0].defense.stl
//         var awayPlayerBlk = boxscore.stats.away.players[s].playerStats[0].defense.blk
//         var awayPlayerTO = boxscore.stats.away.players[s].playerStats[0].defense.tov
//         var awayPlayerFouls = boxscore.stats.away.players[s].playerStats[0].miscellaneous.fouls
//         var awayPlayerPM = boxscore.stats.away.players[s].playerStats[0].miscellaneous.plusMinus
//         var awayPlayerPts = boxscore.stats.away.players[s].playerStats[0].offense.pts


//         if (awayPlayerPM > 0) {
//           awayPlayerPM = "+" + awayPlayerPM;
//         }


//         var awayPlayerStatsString = '<tr class="align-middle p-0 m-0">';
//         awayPlayerStatsString += '<th class="p-0 text-left d-inline text-nowrap align-middle m-0 "><p class="p-0 m-0 align-middle d-inline ">' + awayPlayerName + '<p class="p-0 m-0  align-middle d-inline " style="color: grey; font-size:12px;">' + " - " + awayPlayerPos + '</p></th>';
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerMin + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerFG + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayer3PT + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerFT + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerReb + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerAst + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerStl + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerBlk + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerTO + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerFouls + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerPM + '</p></td>'
//         awayPlayerStatsString += '<td class="py-0 pr-0 pl-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + awayPlayerPts + '</p></td>'
//         awayPlayerStatsString += '</tr>';

//         awayPlayerStatsArray = awayPlayerStatsArray + awayPlayerStatsString;

//       }
//       // ///////////////////// Home Player Stats
//       var homePlayerStatsArray = "";
//       for (s = 0; s < boxscore.stats.home.players.length; s++) {
//         var homePlayerName = boxscore.stats.home.players[s].player.firstName + " " + boxscore.stats.home.players[s].player.lastName;
//         var homePlayerPos = boxscore.stats.home.players[s].player.position;
//         var homePlayerMin = Math.round((boxscore.stats.home.players[s].playerStats[0].miscellaneous.minSeconds) / 60);
//         var homePlayerFG = boxscore.stats.home.players[s].playerStats[0].fieldGoals.fgMade + "-" + boxscore.stats.home.players[s].playerStats[0].fieldGoals.fgAtt;
//         var homePlayer3PT = boxscore.stats.home.players[s].playerStats[0].fieldGoals.fg3PtMade + "-" + boxscore.stats.home.players[s].playerStats[0].fieldGoals.fg3PtAtt;
//         var homePlayerFT = boxscore.stats.home.players[s].playerStats[0].freeThrows.ftMade + "-" + boxscore.stats.home.players[s].playerStats[0].freeThrows.ftAtt;
//         var homePlayerOffReb = boxscore.stats.home.players[s].playerStats[0].rebounds.offReb
//         var homePlayerDefReb = boxscore.stats.home.players[s].playerStats[0].rebounds.defReb
//         var homePlayerReb = boxscore.stats.home.players[s].playerStats[0].rebounds.reb
//         var homePlayerAst = boxscore.stats.home.players[s].playerStats[0].offense.ast
//         var homePlayerStl = boxscore.stats.home.players[s].playerStats[0].defense.stl
//         var homePlayerBlk = boxscore.stats.home.players[s].playerStats[0].defense.blk
//         var homePlayerTO = boxscore.stats.home.players[s].playerStats[0].defense.tov
//         var homePlayerFouls = boxscore.stats.home.players[s].playerStats[0].miscellaneous.fouls
//         var homePlayerPM = boxscore.stats.home.players[s].playerStats[0].miscellaneous.plusMinus
//         var homePlayerPts = boxscore.stats.home.players[s].playerStats[0].offense.pts


//         if (homePlayerPM > 0) {
//           homePlayerPM = "+" + homePlayerPM;
//         }


//         var homePlayerStatsString = '<tr class="my-auto">';
//         homePlayerStatsString += '<th class="p-0 text-left d-inline text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle d-inline ">' + homePlayerName + '<p class="p-0 m-0  align-middle d-inline " style="color: grey; font-size:12px;">' + " - " + homePlayerPos + '</p></th>';
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerMin + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerFG + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayer3PT + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerFT + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerReb + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerAst + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerStl + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerBlk + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerTO + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerFouls + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerPM + '</p></td>'
//         homePlayerStatsString += '<td class="py-0 px-1 text-center text-nowrap align-middle m-0"><p class="p-0 m-0 align-middle">' + homePlayerPts + '</p></td>'
//         homePlayerStatsString += '</tr>';

//         homePlayerStatsArray = homePlayerStatsArray + homePlayerStatsString;

//       }
//       // //////////////


//       var boxscoreString = '<div called="false" class=" container-fluid justify-content-center white boxscorebutton border border-dark text-dark " id=' + boxScoreGameid + "boxscore" + '>'

//       boxscoreString += '<div class=" row  white pb-0 pt-1 m-0 justify-content-center" >';
//       boxscoreString += '<div class="col-5 px-0" >';
//       boxscoreString += '<p class="text-center mobileHide" style="font-size: 14px;">' + todaySchedule + '</p>'
//       boxscoreString += '</div>'
//       boxscoreString += '<div class="col-2 " >';
//       boxscoreString += '<p class="boxtable pb-1 pt-0 my-0 text-danger text-center " id=' + boxScoreGameid + "time" + '>' + boxtimeRemaining + '</p>'
//       boxscoreString += '</div>'
//       boxscoreString += '<div class="col-5 px-0" >';
//       boxscoreString += '<p class="text-center mobileHide" style="font-size: 14px;">' + venue + " - " + venueCity + '</p>'
//       boxscoreString += '</div>'
//       boxscoreString += '</div>'

//       boxscoreString += '<div class=" row  white py-0 my-0 justify-content-between px-3" >';


//       boxscoreString += '<div class=" col px-0   d-flex ">';
//       boxscoreString += '<div class="pt-3 m-0 mobileHide">'
//       boxscoreString += '<p class="py-0 m-0 font-weight-bold largeBoxScore">' + awayTeamFullName + '</p>'
//       boxscoreString += '<p class="py-0 m-0" id="' + awayTeamBoxScoreID + 'record">' + awayboxrecord + '</p>'
//       boxscoreString += '</div>'
//       boxscoreString += '<img class="pt-3  pr-1  boxlogos" src="images/logos/' + awayLogo + '.png" height="76px" width="76px">'
//       boxscoreString += '</div>'

//       boxscoreString += '<div class="col-1 mobileHide px-1 mx-0">'
//       boxscoreString += '<p class="pt-lg-4 pt-3 pb-0 m-0 pr-1 font-weight-bold bigScore text-right">' + awayTotalScore + '</p>'
//       boxscoreString += '</div>'


//       boxscoreString += '<div class="col-md-3 col-8 px-0 mx-0" >';
//       boxscoreString += '<table class="table boxtable">';
//       boxscoreString += '<thead>';
//       boxscoreString += '<tr>';
//       boxscoreString += '<th class="py-0 boxtable"></th>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">1</th>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">2</th>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">3</th>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">4</th>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">T</th>';
//       boxscoreString += '</tr>';
//       boxscoreString += '</thead>';
//       boxscoreString += '<tbody>';
//       boxscoreString += '<tr>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">' + awayTeamBoxScoreAbv + '</th>';
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + awayScores[0] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + awayScores[1] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + awayScores[2] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + awayScores[3] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center font-weight-bold boxtable">' + awayTotalScore + '</td>'
//       boxscoreString += '</tr>';
//       boxscoreString += '<tr>';
//       boxscoreString += '<th class="py-0 px-1 text-center boxtable">' + homeTeamBoxScoreAbv + '</th>';
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + homeScores[0] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + homeScores[1] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + homeScores[2] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable">' + homeScores[3] + '</td>'
//       boxscoreString += '<td class="py-0 px-1 text-center boxtable font-weight-bold">' + homeScoreTotal + '</td>'
//       boxscoreString += '</tr>';
//       boxscoreString += '</tbody>';
//       boxscoreString += '</table>';
//       boxscoreString += '</div>'
//       boxscoreString += '<div class="col-1 px-1 mx-0 mobileHide">'
//       boxscoreString += '<p class="pt-lg-4 pt-3 pb-0 m-0 pl-1 font-weight-bold bigScore text-left ">' + homeScoreTotal + '</p>'
//       boxscoreString += '</div>'

//       boxscoreString += '<div class="col  px-0 d-flex justify-content-right ">'
//       boxscoreString += '<img class="pt-3 pl-1 boxlogos" src="images/logos/' + homeLogo + '.png" height="76px" width="76px">'
//       boxscoreString += '<div class="pt-3 m-0 mobileHide justify-content-right ">'
//       boxscoreString += '<p class="py-0 m-0 largeBoxScore font-weight-bold text-right justify-content-right">' + homeTeamFullName + '</p>'
//       boxscoreString += '<p class="py-0 text-right" id="' + homeTeamBoxScoreID + 'record">' + homeboxrecord + '</p>'
//       boxscoreString += '</div>'
//       boxscoreString += '</div>'

//       boxscoreString += '</div>'



//       boxscoreString += '<div class=" row py-2 my-0 white justify-content-center" >';
//       boxscoreString += '<div class=" col-12 white table-responsive px-3">';
//       boxscoreString += '<p class="py-0 m-0 font-weight-bold "><img class="" src="images/logos/' + awayLogo + '.png" height="24px" width="24px">' + " " + awayTeamFullName + " | Away" + '</p>';
//       boxscoreString += '<table class="table table-responsive-sm table-borderless table-sm  playerStatsBox table-hover table-striped" >';
//       boxscoreString += '<thead >';
//       boxscoreString += '<tr >';
//       boxscoreString += '<th class="py-0 playerBoxHeader" ></th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">MIN</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">FG</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">3PT</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">FT</th>';
//       // boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">OREB</th>';
//       // boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">DREB</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">REB</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">AST</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">STL</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">BLK</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">TO</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">PF</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">+/-</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">PTS</th>';
//       boxscoreString += '</tr>';
//       boxscoreString += '</thead>';
//       boxscoreString += '<tbody id="' + boxScoreGameid + 'awayPlayerStats">';
//       boxscoreString += awayPlayerStatsArray

//       boxscoreString += '</tbody>';
//       boxscoreString += '</table>';
//       boxscoreString += '</div>'
//       boxscoreString += '</div>'

//       boxscoreString += '<div class=" row py-2 my-0 white justify-content-center" >';
//       boxscoreString += '<div class=" col-12 white table-responsive px-3">';
//       boxscoreString += '<p class="py-0 m-0 font-weight-bold "><img class="" src="images/logos/' + homeLogo + '.png" height="24px" width="24px">' + " " + homeTeamFullName + " | Home" + '</p>';
//       boxscoreString += '<table class="table table-sm table-borderless playerStatsBox table-hover table-striped" >';
//       boxscoreString += '<thead >';
//       boxscoreString += '<tr >';
//       boxscoreString += '<th class="py-0 " ></th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">MIN</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">FG</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">3PT</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">FT</th>';
//       // boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">OREB</th>';
//       // boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">DREB</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">REB</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">AST</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">STL</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">BLK</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">TO</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">PF</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">+/-</th>';
//       boxscoreString += '<th class="py-0 pr-1 text-center playerBoxHeader">PTS</th>';
//       boxscoreString += '</tr>';
//       boxscoreString += '</thead>';
//       boxscoreString += '<tbody id="' + boxScoreGameid + 'homePlayerStats">';
//       boxscoreString += homePlayerStatsArray

//       boxscoreString += '</tbody>';
//       boxscoreString += '</table>';
//       boxscoreString += '</div>'
//       boxscoreString += '</div>'



//       boxscoreString += '</div>'



//       $("#boxscoreCard").hide()

//       $("#boxscoreCard").append(boxscoreString)
//       $("#" + boxScoreGameid + "boxscore").attr("called", "true")
//       $("#boxscoreCard").fadeIn(500)



//       $(".boxscorebutton").click(function () {
//         $(".boxscorebutton").hide()
//         $(".toBoxcscore").fadeIn(500)

//       });



//     });

// }

// function teamRecords(aTeamID, hTeamID, gameID) {

//   var standingsURL = " https://api.mysportsfeeds.com/v2.1/pull/nba/current/standings.json"


//   var api = config.MY_KEY;

//   $.ajax
//     ({
//       type: "GET",
//       url: standingsURL,
//       dataType: 'json',
//       headers: {
//         "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
//       },

//     })
//     .then(function (teamStandings) {


//       var awayWinPct = 0;
//       var homeWinPct = 0;
//       var awayWins = 0;
//       var homeWins = 0;
//       var awayLosses = 0;
//       var homeLosses = 0;




//       for (s = 0; s < teamStandings.teams.length; s++) {

//         if (teamStandings.teams[s].team.id == aTeamID) {
//           awayWinPct = teamStandings.teams[s].stats.standings.winPct
//           awayWins = teamStandings.teams[s].stats.standings.wins
//           awayLosses = teamStandings.teams[s].stats.standings.losses



//         } else if (teamStandings.teams[s].team.id == hTeamID) {
//           homeWinPct = teamStandings.teams[s].stats.standings.winPct
//           homeWins = teamStandings.teams[s].stats.standings.wins
//           homeLosses = teamStandings.teams[s].stats.standings.losses

//         }
//       }

//       var awayRecord = " (" + awayWins + "-" + awayLosses + ")"
//       var homeRecord = " (" + homeWins + "-" + homeLosses + ")"


//       $("#" + gameID).attr("homeRecord", homeRecord)
//       $("#" + gameID).attr("awayRecord", awayRecord)

//       $("#" + aTeamID + "name").append(awayRecord)
//       $("#" + hTeamID + "name").append(homeRecord)



      // var combinedPCt = awayWinPct + homeWinPct;

      // if (combinedPCt >= 1.2 && awayWinPct > .6 && homeWinPct > .6) {
      //   $("#" + gameID).addClass("cyan")
      // } else if (combinedPCt >= .95 && awayWinPct > .4 && homeWinPct > .4) {
      //   $("#" + gameID).addClass("green")
      // } else if (combinedPCt >= .85 && awayWinPct > .25 && homeWinPct > .25) {
      //   $("#" + gameID).addClass("yellow")
      // } else if (combinedPCt >= .7) {
      //   $("#" + gameID).addClass("orange")
      // } else if (combinedPCt < .7) {
      //   $("#" + gameID).addClass("red")
      // }


//     });
// }
// /////////////// click stats

// $("#westernConference").click(function () {
//   if ($("#westernConference").attr("status") == "unclicked") {
//     $(".westernStats").fadeIn(1000)
//     $(".easternStats").hide();
//     $(".clickHide2").fadeIn(1000)
//     $(".clickHide").hide()

//     if ($("#easternConference").attr("status") == "clicked") {
//       $(".easternStats").hide();
//       $("#easternConference").parent().parent().removeClass("col-10")
//       $("#easternConference").parent().parent().addClass("col-2")
//       $("#easternConference").attr("status", "unclicked")

//     }

//     $(".boxscorebutton").hide();
//     $(".toBoxcscore").hide();
//     $("#schedule-holder").parent().hide();
//     $("#westernConference").parent().parent().removeClass("col-2")
//     $("#westernConference").parent().parent().addClass("col-10")
//     $("#westernConference").attr("status", "clicked")

//   } else if ($("#westernConference").attr("status") == "clicked") {
//     $(".westernStats").hide();
//     // $(".easternStats").hide();

//     $("#westernConference").parent().parent().removeClass("col-10")
//     $("#westernConference").parent().parent().addClass("col-2")

//     $(".clickHide").fadeIn(100)
//     $("#schedule-holder").parent().fadeIn(1000);
//     $(".toBoxcscore").fadeIn(100);

//     $("#westernConference").attr("status", "unclicked")

//   }
// })

// $("#easternConference").click(function () {

//   if ($("#easternConference").attr("status") == "unclicked") {
//     $(".westernStats").hide();
//     $(".easternStats").fadeIn(1000);
//     $(".clickHide").fadeIn(1000)

//     $(".clickHide2").hide()

//     if ($("#westernConference").attr("status") == "clicked") {
//       $(".westernStats").hide();

//       $("#westernConference").parent().parent().removeClass("col-10")
//       $("#westernConference").parent().parent().addClass("col-2")
//       $("#wasternConference").attr("status", "unclicked")

//     }

//     $(".boxscorebutton").hide();
//     $(".toBoxcscore").hide();
//     $("#schedule-holder").parent().hide();
//     $("#easternConference").parent().parent().removeClass("col-2")
//     $("#easternConference").parent().parent().addClass("col-10")
//     $("#easternConference").attr("status", "clicked")

//   } else if ($("#easternConference").attr("status") == "clicked") {
//     // $(".westernStats").hide();
//     $(".easternStats").hide();

//     $("#easternConference").parent().parent().removeClass("col-10")
//     $("#easternConference").parent().parent().addClass("col-2")

//     $(".clickHide2").fadeIn(1000)
//     $("#schedule-holder").parent().fadeIn(1000);
//     $(".toBoxcscore").fadeIn(1000)

//     $("#easternConference").attr("status", "unclicked")


//   }
// })