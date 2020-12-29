var teamsUrl = "https://data.nba.net/10s/prod/v1/current/standings_conference.json"

$.ajax
    ({
        type: "GET",
        url: teamsUrl,
        dataType: 'json',

    })
    .then(function (standings) {
        console.log(standings)

        // /Main Standings///////////////
        for (j = 0; j < standings.league.standard.conference.west.length; j++) {
            wtLogo = standings.league.standard.conference.west[j].teamSitesOnly.teamTricode.toLowerCase();
            var wplayoffSeed = standings.league.standard.conference.west[j].confRank;
            var wteamStandingsAbv = standings.league.standard.conference.west[j].teamSitesOnly.teamTricode;
            var wteamWins = standings.league.standard.conference.west[j].win;
            var wteamLoss = standings.league.standard.conference.west[j].loss;

            if (wplayoffSeed > 8) {
                wplayoffSeed = "";
            }




            //   $(".clickShow").hide();
            //   $(".clickShow2").hide();


                var standingsStringW = '<td class="dateFont mainDate align-middle text-center py-0 px-1 m-0 font-weight-bold" style="font-size: 12px; ">'+ wplayoffSeed + '</td>'
                standingsStringW += '<th class="dateFont mainDate align-middle clickHide text-left py-0 pl-0 pr-1 text-nowrap boxtable " style="font-size: 20px; font-family: Changa One;"><img class=" smallLogo" src="images/logos/' + wtLogo + '.png" >'+ " " +wteamStandingsAbv+ '</th>'
                // standingsStringW += '<th  class="dateFont   align-middle text-left py-0 pl-0 pr-1 text-nowrap boxtable dateFont westernStats collapse" style="font-size: 16px;"><img class=" smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +standings.teams[j].team.city+ " " + standings.teams[j].team.name+'</th>'
                standingsStringW += '<th class="dateFont mainDate align-middle text-center py-0 px-1 teamstatsData dateFont font-weight-bold " style="font-size: 20px; font-family: Changa One;">' + wteamWins + "-" + wteamLoss +'</th>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1  teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + " " + standings.teams[j].conferenceRank.gamesBack + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + tRebounds + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 plusMinus teamstatsData collapse westernStats"   aria-labelledby="headingOne" data-parent="#westernConference">' + diff + '</td>'

                $("#wSTeam"+[j+1]).append(standingsStringW)


                
        };
        for (j = 0; j < standings.league.standard.conference.east.length; j++) {
            etLogo = standings.league.standard.conference.east[j].teamSitesOnly.teamTricode.toLowerCase();
            var eplayoffSeed = standings.league.standard.conference.east[j].confRank;
            var eteamStandingsAbv = standings.league.standard.conference.east[j].teamSitesOnly.teamTricode;
            var eteamWins = standings.league.standard.conference.east[j].win;
            var eteamLoss = standings.league.standard.conference.east[j].loss;

            if (eplayoffSeed > 8) {
                eplayoffSeed = "";
            }




            //   $(".clickShow").hide();
            //   $(".clickShow2").hide();


                var standingsStringE = '<td class="dateFont mainDate align-middle text-center py-0 px-1 m-0 font-weight-bold" style="font-size: 12px; ">'+ eplayoffSeed + '</td>'
                standingsStringE += '<th class="dateFont mainDate align-middle clickHide text-left py-0 pl-0 pr-1 text-nowrap boxtable f " style="font-size: 20px; font-family: Changa One;"><img class=" smallLogo" src="images/logos/' + etLogo + '.png" >'+ " " +eteamStandingsAbv+ '</th>'
                // standingsStringW += '<th  class="dateFont   align-middle text-left py-0 pl-0 pr-1 text-nowrap boxtable dateFont westernStats collapse" style="font-size: 16px;"><img class=" smallLogo" src="images/logos/' + tLogo + '.png" >'+ " " +standings.teams[j].team.city+ " " + standings.teams[j].team.name+'</th>'
                standingsStringE += '<th class="dateFont mainDate align-middle text-center py-0 px-1 teamstatsData dateFont " style="font-size: 20px; font-family: Changa One;">' + eteamWins + "-" + eteamLoss +'</th>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1  teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + " " + standings.teams[j].conferenceRank.gamesBack + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.offense.ptsPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.ptsAgainstPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.offense.astPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.blkPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + standings.teams[j].stats.defense.stlPerGame + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 mobileHide teamstatsData collapse westernStats"  aria-labelledby="headingOne" data-parent="#westernConference">' + tRebounds + '</td>'
                // standingsStringW += '<td class="dateFont mainDate align-middle text-center py-0 px-1 plusMinus teamstatsData collapse westernStats"   aria-labelledby="headingOne" data-parent="#westernConference">' + diff + '</td>'

                $("#eSTeam"+[j+1]).append(standingsStringE)


                
        };

    });  
    
