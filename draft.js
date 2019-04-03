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
        rank: 30,
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
        rank: 11,
        collegelogo: "maryland",

    },
    {
        name: "Sekou Doumbouya",
        position: "PF",
        ht: "6-9",
        wt: 230,
        school: "Limoges CSP",
        birthday: "",
        rank: 12,
        collegelogo: "Limoges",

    },
    {
        name: "Romeo Langford",
        position: "SG",
        ht: "6-6",
        wt: 202,
        school: "Indiana",
        birthday: "",
        rank: 13,
        collegelogo: "indiana",

    },
    {
        name: "Rui Hachimura",
        position: "PF",
        ht: "6-8",
        wt: 225,
        school: "Gonzaga",
        birthday: "",
        rank: 14,
        collegelogo: "gonzaga",

    },
    {
        name: "Tyler Herro",
        position: "SG",
        ht: "6-5",
        wt: 195,
        school: "Kentucky",
        birthday: "",
        rank: 15,
        collegelogo: "kentucky",
    },
    {
        name: "Coby White",
        position: "PG/SG",
        ht: "6-5",
        wt: 185,
        school: "North Carolina",
        birthday: "",
        rank: 16,
        collegelogo: "UNC",

    },
    {
        name: "Grant Williams",
        position: "PF",
        ht: "6-7",
        wt: 241,
        school: "Tennessee",
        birthday: "",
        rank: 17,
        collegelogo: "tennessee",

    },
    {
        name: "Nassir Little",
        position: "SF",
        ht: "6-6",
        wt: 220,
        school: "North Carolina",
        birthday: "",
        rank: 18,
        collegelogo: "UNC",

    },
    {
        name: "Keldon Johnson",
        position: "SF",
        ht: "6-6",
        wt: 211,
        school: "Kentucky",
        birthday: "",
        rank: 19,
        collegelogo: "kentucky",

    },
    {
        name: "Nickeil Alexander-Walker",
        position: "SG",
        ht: "6-5",
        wt: 210,
        school: "Virginia Tech",
        birthday: "",
        rank: 20,
        collegelogo: "virginiatech",

    },
    {
        name: "Tre Jones",
        position: "PG",
        ht: "6-2",
        wt: 183,
        school: "Duke",
        birthday: "",
        rank: 21,
        collegelogo: "duke",

    },

    {
        name: "P.J. Washington",
        position: "PF",
        ht: "6-8",
        wt: 228,
        school: "Kentucky",
        birthday: "",
        rank: 22,
        collegelogo: "kentucky",

    },
    {
        name: "Kevin Porter Jr.",
        position: "SG",
        ht: "6-5",
        wt: 217,
        school: "USC",
        birthday: "",
        rank: 23,
        collegelogo: "USC",

    },
    {
        name: "Matisse Thybulle",
        position: "SF",
        ht: "6-5",
        wt: 190,
        school: "Washington",
        birthday: "",
        rank: 24,
        collegelogo: "washington",

    },
    {
        name: "Talen Horton-Tucker",
        position: "SF",
        ht: "6-4",
        wt: 233,
        school: "Iowa State",
        birthday: "",
        rank: 25,
        collegelogo: "iowastate",

    },
    {
        name: "Shamorie Ponds",
        position: "PG",
        ht: "6-1",
        wt: 175,
        school: "St. Johns",
        birthday: "",
        rank: 26,
        collegelogo: "stjohns",

    },
    {
        name: "Chuma Okeke",
        position: "PF",
        ht: "6-8",
        wt: 235,
        school: "Auburn",
        birthday: "",
        rank: 27,
        collegelogo: "auburn",

    },
    {
        name: "Cameron Johnson",
        position: "SF",
        ht: "6-8",
        wt: 210,
        school: "North Carolina",
        birthday: "",
        rank: 28,
        collegelogo: "UNC",

    },
    {
        name: "Ty Jerome",
        position: "PG/SG",
        ht: "6-5",
        wt: 195,
        school: "Virginia",
        birthday: "",
        rank: 29,
        collegelogo: "virginia",

    },

]
 
