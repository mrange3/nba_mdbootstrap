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

        // /Main Standings///////////////
        for (j = 0; j < standings.teams.length; j++) {
            tLogo = standings.teams[j].team.abbreviation.toLowerCase();
            var diff = Math.round(10*(standings.teams[j].stats.offense.ptsPerGame - standings.teams[j].stats.defense.ptsAgainstPerGame))/10;
            var tRebounds = Math.round(10*(standings.teams[j].stats.rebounds.defRebPerGame + standings.teams[j].stats.rebounds.offRebPerGame))/10;
            var playoffSeed = standings.teams[j].playoffRank.rank;
            
            if (playoffSeed > 8) {
                playoffSeed = "";
            }


            if (diff > 0) {
                diff = "+" + diff
            }

            if (standings.teams[j].playoffRank.conferenceName == "Western") {
                var standingsStringW = '<td class="align-middle text-center py-0 px-1 m-0 font-weight-bold" style="font-size: 12px;">'+ playoffSeed + '</td>'
                standingsStringW += '<th class="align-middle text-left py-0 pl-0 pr-1 text-nowrap boxtable" style="font-size: 18px;"><img class=" smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +standings.teams[j].team.abbreviation+ '</th>'
                standingsStringW += '<td class="align-middle text-center py-0 px-1 teamstatsData" style="font-size: 18px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses +'</td>'
                // standingsStringW += '<td class="align-middle text-center py-0 px-1  teamstatsData">' + " " + standings.teams[j].conferenceRank.gamesBack + '</td>'
                // standingsStringW += '<td class="align-middle text-right p-0 mobileHide teamstatsData">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                // standingsStringW += '<td class="align-middle text-right p-0 mobileHide teamstatsData">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                // standingsStringW += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                // standingsStringW += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                // standingsStringW += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                // standingsStringW += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + tRebounds + '</td>'
                // standingsStringW += '<td class="align-middle text-right p-0 teamstatsData" id="'+tLogo+'pointDiff">' + diff + '</td>'

                $("#wSTeam"+standings.teams[j].playoffRank.rank).append(standingsStringW)
            } else {
                var standingsStringE = '<td class="align-middle text-center py-0 px-1 m-0 font-weight-bold" style="font-size: 12px;">'+ playoffSeed + '</td>'
                standingsStringE += '<th class="align-middle text-left py-0 pl-0 pr-1 text-nowrap boxteam boxtable" style="font-size: 18px;"><img class="p-0 m-0 smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +standings.teams[j].team.abbreviation  + '</th>'
                standingsStringE += '<td class="align-middle text-center py-0 px-1 teamstatsData" style="font-size: 18px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses +'</td>'
                // standingsStringE += '<td class="align-middle text-center py-0 px-1 teamstatsData">' + standings.teams[j].conferenceRank.gamesBack +'</td>'
                // standingsStringE += '<td class="align-middle text-right p-0 mobileHide teamstatsData">' + standings.teams[j].stats.standings.winPct.toFixed(3).replace(/^0+/, '') + '</td>'
                // standingsStringE += '<td class="align-middle text-right p-0  teamstatsData" >' + standings.teams[j].conferenceRank.gamesBack + '</td>'
                // standingsStringE += '<td class="align-middle text-right p-0 mobileHide teamstatsData">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                // standingsStringE += '<td class="align-middle text-right p-0 mobileHide teamstatsData">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                // standingsStringE += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                // standingsStringE += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                // standingsStringE += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                // standingsStringE += '<td class="align-middle text-center pr-0 py-0 mobileHide teamstatsData">' + tRebounds + '</td>'
                // standingsStringE += '<td class="align-middle text-right p-0 teamstatsData " id="'+tLogo+'pointDiff">' + diff + '</td>'
                $("#eSTeam"+standings.teams[j].playoffRank.rank).append(standingsStringE)

            }

            if (Math.round(10*(standings.teams[j].stats.offense.ptsPerGame - standings.teams[j].stats.defense.ptsAgainstPerGame))/10 < 0) {
                $("#"+tLogo+"pointDiff").addClass("text-danger")
            } else {
                $("#"+tLogo+"pointDiff").addClass("text-success")

            }
        };
    });