const list = document.getElementById("PlayerList");
const nameList = document.getElementById("NameList");

async function SearchTeam() {
    const teamValue = document.getElementById("teamDropdown").value;
    
    try {
        const request = await fetch(`https://api.balldontlie.io/v1/players?team_ids[]=${teamValue}&per_page=100`, {
        headers: {
          'Authorization': '4ef07632-648b-482d-b00c-13878b447dcc'
        }
        });
  
        const response = await request.json();
        const playerData = response.data;
  
        list.innerHTML = "";
  
        playerData.forEach(player => {
            list.appendChild(displayPlayer(player));
        });
    } catch (error) {
      alert("Request Cool-Down plases wait a mintue");
    }
}  


async function SearchName() {
    let searchName = document.getElementById("searchBar").value.trim();
    if(searchName.trim().length === 0)
    {
      return;
    }

    try{
          const request = await fetch(`https://api.balldontlie.io/v1/players?search=${searchName}&per_page=100`, {
          headers: {
            'Authorization': '4ef07632-648b-482d-b00c-13878b447dcc'
          }
          });

          const response = await request.json();
          const playerData = response.data;

          nameList.innerHTML = "";

          playerData.forEach(player => {
              nameList.appendChild(displayPlayer(player));
          });
    } catch (err) {
            alert("Request Cool-Down plases wait a mintue");
    }

}  

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomPlayer;
const randomTeam = document.getElementById("playerTeam");
const randomPosition = document.getElementById("playerPosition");
const randomJersey = document.getElementById("playerJersey");
const randomDraft = document.getElementById("playerDraft");
const gameStarter = document.getElementById("GuessGameStart");

async function PlayGame() {
    const id = getRandomInt(400);
    try {
      const request = await fetch(`https://api.balldontlie.io/v1/players/${id}`, {
      headers: {
        'Authorization': '4ef07632-648b-482d-b00c-13878b447dcc'
      }
      });
  
      const response = await request.json();
      randomPlayer = response.data;
  
      randomTeam.value = randomPlayer.team.full_name;
      randomPosition.value = randomPlayer.position;
      randomJersey.value = randomPlayer.jersey_number;
      randomDraft.value = randomPlayer.draft_year;
  
      gameStarter.innerHTML = `<label for="guessButton" class="form-label">Guess The Player</label>
                               <input type="search" class="form-control" id="GuessBar" placeholder="Guess Name">
                               <br>
                               <button type="button" class="btn btn-secondary" onclick="CheckGuess()">Take Guess</button>`;
    } catch (error) {
      alert("Request Cool-Down plases wait a mintue");
    }

} 

function CheckGuess()
{
    const nameGuess = document.getElementById("GuessBar").value.trim();
    const playerName = `${randomPlayer.first_name} ${randomPlayer.last_name}`;
    if(nameGuess.toLowerCase() == playerName.toLowerCase())
    {
        gameStarter.innerHTML = `<label class="form-label">YOU WON!!</label>
                                 <br>
                                 <label class="form-label">The Player Was</label>
                                 <input class="form-control" type="text" value="${playerName}" aria-label="readonly input example" readonly>`;
    }
}

function displayPlayer(player)
{
    const firstName = player.first_name;
    const lastName = player.last_name;

    const fullName = `${firstName} ${lastName}`;
    const number = (player.jersey_number == null) ? "" : player.jersey_number;

    const height = (player.height == null) ? "" : player.height;

    const playerIteam = document.createElement("li");
    playerIteam.className = "list-group-item";
    playerIteam.innerText = `#${number} ${fullName} ${height}`;

    return playerIteam;
}