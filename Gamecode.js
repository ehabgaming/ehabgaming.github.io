
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const yesterday =   `${year}-${month}-${day-1}`;
const today =   `${year}-${month}-${day}`;
const tomorrow =   `${year}-${month}-${day+1}`;

const gameHolder = document.getElementById("Games_Grid");

async function getLiveGames(date) {
  try {
    const response = await fetch(`https://api.balldontlie.io/v1/games?dates[]=${date}`, {
      headers: {
        'Authorization': '4ef07632-648b-482d-b00c-13878b447dcc'
      }
    });
    
    const result = await response.json();
    const todayGames = result.data;
    gameHolder.innerHTML = "";

    if(todayGames.length == 0)
    {
      gameHolder.innerHTML = `<div class="col"></div><div class="col"><div class="alert alert-warning" role="alert">No Games Found<br>${date}</div></div>`;
      return;
    }
  
    todayGames.forEach(games =>  {
      gameHolder.appendChild(displayGame(games));
    });
  } catch (error) {
    bootstrap.Toast.getOrCreateInstance('#myToast').show();
  }
}

function displayGame(games)
{
    let time = games.time;
    let getStartTime = new Date(games.datetime);
    let startTime = getStartTime.toLocaleString("en-US", { timeZone: "America/New_York" });
    
    let tipOffTime = startTime.slice(12);
    if(time == "Final" || time != null)
    {
      tipOffTime = "";
    }

    if(time == null)
    {
      time = games.date;
    }
    const homeTeam = games.home_team.full_name;
    const homeTeamScore = games.home_team_score;

    const awayTeam = games.visitor_team.full_name;
    const awayTeamScore = games.visitor_team_score;

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `<div class="card">
                        <div class="card-body">
                          <p>${homeTeam} @ ${awayTeam}</p>
                          <p>${homeTeamScore} - ${awayTeamScore}</p>
                          <span class="badge rounded-pill text-bg-danger">
                          ${time}
                          </span>
                          <br>
                          <span class="badge rounded-pill text-bg-light">${tipOffTime}</span>
                        </div>
                      </div>`;
    return card;
}

function yesterdayGames()
{
  getLiveGames(yesterday);
}

function todayGames()
{
  getLiveGames(today);
}

function tomorrowGames()
{
  getLiveGames(tomorrow);
}


getLiveGames(today);
