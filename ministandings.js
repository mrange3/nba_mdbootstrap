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

            var teamStandingsAbv = standings.teams[j].team.abbreviation;

            if (teamStandingsAbv == "OKL") {
                teamStandingsAbv = "OKC"
              }
              if (teamStandingsAbv == "BRO") {
                teamStandingsAbv = "BKN"
              }
              $(".clickShow").hide();
              $(".clickShow2").hide();


            if (standings.teams[j].playoffRank.conferenceName == "Western") {
                var standingsStringW = '<td class="dateFont mainDate align-middle text-center py-0 px-1 m-0 font-weight-bold" style="font-size: 12px; ">'+ playoffSeed + '</td>'
                standingsStringW += '<th class="dateFont mainDate align-middle clickHide text-left py-0 pl-0 pr-1 text-nowrap boxtable " style="font-size: 16px;"><img class=" smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +teamStandingsAbv+ '</th>'
                standingsStringW += '<th  class="dateFont   align-middle text-left py-0 pl-0 pr-1 text-nowrap boxtable dateFont westernStats collapse" style="font-size: 16px;"><img class=" smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +standings.teams[j].team.city+ " " + standings.teams[j].team.name+'</th>'
                standingsStringW += '<th class="dateFont mainDate align-middle text-center py-0 px-1 teamstatsData dateFont " style="font-size: 16px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses +'</th>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1  teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + " " + standings.teams[j].conferenceRank.gamesBack + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + tRebounds + '</td>'
                standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 plusMinus teamstatsData collapse westernStats"   aria-labelledby="headingOne" data-parent="#westernConference">' + diff + '</td>'

                $("#wSTeam"+standings.teams[j].playoffRank.rank).append(standingsStringW)
            } else {
                var standingsStringE = '<td class="dateFont mainDate align-middle text-center py-0 px-1 m-0 font-weight-bold" style="font-size: 12px;">'+ playoffSeed + '</td>'
                standingsStringE += '<th class="dateFont mainDate align-middle clickHide2 text-left py-0  pl-0 pr-1 text-nowrap boxteam boxtable " style="font-size: 16px;"><img class="p-0 m-0 smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +teamStandingsAbv  + '</th>'
                standingsStringE += '<th  class="dateFont mainDate collapse easternStats align-middle text-left py-0 pl-0 pr-4 text-nowrap boxtable " style="font-size: 16px;"><img class=" smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +standings.teams[j].team.city+ " " + standings.teams[j].team.name+'</th>'
                standingsStringE += '<th class="dateFont mainDate align-middle text-center py-0 px-1 teamstatsData " style="font-size: 16px;">' + standings.teams[j].stats.standings.wins + "-" + standings.teams[j].stats.standings.losses +'</th>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + standings.teams[j].conferenceRank.gamesBack +'</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + tRebounds + '</td>'
                standingsStringE += '<td class="dateFont mainDate align-middle text-center py-0 px-1 plusMinusteamstatsData collapse easternStats"  aria-labelledby="headingOne" data-parent="#easternConference">' + diff + '</td>'
                $("#eSTeam"+standings.teams[j].playoffRank.rank).append(standingsStringE)

            }

            // if (Math.round(10*(standings.teams[j].stats.offense.ptsPerGame - standings.teams[j].stats.defense.ptsAgainstPerGame))/10 < 0) {
            //     $("#"+tLogo+"pointDiff").addClass("text-danger")
            // } else {
            //     $("#"+tLogo+"pointDiff").addClass("text-success")

            // }
        };
    });  
    
