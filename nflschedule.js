var nflGames = " https://api.mysportsfeeds.com/v2.1/pull/nfl/upcoming/games.json"
var nflTeams = " https://api.mysportsfeeds.com/v2.1/pull/nfl/upcoming/standings.json"

var api = config.MY_KEY;


var scheduledWeek = 1

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
  
    for (j=0; j < nflStandings.teams.length; j++) {
      var teamLocation = nflStandings.teams[j].team.city;
      var teamName = nflStandings.teams[j].team.name;
      var teamid = nflStandings.teams[j].team.id;
      var fullTeamName = teamLocation + " " + teamName;
      $("#"+ teamid).append(fullTeamName);   
  
    }
  
    });
  };


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


  for (i=0; i < nflSchedule.games.length; i++ ) {
    var x = scheduledWeek;
    if (nflSchedule.games[i].schedule.week == x) {
      var aTeam = nflSchedule.games[i].schedule.awayTeam.abbreviation;
      var hTeam = nflSchedule.games[i].schedule.homeTeam.abbreviation;
      var hid = nflSchedule.games[i].schedule.homeTeam.id
      var aid = nflSchedule.games[i].schedule.awayTeam.id
      var startTime = new Date(nflSchedule.games[i].schedule.startTime);

      var dd = startTime.getDate();
      var mm = startTime.getMonth() + 1; //January is 0!
      var yyyy = startTime.getFullYear();
      var day  = startTime.getDay();
      var hour = startTime.getHours();
      var sun
      if (hour > 12) {
        hour = hour-12;
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
      
      const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday"];
       
      todaySchedule = hour + ":" +min + " " + sun + " " + dayNames[day] + ", " + monthNames[mm - 1] + " " + dd 
      

      var htmlString = '<table class="table m-1 table-borderless card-background table-sm">'
      htmlString += '<tbody>'
      htmlString += '<tr class=" row ">';
      htmlString += '<td class="col-3 text-left px-4 py-0" id="'+aid+'" style=" font-size: 16px;"><img  src="images/nfl_logos/' + aTeam + '.png" height="20px" width="20px"> </td>';
      htmlString += '<td class="col-1 border text-center px-0 py-0" id="'+aid+"score"+'" style=" font-size: 16px;">0 </td>';
      htmlString += '<td class="col-3 py-0" id="'+hid+'" style=" font-size: 16px;"><img  src="images/nfl_logos/' + hTeam + '.png" height="20px" width="20px"> </td>';
      htmlString += '<td class="col-1 border text-center px-0  py-0" id="'+hid+ "score"+'" style=" font-size: 16px;"> 0</td>';
      htmlString += '<td class="col-3  text-right py-0" id="'+todaySchedule+'record" style=" font-size: 16px;">' +todaySchedule+' </td>';
      htmlString += '<td class="col-1 text-center text-primary py-0"  style=" font-size: 16px;">'+100+' </td>';
      htmlString += '</tr>';
      htmlString += '</tbody>'
      htmlString += '</table>'

      $("#nfl-schedule-holder").append(htmlString);   
    }
  }
  $("#lastweek").attr("disabled", false);
  $("#nextweek").attr("disabled", false);

  $("#nflweek").append("Week " +scheduledWeek);   
  addTeamNames();
  

});

};



nflSchedule(scheduledWeek);

$("#lastweek").click(function() {
  $(this).attr("disabled", true);
  scheduledWeek--;
  nflSchedule(scheduledWeek);
});

$("#nextweek").click(function() {
  $(this).attr("disabled", true);
  scheduledWeek++;
  nflSchedule(scheduledWeek);
});



