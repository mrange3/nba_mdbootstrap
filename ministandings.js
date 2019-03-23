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
        console.log(standings)

        for (j = 0; j < standings.teams.length; j++) {
            tLogo = standings.teams[j].team.abbreviation.toLowerCase();

            if (standings.teams[j].playoffRank.conferenceName == "Western") {
                var miniStandingsStringW = '<td class="align-middle text-left pt-1 pb-1" style="font-size: 8px;">'+ standings.teams[j].playoffRank.rank + '</td>'
                miniStandingsStringW += '<td class="align-middle text-left pl-0 pt-1 pb-1" style="font-size: 10px;"><img src="images/logos/' + tLogo + '.png" height="18px" width="18px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</td>'
                miniStandingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 8px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses +'</td>'
                miniStandingsStringW += '<td class="align-middle text-right pl-0 pt-1 pb-1" style="font-size: 8px;">' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                $("#wTeam"+standings.teams[j].playoffRank.rank).append(miniStandingsStringW)
            } else {
                var miniStandingsStringE = '<td class="align-middle text-left pt-1 pb-1" style="font-size: 8px;">'+ standings.teams[j].playoffRank.rank + '</td>'
                miniStandingsStringE += '<td class="align-middle text-left pl-0 pt-1 pb-1" style="font-size: 10px;"><img src="images/logos/' + tLogo + '.png" height="18px" width="18px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</td>'
                miniStandingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 8px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses + '</td>'
                miniStandingsStringE += '<td class="align-middle text-right pl-0 pt-1 pb-1" style="font-size: 8px;">' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                $("#eTeam"+standings.teams[j].playoffRank.rank).append(miniStandingsStringE)

            }

        };
    });