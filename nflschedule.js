
var api = config.MY_KEY;

var NFLstart = new Date(2019, 8, 3);
var today = new Date()
var oneDay = 24 * 60 * 60 * 1000;
var diffDays = Math.round(Math.abs((NFLstart.getTime() - today.getTime()) / (oneDay)));
var scheduledWeek = Math.ceil(diffDays / 7)
var totalTeamRecordLibrary=[];
for (i = 1; i < 18; i++) {
  var htmlweek = '<a id="' + i + '" class="dropdown-item weekselect bg-dark text-white" href="#">Week ' + i + '</a>'
  $("#weekdropdown").append(htmlweek);

}
//////////Generate NFL Schedue////////////////////////////////////////////////////////////////////
function nflSchedule(scheduledWeek) {
  $("#nfl-schedule-holder").empty();
  $("#nflweek").empty();

  var weeklyStatsURL = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/week/" + scheduledWeek + "/games.json"

  $.ajax
    ({
      type: "GET",
      url: weeklyStatsURL,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
      },

    })
    .then(function (nflSchedule) {



      for (i = 0; i < nflSchedule.games.length; i++) {
        if (nflSchedule.games[i].schedule.week == scheduledWeek) {
          var aTeam = nflSchedule.games[i].schedule.awayTeam.abbreviation;
          var hTeam = nflSchedule.games[i].schedule.homeTeam.abbreviation;
          var hid = nflSchedule.games[i].schedule.homeTeam.id
          var aid = nflSchedule.games[i].schedule.awayTeam.id
          var startTime = new Date(nflSchedule.games[i].schedule.startTime);
          var venue = nflSchedule.games[i].schedule.venue.name;
          var gameID = nflSchedule.games[i].schedule.id


            if (nflSchedule.games[i].score.awayScoreTotal === null) {
              var awayScore = 0
            } else {
            var awayScore = nflSchedule.games[i].score.awayScoreTotal;
            };

            if (nflSchedule.games[i].score.homeScoreTotal === null) {
              var homeScore = 0
            } else {
              var homeScore = nflSchedule.games[i].score.homeScoreTotal;
            };

            if (nflSchedule.games[i].score.quarters[0] === undefined) {
              var Q1awayScore = 0;
            } else {
              var Q1awayScore = nflSchedule.games[i].score.quarters[0].awayScore;
            }
            if (nflSchedule.games[i].score.quarters[1] === undefined) {
              var Q2awayScore = 0;
            } else {
              var Q2awayScore = nflSchedule.games[i].score.quarters[1].awayScore;
            }
            if (nflSchedule.games[i].score.quarters[2] === undefined) {
              var Q3awayScore = 0;
            } else {
              var Q3awayScore = nflSchedule.games[i].score.quarters[2].awayScore;
            }
            if (nflSchedule.games[i].score.quarters[3] === undefined) {
              var Q4awayScore = 0;
            } else {
              var Q4awayScore = nflSchedule.games[i].score.quarters[3].awayScore;
            }

            if (nflSchedule.games[i].score.quarters[0] === undefined) {
              var Q1homeScore = 0;
            } else {
              var Q1homeScore = nflSchedule.games[i].score.quarters[0].homeScore;
            }
            if (nflSchedule.games[i].score.quarters[1] === undefined) {
              var Q2homeScore = 0;
            } else {
              var Q2homeScore = nflSchedule.games[i].score.quarters[1].homeScore;
            }
            if (nflSchedule.games[i].score.quarters[2] === undefined) {
              var Q3homeScore = 0;
            } else {
              var Q3homeScore = nflSchedule.games[i].score.quarters[2].homeScore;
            }
            if (nflSchedule.games[i].score.quarters[3] === undefined) {
              var Q4homeScore = 0;
            } else {
              var Q4homeScore = nflSchedule.games[i].score.quarters[3].homeScore;
            }
          

          for (j = 0; j < nflSchedule.references.teamReferences.length; j++) {
            if (nflSchedule.references.teamReferences[j].id == aid) {
              var aTeamName = nflSchedule.references.teamReferences[j].city + " " + nflSchedule.references.teamReferences[j].name
            }
            if (nflSchedule.references.teamReferences[j].id == hid) {
              var hTeamName = nflSchedule.references.teamReferences[j].city + " " + nflSchedule.references.teamReferences[j].name
            }
          }

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

          todaySchedule = monthNames[mm - 1] + " " + dd;
          todayScheduleMobile = hour + ":" + min + " " + sun + " " + mm + "/" + dd

          if (i == 0) {
            var weekStart = todaySchedule;
          }

          if (i == nflSchedule.games.length - 1) {
            var weekLast = todaySchedule;
          }


          var htmlString = '<div class="accordion col-12 mx-0 px-0 mt-2 " id="accordionExample">';
          htmlString += '<div class="card shadow-lg rounded border" >';
          htmlString += '<button class="btn btn-link p-0 my-0 gameButton" type="button" data-toggle="collapse" id="' + gameID + '" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '" status="unclicked" >';
          htmlString += '<table class="table mx-1 my-0 table-borderless card-background table-sm " >';
          htmlString += '<tbody>';
          htmlString += '<tr class=" row "   >';
          htmlString += '<td class="col-2 mobileHide text-left align-middle text-white py-1 pl-3 font-weight-bold" id="' + todaySchedule + 'record" style=" font-size: 16px; background-color: #03254e;">' + todayScheduleMobile + ' </td>';
          htmlString += '<td class="col-3 deskHide text-left text-white py-1 pl-2 font-weight-bold" id="' + todayScheduleMobile + 'record" style=" font-size: 12px; background-color: #03254e;">' + todayScheduleMobile + ' </td>';
          htmlString += '<td class="col-4 text-left pl-1 py-1 mobileHide font-weight-bold border-left border-dark" id="record' + aid + '" style=" font-size: 16px;  "><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px">' + " " + aTeamName + '</td>';
          htmlString += '<td class="col-3 text-left pl-1 py-1 deskHide font-weight-bold border-left border-dark" id="recordm' + aid + '" style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col border text-center px-0 py-1 mobileHide font-weight-bold text-light bg-dark" id="awayScore' + gameID + '" style=" font-size: 16px;">' + awayScore + '</td>';
          htmlString += '<td class="col border text-center px-1 py-1 deskHide font-weight-bold text-light bg-dark" id="awayScore' + gameID + '" style=" font-size: 12px;">' + awayScore + '</td>';
          htmlString += '<td class="col-4 py-1 px-1 mobileHide font-weight-bold text-left " id="record' + hid + '" style=" font-size: 16px;"> @ <img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px">' + " " + hTeamName + '</td>';
          htmlString += '<td class="col-3 py-1  px-1 deskHide font-weight-bold text-left " id="recordm' + hid + '" style=" font-size: 12px;"> @ <img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col border text-center mobileHide px-0  py-1 font-weight-bold text-light bg-dark" id="homeScore' + gameID + '" style=" font-size: 16px;">' + homeScore + '</td>';
          htmlString += '<td class="col border text-center px-1 deskHide py-1 font-weight-bold text-light bg-dark" id="homeScore' + gameID + '" style=" font-size: 12px;">' + homeScore + '</td>';
          htmlString += '<td class="col text-center py-1 font-weight-bold id="gameScore'+gameID+'" text-primary py-1 pr-3"   style=" font-size: 16px;"></td>';
          htmlString += '</tr>';
          
          htmlString += '</tbody>';


          htmlString += '</table>';
          htmlString += '</button>';
          htmlString += '<div id="collapse' + i + '" class="collapse hide border-top border-bottom" aria-labelledby="headingOne" data-parent="#accordionExample">'
          htmlString += '<div class="d-flex py-0 px-0 my-0 " style="background-color: black;">'

          htmlString += '<ul class="nav nav-pills  py-0 " id="myTab" role="tablist">'
          htmlString += '<li class="nav-item pill-1 m-0 p-0 ">'
          htmlString += '<a class="nav-link active py-1 px-2 m-0 " id="leaders-tab' + i + '" data-toggle="tab" href="#leaders' + i + '" role="tab" aria-controls="leaders' + i + '" style=" font-size: 16px;" aria-selected="true">Leaders</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item pill-2 m-0 p-0">'
          htmlString += '<a class="nav-link py-1 m-0 px-2" id="boxscore-tab' + i + '" data-toggle="tab" href="#boxscore' + i + '" role="tab" aria-controls="box' + i + '" style=" font-size: 16px;" aria-selected="false">Scoring</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item pill-3 m-0 p-0">'
          htmlString += '<a class="nav-link py-1 m-0 px-2" id="odds-tab' + i + '" data-toggle="tab" href="#odds' + i + '" role="tab" aria-controls="odds' + i + '" style=" font-size: 16px;" aria-selected="false">Odds</a>'
          htmlString += '</li>'
          htmlString += '</ul>'
          htmlString += '<p class="py-0 my-0 pr-3 ml-auto font-weight-bold "  style=" font-size: 16px;" ></p>'
          htmlString += '</div>'
          htmlString += '<div class="tab-content border-top" id="myTabContent">'

// Odds///////////////////////////////////////////////////////////////////////

          htmlString += '<div class="tab-pane fade show pl-2" id="odds' + i + '" role="tabpanel" aria-labelledby="odds-tab' + i + '">'
          htmlString += '<table class="table mx-0 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Point Spread: </td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 12px;">PS:  </td>';
          htmlString += '<td class="col-4 text-left text-dark mobileHide pl-1 py-1 " id="awaySpread'+gameID+'" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-4 text-left text-dark deskHide pl-1 py-1 " id="awaySpreadm'+gameID+'" style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 py-1 px-1 text-dark mobileHide  text-left" id="homeSpread'+gameID+'" style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-4 py-1 px-1 text-dark deskHide text-left" id="homeSpreadm'+gameID+'" style=" font-size: 12px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';


          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Money Line: </td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 12px;">ML : </td>';
          htmlString += '<td class="col-4 text-left text-dark mobileHide pl-1 py-1 " id="awayMoneyLine'+gameID+'" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-4 text-left text-dark deskHide pl-1 py-1 " id="awayMoneyLinem'+gameID+'" style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 py-1 px-1 text-dark mobileHide text-left" id="homeMoneyLine'+gameID+'" style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-4 py-1 px-1 text-dark deskHide  text-left" id="homeMoneyLinem'+gameID+'" style=" font-size: 12px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2 mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Over Under : </td>';
          htmlString += '<td class="col-2 deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 12px;">O/U: </td>';
          htmlString += '<td class="col-4 mobileHide text-dark text-left pl-1 py-1 " id="underLine'+gameID+'" style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 deskHide text-dark text-left pl-1 py-1 " id="underLinem'+gameID+'" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide text-dark py-1 px-1  text-left" id="overLine'+gameID+'" style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 deskHide text-dark py-1 px-1 text-left" id="overLinem'+gameID+'" style=" font-size: 12px;"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';

// Stat Leaders////////////////////////////////////////////////////////////

          htmlString += '<div class="tab-pane fade show active pl-2" id="leaders' + i + '" role="tabpanel" aria-labelledby="leaders-tab' + i + '">'
          htmlString += '<table class="table mx-0 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2 mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Passing:</td>';
          htmlString += '<td class="col-4  text-left text-dark mobileHide pl-1 py-1 border-bottom" id="aPassingLeader' + gameID + '" style=" font-size: 14px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-6  text-left text-dark deskHide pl-2 py-1 border-bottom" id="aPassingLeaderm' + gameID + '" style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1  text-light " style=" font-size: 14px;"></td>';
          htmlString += '<td class="col-4  py-1 px-1 text-dark mobileHide text-left border-bottom" id="hPassingLeader' + gameID + '" style=" font-size: 14px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-6 py-1 px-1 text-dark deskHide text-left border-bottom" id="hPassingLeaderm' + gameID + '" style=" font-size: 12px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col mobileHide text-center px-0  py-1 text-light "  style=" font-size: 14px;"> </td>';
          htmlString += '<td class="col mobileHide text-center  text-primary py-1 pr-3"  style=" font-size: 14px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Rushing: </td>';
          htmlString += '<td class="col-4 mobileHide text-dark text-left pl-1 py-1 border-bottom" id="awayRushingLeader' + gameID + '" style="font-size: 14px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-6 deskHide text-dark text-left pl-2 py-1 border-bottom" id="awayRushingLeaderm' + gameID + '" style="font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1  text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide py-1 px-1 text-left border-bottom" id="homeRushingLeader' + gameID + '"  style=" font-size: 14px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-6 deskHide text-dark py-1 px-1 text-left border-bottom" id="homeRushingLeaderm' + gameID + '"  style=" font-size: 12px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col mobileHide text-dark text-center px-0  py-1  text-light "  style=" font-size: 14px;"> </td>';
          htmlString += '<td class="col mobileHide text-center text-primary py-1 pr-3"  style=" font-size: 14px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Receiving: </td>';
          htmlString += '<td class="col-4 mobileHide text-dark text-left pl-1 py-1  border-bottom" id="awayReceivingLeader' + gameID + '" style=" font-size: 14px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-6 deskHide text-dark text-left pl-2 py-1  border-bottom" id="awayReceivingLeaderm' + gameID + '" style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1  text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide text-dark py-1 px-1  text-left border-bottom" id="homeReceivingLeader' + gameID + '"  style=" font-size: 14px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col-6 deskHide text-dark py-1 px-1  text-left border-bottom" id="homeReceivingLeaderm' + gameID + '"  style=" font-size: 12px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col mobileHide text-center px-0  py-1  text-light "  style=" font-size: 14px;"> </td>';
          htmlString += '<td class="col mobileHide text-center text-primary py-1 pr-3"  style=" font-size: 14px;"></td>';
          htmlString += '</tr>';

          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';

// Boxscore///////////////////////////////////////////////////////////////

          htmlString += '<div class="tab-pane fade show  pl-2" id="boxscore' + i + '" role="tabpanel" aria-labelledby="boxscore-tab' + i + '">'
          htmlString += '<table class="table mx-0 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-md-5 col-4 text-right py-0 pl-3 font-weight-bold"  style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark" >' + Q1awayScore + '</td>';
          htmlString += '<td class="col text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark" >' + Q2awayScore + '</td>';
          htmlString += '<td class="col text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark" >' + Q3awayScore + '</td>';
          htmlString += '<td class="col text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark" >' + Q4awayScore + '</td>';
          htmlString += '<td class="col-md-5 col-4 text-left font-weight-bold  py-0 pr-3"  style=" font-size: 12px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-md-5 col-4  text-right py-0 pl-3 font-weight-bold"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark">' + Q1homeScore + '</td>';
          htmlString += '<td class="col text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark">' + Q2homeScore + '</td>';
          htmlString += '<td class="col text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark">' + Q3homeScore + '</td>';
          htmlString += '<td class="col  text-center scoreSummary px-0 py-1 font-weight-bold text-light border bg-dark">' + Q4homeScore + '</td>';
          htmlString += '<td class="col-md-5 col-4  text-left font-weight-bold  py-0 pr-3"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '</tr>';

          htmlString += '</tbody>';
          htmlString += '</table>';


          // htmlString += '<tr class=" row ">';
          // htmlString += '<td class="col  text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;"></td>';
          // htmlString += '<td class="col-1  text-center px-0 py-1 font-weight-bold nav-link " id="Q1'+i+'" data-toggle="tab" href="#scoringSummary'+gameID+ '" role="tab" aria-controls="scoringSummary' + gameID + '" style=" font-size: 14px;">Q1</td>';
          // htmlString += '<td class="col-1  text-center px-0 py-1 font-weight-bold  " style=" font-size: 14px;">Q2</td>';
          // htmlString += '<td class="col-1  text-center px-0 py-1 font-weight-bold  " style=" font-size: 14px;">Q3</td>';
          // htmlString += '<td class="col-1  text-center px-0 py-1 font-weight-bold  " style=" font-size: 14px;">Q4</td>';
          // htmlString += '<td class="col text-center font-weight-bold  py-1 pr-3"  style=" font-size: 16px;"></td>';
          // htmlString += '</tr>';
          htmlString += '<div class="row justify-content-center py-0 px-0 my-0 ">'
          
          htmlString += '<div class="d-flex justify-content-center py-0 px-0 my-0 ">'
          htmlString += '<ul class="nav  nav-tabs py-0 border-0 quarter " id="quartersScoring" role="tablist">'
          htmlString += '<li class="nav-item quarter  m-0 p-0 ">'
          htmlString += '<a class="nav-link scoreSummary active py-0 px-1 m-0 text-dark" id="Q1-tab' + gameID + '" data-toggle="tab" href="#Q1'+gameID+ '" role="tab" aria-controls="Q1' + gameID + '"  aria-selected="true">Q1</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item m-0 p-0">'
          htmlString += '<a class="nav-link scoreSummary py-0 px-1 m-0  text-dark" id="Q2-tab' + gameID + '" data-toggle="tab" href="#Q2'+gameID+ '" role="tab" aria-controls="Q2' + gameID + '"  aria-selected="false">Q2</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item  m-0 p-0">'
          htmlString += '<a class="nav-link scoreSummary py-0 px-1 m-0  text-dark" id="Q3-tab' + gameID + '" data-toggle="tab" href="#Q3'+gameID+ '" role="tab" aria-controls="Q3' + gameID + '"  aria-selected="false">Q3</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item m-0 p-0">'
          htmlString += '<a class="nav-link scoreSummary py-0 px-1 m-0  text-dark" id="Q4-tab' + gameID + '" data-toggle="tab" href="#Q4'+gameID+ '" role="tab" aria-controls="Q4' + gameID + '"  aria-selected="false">Q4</a>'
          htmlString += '</li>'
          htmlString += '</ul>'
          htmlString += '</div>'
          htmlString += '</div>'

          htmlString += '<div class="tab-content ">'

          htmlString += '<div class="tab-pane fade show  active text-center" id="Q1' + gameID + '" role="tabpanel" aria-labelledby="Q1-tab' + gameID+ '"></div>'
          htmlString += '<div class="tab-pane fade show  text-center" id="Q2' + gameID + '" role="tabpanel" aria-labelledby="Q2-tab' + gameID+ '"></div>'
          htmlString += '<div class="tab-pane fade show text-center" id="Q3' + gameID + '" role="tabpanel" aria-labelledby="Q3-tab' + gameID+ '"></div>'
          htmlString += '<div class="tab-pane fade show  text-center" id="Q4' + gameID + '" role="tabpanel" aria-labelledby="Q4-tab' + gameID+ '"></div>'

          htmlString += '</div>';
          htmlString += '</div>';


          htmlString += '</div>';
          htmlString += '</div>';
          htmlString += '</div>';
          htmlString += '</div>';

          $("#nfl-schedule-holder").append(htmlString);
          statsLeader(gameID, aid, hid)
        }
      }
      $("#lastweek").attr("disabled", false);
      $("#nextweek").attr("disabled", false);
      $("#nflweek").append("Week " + scheduledWeek);
      $("#weekDate").text(weekStart + " - " + weekLast);

      console.log(totalTeamRecordLibrary)
      for (c = 0; c < nflSchedule.games.length; c++) {
        for (h = 0; h < totalTeamRecordLibrary.length; h++) {
        if (totalTeamRecordLibrary[h].id == nflSchedule.games[c].schedule.homeTeam.id){
         var homeWinP = totalTeamRecordLibrary[h].wins / (totalTeamRecordLibrary[h].wins + totalTeamRecordLibrary[h].losses+ totalTeamRecordLibrary[h].ties)
          }
          if (totalTeamRecordLibrary[h].id == nflSchedule.games[c].schedule.awayTeam.id){
          var awayWinP = totalTeamRecordLibrary[h].wins / (totalTeamRecordLibrary[h].wins + totalTeamRecordLibrary[h].losses+ totalTeamRecordLibrary[h].ties)
          }   

          $("#gameScore"+nflSchedule.games[c].schedule.id).append(Math.round(homeWinP*awayWinP*100));
        }
      }


    });
    getOdds(scheduledWeek)
    getStandings()
};


