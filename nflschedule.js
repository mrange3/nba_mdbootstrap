var nflGames = " https://api.mysportsfeeds.com/v2.1/pull/nfl/upcoming/games.json"
var nflTeams = " https://api.mysportsfeeds.com/v2.1/pull/nfl/upcoming/standings.json"

var api = config.MY_KEY;


var scheduledWeek = 1


for (i = 1; i < 18; i++) {
  var htmlweek = '<a id="' + i + '" class="dropdown-item weekselect bg-dark text-white" href="#">Week ' + i + '</a>'
  $("#weekdropdown").append(htmlweek);

}

var gameLinesArray = '';


// /////////////// Add Team Information//////////////////////////////////////
function addTeamNames() {
  $.ajax
    ({
      type: "GET",
      url: nflTeams,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
      },

    })
    .then(function (nflStandings) {
      console.log(nflStandings)

      for (j = 0; j < nflStandings.teams.length; j++) {
        var teamLocation = nflStandings.teams[j].team.city;
        var teamName = nflStandings.teams[j].team.name;
        var teamid = nflStandings.teams[j].team.id;
        var teamRecord = "(" + nflStandings.teams[j].stats.standings.wins + "-" + nflStandings.teams[j].stats.standings.losses + ")"
        var fullTeamName = teamLocation + " " + teamName + " " + teamRecord;
        $("#" + teamid).append(fullTeamName);
      }



    });
};

// /////////////Add Betting Odds//////////////////////////////////////////////////////


