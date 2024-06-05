document.addEventListener('DOMContentLoaded', function () {
    // Header
    const header = document.querySelector('header');
    const headerLink = document.createElement('a');
    headerLink.href = "./index.html";
    const headerTitle = document.createElement('h1');
    headerTitle.textContent = 'Squirtle';
    headerLink.appendChild(headerTitle);
    header.appendChild(headerLink);

    // Navigation
    const nav = document.querySelector('nav');
    const navList = document.createElement('ul');
    const sections = [
        { id: "#info-squirtle", text: "Informações sobre Squirtle" },
        { id: "#caracteristicas", text: "Características" },
        { id: "#curiosidades", text: "Curiosidades" },
        { id: "#artigo-squirtle", text: "Artigo sobre Squirtle" },
        { id: "#recursos", text: "Recursos Adicionais" },
        { id: "#evolucao", text: "Evolução" },
    ];
    
    sections.forEach(section => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = section.id;
        link.textContent = section.text;
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });
    nav.appendChild(navList);

    // Main content
    const main = document.querySelector('main');

    // Informações sobre Squirtle
    const infoSection = document.createElement('section');
    infoSection.id = 'info-squirtle';
    infoSection.setAttribute('aria-labelledby', 'info-squirtle-label');
    const infoTitle = document.createElement('h2');
    infoTitle.id = 'info-squirtle-label';
    infoTitle.textContent = 'Informações sobre Squirtle';
    const infoDiv = document.createElement('div');
    const img1 = document.createElement('img');
    img1.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png";
    img1.alt = "Squirtle 1";
    const img2 = document.createElement('img');
    img2.src = "https://archives.bulbagarden.net/media/upload/thumb/7/79/Squirtle_SSBU.png/200px-Squirtle_SSBU.png";
    img2.alt = "Squirtle 2";
    infoDiv.appendChild(img1);
    infoDiv.appendChild(img2);
    const infoPara = document.createElement('p');
    infoPara.textContent = "Squirtle é um Pokémon do tipo Água. É o Pokémon inicial da região de Kanto e evolui para Wartortle.";
    infoSection.appendChild(infoTitle);
    infoSection.appendChild(infoDiv);
    infoSection.appendChild(infoPara);
    main.appendChild(infoSection);

    // Características
    const caracSection = document.createElement('section');
    caracSection.id = 'caracteristicas';
    caracSection.setAttribute('aria-labelledby', 'caracteristicas-label');
    const caracTitle = document.createElement('h2');
    caracTitle.id = 'caracteristicas-label';
    caracTitle.textContent = 'Características';
    const caracPara = document.createElement('p');
    caracPara.textContent = "Squirtle é conhecido por sua concha nas costas, que oferece proteção adicional. Ele possui ataques de água poderosos, como Water Gun e Hydro Pump.";
    caracSection.appendChild(caracTitle);
    caracSection.appendChild(caracPara);
    main.appendChild(caracSection);

    // Curiosidades
    const curiosidadesSection = document.createElement('section');
    curiosidadesSection.id = 'curiosidades';
    curiosidadesSection.setAttribute('aria-labelledby', 'curiosidades-label');
    const curiosidadesTitle = document.createElement('h2');
    curiosidadesTitle.id = 'curiosidades-label';
    curiosidadesTitle.textContent = 'Curiosidades';
    const curiosidadesList = document.createElement('ul');
    const curiosidades = [
        "Squirtle é um dos Pokémon mais populares e adoráveis.",
        "Seu nome deriva das palavras 'squirrel' (esquilo) e 'turtle' (tartaruga).",
        "Squirtle é frequentemente escolhido por treinadores para começar sua jornada Pokémon."
    ];
    
    curiosidades.forEach(curiosidade => {
        const listItem = document.createElement('li');
        listItem.textContent = curiosidade;
        curiosidadesList.appendChild(listItem);
    });

    curiosidadesSection.appendChild(curiosidadesTitle);
    curiosidadesSection.appendChild(curiosidadesList);
    main.appendChild(curiosidadesSection);

    // Artigo sobre Squirtle
    const artigo = document.createElement('article');
    artigo.id = 'artigo-squirtle';
    artigo.setAttribute('aria-labelledby', 'artigo-squirtle-label');
    const artigoTitle = document.createElement('h2');
    artigoTitle.id = 'artigo-squirtle-label';
    artigoTitle.textContent = 'Squirtle: O Amigo Aquático';
    const artigoParagrafos = [
        "Squirtle, com sua aparência simpática e sua habilidade em controlar a água, conquistou o coração de treinadores Pokémon ao redor do mundo. Sendo o inicial de água na região de Kanto, Squirtle é uma escolha popular para aqueles que buscam equilíbrio e versatilidade em suas equipes.",
        "Sua concha nas costas não apenas oferece proteção, mas também é um símbolo de resistência. Ao evoluir para Wartortle e, posteriormente, para Blastoise, Squirtle se transforma em uma força formidável, dominando ataques aquáticos que podem surpreender adversários em batalhas.",
        "Além de suas habilidades de batalha, Squirtle é conhecido por seu carisma. Treinadores muitas vezes descrevem a relação com seu Squirtle como uma amizade profunda, tornando-o não apenas um companheiro de lutas, mas um amigo leal ao longo de suas jornadas."
    ];
    
    artigo.appendChild(artigoTitle);
    artigoParagrafos.forEach(paragraphText => {
        const p = document.createElement('p');
        p.textContent = paragraphText;
        artigo.appendChild(p);
    });
    main.appendChild(artigo);

    // Recursos Adicionais
    const recursosSection = document.createElement('section');
    recursosSection.id = 'recursos';
    recursosSection.setAttribute('aria-labelledby', 'recursos-label');
    const recursosTitle = document.createElement('h2');
    recursosTitle.id = 'recursos-label';
    recursosTitle.textContent = 'Recursos Adicionais';
    const recursosList = document.createElement('ul');
    const recursos = [
        { href: "https://www.pokemon.com/br/pokedex/squirtle", text: "Pokédex - Squirtle" },
        { href: "https://bulbapedia.bulbagarden.net/wiki/Squirtle_(Pok%C3%A9mon)", text: "Bulbapedia - Squirtle" }
    ];
    
    recursos.forEach(recurso => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = recurso.href;
        link.target = "_blank";
        link.textContent = recurso.text;
        listItem.appendChild(link);
        recursosList.appendChild(listItem);
    });

    recursosSection.appendChild(recursosTitle);
    recursosSection.appendChild(recursosList);
    main.appendChild(recursosSection);

    // Evoluções
    const evolucaoSection = document.createElement('section');
    evolucaoSection.id = 'evolucao';
    evolucaoSection.setAttribute('aria-labelledby', 'evolucao-label');
    const evolucaoTitle = document.createElement('h2');
    evolucaoTitle.id = 'evolucao-label';
    evolucaoTitle.textContent = 'Evoluções';
    const evolucaoList = document.createElement('ul');
    const evolucoes = [
        { imgSrc: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png", alt: "Squirtle", caption: "1. Squirtle" },
        { imgSrc: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png", alt: "Wartortle", caption: "2. Wartortle" },
        { imgSrc: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png", alt: "Blastoise", caption: "3. Blastoise" }
    ];

    evolucoes.forEach(evolucao => {
        const listItem = document.createElement('li');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = evolucao.imgSrc;
        img.alt = evolucao.alt;
        const caption = document.createElement('figcaption');
        caption.textContent = evolucao.caption;
        figure.appendChild(img);
        figure.appendChild(caption);
        listItem.appendChild(figure);
        evolucaoList.appendChild(listItem);
    });

    evolucaoSection.appendChild(evolucaoTitle);
    evolucaoSection.appendChild(evolucaoList);
    main.appendChild(evolucaoSection);

    // Footer
    const footer = document.querySelector('footer');
    footer.setAttribute('aria-label', 'Rodapé');
    
    const footerPara1 = document.createElement('p');
    footerPara1.setAttribute('aria-label', 'Copyright');
    footerPara1.innerHTML = '&copy; 2024 Página do Pokémon Squirtle. Todos os direitos reservados.';
    footer.appendChild(footerPara1);

    const footerPara2 = document.createElement('p');
    const backToTopLink = document.createElement('a');
    backToTopLink.href = "#header";
    backToTopLink.textContent = 'Voltar para o topo';
    footerPara2.appendChild(backToTopLink);
    footer.appendChild(footerPara2);

    const footerPara3 = document.createElement('p');
    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:contato@squirtlepage.com';
    emailLink.textContent = 'Contato via e-mail';
    footerPara3.appendChild(emailLink);
    footer.appendChild(footerPara3);

    const footerPara4 = document.createElement('p');
    const phoneLink = document.createElement('a');
    phoneLink.href = 'tel:+5555555555';
    phoneLink.textContent = 'Telefone: (55) 5555-5555';
    footerPara4.appendChild(phoneLink);
    footer.appendChild(footerPara4);
});
