async function callCatFacts() 
{
    let GetFacts = await fetch('https://brianobruno.github.io/cats.json');
    if(!GetFacts.ok)
    {
        alert("bruhhhhh");
        return;
    }

    let data = await GetFacts.json();
    let CatFact = data.facts;

    let CatPhoto = data.catPhoto;
    document.getElementById("photo").src=CatPhoto;

    CatFact.sort((id1, id2) => id1.factId - id2.factId);

    let list = document.getElementById('List');
    list.textContent = '';
    
    CatFact.forEach(fact => {
        let item = document.createElement('li');
        item.textContent = `Id: ${fact.factId}| fact: ${fact.text}`;
        list.appendChild(item);
    });
}