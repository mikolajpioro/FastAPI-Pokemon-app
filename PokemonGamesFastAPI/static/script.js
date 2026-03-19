async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        
        document.getElementById('pokemon_name').innerText = data.name;
        document.getElementById('pokemon_id').innerText = `#${data.id}`;
        const spriteUrl = data.sprites.other['official-artwork'].front_default;
        document.getElementById('pokemon_sprite').src = spriteUrl;
        
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}

async function getRandomPokemonHangman() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        
        document.getElementById('pokemon_name').innerText = data.name;
        document.getElementById('pokemon_sprite').src = data.sprites.other['official-artwork'].front_default;
        
        document.getElementById('hint').innerText = "_ ".repeat(data.name.length).trim();
        
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}


function sendGuess() {
    const guessInput = document.getElementById("guessField");
    const secretNameElement = document.getElementById("pokemon_name");
    const hint = document.getElementById("hint");

    const secretName = secretNameElement.innerText.toLowerCase().trim()
    const guess = guessInput.value.toLowerCase().trim()

    let currentHintArray = hint.innerText.trim().split(' ');

    for(let i = 0; i < secretName.length; i++) {
        if(secretName[i] === guess) {
            currentHintArray[i] = guess;
        }
    }

    hint.innerText = currentHintArray.join(' ');

    guessInput.value = '';
    guessInput.focus();

    if (!hint.innerText.includes('_')) {
        alert("You caught " + secretName.toUpperCase() + "!");
        getRandomPokemonHangman();
    }
}

document.getElementById("guessField").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendGuess();
    }
});