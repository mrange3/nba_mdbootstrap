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


        // Home Page Standings ////////////////////
        for (j = 0; j < standings.teams.length; j++) {
            tLogo = standings.teams[j].team.abbreviation.toLowerCase();

            if (standings.teams[j].playoffRank.conferenceName == "Western") {
                var miniStandingsStringW = '<td class="align-middle text-left pt-2 pb-1" style="font-size: 10px;">'+ standings.teams[j].playoffRank.rank + '</td>'
                miniStandingsStringW += '<td class="align-middle text-left pl-0 pt-2 pb-1" style="font-size: 12px;"><img src="images/logos/' + tLogo + '.png" height="18px" width="18px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</td>'
                miniStandingsStringW += '<td class="align-middle text-center pr-0 pt-2 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses +'</td>'
                miniStandingsStringW += '<td class="align-middle text-right pl-1 pt-2 pb-1" style="font-size: 10px;">' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                $("#wTeam"+standings.teams[j].playoffRank.rank).append(miniStandingsStringW)
            } else {
                var miniStandingsStringE = '<td class="align-middle text-left pt-2 pb-1" style="font-size: 10px;">'+ standings.teams[j].playoffRank.rank + '</td>'
                miniStandingsStringE += '<td class="align-middle text-left pl-0 pt-2 pb-1" style="font-size: 12px;"><img src="images/logos/' + tLogo + '.png" height="18px" width="18px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</td>'
                miniStandingsStringE += '<td class="align-middle text-center pr-0 pt-2 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses + '</td>'
                miniStandingsStringE += '<td class="align-middle text-right pl-1 pt-2 pb-1" style="font-size: 10px;">' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                $("#eTeam"+standings.teams[j].playoffRank.rank).append(miniStandingsStringE)

            }

        };
        // /Main Standings///////////////
        for (j = 0; j < standings.teams.length; j++) {
            tLogo = standings.teams[j].team.abbreviation.toLowerCase();
            var diff = Math.round(10*(standings.teams[j].stats.offense.ptsPerGame - standings.teams[j].stats.defense.ptsAgainstPerGame))/10;
            var tRebounds = Math.round(10*(standings.teams[j].stats.rebounds.defRebPerGame + standings.teams[j].stats.rebounds.offRebPerGame))/10;

            if (standings.teams[j].playoffRank.conferenceName == "Western") {
                var standingsStringW = '<td class="align-middle text-left pt-1 pb-1" style="font-size: 10px;">'+ standings.teams[j].playoffRank.rank + '</td>'
                standingsStringW += '<td class="align-middle text-left pl-0 pt-1 pb-1" style="font-size: 13px;"><img src="images/logos/' + tLogo + '.png" height="18px" width="18px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.wins +'</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.losses +'</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.winPct + '</td>'
                standingsStringW += '<td class="align-middle text-center pl-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.rebounds.defRebPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.rebounds.offRebPerGame + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + tRebounds + '</td>'
                standingsStringW += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + diff + '</td>'

                $("#wSTeam"+standings.teams[j].playoffRank.rank).append(standingsStringW)
            } else {
                var standingsStringE = '<td class="align-middle text-left pt-1 pb-1" style="font-size: 10px;">'+ standings.teams[j].playoffRank.rank + '</td>'
                standingsStringE += '<td class="align-middle text-left pl-0 pt-1 pb-1" style="font-size: 13px;"><img src="images/logos/' + tLogo + '.png" height="18px" width="18px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.wins +'</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.losses +'</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.standings.winPct + '</td>'
                standingsStringE += '<td class="align-middle text-center pl-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.rebounds.defRebPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + standings.teams[j].stats.rebounds.offRebPerGame + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + tRebounds + '</td>'
                standingsStringE += '<td class="align-middle text-center pr-0 pt-1 pb-1" style="font-size: 10px;">' + diff + '</td>'
                $("#eSTeam"+standings.teams[j].playoffRank.rank).append(standingsStringE)

            }

        };
    });