var pickOrder = []
var lotteryTeams = [];
var playoffTeams = [];




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

/////////////////Sort Playoff & Lottery Teams ///////////////////////////////
        for (j = 0; j < standings.teams.length; j++) {

            if (standings.teams[j].playoffRank.rank > 8) {
                lotteryTeams.push(standings.teams[j].overallRank.rank);
            } else if (standings.teams[j].playoffRank.rank < 9) {
                playoffTeams.push(standings.teams[j].overallRank.rank);
            }

        };
        
        lotteryTeams.sort(function(a, b){return b - a});
        playoffTeams.sort(function(a, b){return b - a});

///////////// Lottery Order //////////////////////////////////////////////
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
          }
////////////Draft Functions///////////////////////////////////////////////////////
        function lottery() {
            $("#draftHolder").empty();        
        pickOrder = lotteryTeams.concat(playoffTeams);

        console.log(pickOrder)

        for (i = 0; i < 30; i++) {

            for (j = 0; j < 30; j++) {
                if (standings.teams[j].overallRank.rank == pickOrder[i]) {
                    var tLogo = standings.teams[j].team.abbreviation.toLowerCase();

                    var teamPickString = '<div class="row mb-2">';
                    teamPickString += '<div class="col-2 m-0 mobileHide p-0"></div>';
                    teamPickString += '<div class="col-1 m-0 pl-1 pr-0">';
                    teamPickString += '<div class="card text-white align-middle text-center">';
                    teamPickString += '<p class="m-0 p-1" id="pickNumber'+[i+1]+'">'+[i+1]+'</p>';
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '<div class="col-3  m-0 px-1 py-0">';
                    teamPickString += '<div class="card rounded-0 d-flex flex-row card-background p-1" id="teamSpot'+[i+1]+'">';
                    teamPickString += '<div class="mr-auto p-0 draftLogo deskHide inline align-middle"><img src="images/logos/' + tLogo + '.png" height="25px" width="25px">'+ " " +standings.teams[j].team.abbreviation + '</div>'
                    teamPickString += '<div class="mr-auto p-0 mobileHide inline align-middle"><img src="images/logos/' + tLogo + '.png" height="25px" width="25px">'+ " " +standings.teams[j].team.city + " " + standings.teams[j].team.name + '</div>'
                    teamPickString += '<div class="px-1 mobileHide draftLogo inline align-middle"><small>'+ " " +standings.teams[j].stats.standings.wins + " - " + standings.teams[j].stats.standings.losses + '</small></div>'
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '<div class="col m-0 pr-1 pl-0">';
                    teamPickString += '<div class="card rounded-0 card-background playerPick d-flex flex-row p-1" id="pickSpot'+[i+1]+'">';
                    teamPickString += '<div class="mr-auto p-0 draftLogo draftText inline"><img src="images/collegelogos/' + players[i].collegelogo + '.png" height="25px" width="25px">' + " " + players[i].name  +'</div>'
                    teamPickString += '<div class=" draftLogo inline pr-1"><small>'+ players[i].position + '</small></div>'
                    teamPickString += '<div class=" draftLogo "><small>'+ " | " + players[i].ht + " | " + players[i].wt + '<small></div>'
                    teamPickString += '</div>';
                    teamPickString += '</div>';
                    teamPickString += '<div class="col-2 m-0 mobileHide p-0"></div>';
                    teamPickString += '</div>';
                    $("#draftHolder").append(teamPickString);

                    if (pickOrder[i] > 16) {
                        $("#pickNumber"+[i+1]).addClass("primary-color-dark")
                    } else {
                        $("#pickNumber"+[i+1]).addClass("bg-dark")

                    }
    


                }
            }
            }

        }  
        lottery();
        $("#lotteryBtn").click(function() {
            shuffle(lotteryTeams)
            lottery();
          });
        
    });