// ////Run initial schedule/////////////////////////

nflSchedule(scheduledWeek);

$(".weekselect").click(function () {
  var dropdownweek = $(this).attr("id")
  nflSchedule(dropdownweek);
  getStandings()

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

function statsLeader(clickedBtnID, aid, hid) {

  var gameStats = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/games/" + clickedBtnID + "/boxscore.json"

  $.ajax
    ({
      type: "GET",
      url: gameStats,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
      },

    })
    .then(function (gameBoxscore) {

      // Away Leaders///////////////////////////
      var awayRushingArray = [];
      var awayPassingYardsArray = [];
      var awayReceivingArray = [];

      if (gameBoxscore !== undefined) {
      for (j = 0; j < gameBoxscore.stats.away.players.length; j++) {

        if (gameBoxscore.stats.away.players[j].playerStats[0] === undefined) {
          awayPassingYardsArray.push(0)
          awayRushingArray.push(0)
          awayReceivingArray.push(0)
        } else {
          if (gameBoxscore.stats.away.players[j].playerStats[0].passing === undefined) {
            awayPassingYardsArray.push(0)
          } else {
            var passingStats = gameBoxscore.stats.away.players[j].playerStats[0].passing
            awayPassingYardsArray.push(passingStats.passYards)
          }


          if (gameBoxscore.stats.away.players[j].playerStats[0].rushing === undefined) {
            awayRushingArray.push(0)
          } else {
            var aRushingStats = gameBoxscore.stats.away.players[j].playerStats[0].rushing
            awayRushingArray.push(aRushingStats.rushYards)
          }


          if (gameBoxscore.stats.away.players[j].playerStats[0].receiving === undefined) {
            awayReceivingArray.push(0)
          } else {
            var aReceivingStats = gameBoxscore.stats.away.players[j].playerStats[0].receiving
            awayReceivingArray.push(aReceivingStats.recYards)
          }
        }
      }
    
      var passingYardsLeaderIndex = awayPassingYardsArray.indexOf(Math.max(...awayPassingYardsArray));
      var aRushingYardsLeaderIndex = awayRushingArray.indexOf(Math.max(...awayRushingArray));
      var aRecYardsLeaderIndex = awayReceivingArray.indexOf(Math.max(...awayReceivingArray));

      var aRecLeaderName = gameBoxscore.stats.away.players[aRecYardsLeaderIndex].player.firstName[0] + ". " + gameBoxscore.stats.away.players[aRecYardsLeaderIndex].player.lastName
      var aRecYardsTotal = gameBoxscore.stats.away.players[aRecYardsLeaderIndex].playerStats[0].receiving.recYards
      var aRecTD = gameBoxscore.stats.away.players[aRecYardsLeaderIndex].playerStats[0].receiving.recTD


      var aRushingLeaderName = gameBoxscore.stats.away.players[aRushingYardsLeaderIndex].player.firstName[0] + ". " + gameBoxscore.stats.away.players[aRushingYardsLeaderIndex].player.lastName
      var aRushYardsTotal = gameBoxscore.stats.away.players[aRushingYardsLeaderIndex].playerStats[0].rushing.rushYards
      var aRushTD = gameBoxscore.stats.away.players[aRushingYardsLeaderIndex].playerStats[0].rushing.rushTD

      var aPassingLeaderName = gameBoxscore.stats.away.players[passingYardsLeaderIndex].player.firstName[0] + ". " + gameBoxscore.stats.away.players[passingYardsLeaderIndex].player.lastName
      var aPassYardsTotal = gameBoxscore.stats.away.players[passingYardsLeaderIndex].playerStats[0].passing.passYards
      var aPassTD = gameBoxscore.stats.away.players[passingYardsLeaderIndex].playerStats[0].passing.passTD
      $("#aPassingLeader" + clickedBtnID).append(" &nbsp;" + aPassingLeaderName + " - " + aPassYardsTotal + " Yds " + aPassTD + "TD");
      $("#aPassingLeaderm" + clickedBtnID).append(" &nbsp;" + aPassingLeaderName + " - " + aPassYardsTotal + " Yds " + aPassTD + "TD");

      $("#awayRushingLeader" + clickedBtnID).append(" &nbsp;" + aRushingLeaderName + " - " + aRushYardsTotal + " Yds " + aRushTD + "TD");
      $("#awayRushingLeaderm" + clickedBtnID).append(" &nbsp;" + aRushingLeaderName + " - " + aRushYardsTotal + " Yds " + aRushTD + "TD");

      $("#awayReceivingLeader" + clickedBtnID).append(" &nbsp;" + aRecLeaderName + " - " + aRecYardsTotal + " Yds " + aRecTD + "TD");
      $("#awayReceivingLeaderm" + clickedBtnID).append(" &nbsp;" + aRecLeaderName + " - " + aRecYardsTotal + " Yds " + aRecTD + "TD");

      // Home Leaders///////////////////////////////
      var homeRushingArray = [];
      var homePassingYardsArray = [];
      var homeReceivingArray = [];
console.log(gameBoxscore)
      for (y = 0; y < gameBoxscore.scoring.quarters.length; y++) {
        var quarter = y+1;
        for (p = 0; p < gameBoxscore.scoring.quarters[y].scoringPlays.length; p++ ) {
          var scoreTeam = gameBoxscore.scoring.quarters[y].scoringPlays[p].team.abbreviation
          var scoringSummaryHTML = '<p class="text-center scoreSummary py-0 my-0 pr-1"><img  src="images/nfl_logos/' + scoreTeam + '.png" height="16px" width="16px"> ' + gameBoxscore.scoring.quarters[y].scoringPlays[p].playDescription +'</p>'
          $("#Q"+quarter +clickedBtnID).append(scoringSummaryHTML)
        }

      };

      for (j = 0; j < gameBoxscore.stats.home.players.length; j++) {
        var hpassingStats = gameBoxscore.stats.home.players[j].playerStats[0].passing
        var hRushingStats = gameBoxscore.stats.home.players[j].playerStats[0].rushing
        var hReceivingStats = gameBoxscore.stats.home.players[j].playerStats[0].receiving

        if (hpassingStats === undefined) {
          homePassingYardsArray.push(0)
        } else {
          homePassingYardsArray.push(hpassingStats.passYards)
        }

        if (hRushingStats === undefined) {
          homeRushingArray.push(0)
        } else {
          homeRushingArray.push(hRushingStats.rushYards)
        }

        if (hReceivingStats === undefined) {
          homeReceivingArray.push(0)
        } else {
          homeReceivingArray.push(hReceivingStats.recYards)
        }
      }

    
      var hpassingYardsLeaderIndex = homePassingYardsArray.indexOf(Math.max(...homePassingYardsArray));
      var hRushingYardsLeaderIndex = homeRushingArray.indexOf(Math.max(...homeRushingArray));
      var hRecYardsLeaderIndex = homeReceivingArray.indexOf(Math.max(...homeReceivingArray));

      var hRecLeaderName = gameBoxscore.stats.home.players[hRecYardsLeaderIndex].player.firstName[0] + ". " + gameBoxscore.stats.home.players[hRecYardsLeaderIndex].player.lastName
      var hRecYardsTotal = gameBoxscore.stats.home.players[hRecYardsLeaderIndex].playerStats[0].receiving.recYards
      var hRecTD = gameBoxscore.stats.home.players[hRecYardsLeaderIndex].playerStats[0].receiving.recTD


      var hRushingLeaderName = gameBoxscore.stats.home.players[hRushingYardsLeaderIndex].player.firstName[0] + ". " + gameBoxscore.stats.home.players[hRushingYardsLeaderIndex].player.lastName
      var hRushYardsTotal = gameBoxscore.stats.home.players[hRushingYardsLeaderIndex].playerStats[0].rushing.rushYards
      var hRushTD = gameBoxscore.stats.home.players[hRushingYardsLeaderIndex].playerStats[0].rushing.rushTD

      var hPassingLeaderName = gameBoxscore.stats.home.players[hpassingYardsLeaderIndex].player.firstName[0] + ". " + gameBoxscore.stats.home.players[hpassingYardsLeaderIndex].player.lastName
      var hPassYardsTotal = gameBoxscore.stats.home.players[hpassingYardsLeaderIndex].playerStats[0].passing.passYards
      var hPassTD = gameBoxscore.stats.home.players[hpassingYardsLeaderIndex].playerStats[0].passing.passTD
      $("#hPassingLeader" + clickedBtnID).append(" &nbsp;" + hPassingLeaderName + " - " + hPassYardsTotal + " Yds " + hPassTD + "TD");
      $("#hPassingLeaderm" + clickedBtnID).append(" &nbsp;" + hPassingLeaderName + " - " + hPassYardsTotal + " Yds " + hPassTD + "TD");

      $("#homeRushingLeader" + clickedBtnID).append(" &nbsp;" + hRushingLeaderName + " - " + hRushYardsTotal + " Yds " + hRushTD + "TD");
      $("#homeRushingLeaderm" + clickedBtnID).append(" &nbsp;" + hRushingLeaderName + " - " + hRushYardsTotal + " Yds " + hRushTD + "TD");

      $("#homeReceivingLeader" + clickedBtnID).append(" &nbsp;" + hRecLeaderName + " - " + hRecYardsTotal + " Yds " + hRecTD + "TD");
      $("#homeReceivingLeaderm" + clickedBtnID).append(" &nbsp;" + hRecLeaderName + " - " + hRecYardsTotal + " Yds " + hRecTD + "TD");
    }
    })
}

function getOdds(scheduledWeek) {

  var gameOddsURL = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/week/" + scheduledWeek + "/odds_gamelines.json"

  $.ajax
    ({
      type: "GET",
      url: gameOddsURL,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
      },

    })
    .then(function (gameOdds) {
for (g = 0; g <gameOdds.gameLines.length; g++) {

  // Pont Spreads/////////////////////
var gameOddsID = gameOdds.gameLines[g].game.id
var awayPointSpread = gameOdds.gameLines[g].lines[0].pointSpreads[gameOdds.gameLines[g].lines[0].pointSpreads.length-1].pointSpread.awaySpread
var awaySpreadLine = gameOdds.gameLines[g].lines[0].pointSpreads[gameOdds.gameLines[g].lines[0].pointSpreads.length-1].pointSpread.awayLine.american
if (awayPointSpread >0) {
  awayPointSpread = "+"+awayPointSpread;
}

var homePointSpread = gameOdds.gameLines[g].lines[0].pointSpreads[gameOdds.gameLines[g].lines[0].pointSpreads.length-1].pointSpread.homeSpread
var homeSpreadLine = gameOdds.gameLines[g].lines[0].pointSpreads[gameOdds.gameLines[g].lines[0].pointSpreads.length-1].pointSpread.homeLine.american
if (homePointSpread >0) {
  homePointSpread = "+"+homePointSpread;
}

// Money Lines/////////////////////////////////////
if (gameOdds.gameLines[g].lines[0].moneyLines.length >0) {
var awayMoneyLine = gameOdds.gameLines[g].lines[0].moneyLines[gameOdds.gameLines[g].lines[0].moneyLines.length-1].moneyLine.awayLine.american
var homeMoneyLine = gameOdds.gameLines[g].lines[0].moneyLines[gameOdds.gameLines[g].lines[0].moneyLines.length-1].moneyLine.homeLine.american
} else {
  var awayMoneyLine = "TBD"
  var homeMoneyLine = "TBD"
}
if (awayMoneyLine >0) {
  awayMoneyLine = "+" +awayMoneyLine
}
if (homeMoneyLine >0) {
  homeMoneyLine = "+" +homeMoneyLine
}
// Over Unders////////////////////////////////
if (gameOdds.gameLines[g].lines[0].overUnders.length>0) {
var overUnder = gameOdds.gameLines[g].lines[0].overUnders[gameOdds.gameLines[g].lines[0].overUnders.length-1].overUnder.overUnder
var underLine = gameOdds.gameLines[g].lines[0].overUnders[gameOdds.gameLines[g].lines[0].overUnders.length-1].overUnder.underLine.american
var overLine = gameOdds.gameLines[g].lines[0].overUnders[gameOdds.gameLines[g].lines[0].overUnders.length-1].overUnder.overLine.american
} else {
var overUnder = "TBD"
var underLine = "TBD"
var overLine = "TBD"

}


$("#awaySpread"+gameOddsID).append(" " +awayPointSpread+ " (" +awaySpreadLine+")");
$("#homeSpread"+gameOddsID).append(" " +homePointSpread+ " (" +homeSpreadLine+")");
$("#awayMoneyLine"+gameOddsID).append(" " +awayMoneyLine);
$("#homeMoneyLine"+gameOddsID).append(" " +homeMoneyLine);
$("#underLine"+gameOddsID).append(" U: " +overUnder+ " (" +underLine+")");
$("#overLine"+gameOddsID).append(" O: " +overUnder+ " (" +overLine+")");

$("#awaySpreadm"+gameOddsID).append(" " +awayPointSpread+ " (" +awaySpreadLine+")");
$("#homeSpreadm"+gameOddsID).append(" " +homePointSpread+ " (" +homeSpreadLine+")");
$("#awayMoneyLinem"+gameOddsID).append(" " +awayMoneyLine);
$("#homeMoneyLinem"+gameOddsID).append(" " +homeMoneyLine);
$("#underLinem"+gameOddsID).append(" U: " +overUnder+ " (" +underLine+")");
$("#overLinem"+gameOddsID).append(" O: " +overUnder+ " (" +overLine+")");


}})
};

