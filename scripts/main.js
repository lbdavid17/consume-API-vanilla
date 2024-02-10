const URL_BASE= "https://pokeapi.co/api/v2/pokemon/";

const searchPokemon= () =>{
   const pokemon= document.getElementById("pokemonToSearch").value;
   const url= URL_BASE+pokemon.toLowerCase();

   const wayOption= document.getElementById("way").value;
   const showOption=document.getElementById("show").value;

   if (wayOption=="promises")
      fetchByPromises(url,showOption);
   else if (wayOption=="asyncawait")
      fetchByAsyncAwait(url,showOption);
    
}

const fetchByPromises = (url,showOption) =>{
   fetch (url)
      .then (response => response.json())
      .then ( data =>{
         
         if (showOption === "stats")
            showStats(data);
         else if (showOption =="shiny")
            showShiny(data);
      })
      .catch(error => {
         showError();
      })

}

const fetchByAsyncAwait = async (url,showOption) =>{
   try{
      const response= await fetch(url);
      const data= await response.json();
      if (showOption === "stats")
         showStats(data);
      else if (showOption =="shiny")
         showShiny(data);
   }catch{
      showError();
   }
}

const showStats= (data) => {
   resultadoDiv.textContent = '';
   const stats = data.stats;

   stats.forEach(element => {
      const statInfo = document.createElement('p');
      statInfo.textContent = element.stat.name.toUpperCase() + ' ' + element.base_stat;
      resultadoDiv.appendChild(statInfo);
   });   
}

const showShiny= (data) => {
   resultadoDiv.textContent = '';
   const shinyImage= document.createElement("img");

   shinyImage.src=data.sprites.front_shiny;
   shinyImage.alt="imagen del shiny";
   resultadoDiv.appendChild(shinyImage);
}

const showError = () => {
   resultadoDiv.textContent = "Error al obtener datos del pokémon";
}

let button= document.getElementById("search");
const resultadoDiv = document.getElementById("resultContainer");
button.addEventListener("click",searchPokemon)




