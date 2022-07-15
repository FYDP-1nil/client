import runOBSMethod, { obs } from '../Obs';
import { writeToFile } from './utility';

export const writeSubs = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <link rel="stylesheet" type="text/css" href="substitution.css"> </head> <body> <div> <p class="playeroff">${args.playerOff}</p><div class="first-down"> ▼ </div><div class="second-down"> ▼ </div></div><p> ${args.time}' </p><div> <p class="playeron">${args.playerOn}</p><div class="first-up"> ▲ </div><div class="second-up"> ▲ </div></div></body></html>`,
    filename: 'browser_source/soccer/substitution.html',
    inputName: 'substitutioncard',
  });
};

export const writeStats = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <link rel="stylesheet" type="text/css" href="stats.css"> </head> <body> <div> <div> <div> ${args.homeTeam}</div><div> TEAM STATS </div><div> ${args.awayTeam}</div></div><div> <div> ${args.homeTeamGoals}</div><div> Goals </div><div> ${args.awayTeamGoals}</div></div><div> <div> ${args.homeTeamShots}</div><div> Shots </div><div> ${args.awayTeamShots}</div></div><div> <div> ${args.homeTeamShotsOnTarget}</div><div> Shots on Target </div><div> ${args.awayTeamShotsOnTarget}</div></div><div> <div> ${args.homeTeamFouls}</div><div> Fouls </div><div> ${args.awayTeamFouls}</div></div><div> <div> ${args.homeTeamYellowCards}</div><div> Yellow Cards </div><div> ${args.awayTeamYellowCards}</div></div><div> <div> ${args.homeTeamRedCards}</div><div> Red Cards </div><div> ${args.awayTeamRedCards}</div></div><div> <div> ${args.homeTeamOffsides}</div><div> Offsides </div><div> ${args.awayTeamOffsides}</div></div></div></body></html>`,
    filename: 'browser_source/soccer/stats.html',
    inputName: 'statscard',
  });
};

export const writeScoreCard = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html> <head> <link rel="stylesheet" type="text/css" href="scorecard.css"> </head> <div class="container"> <div class="match"> <div class="match-content"> <div class="column"> <div class="team team--home"> <div class="team-logo"> <div id="circ"></div></div><h2 style="color:blue" class="team-name">${args.homeTeam}</h2> </div></div><div class="column" style="margin-top: -70px;"> <div class="match-details"> <div class="match-score"> <span style="color:blue" class="match-score-number match-score-number--leading">${args.homeTeamScore}</span> <span class="match-score-divider">:</span> <span style="color:red" class="match-score-number">${args.awayTeamScore}</span> </div></div></div><div class="column"> <div class="team team--away"> <div class="team-logo"> <div id="test"></div></div><h2 style="color:red" class="team-name">${args.awayTeam}</h2> </div></div></div></div></div></html>`,
    filename: 'browser_source/soccer/scorecard.html',
    inputName: 'scorecard',
  });
};

export const writeRedCard = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <link rel="stylesheet" type="text/css" href="red_card.css"> </head> <body> <div> <p>RED CARD</p><p class="playername">${args.player}</p></div></body></html>`,
    filename: 'browser_source/soccer/red_card.html',
    inputName: 'redcardcard',
  });
};

export const writeYellowCard = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <link rel="stylesheet" type="text/css" href="yellow_card.css"> </head> <body> <div> <p>YELLOW CARD</p><p class="playername">${args.player}</p></div></body></html>`,
    filename: 'browser_source/soccer/yellow_card.html',
    inputName: 'yellowcardcard',
  });
};

export const writeTimer = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <style>body{background-color: white; color: lightgreen; height: 94px; width: 163px; display: flex; justify-content: center; align-items: center; /* padding: 200px; */ flex-direction: column;}div{display: flex; flex-direction: column; align-items: center; justify-content: space-between; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-size: 20px; font-weight: normal;}p{margin: 10px;}</style> </head> <body> <div> <p style="color: gray; font-weight: bold;"> SECOND HALF </p><p style="color: red; font-size: 25px;"> 10:00 </p></div></body></html>`,
    filename: 'browser_source/soccer/scoretimer.html',
    inputName: 'scoretimercard',
  });
};