//////////Generate NFL Schedue////////////////////////////////////////////////////////////////////
function nflSchedule(scheduledWeek) {
  $("#nfl-schedule-holder").empty();
  $("#nflweek").empty();

  if (scheduledWeek < 1) {
    scheduledWeek = 1;
  }

  $.ajax
    ({
      type: "GET",
      url: nflGames,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
      },

    })
    .then(function (nflSchedule) {
      console.log(nflSchedule)


      for (i = 0; i < nflSchedule.games.length; i++) {
        var x = scheduledWeek;
        if (nflSchedule.games[i].schedule.week == x) {
          var aTeam = nflSchedule.games[i].schedule.awayTeam.abbreviation;
          var hTeam = nflSchedule.games[i].schedule.homeTeam.abbreviation;
          var hid = nflSchedule.games[i].schedule.homeTeam.id
          var aid = nflSchedule.games[i].schedule.awayTeam.id
          var startTime = new Date(nflSchedule.games[i].schedule.startTime);
          var venue = nflSchedule.games[i].schedule.venue.name;
          var gameID = nflSchedule.games[i].schedule.id


          var dd = startTime.getDate();
          var mm = startTime.getMonth() + 1; //January is 0!
          var yyyy = startTime.getFullYear();
          var day = startTime.getDay();
          var hour = startTime.getHours();
          var sun
          if (hour > 12) {
            hour = hour - 12;
            sun = "PM"
          } else {
            sun = "AM"
          }

          var min = startTime.getMinutes();
          if (min.toString().length == 1) {
            min = min + '0'
          }

          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"];

          todaySchedule = hour + ":" + min + " " + sun + " " + dayNames[day] + ", " + monthNames[mm - 1] + " " + dd;


          var htmlString = '<div class="accordion col-12 mx-0 px-0 mt-2" id="accordionExample">';
          htmlString += '<div class="card">';
          htmlString += '<button class="btn btn-link p-0 my-0" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">';
          htmlString += '<table class="table mx-1 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';
          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-3 text-left pl-3 py-1 font-weight-bold" id="' + aid + '" style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> </td>';
          htmlString += '<td class="col text-center px-0 py-1 font-weight-bold" id="'+ gameID +'awayMoneyLine" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col border text-center px-0 py-1 font-weight-bold text-light bg-dark" id="' + aid + "score" + '" style=" font-size: 12px;">0 </td>';
          htmlString += '<td class="col-3 py-1 px-2 font-weight-bold text-left" id="' + hid + '" style=" font-size: 12px;">@ <img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> </td>';
          htmlString += '<td class="col text-center px-0 py-1 font-weight-bold" id="'+ gameID +'homeMoneyLine" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col border text-center px-0  py-1 font-weight-bold text-light bg-dark" id="' + hid + "score" + '" style=" font-size: 12px;"> 0</td>';
          htmlString += '<td class="col-3  text-right py-1 font-weight-bold" id="' + todaySchedule + 'record" style=" font-size: 12px;">' + todaySchedule + ' </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 12px;">' + 100 + ' </td>';
          htmlString += '</tr>';
          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</button>';
          htmlString += '<div id="collapse' + i + '" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordionExample">'
          htmlString += '<div class="card-body border border-top p-0 my-0">'
          htmlString += '<table class="table mx-1 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';
          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-3 text-left pl-3 py-1 font-weight-bold" id="" style=" font-size: 12px;"> </td>';
          htmlString += '<td class="col text-center px-0 py-1 font-weight-bold" id="" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold " id="" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col-3 py-1 px-2 font-weight-bold text-left" id="" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col text-center px-0 py-1 font-weight-bold" id="" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col text-center px-0  py-1 font-weight-bold text-light" id="" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col-3  text-right py-1 " id="" style=" font-size: 12px;">'+ 'Venue: ' +venue+ '</td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 12px;"></td>';
          htmlString += '</tr>';
          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';
          htmlString += '</div>';
          htmlString += '</div>';
          htmlString += '</div>';


          if (mm <10) {
            mm = "0"+mm
          }

          if (dd<10) {
            dd = "0" + dd
          }

          var gamelines = yyyy + "" + mm + "" + dd + '-' + aTeam + "-" + hTeam
          gameLinesArray += gamelines + ","

          $("#nfl-schedule-holder").append(htmlString);
        }
      }
      $("#lastweek").attr("disabled", false);
      $("#nextweek").attr("disabled", false);

      addTeamNames();
      $("#nflweek").append("Week " + scheduledWeek);

      // ///////////// Game Lines API////////////////

      var nflLinesURL = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/odds_gamelines.json?game=" + gameLinesArray

      $.ajax
        ({
          type: "GET",
          url: nflLinesURL,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
          },

        })
        .then(function (nflOdds) {
          console.log(nflOdds)
          for (l = 0; l < nflOdds.gameLines.length; l++){
          var awayMoneyLine = nflOdds.gameLines[l].lines[0].moneyLines[0].moneyLine.awayLine.american;
          var homeMoneyLine = nflOdds.gameLines[l].lines[0].moneyLines[0].moneyLine.homeLine.american;
          var gameIdOdds = nflOdds.gameLines[l].game.id

          if (awayMoneyLine < 0) {
            $("#"+ gameIdOdds +"awayMoneyLine").addClass("text-success")
          } else {
            $("#"+ gameIdOdds +"awayMoneyLine").addClass("text-danger")
            awayMoneyLine = "+" + awayMoneyLine
          }

          if (homeMoneyLine < 0) {
            $("#"+ gameIdOdds +"homeMoneyLine").addClass("text-success")
          } else { 
            $("#"+ gameIdOdds +"homeMoneyLine").addClass("text-danger")
            homeMoneyLine = "+" +homeMoneyLine
          }

          $("#"+ gameIdOdds +"awayMoneyLine").append(awayMoneyLine)
          $("#"+ gameIdOdds +"homeMoneyLine").append(homeMoneyLine)

          gameLinesArray = ''

          };
        });
    });
};


// ////Run initial schedule/////////////////////////

nflSchedule(scheduledWeek);

$(".weekselect").click(function () {
  var dropdownweek = $(this).attr("id")
  nflSchedule(dropdownweek);
})


// //////////////////Next Week Buttons/////////////////////

$("#lastweek").click(function () {
  $(this).attr("disabled", true);
  var weekShown = $("#nflweek").text()
  var weekShownNumber = weekShown.match(/\d+/g).map(Number);
  weekShownNumber--;
  if (weekShownNumber < 1)
    weekShownNumber = 1;
  nflSchedule(weekShownNumber);
});

$("#nextweek").click(function () {
  $(this).attr("disabled", true);
  var weekShown = $("#nflweek").text()
  var weekShownNumber = weekShown.match(/\d+/g).map(Number);
  weekShownNumber++;
  nflSchedule(weekShownNumber);
});



