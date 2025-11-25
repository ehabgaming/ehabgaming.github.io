
const westHolder = document.getElementById("West");
const eastHolder = document.getElementById("East");
const gleagueHolder = document.getElementById("Gleague");

async function getTeams() {
  try {
    const response = await fetch(`https://api.balldontlie.io/v1/teams`, {
      headers: {
        'Authorization': '4ef07632-648b-482d-b00c-13878b447dcc'
      }
    });
    
    const result = await response.json();
    const teamsData = result.data;
  
    teamsData.forEach(team =>  {
      if(team.conference == "West")
      {
        westHolder.appendChild(displayTeam(team));
      }
      else if(team.conference == "East")
      {
        eastHolder.appendChild(displayTeam(team));
      }
      else
      {
        gleagueHolder.appendChild(displayTeam(team));
      }
    });
  } catch (error) {
    bootstrap.Toast.getOrCreateInstance('#myToast').show();
  }
  
}


function displayTeam(team)
{
    const name = team.full_name;
    const abbreviation = team.abbreviation;
    let conference = team.conference;
    if(conference == "    ")
    {
      conference = "G-League"
    }

    const card = document.createElement("li");
    card.className = "list-group-item";

    card.innerHTML = `<div class="card">
                        <div class="card-body">
                          <h5 class="card-title">${name}</h5>
                          <h6 class="card-subtitle mb-2 text-body-secondary">${abbreviation}</h6>
                        </div>
                      </div>`;

    return card;
}


getTeams();

