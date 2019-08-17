
var api = config.MY_KEY;


var scheduledWeek = 1


for (i = 1; i < 18; i++) {
  var htmlweek = '<a id="' + i + '" class="dropdown-item weekselect bg-dark text-white" href="#">Week ' + i + '</a>'
  $("#weekdropdown").append(htmlweek);

}
//////////Generate NFL Schedue////////////////////////////////////////////////////////////////////
function nflSchedule(scheduledWeek) {
  $("#nfl-schedule-holder").empty();
  $("#nflweek").empty();

  var weeklyStatsURL = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/week/" +scheduledWeek +"/odds_gamelines.json"

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
      console.log(nflSchedule)



      for (i = 0; i < nflSchedule.references.gameReferences.length; i++) {
        var x = scheduledWeek;
        if (nflSchedule.references.gameReferences[i].week == x) {
          var aTeam = nflSchedule.references.gameReferences[i].awayTeam.abbreviation;
          var hTeam = nflSchedule.references.gameReferences[i].homeTeam.abbreviation;
          var hid = nflSchedule.references.gameReferences[i].homeTeam.id
          var aid = nflSchedule.references.gameReferences[i].awayTeam.id
          var startTime = new Date(nflSchedule.references.gameReferences[i].startTime);
          var venue = nflSchedule.references.gameReferences[i].venue.name;
          var gameID = nflSchedule.references.gameReferences[i].id


    

          for (l =0; l < nflSchedule.references.venueReferences.length; l++) {
            if (nflSchedule.references.venueReferences[l].id == nflSchedule.references.gameReferences[i].venue.id) {
              var venueLocation = nflSchedule.references.venueReferences[l].city
            }
          }



          if (nflSchedule.gameLines[i].lines.length == 0) {
            var awayMoneyLine = "TBD";
            var homeMoneyLine = "TBD";
            var overUnder = "TBD";
            var awaySpreadLine = "TBD";
            var homeSpreadLine = "TBD";
            var aMoneyLine = "TBD";
            var hMoneyLine = "TBD";

          } else if (nflSchedule.gameLines[i].lines[0].overUnders.length == 0) {
            var overUnder = "TBD";
          } 
        
          else {
          var awayMoneyLine = nflSchedule.gameLines[i].lines[0].pointSpreads[0].pointSpread.awaySpread;
          var homeMoneyLine = nflSchedule.gameLines[i].lines[0].pointSpreads[0].pointSpread.homeSpread;
          var overUnder = nflSchedule.gameLines[i].lines[0].overUnders[0].overUnder.overUnder
          var awaySpreadLine = nflSchedule.gameLines[i].lines[0].pointSpreads[0].pointSpread.awayLine.american
          var homeSpreadLine = nflSchedule.gameLines[i].lines[0].pointSpreads[0].pointSpread.homeLine.american
          var aMoneyLine = nflSchedule.gameLines[i].lines[0].moneyLines[0].moneyLine.awayLine.american
          var hMoneyLine = nflSchedule.gameLines[i].lines[0].moneyLines[0].moneyLine.homeLine.american

          };



          for (j=0; j < nflSchedule.references.teamReferences.length; j++) {
            if (nflSchedule.references.teamReferences[j].id == aid) {
              var aTeamName = nflSchedule.references.teamReferences[j].city + " " + nflSchedule.references.teamReferences[j].name
            }
            if (nflSchedule.references.teamReferences[j].id == hid) {
              var hTeamName = nflSchedule.references.teamReferences[j].city + " " + nflSchedule.references.teamReferences[j].name
            }
          }

          if (awayMoneyLine > 0) {
            awayMoneyLine = "+" + awayMoneyLine
          }

          if (homeMoneyLine > 0) {
            homeMoneyLine = "+" +homeMoneyLine
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

          todaySchedule =  monthNames[mm - 1] + " " + dd;
          todayScheduleMobile = hour + ":" + min + " " + sun + " " + mm + "/" +dd

          if (i==0) {
            var weekStart = todaySchedule;
          }

          if (i == nflSchedule.references.gameReferences.length-2) {
            var weekLast = todaySchedule;
          }


          var htmlString = '<div class="accordion col-12 mx-0 px-0 mt-2 " id="accordionExample">';
          htmlString += '<div class="card shadow-lg rounded border" >';
          htmlString += '<button class="btn btn-link p-0 my-0" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '" >';
          htmlString += '<table class="table mx-1 my-0 table-borderless card-background table-sm " >';
          htmlString += '<tbody>';
          htmlString += '<tr class=" row "   >';
          htmlString += '<td class="col-2 mobileHide text-left text-white py-1 pl-3 font-weight-bold" id="' + todaySchedule + 'record" style=" font-size: 16px; background-color: darkgreen;">' + todayScheduleMobile + ' </td>';
          htmlString += '<td class="col-3 deskHide text-left py-1 pl-2 font-weight-bold" id="' + todayScheduleMobile + 'record" style=" font-size: 16px;">' + todayScheduleMobile + ' </td>';
          htmlString += '<td class="col-4 text-left pl-1 py-1 mobileHide font-weight-bold border-left border-dark" id="' + aid + '" style=" font-size: 16px; "><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px">'+ " " + aTeamName +' (0-0)</td>';
          htmlString += '<td class="col-3 text-left pl-1 py-1 deskHide font-weight-bold border-left border-dark" id="' + aid + '" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> (0-0)</td>';
          htmlString += '<td class="col border text-center px-0 py-1 font-weight-bold text-light bg-dark" id="' + aid + "score" + '" style=" font-size: 16px;">0 </td>';
          htmlString += '<td class="col-4 py-1 px-1 font-weight-bold text-left mobileHide" id="' + hid + '" style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px">' + " " + hTeamName + ' (0-0)</td>';
          htmlString += '<td class="col-3 py-1 px-1 font-weight-bold text-left deskHide" id="' + hid + '" style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> (0-0)</td>';
          htmlString += '<td class="col border text-center px-0  py-1 font-weight-bold text-light bg-dark" id="' + hid + "score" + '" style=" font-size: 16px;"> 0</td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;">' + 100 + ' </td>';
          htmlString += '</tr>';
          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</button>';
          htmlString += '<div id="collapse' + i + '" class="collapse hide border-top border-bottom" aria-labelledby="headingOne" data-parent="#accordionExample">'
          htmlString += '<div class="d-flex py-0 pl-2 my-0 " style="background-color: black;">'
          
          htmlString += '<ul class="nav nav-pills  py-0 " id="myTab" role="tablist">'
          htmlString += '<li class="nav-item pill-1 m-0 p-0 ">'
          htmlString += '<a class="nav-link active py-1 m-0 " id="leaders-tab'+i+'" data-toggle="tab" href="#leaders'+i+'" role="tab" aria-controls="leaders'+i+'" style=" font-size: 16px;" aria-selected="true">Leaders</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item pill-2 m-0 p-0">'
          htmlString += '<a class="nav-link py-1 m-0" id="boxscore-tab'+i+'" data-toggle="tab" href="#boxscore'+i+'" role="tab" aria-controls="box'+i+'" style=" font-size: 16px;" aria-selected="false">Boxscore</a>'
          htmlString += '</li>'
          htmlString += '<li class="nav-item pill-3 m-0 p-0">'
          htmlString += '<a class="nav-link py-1 m-0" id="odds-tab'+i+'" data-toggle="tab" href="#odds'+i+'" role="tab" aria-controls="odds'+i+'" style=" font-size: 16px;" aria-selected="false">Odds</a>'
          htmlString += '</li>'
          htmlString += '</ul>'
          htmlString += '<p class="py-0 my-0 pr-3 ml-auto font-weight-bold "  style=" font-size: 16px;" ></p>'
          htmlString += '</div>'
          htmlString += '<div class="tab-content border-top" id="myTabContent">'
          htmlString += '<div class="tab-pane fade show pl-2" id="odds'+i+'" role="tabpanel" aria-labelledby="odds-tab'+i+'">'
          htmlString += '<table class="table mx-0 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Point Spread: </td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">PS:  </td>';
          htmlString += '<td class="col-4 text-left mobileHide pl-1 py-1 font-weight-bold" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> ' + awayMoneyLine + '</td>';
          htmlString += '<td class="col-4 text-left deskHide pl-1 py-1 font-weight-bold" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> ' + awayMoneyLine + '</td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 py-1 px-1 mobileHide font-weight-bold text-left"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> ' + homeMoneyLine + '</td>';
          htmlString += '<td class="col-4 py-1 px-1 deskHide font-weight-bold text-left"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> ' + homeMoneyLine + '</td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          // htmlString += '<tr class=" row ">';
          // htmlString += '<td class="col-2 mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Spread Line: </td>';
          // htmlString += '<td class="col-2 deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">SL: </td>';
          // htmlString += '<td class="col-4 mobileHide text-left pl-1 py-1 font-weight-bold" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> ' + awaySpreadLine + '</td>';
          // htmlString += '<td class="col-4 deskHide text-left pl-1 py-1 font-weight-bold" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> ' + awaySpreadLine + '</td>';
          // htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          // htmlString += '<td class="col-4 mobileHide py-1 px-1 font-weight-bold text-left"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> ' + homeSpreadLine + '</td>';
          // htmlString += '<td class="col-4 deskHide py-1 px-1 font-weight-bold text-left"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> ' + homeSpreadLine + '</td>';
          // htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          // htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          // htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Money Line: </td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">ML : </td>';
          htmlString += '<td class="col-4 text-left mobileHide pl-1 py-1 font-weight-bold" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> ' +aMoneyLine+ '</td>';
          htmlString += '<td class="col-4 text-left deskHide pl-1 py-1 font-weight-bold" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> ' +aMoneyLine+ '</td>';
          htmlString += '<td class="col text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 py-1 px-1 mobileHide font-weight-bold text-left"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> '+hMoneyLine+ '</td>';
          htmlString += '<td class="col-4 py-1 px-1 deskHide font-weight-bold text-left"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> '+hMoneyLine+ '</td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2 mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Over Under : </td>';
          htmlString += '<td class="col-2 deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">O/U: </td>';
          htmlString += '<td class="col-4 mobileHide text-left pl-1 py-1 font-weight-bold" style=" font-size: 16px;">' + overUnder + '</td>';
          htmlString += '<td class="col-4 deskHide text-left pl-1 py-1 font-weight-bold" style=" font-size: 16px;">' + overUnder + '</td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide py-1 px-1 font-weight-bold text-left"  style=" font-size: 16px;">' + overUnder + '</td>';
          htmlString += '<td class="col-4 deskHide py-1 px-1 font-weight-bold text-left"  style=" font-size: 16px;">' + overUnder + '</td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';

          htmlString += '<div class="tab-pane fade show active pl-2" id="leaders'+i+'" role="tabpanel" aria-labelledby="leaders-tab'+i+'">'
          htmlString += '<table class="table mx-0 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2 mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Passing:</td>';
          htmlString += '<td class="col-2 deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Pass:</td>';
          htmlString += '<td class="col-4 mobileHide text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col-4 deskHide text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col-4 deskHide text-left px-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Rushing: </td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Rush: </td>';
          htmlString += '<td class="col-4 mobileHide text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col-4 deskHide text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col-4 deskHide py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Receiving: </td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Rec: </td>';
          htmlString += '<td class="col-4 mobileHide text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col-4 deskHide text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light " style=" font-size: 16px;"></td>';
          htmlString += '<td class="col-4 mobileHide py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col-4 deskHide py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> 1.</td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light "  style=" font-size: 16px;"> </td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';

          htmlString += '<div class="tab-pane fade show  pl-2" id="boxscore'+i+'" role="tabpanel" aria-labelledby="boxscore-tab'+i+'">'
          htmlString += '<table class="table mx-0 my-0 table-borderless card-background table-sm">';
          htmlString += '<tbody>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2 mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">First Quarter</td>';
          htmlString += '<td class="col-2 deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Q1</td>';
          htmlString += '<td class="col-4 text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light border bg-dark" style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col-4 py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light border bg-dark"  style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Second Quarter</td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Q2</td>';
          htmlString += '<td class="col-4 text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light border bg-dark" style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col-4 py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light border bg-dark"  style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Third Quarter</td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Q3</td>';
          htmlString += '<td class="col-4 text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light border bg-dark" style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col-4 py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light border bg-dark"  style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';

          htmlString += '<tr class=" row ">';
          htmlString += '<td class="col-2  mobileHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Fourth Quarter</td>';
          htmlString += '<td class="col-2  deskHide text-left py-1 pl-3 font-weight-bold"  style=" font-size: 16px;">Q4</td>';
          htmlString += '<td class="col-4 text-left pl-1 py-1 font-weight-bold border-bottom" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0 py-1 font-weight-bold text-light border bg-dark" style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col-4 py-1 px-1 font-weight-bold text-left border-bottom"  style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"></td>';
          htmlString += '<td class="col  text-center px-0  py-1 font-weight-bold text-light border bg-dark"  style=" font-size: 16px;">0</td>';
          htmlString += '<td class="col text-center font-weight-bold text-primary py-1 pr-3"  style=" font-size: 16px;"></td>';
          htmlString += '</tr>';


          htmlString += '</tbody>';
          htmlString += '</table>';
          htmlString += '</div>';




          htmlString += '</div>';
          htmlString += '</div>';

          htmlString += '</div>';
          htmlString += '</div>';



          if (awayMoneyLine < 0 ) {
            $("#"+ aid +"awayMoneyLine").addClass("text-success")
          } else {
            $("#"+ aid +"awayMoneyLine").addClass("text-danger")
          }

          if (homeMoneyLine < 0) {
            $("#"+ hid +"homeMoneyLine").addClass("text-success")
          } else { 
            $("#"+ hid +"homeMoneyLine").addClass("text-danger")
          }

          $("#nfl-schedule-holder").append(htmlString);
        }
      }
      $("#lastweek").attr("disabled", false);
      $("#nextweek").attr("disabled", false);
      $("#nflweek").append("Week " + scheduledWeek);
      $("#weekDate").text(weekStart + " - " + weekLast)

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

