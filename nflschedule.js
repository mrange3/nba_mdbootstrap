var nflGames = " https://api.mysportsfeeds.com/v2.1/pull/nfl/upcoming/games.json"


var api = config.MY_KEY;

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


  for (i=0; i < 17; i++ ) {
    var x = 1;
    if (nflSchedule.games[i].schedule.week = 1) {
      var aTeam = nflSchedule.games[i].schedule.awayTeam.abbreviation
      var hTeam = nflSchedule.games[i].schedule.homeTeam.abbreviation
      var startTime = new Date(nflSchedule.games[i].schedule.startTime)

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
      


      var htmlString = '<tr class=" ">';
      // htmlString += '<th scope="row" class="table-borderless scoreboard align-middle text-left  py-0 " style="font-size: 13px;" ><img class="scoreLogo" src="images/logos/' + aLogo + '.png" height="24px" width="24px">' + " " + aDisplayName + '</th>'
      htmlString += '<td class=" text-left px-4" id="'+aTeam+'record" style=" font-size: 12px;">'+aTeam+' </td>';
      htmlString += '<td class="text-left" style=" font-size: 12px;">' +hTeam+' </td>';
      htmlString += '<td class=" d-flex justify-content-end px-4" id="'+todaySchedule+'record" style=" font-size: 12px;">' +todaySchedule+' </td>';
      htmlString += '</tr>';

      $("#nfl-schedule-holder").append(htmlString);   
    }
  }

});
