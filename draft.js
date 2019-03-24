var teamsUrl = "https://api.mysportsfeeds.com/v2.0/pull/nba/current/standings.json"


var api = config.MY_KEY



$.ajax
    ({
        type: "GET",
        url: teamsUrl,
        dataType: 'json',
        headers: {
            "Authorization": "Basic " + btoa(api + ":" + "MYSPORTSFEEDS")
        },

    })
    .then(function (standings) {
        // console.log(standings)
        var lotteryTeams = [];

        for (j = 0; j < standings.teams.length; j++) {

            // var lotteryRank = 0;
            if (standings.teams[j].playoffRank.rank > 8) {
                lotteryTeams.push(standings.teams[j].overallRank.rank);
            

            };

        };

        lotteryTeams.sort(function(a, b){return b - a});

        for (j = 0; j < standings.teams.length; j++) {

            for (i = 0; i < lotteryTeams.length; i++) {
                if (lotteryTeams[i] == standings.teams[j].overallRank.rank) {
                    var tLogo = standings.teams[j].team.abbreviation.toLowerCase();
                    var teamPickString = '<p class="m-0 p-0"><img src="images/logos/' + tLogo + '.png" height="25px" width="25px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</p>'
                    $("#teamPick"+[i+1]).append(teamPickString)
        
                }

            }

            }

        
    });