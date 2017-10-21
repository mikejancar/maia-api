'use strict'
const express = require('express');
const nba = require('nba');

const app = express();
const port = 80;

app.get('/nba/players/:playername', (request, response) => {
  const player = nba.findPlayer(request.params.playername);
  if (player) {
    nba.stats.teamInfoCommon({ TeamID: player.teamId })
      .then((playerTeam) => {
        let teamInfo = playerTeam.teamInfoCommon[0];
        let thinPlayer = {
          'fullName': player.fullName,
          'team': `${teamInfo.teamCity} ${teamInfo.teamName}`
        };
        response.send(thinPlayer);
      })
      .catch((err) => {
        response.status(500).send({ message: `Error retrieving player info: ${err}` });
      });
  } else {
    response.status(500).send({ message: `Could not find player ${request.params.playername}` });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log(`Error occurred: ${err}`);
  }
  console.log(`maia-api has started on ${port}...`);
});