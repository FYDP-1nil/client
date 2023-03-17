import runOBSMethod, { obs } from '../Obs';
import { writeToFile } from './utility';

export const writeStats = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <link rel="stylesheet" type="text/css" href="stats.css"/> </head> <body> <div> <div> <div>${args.homeTeam}</div><div>TEAM STATS</div><div>${args.awayTeam}</div></div><div> <div>${Math.round(args.homeTeamFG)}</div><div>FG%</div><div>${Math.round(args.awayTeamFG)}</div></div><div> <div>${Math.round(args.homeTeam3PT)}</div><div>3PT%</div><div>${Math.round(args.awayTeam3PT)}</div></div><div> <div>${Math.round(args.homeTeamFT)}</div><div>Free Throws Made</div><div>${Math.round(args.awayTeamFT)}</div></div><div> <div>${args.homeTeamTurnovers}</div><div>Turnovers</div><div>${args.awayTeamTurnovers}</div></div><div> <div>${args.homeTeamSteals}</div><div>Steals</div><div>${args.awayTeamSteals}</div></div></div></body></html>`,
    filename: 'browser_source/basketball/stats.html',
    inputName: 'statscard',
  });
};

export const writeScoreCard = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html> <head> <link rel="stylesheet" type="text/css" href="scorecard.css"> </head> <div class="container"> <div class="match"> <div class="match-content"> <div class="column"> <div class="team team--home"> <div class="team-logo"> <div id="circ"></div></div><h2 style="color:blue" class="team-name">${args.homeTeam}</h2> </div></div><div class="column" style="margin-top: -70px;"> <div class="match-details"> <div class="match-score"> <span style="color:blue" class="match-score-number match-score-number--leading">${args.homeTeamScore}</span> <span class="match-score-divider">:</span> <span style="color:red" class="match-score-number">${args.awayTeamScore}</span> </div></div></div><div class="column"> <div class="team team--away"> <div class="team-logo"> <div id="test"></div></div><h2 style="color:red" class="team-name">${args.awayTeam}</h2> </div></div></div></div></div></html>`,
    filename: 'browser_source/basketball/scorecard.html',
    inputName: 'scorecard',
  });
};

export const writeTimer = async (args) => {
  await writeToFile({
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="X-UA-Compatible" content="ie=edge"/> <style>body{background-color: white; color: lightgreen; height: 94px; width: 163px; display: flex; justify-content: center; align-items: center; /* padding: 200px; */ flex-direction: column;}div{display: flex; flex-direction: column; align-items: center; justify-content: space-between; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px; font-weight: normal;}p{margin: 10px;}</style> </head> <body> <div> <p style="color: gray; font-weight: bold">${args.gameSequence}</p><p id="time" style="color: red; font-size: 25px">${args.startTimePrint}</p></div></body> <script>var display_div=document.getElementById('time'); let time=0; function incrementCount(current_count){let time=current_count; setInterval(()=>{time +=1000; display_div.innerHTML=('0' + Math.floor(time / 60000)).slice(-2) + ':' + ('0' + Math.floor((time / 1000) % 60)).slice(-2);}, 1000);}if(!${args.noTime}){incrementCount(${args.minute} * 60 * 1000);} </script></html>`,
    filename: 'browser_source/basketball/scoretimer.html',
    inputName: 'scorecardtimer',
  });
};
