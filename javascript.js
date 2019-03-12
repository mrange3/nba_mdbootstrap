
//==================== Todays Date =========================
console.log("hello")
var today = new Date();

function schedule(today) {
  $("#schedule-holder").empty();

//====================== Get Request for Todays Games ============
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

$("#date").text(todaySchedule);      // Append the new elements 


if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}


today = yyyy + mm + dd;
today = parseInt(today) 



var gameUrl = "https://api.mysportsfeeds.com/v2.0/pull/nba/current/date/" + today + "/games.json"
var teamsUrl = "https://api.mysportsfeeds.com/v2.0/pull/nba/current/team_stats_totals.json"


var api = config.MY_KEY;

$.ajax
  ({
    type: "GET",
    url: teamsUrl,
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
    },

  })
  .then(function (teamStats) {
    console.log(teamStats)



    $.ajax
      ({
        type: "GET",
        url: gameUrl,
        dataType: 'json',
        headers: {
          "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
        },

      })
      .then(function (response) {
        console.log(response);



        for (i = 0; i < response.games.length; i++) {

          var dateFromAPI = response.games[i].schedule.startTime;
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

          var hTeam = response.games[i].schedule.homeTeam.abbreviation;
          var aTeam = response.games[i].schedule.awayTeam.abbreviation;
          var aScore = response.games[i].score.awayScoreTotal;
          var hScore = response.games[i].score.homeScoreTotal;
          var status = response.games[i].schedule.playedStatus;
          var quarter = response.games[i].score.currentQuarter;
          var intermission = response.games[i].score.currentIntermission;


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
          var timeRemaining = (myTime(response.games[i].score.currentQuarterSecondsRemaining));

          if (quarter == null || intermission > 0) {
            quarter = intermission
          }

        if (timeRemaining == "0:00") {
            timeRemaining = "End of"
          } else {
            timeRemaining = timeRemaining + " Q" + quarter;
          }


          if (status == "COMPLETED_PENDING_REVIEW" || status == "COMPLETED") {
            scoreStatus = "FINAL";
          } else if (status == "UNPLAYED") {
            scoreStatus = localTimeString;
          } else if (status == "LIVE") {
            scoreStatus = timeRemaining;
          }


          if (aScore == null) {
            aScore = 0;
            hScore = 0;
          }

          var aDisplayName = aTeam
          var hDisplayName = hTeam

          if (aTeam == "BRO") {
            aDisplayName = "BKN";
          } ;
          if (aTeam == "OKL") {
            aDisplayName = "OKC";
          };

          if (hTeam == "BRO") {
            hDisplayName = "BKN";
          } ;
          if (hTeam == "OKL") {
            hDisplayName = "OKC";
          };

         var aLogo = aTeam.toLowerCase();
         var hLogo = hTeam.toLowerCase();

          var htmlString = '<div class="col-4 scoreCard px-1">';
          htmlString += '<div class="card justify-content-center text-dark  rounded m-1" " id='+aTeam + hTeam+'>';
          htmlString += '<div class="m-1">'
          htmlString += '<table class="table rounded table-borderless table-sm w-85 m-0" style="background-color: rgba(245, 245, 245, .7) !important;" >';
          htmlString += '<thead class="table-borderless">';
          htmlString += '<tr>';
          htmlString += '<th class="table-borderless scoreboard-header pt-0" style=" font-size: 11px;">' + scoreStatus + '</th>';
          htmlString += '<th class="table-borderless scoreboard-header "></th>';
          htmlString += '<th class="table-borderless scoreboard-header "></th>';
          htmlString += '</tr>';
          htmlString += '</thead>';
          htmlString += '<tbody>';
          htmlString += '<tr>';
          htmlString += '<th scope="row" class="table-borderless scoreboard align-middle text-left  pt-0 " style="font-size: 12px;" ><img class="scoreLogo" src="images/logos/' + aLogo + '.png" height="25px" width="25px">' + " " + aDisplayName + '</th>'
          htmlString += '<td class="table-borderless scoreboard align-middle teamRecord text-left text-muted  pt-0 pl-0" id="'+aTeam+'record" style=" font-size: 10px;"> </td>';
          htmlString += '<td class="table-borderless  scoreboard align-middle pt-0 text-right pl-0" style=" font-size: 14px;"><strong>' + aScore + '</strong></td>';
          htmlString += '</tr>';
          htmlString += '<tr>';
          htmlString += '<th scope="row" class="align-middle text-left scoreboard pt-0 " style="font-size: 12px;"><img class="scoreLogo" src="images/logos/' + hLogo + '.png" height="25px" width="25px">' + " " + hDisplayName + '</th>'
          htmlString += '<td class="align-middle text-left text-muted teamRecord scoreboard pt-0 pl-0" id="'+hTeam+'record" style=" font-size: 10px;"> </td>';
          htmlString += '<td class="  align-middle scoreboard pt-0 text-right pl-0" style=" font-size: 14px;"><strong>' + hScore + '</strong></td>';
          htmlString += '</tr>';  
          htmlString += '</tbody>';      
          htmlString += '</table>';
          htmlString += '</div>';
          htmlString += '</div>';
          htmlString += '</div>';
          $("#schedule-holder").append(htmlString);      // Append the new elements 


          if (status == "LIVE" || status == "COMPLETED_PENDING_REVIEW" || status == "COMPLETED" ) {
            $(".scoreboard-header").addClass("text-danger");
          };
  

          for (j = 0; j < teamStats.teamStatsTotals.length; j++) {



            if (teamStats.teamStatsTotals[j].team.abbreviation == aTeam) {
              var aTeamStats = teamStats.teamStatsTotals[j];
              var aTeamWinPct = teamStats.teamStatsTotals[j].stats.standings.winPct;
              $("#"+aTeam+"record").text(teamStats.teamStatsTotals[j].stats.standings.wins + "-"+teamStats.teamStatsTotals[j].stats.standings.losses);  
              // if (teamStats.teamStatsTotals[j].stats.standings.winPct > .5) {
              //   $("#"+aTeam+hTeam).addClass("border-success")
              // }   // Append the new elements 
            }
            if (teamStats.teamStatsTotals[j].team.abbreviation == hTeam) {
              var hTeamStats = teamStats.teamStatsTotals[j]
              var hTeamWinPct = teamStats.teamStatsTotals[j].stats.standings.winPct;
              $("#"+hTeam+"record").text(teamStats.teamStatsTotals[j].stats.standings.wins + "-"+teamStats.teamStatsTotals[j].stats.standings.losses);      // Append the new elements 
            }
          }

          if (aTeamWinPct > .615 && hTeamWinPct > .615) {
            $("#"+aTeam+hTeam).addClass("rgba-cyan-light");     
          } else if (aTeamWinPct > .525 && hTeamWinPct > .525 || aTeamWinPct + hTeamWinPct > 1.15) {
            $("#"+aTeam+hTeam).addClass("rgba-green-light");      
          }  else if (aTeamWinPct > .425 && hTeamWinPct > .425 || aTeamWinPct + hTeamWinPct > .95) {
            $("#"+aTeam+hTeam).addClass("rgba-yellow-light");      
          } else if (aTeamWinPct > .3 && hTeamWinPct > .3 || aTeamWinPct + hTeamWinPct > .7) {
            $("#"+aTeam+hTeam).addClass(" rgba-orange-light");      
          }else {
            $("#"+aTeam+hTeam).addClass("rgba-red-light");      
          }

        };
        $("#yesterday").attr("disabled", false);
        $("#tomorrow").attr("disabled", false);
      });
  });
  // setTimeout($("#yesterday").removeAttr("disabled"), 2000);
  // setTimeout($("#tomorrow").removeAttr("disabled"), 2000);
}

schedule(today);

$("#yesterday").click(function() {
  $(this).attr("disabled", true);
  today.setDate(today.getDate() - 1);
  schedule(today);
});
$("#tomorrow").click(function() {
  $(this).attr("disabled", true);
  today.setDate(today.getDate() + 1);
  schedule(today);
});