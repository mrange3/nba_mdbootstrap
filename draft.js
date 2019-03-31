var teamsUrl = "https://api.mysportsfeeds.com/v2.0/pull/nba/current/standings.json"


var api = config.MY_KEY

var players = [
    {
        name: "Zion Williamson",
        position: "PF",
        ht: "6-7",
        wt: 285,
        school: "Duke",
        birthday: "",
        rank: 1,
        collegelogo: "duke",
    },
    {
        name: "Ja Morant",
        position: "PG",
        ht: "6-3",
        wt: 170,
        school: "Murray State",
        birthday: "",
        rank: 2,
        collegelogo: "murrayst",

    },
    {
        name: "Jarrett Culver",
        position: "SG",
        ht: "6-6",
        wt: 195,
        school: "Texas Tech",
        birthday: "",
        rank: 4,
        collegelogo: "texastech",

    },
    {
        name: "Brandon Clarke",
        position: "PF",
        ht: "6-8",
        wt: 215,
        school: "Gonzaga",
        birthday: "",
        rank: 7,
        collegelogo: "gonzaga",

    },
    {
        name: "R.J. Barrett",
        position: "SF",
        ht: "6-7",
        wt: 202,
        school: "Duke",
        birthday: "",
        rank: 3,
        collegelogo: "duke",

    },
    {
        name: "Cam Reddish",
        position: "SF",
        ht: "6-8",
        wt: 218,
        school: "Duke",
        birthday: "",
        rank: 5,
        collegelogo: "duke",

    },
    {
        name: "Jaxson Hayes",
        position: "C",
        ht: "6-11",
        wt: 233,
        school: "Texas",
        birthday: "",
        rank: 8,
        collegelogo: "texas",

    },

    {
        name: "De'Andre Hunter",
        position: "SF",
        ht: "6-7",
        wt: 233,
        school: "Virginia",
        birthday: "",
        rank: 6,
        collegelogo: "virginia",

    },
    {
        name: "Jontay Porter",
        position: "C",
        ht: "6-11.5",
        wt: 236,
        school: "Missouri",
        birthday: "",
        rank: 20,
        collegelogo: "mizzou",

    },
    {
        name: "Bol Bol",
        position: "C",
        ht: "7-2",
        wt: 222,
        school: "Oregon",
        birthday: "",
        rank: 10,
        collegelogo: "oregon",

    },
    {
        name: "Darius Garland",
        position: "PG",
        ht: "6-3",
        wt: 173,
        school: "Vanderbilt",
        birthday: "",
        rank: 9,
        collegelogo: "vanderbilt",

    },
    {
        name: "Bruno Fernando",
        position: "C",
        ht: "6-9.75",
        wt: 233,
        school: "Maryland",
        birthday: "",
        collegelogo: "maryland",

    },
    {
        name: "Sekou Doumbouya",
        position: "PF",
        ht: "6-9",
        wt: 230,
        school: "Limoges CSP",
        birthday: "",
        collegelogo: "limoges",

    },
    {
        name: "Romeo Langford",
        position: "SG",
        ht: "6-6",
        wt: 202,
        school: "Indiana",
        birthday: "",
        collegelogo: "indiana",

    },
    {
        name: "Rui Hachimura",
        position: "PF",
        ht: "6-8",
        wt: 225,
        school: "Gonzaga",
        birthday: "",
        collegelogo: "gonzaga",

    },
]


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

                    var teamPickString = '<div class="col-1 m-0 p-0"></div>';
                    teamPickString += '<div class="col-1 m-0 p-0">';
                    teamPickString += '<div class="card bg-dark text-white align-middle text-center">';
                    teamPickString += '<p class="m-0 p-1">'+[i+1]+'</p>';
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '<div class="col-4 m-0 px-1">';
                    teamPickString += '<div class="card card-background">';
                    teamPickString += '<p class="m-0 p-1"><img src="images/logos/' + tLogo + '.png" height="25px" width="25px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</p>'
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '<div class="col-5 m-0 p-0">';
                    teamPickString += '<div class="card card-background p-1">';
                    teamPickString += '<div class="m-0 p-0 playerPick " id="pickSpot'+[i+1]+'">';
                    teamPickString += '<span class="m-0 p-1 inline"><img src="images/collegelogos/' + players[i].collegelogo + '.png" height="25px" width="25px">' + " " + players[i].name + "  " +'</span>'
                    teamPickString += '<span class="m-0 p-1 inline">'+ players[i].position + " | " + players[i].ht + " | " + players[i].wt + '</span>'
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '<div class="col-1 m-0 p-0"></div>';
                    teamPickString += '</div>';
                    $("#draftrow"+[i+1]).append(teamPickString)
        

                }

            }

            }

        
    });
    