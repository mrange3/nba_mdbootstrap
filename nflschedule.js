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
  });