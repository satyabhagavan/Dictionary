let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = "fd529f8c-111b-4e20-8fe5-5ba945373018"
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def')
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');


searchBtn.addEventListener('click', function(e){
    e.preventDefault();


    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // get the user input
    let word = input.value;
    //console.log(word);

    // call the api
    if(word === '')
    {
    	alert('Word is required');
    }

    getData(word);
})

async function getData(word) {

    loading.style.display = 'block';

	const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    
    const data = await response.json();

    //if no data returned
    if(!data.length)
    {
        loading.style.display = 'none';
        notFound.innerHTML = 'No result found'
        return;
    }
    
    //if results is suggestion of searched
    if(typeof data[0] === 'string')
    {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerHTML = 'Do you mean?'
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerHTML = element;

            notFound.appendChild(suggestion)
        })
        return;
    }


    // we got the result
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerHTML = defination

    //audio file
    let soundName = data[0].hwi.prs[0].sound.audio;
    
    if(soundName)
    {
        renderSound(soundName);
    }


    console.log(data);
}


function renderSound(soundName)
{
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}