function getStandings() {
  var standingsURL = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/standings.json"

  $.ajax
    ({
      type: "GET",
      url: standingsURL,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
      },

    })
    .then(function (standings) {
console.log(standings)
      var teamRecordLibrary =[];
      for (t=0; t < standings.teams.length; t++) {
      var teamWins = standings.teams[t].stats.standings.wins;
      var teamLoses = standings.teams[t].stats.standings.losses;
      var teamTies = standings.teams[t].stats.standings.ties;
      var standingsTeamID = standings.teams[t].team.id

      teamRecordLibrary.push({wins: teamWins, losses: teamLoses, ties: teamTies, id: standingsTeamID})

      if (teamTies == 0) {
        teamTies = "";
      } else {
        teamTies = "-" +teamTies
      }
      $("#record"+standingsTeamID).append(" ("+teamWins+"-"+teamLoses +teamTies+")")
      $("#recordm"+standingsTeamID).append(" ("+teamWins+"-"+teamLoses +teamTies+")")

      }

      getPreviousStandings(teamRecordLibrary)
    })};


    function getPreviousStandings(teamRecordLibrary) {
      var previousStandingsURL = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2018-regular/standings.json"
    
      $.ajax
        ({
          type: "GET",
          url: previousStandingsURL,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
          },
    
        })
        .then(function (previousStandings) {
    // console.log(previousStandings)
    // console.log(teamRecordLibrary)
          var previousTeamRecordLibrary =[];
          for (t=0; t < previousStandings.teams.length; t++) {
          var previousTeamWins = previousStandings.teams[t].stats.standings.wins;
          var previousTeamLosses = previousStandings.teams[t].stats.standings.losses;
          var previousTeamTies = previousStandings.teams[t].stats.standings.ties;
          var previousSandingsTeamID = previousStandings.teams[t].team.id
    
          for (k=0; k < teamRecordLibrary.length; k++) {
            if (teamRecordLibrary[k].id == previousSandingsTeamID) {
              var totalWins = teamRecordLibrary[k].wins + previousTeamWins;
              var totalLosses = teamRecordLibrary[k].losses + previousTeamLosses;
              var totalTies = teamRecordLibrary[k].ties + previousTeamTies;
              totalTeamRecordLibrary.push({wins: totalWins, losses: totalLosses, ties:totalTies, id:previousSandingsTeamID, lastWins:previousTeamWins, lastLosses: previousTeamLosses, lastTies:previousTeamTies })
            }

          }
          

          }
        })};

