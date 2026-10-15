// TP5 – MMI Quest, the card collection
// The data is already here: do not copy it from the instructions.
// Write your code below each TODO, in the order of the steps.

const professors = [
  {
    name: 'La Tisseuse',
    title: 'Architecte du Web',
    domain: 'tech',
    stats: { creativity: 70, rigor: 90, patience: 90 },
    quote: 'Attention aux contrastes !',
    avatar: 'avatars/tisseuse.svg',
  },
  {
    name: 'La Maîtresse du Temps',
    title: 'Chronomancienne du Montage',
    domain: 'media',
    stats: { creativity: 90, rigor: 90, patience: 70 },
    quote: "Chaque seconde compte, sur la timeline comme à l'emploi du temps.",
    avatar: 'avatars/maitresse-du-temps.svg',
  },
  {
    name: 'La Stratège',
    title: 'Générale des Campagnes',
    domain: 'strategy',
    stats: { creativity: 65, rigor: 95, patience: 90 },
    quote: "Un bon produit, c'est d'abord un bon plan.",
    avatar: 'avatars/stratege.svg',
  },
  {
    name: 'La Mathémagicienne',
    title: 'Enchanteresse des Nombres',
    domain: 'culture',
    stats: { creativity: 60, rigor: 95, patience: 95 },
    quote: 'Les mots sont des fenêtres, les murs sont durs (un truc comme ça).',
    avatar: 'avatars/mathemagicienne.svg',
  },
  {
    name: 'Le Root',
    title: 'Gardien des Serveurs',
    domain: 'tech',
    stats: { creativity: 60, rigor: 97, patience: 85 },
    quote: 'Un grand pouvoir implique de grandes responsabilités. #sudo',
    avatar: 'avatars/root.svg',
  },
  {
    name: "L'Illustrateur",
    title: 'Enlumineur Numérique',
    domain: 'media',
    stats: { creativity: 98, rigor: 70, patience: 85 },
    quote: 'Mais que fait la police ?',
    avatar: 'avatars/illustrateur.svg',
  },
  {
    name: "L'Éclaireuse",
    title: 'Accompagnatrice des âmes',
    domain: 'strategy',
    stats: { creativity: 75, rigor: 80, patience: 98 },
    quote: 'La lumière nous guide, tout comme LinkedIn.',
    avatar: 'avatars/eclaireuse.svg',
  },
  {
    name: 'Le Traducteur',
    title: 'Barde des Langues',
    domain: 'culture',
    stats: { creativity: 80, rigor: 90, patience: 85 },
    quote: 'For sure!',
    avatar: 'avatars/traducteur.svg',
  },
];

// STEP 0: Getting started
// TODO: display a message of your choice in the console, then look at the page
// TODO: display the data as a table in the console

// STEP 1: The header
// TODO: fill #guild-name with the name of the game
// TODO: fill #card-count with a sentence giving the number of professors

// STEP 2: One card
// TODO: fill the test card with professors[0] (name, title, quote, avatar)

// STEP 3: All the cards
// TODO: write createCard(professor), which returns the HTML of one card
// TODO: build the HTML of all the cards and put it in #card-grid

// STEP 4: Domains
// TODO: give each card of the grid the class of its domain
// TODO: declare favoriteDomain and give is-highlighted to the cards of that domain

// STEP 5: Stat bars
// TODO: set the width of each stat bar from its data-value

// STEP 6: textContent or innerHTML?
// TODO: put the same message, containing a tag, in #test-text and in #test-html

// STEP 7: My student card
// TODO: gather steps 3.2, 4, 5 and the counter in renderCards(), and call it once
// TODO: create your own student object
// TODO: add it to the collection, then render again

// BONUS
