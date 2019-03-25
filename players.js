var playerPicks = [
    {
        name: "Zion Williamson",
        position: "PF",
        ht: "6-7",
        wt: 285,
        school: "Duke",
        birthday: "",
    },
    {
        name: "Ja Morant",
        position: "PG",
        ht: "6-3",
        wt: 170,
        school: "Murray State",
        birthday: "",
    },
    {
        name: "Jarrett Culver",
        position: "SG",
        ht: "6-6",
        wt: 195,
        school: "Texas Tech",
        birthday: "",
    },
    {
        name: "Brandon Clarke",
        position: "PF",
        ht: "6-8",
        wt: 215,
        school: "Gonzaga",
        birthday: "",
    },
    {
        name: "R.J. Barrett",
        position: "SF",
        ht: "6-7",
        wt: 202,
        school: "Duke",
        birthday: "",
    },
    {
        name: "Cam Reddish",
        position: "SF",
        ht: "6-8",
        wt: 218,
        school: "Duke",
        birthday: "",
    },
    {
        name: "Jaxson Hayes",
        position: "C",
        ht: "6-11",
        wt: 233,
        school: "Texas",
        birthday: "",
    },

    {
        name: "De'Andre Hunter",
        position: "SF",
        ht: "6-7",
        wt: 233,
        school: "Virginia",
        birthday: "",
    },
    {
        name: "Jontay Porter",
        position: "C",
        ht: "6-11.5",
        wt: 236,
        school: "Missouri",
        birthday: "",
    },
    {
        name: "Bol Bol",
        position: "C",
        ht: "7-2",
        wt: 222,
        school: "Oregon",
        birthday: "",
    },
    {
        name: "Darius Garland",
        position: "PG",
        ht: "6-3",
        wt: 173,
        school: "Vanderbilt",
        birthday: "",
    },
    {
        name: "Bruno Fernando",
        position: "C",
        ht: "6-9.75",
        wt: 233,
        school: "Maryland",
        birthday: "",
    },
    {
        name: "Sekou Doumbouya",
        position: "PF",
        ht: "6-9",
        wt: 230,
        school: "Limoges CSP",
        birthday: "",
    },
    {
        name: "Romeo Langford",
        position: "SG",
        ht: "6-6",
        wt: 202,
        school: "Indiana",
        birthday: "",
    },
    {
        name: "Rui Hachimura",
        position: "PF",
        ht: "6-8",
        wt: 225,
        school: "Gonzaga",
        birthday: "",
    },







]

for (i = 0; i < playerPicks.length; i++) {

    var playerPickString = '<table class="table  table-borderless p-0 m-0">';
    playerPickString += '<thead>'
    playerPickString += '<th class="p-0 m-0"></th>'
    playerPickString += '<th class="p-0 m-0></th>'
    playerPickString += '<th class="p-0 m-0></th>'
    playerPickString += '</thead>'
    playerPickString += '<tbody>'
    playerPickString += '<tr>'
    playerPickString += '<td class="text-left playerFont p-0 m-0">' + playerPicks[i].name + " - " + playerPicks[i].position + " | " + playerPicks[i].ht + " | " + playerPicks[i].wt + '</td>';
    playerPickString += '<td class=" text-center p-0 m-0"></td>';
    playerPickString += '<td class="text-right playerFont p-0 m-0">' + playerPicks[i].school + '</td>';
    playerPickString += '</tr>'
    playerPickString += '</tbody>'
    playerPickString += '</table>'


    $("#playerPick" + [i + 1]).append(playerPickString);
};

console.log(playerPicks)