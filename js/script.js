async function show_pokemon_description(name, container){
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`
    const resultado = await fetch(url);
    const datos = await resultado.json();
    let text;
    let text2;

    if (name!= 'meloetta' && name!='kyurem' && name!='cryogonal' && name!='escavalier'){
        text = datos['flavor_text_entries'][1]['flavor_text'];
        text2 = datos['flavor_text_entries'][3]['flavor_text'];
    }else if(name=='meloetta'){
        text = datos['flavor_text_entries'][0]['flavor_text'];
        text2 = datos['flavor_text_entries'][2]['flavor_text'];
    }else{
        text = datos['flavor_text_entries'][2]['flavor_text'];
        text2 = datos['flavor_text_entries'][4]['flavor_text'];
    }
    

    let pokemon_text = document.querySelector('.pokemon_data_text');
    if(pokemon_text==null){
        pokemon_text = document.createElement('P');
        pokemon_text.classList.add('pokemon_data_text');
        pokemon_text.textContent = text;
        container.appendChild(pokemon_text);

    }else{
        pokemon_text.textContent = text;
    }

    let pokemon_text2 = document.querySelector('.pokemon_data_text2');
    if(pokemon_text2==null){
        pokemon_text2 = document.createElement('P');
        pokemon_text2.classList.add('pokemon_data_text2');
        pokemon_text2.textContent = text2;
        container.appendChild(pokemon_text2);

    }else{
        pokemon_text2.textContent = text2;
    }
}

async function show_pokemon_info(name, display_name, nr){
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const resultado = await fetch(url);
    const datos = await resultado.json();
    const src = datos['sprites']['other']['official-artwork']['front_default'];
    let types;
    
    if(datos["types"].length == 2){
        types=`${datos["types"][0]['type']['name']} / ${datos["types"][1]['type']['name']}`;
    }else{
        types = `${datos["types"][0]['type']['name']}`;
    }

    let pokemon_heading = document.querySelector('.pokemon_data_heading');
    if(pokemon_heading==null){
        pokemon_heading = document.createElement('H2');
        pokemon_heading.classList.add('pokemon_data_heading');
        pokemon_heading.textContent = `${display_name} ${nr}`;
        document.querySelector('.pokemon_data').appendChild(pokemon_heading);

    }else{
        pokemon_heading.textContent = `${display_name} ${nr}`;
    }

    let pokemon_container_data = document.querySelector('.pokemon_container_data');
    if(pokemon_container_data==null){
        pokemon_container_data=document.createElement('DIV');
        pokemon_container_data.classList.add('pokemon_container_data');
        document.querySelector('.pokemon_data').appendChild(pokemon_container_data);
        pokemon_container_data = document.querySelector('.pokemon_container_data');
    }

    let pokemon_img = document.querySelector('.pokemon_data_img');
    if(pokemon_img==null){
        pokemon_img = document.createElement('IMG');
        pokemon_img.src = src;
        pokemon_img.src = src;
        pokemon_img.alt = name;
        pokemon_img.classList.add('pokemon_data_img');
        pokemon_container_data.appendChild(pokemon_img);

    }else{
        pokemon_img.src = src;
        pokemon_img.alt = name;
    }

    let pokemon_types = document.querySelector('.pokemon_types');
    if(pokemon_types==null){
        pokemon_types=document.createElement('H3');
        pokemon_types.classList.add('pokemon_types');
        pokemon_types.textContent = types;
        pokemon_container_data.appendChild(pokemon_types);
    }else{
        console.log('ok')
        pokemon_types.textContent = types;
    }

    show_pokemon_description(display_name, pokemon_container_data);
}

async function get_pokemon_img(name, entrada){
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const resultado = await fetch(url);
    const datos = await resultado.json();
    const src = datos['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    const img_entrada = document.createElement('IMG');
    img_entrada.src = src;
    img_entrada.loading = 'lazy';
    img_entrada.alt = name;
    entrada.appendChild(img_entrada)
}

async function get_pokemon_names(i){
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=493&limit=648';
    const resultado = await fetch(url);
    const datos = await resultado.json();
    const name = datos['results'][i]['name'];
    const nr = `#${i + 494}`;
    let display_name;

    if (name.includes('-')){
        display_name = name.split('-', 2)[0];
    }else{
        display_name = name;
    }

    const menu = document.querySelector('.pokemon_menu');

    const nueva_entrada = document.createElement('BUTTON');
    nueva_entrada.type = 'submit';
    nueva_entrada.classList.add('pokemon_card');
    menu.appendChild(nueva_entrada);

    const titulo_entrada = document.createElement('H3');
    titulo_entrada.textContent = display_name;
    nueva_entrada.appendChild(titulo_entrada);

    const nr_entrada = document.createElement('H4');
    nr_entrada.textContent = nr;
    nueva_entrada.appendChild(nr_entrada);

    get_pokemon_img(name, nueva_entrada);

    nueva_entrada.addEventListener('click', ()=>{
        show_pokemon_info(name, display_name, nr);
        document.body.scrollIntoView({behavior: "smooth"});
    })
    
}

for(i = 0; i<156; i++){

    get_pokemon_names(i);
}
