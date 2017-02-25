'use strict'
const express = require('express');
const nba = require('nba');

const app = express();
const port = process.env.PORT || 2016;

app.get('/nba/players/:playername', (request, response) => {
  let player = nba.findPlayer(request.params.playername);
  nba.stats.teamInfoCommon({ TeamID: player.teamId })
    .then((playerTeam) => {
      let teamInfo = playerTeam.teamInfoCommon[0];
      let thinPlayer = {
        'fullName': player.fullName,
        'team': teamInfo.teamCity + ' ' + teamInfo.teamName
      };
      response.send(thinPlayer);
    });
});

app.listen(port, (err) => {
  if (err) {
    return console.log(`Error occurred: ${err}`);
  }
  console.log(`maia-api has started on ${port}...`);
});