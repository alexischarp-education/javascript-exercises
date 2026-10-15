# TP5 – MMI Quest, la collection de cartes

La guilde MMI a perdu ses cartes de collection : les professeurs sont bien là, dans les données, mais la page est vide. À vous de les faire réapparaître en JavaScript. Pas de clic ni de bouton pour l'instant : tout se joue au chargement de la page.

## Objectifs

À la fin de ce TP, vous saurez :

- sélectionner un élément de la page avec `querySelector`, et plusieurs avec `querySelectorAll` ;
- modifier le texte, les attributs et les classes d'un élément depuis JavaScript ;
- générer le HTML d'une liste à partir d'un tableau d'objets, avec `map`, un template literal et `join('')` ;
- distinguer `textContent` et `innerHTML`, et choisir le bon ;
- comprendre pourquoi modifier des données ne change pas la page tant qu'on ne la regénère pas.

Les étapes 0 à 7 forment le **Socle** : c'est l'essentiel du TP, à faire dans l'ordre. Le **Bonus** est pour celles et ceux qui ont fini en avance.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et de fonctions, les ids et les classes CSS sont en anglais, sans accent : `createCard`, `card-grid`, `is-highlighted`. Seul le contenu visible (noms, titres, citations, messages) est en français. Les noms à utiliser vous sont donnés dans chaque consigne.
- Le nom d'une fonction commence par un **verbe à l'infinitif** : `createCard`, `renderCards`.
- **`const` par défaut**, `let` seulement si la valeur change ensuite.
- **`===` et `!==` uniquement** pour comparer.
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- **Des classes plutôt que des styles.** Le JavaScript ajoute ou retire une classe, et c'est le CSS qui décide du rendu. L'étape 5 est la seule exception, et elle est expliquée.

## Avant de commencer

Le dossier `tp5/` contient :

```
tp5/
├── INSTRUCTIONS.md   ← ce fichier
├── index.html        ← la page (fournie, complète)
├── style.css         ← le thème pixel (fourni, complet)
├── script.js         ← les données et les repères TODO (fourni, à compléter)
├── avatars/          ← les images des cartes (fournies)
└── pixel-studio/     ← le thème et son décor (fournis)
```

Le thème et son décor sont rangés dans `pixel-studio/`, à l’intérieur de ce TP. Le dossier `tp5/` contient toutes les ressources nécessaires à sa distribution ; vous n’avez pas à modifier le thème.

Nouveauté par rapport aux TPs précédents : `script.js` existe déjà et il est **déjà relié** à `index.html`. Vous n'avez rien à créer : vous complétez `script.js` sous chaque commentaire `// TODO`, étape par étape. Les numéros d'étapes de ce document correspondent aux repères `// STEP n` du fichier. Vous ne modifiez ni `index.html` ni `style.css`.

Le fichier contient le tableau `professors` : huit objets de cette forme.

```js
{
  name: 'La Tisseuse',
  title: 'Architecte du Web',
  domain: 'tech',
  stats: { creativity: 80, rigor: 85, patience: 95 },
  quote: "Un site accessible, c'est un site pour tout le monde.",
  avatar: 'avatars/tisseuse.svg',
}
```

Les notions utilisées dans ce TP (sélection et modification du DOM, `map`, fonctions fléchées, template literals) sont dans le cours. Gardez-le sous la main : l'énoncé ne les réexplique pas.

**Deux onglets des DevTools (F12) servent dans ce TP :**

- **Console** : vos `console.log` et les erreurs.
- **Éléments** : le DOM en direct, c'est-à-dire la page telle que le navigateur la voit **après** l'exécution de votre script. Ce que votre script ajoute s'y trouve, alors que le fichier `index.html`, lui, ne change jamais.

---

# Socle

## Étape 0 : Prise en main

1. Ouvrez `index.html` dans le navigateur, avec la console ouverte. La page est presque vide : un en-tête sans titre, une carte de test sans contenu, une grille vide.
2. Sous `// STEP 0`, affichez un message de votre choix dans la console, puis rechargez.
3. Affichez les données avec `console.table(professors)`.

Le message et le tableau sont dans la console, mais **la page n'a pas changé**. Un script n'a aucun effet visible tant qu'il ne touche pas au DOM : c'est tout le sujet de ce TP.

---

## Étape 1 : L'en-tête

1. Sélectionnez l'élément `#guild-name` avec `document.querySelector`, et donnez-lui le texte `MMI Quest` avec `textContent`.
2. Faites de même pour `#card-count`, avec une phrase construite à partir de `professors.length` : `8 cartes dans la collection`.

Le titre et la phrase apparaissent en haut de la page. Dans l'onglet Éléments, le `<h1>` contient maintenant `MMI Quest`, alors qu'il est toujours vide dans `index.html`.

**L'erreur à connaître.** Dans la console des DevTools (pas dans le script), tapez cette ligne, dont le sélecteur ne correspond à rien :

```js
document.querySelector('#guild-nam').textContent = 'test';
```

```
Uncaught TypeError: Cannot set properties of null (setting 'textContent')
```

`querySelector` renvoie `null` quand aucun élément ne correspond, et `null.textContent` plante. Quand vous verrez « null » dans une erreur de ce TP, c'est presque toujours un sélecteur mal écrit : vérifiez le `#`, le `.` et l'orthographe.

---

## Étape 2 : Une seule carte

La section « Carte de test » contient une carte vide, dont les éléments ont les ids `#test-avatar`, `#test-name`, `#test-title` et `#test-quote`. Remplissez-la avec le premier professeur, `professors[0]` :

1. le nom, le titre et la citation avec `textContent` ;
2. l'avatar avec `setAttribute('src', …)` et `setAttribute('alt', …)` : l'adresse de l'image est dans `avatar`, et le texte alternatif est le nom.

La carte de test affiche La Tisseuse avec son avatar. Dans l'onglet Éléments, l'attribut `src` est apparu sur la balise `<img>`.

<details>
<summary>Indice</summary>

Rangez d'abord le professeur dans une constante pour ne pas répéter `professors[0]` : `const firstProfessor = professors[0];`, puis `firstProfessor.name`, `firstProfessor.avatar`…

</details>

---

## Étape 3 : Toutes les cartes

Remplir huit cartes à la main, c'est hors de question. Vous allez **générer** leur HTML.

### 3.1 Une fonction qui fabrique une carte

Écrivez `createCard(professor)`, qui **renvoie** le HTML d'une carte dans un template literal. Recopiez ce modèle et remplacez chaque `…` par la propriété correspondante de `professor`. Les classes sont celles que `style.css` attend : ne les modifiez pas.

```js
function createCard(professor) {
  return `
    <article class="card">
      <img class="card-avatar" src="${…}" alt="${…}" />
      <h3 class="card-name">${…}</h3>
      <p class="card-title">${…}</p>
      <p class="card-quote">${…}</p>
      <div class="stat">
        <span class="stat-label">Créativité</span>
        <div class="stat-bar"><div class="stat-fill" data-value="${…}"></div></div>
      </div>
      <div class="stat">
        <span class="stat-label">Rigueur</span>
        <div class="stat-bar"><div class="stat-fill" data-value="${…}"></div></div>
      </div>
      <div class="stat">
        <span class="stat-label">Patience</span>
        <div class="stat-bar"><div class="stat-fill" data-value="${…}"></div></div>
      </div>
    </article>
  `;
}
```

Les stats sont dans `professor.stats.creativity`, `professor.stats.rigor` et `professor.stats.patience`. Vérifiez avec `console.log(createCard(professors[0]))` : la console affiche le HTML de la carte de La Tisseuse, avec ses valeurs à la place des `${…}`.

### 3.2 Toutes les cartes dans la grille

1. Avec `map`, fabriquez le HTML de chaque professeur, puis assemblez le tout en un seul texte avec `join('')`.
2. Injectez ce texte dans `#card-grid` avec `innerHTML`.

Les huit cartes apparaissent, avec leur avatar. Les barres de stats sont encore vides et toutes les cartes ont la même couleur : c'est pour les étapes 4 et 5.

**L'oubli classique.** Retirez `.join('')` et rechargez : des virgules apparaissent entre les cartes. `map` renvoie un **tableau**, et quand on met un tableau dans `innerHTML`, il est converti en texte avec une virgule entre chaque élément. `join('')` le transforme en un seul texte, sans séparateur. Remettez-le.

<details>
<summary>Indice</summary>

```js
const cardsHtml = professors.map(createCard).join('');
```

`createCard` est passée à `map` sans parenthèses : c'est `map` qui l'appelle, une fois par professeur.

</details>

---

## Étape 4 : Les domaines

Chaque professeur a un `domain` : `tech`, `media`, `strategy` ou `culture`. `style.css` contient une classe du même nom pour chacun, avec sa couleur et son badge. Il reste à poser la bonne classe sur chaque carte.

1. Sélectionnez toutes les cartes de la grille avec `document.querySelectorAll('#card-grid .card')` : les `.card` qui se trouvent **dans** `#card-grid`, donc sans la carte de test.
2. Parcourez-les avec `forEach`. Le callback reçoit la carte **et son index** : `(card, index) => { … }`. L'index permet de retrouver le professeur correspondant dans `professors`.
3. Ajoutez à chaque carte la classe de son domaine avec `classList.add`.
4. Déclarez `const favoriteDomain = 'tech';` et ajoutez la classe `is-highlighted` aux cartes de ce domaine.

Chaque carte prend la couleur et le badge de son domaine, et les deux cartes `tech` sont mises en avant. Changez `favoriteDomain` en `'media'` : la mise en avant change de cartes. Vous n'avez écrit aucun style : votre script a seulement posé des classes, et le CSS fait le rendu.

<details>
<summary>Indice</summary>

`querySelectorAll` renvoie une liste (une NodeList), pas un élément : on ne peut pas faire `.classList` dessus directement, il faut la parcourir. Dans le callback, `professors[index]` est le professeur de la carte en cours, et `professors[index].domain` son domaine, qui est justement le nom de la classe à ajouter.

</details>

---

## Étape 5 : Les barres de stats

Chaque barre contient un élément `.stat-fill` qui porte sa valeur dans un attribut `data-value`. Sa largeur vaut `0` tant que personne ne la règle.

1. Sélectionnez tous les `.stat-fill` de la page et parcourez-les avec `forEach`.
2. Pour chacun, lisez la valeur avec `getAttribute('data-value')`.
3. Écrivez la largeur avec `fill.style.width`, en pourcentage : `80%` pour une valeur de `80`.

Les barres se remplissent, chacune à sa valeur.

Affichez `typeof` de la valeur lue : c'est une **string**, comme tout ce qui sort d'un attribut. Le template literal `` `${value}%` `` fonctionne quand même, parce qu'il fabrique du texte. Mais pour un calcul, il faudrait d'abord `Number(value)` : `'80' + 10` donnerait `'8010'`.

C'est la seule fois du TP où le script écrit un style directement. Une largeur qui dépend d'une donnée ne peut pas être une classe toute prête : il y aurait 101 classes à écrire. Pour tout le reste, ce sont des classes.

---

## Étape 6 : `textContent` ou `innerHTML` ?

La section « Laboratoire » contient deux cadres vides, `#test-text` et `#test-html`.

1. Déclarez `const message = 'Un <strong>excellent</strong> choix';`.
2. Mettez-le dans `#test-text` avec `textContent`, et dans `#test-html` avec `innerHTML`.

Le premier cadre affiche les balises telles quelles, `<strong>` compris. Le second affiche « excellent » en gras. Dans l'onglet Éléments, le premier contient du texte, le second contient un vrai élément `<strong>`.

`textContent` prend le texte au pied de la lettre. `innerHTML` l'interprète comme du HTML. Si ce message venait d'un visiteur (un champ de formulaire, un commentaire), `innerHTML` exécuterait le HTML qu'il a tapé, quel qu'il soit : c'est une porte ouverte. La règle : `textContent` par défaut, `innerHTML` seulement pour du HTML que **vous** avez écrit, comme à l'étape 3.

---

## Étape 7 : Ma carte d'étudiant

### 7.1 Une fonction pour tout regénérer

Regroupez le code des étapes 3.2, 4 et 5 dans une fonction `renderCards()`, sans paramètre ni `return`, et déplacez-y aussi la ligne qui remplit `#card-count`. Appelez-la une fois. La page ne change pas : c'est le même code, seulement rangé dans une fonction qu'on pourra rappeler.

### 7.2 Votre carte

Sous le repère prévu, créez un objet `student` de la même forme que les professeurs : votre pseudo, un titre inventé, un domaine parmi les quatre, trois stats, une citation, et un avatar parmi `avatars/student-1.svg` à `avatars/student-6.svg`.

### 7.3 L'ajouter à la collection

1. Écrivez `professors.push(student);` après l'appel à `renderCards()`, et rechargez. **Rien ne change** : le tableau contient neuf objets, mais la page a été générée avant le `push`. Modifier les données ne modifie pas la page.
2. Appelez de nouveau `renderCards();` après le `push`.

Votre carte apparaît en dernier, avec sa couleur de domaine et ses barres, et le compteur passe à `9 cartes dans la collection`.

C'est pour cela que les étapes 4 et 5 sont dans `renderCards` : `innerHTML` remplace toutes les cartes, les classes et les largeurs doivent donc être refaites à chaque rendu.

---

> ### 🎯 Jalon : vous avez vu l'essentiel
>
> Pour finir le Socle, répondez en commentaire dans `script.js`, en deux ou trois phrases : **pourquoi `createCard` renvoie-t-elle du texte au lieu de modifier la page elle-même ?**
>
> Puis, sans regarder votre code :
>
> - [ ] Je sais ce que renvoie `querySelector` quand rien ne correspond, et quelle erreur ça provoque ensuite.
> - [ ] Je sais pourquoi `map` doit être suivi de `join('')` avant `innerHTML`.
> - [ ] Je sais quand utiliser `textContent` et quand utiliser `innerHTML`.
> - [ ] Je sais pourquoi modifier le tableau ne change pas la page.
>
> Une case non cochée ? Relisez l'étape correspondante avant de passer au bonus.

---

# Bonus

Des défis indépendants, à faire dans l'ordre que vous voulez. Ils utilisent les fonctions du Socle et les outils de la [boîte à outils](#boîte-à-outils), en bas de ce document.

### Bonus 1 : La carte la plus créative

Trouvez le membre dont la créativité est la plus haute (une boucle avec un maximum, comme pour le morceau le plus long au TP3), retenez son **index**, puis ajoutez la classe `is-highlighted` à la carte de cet index dans la grille. Une NodeList se lit comme un tableau : `cards[index]`.

### Bonus 2 : La patience de la guilde

Additionnez la patience de tous les membres avec un accumulateur, puis affichez le total dans `#guild-stats`, sous le compteur : `Patience cumulée : …`. Les huit professeurs totalisent 663, plus la vôtre.

### Bonus 3 : L'humeur de la guilde

Calculez la créativité moyenne de la collection, puis affichez dans `#guild-message` un message qui dépend de la moyenne : `Une guilde débordante d'idées` à partir de 85, `Une guilde inspirée` à partir de 70, `Une guilde en réflexion` sinon.

### Bonus 4 : Le thème selon l'heure

`new Date().getHours()` donne l'heure actuelle, de 0 à 23. Entre 8 h et 20 h, ajoutez la classe `light-theme` à `document.body` : le CSS passe en clair. Pour tester sans attendre la nuit, tapez `document.body.classList.toggle('light-theme')` dans la console : `toggle` ajoute la classe si elle est absente et la retire si elle est présente.

### Bonus 5 : Afficher un seul domaine

Donnez un paramètre à `renderCards(collection)`, et utilisez-le à la place de `professors` partout dans la fonction : le `map`, le compteur, et l'index. Puis :

```js
const shownDomain = 'media';
const shownProfessors = professors.filter((professor) => professor.domain === shownDomain);
renderCards(shownProfessors);
```

Seules les cartes `media` s'affichent, avec le bon compteur. Pourquoi fallait-il changer l'index aussi ?

### Bonus 6 : Le badge « Nouveau »

Après le dernier rendu, ajoutez la classe `is-new` à la dernière carte de la grille : un badge « Nouveau » apparaît à côté de votre pseudo. Comment obtenir la dernière carte sans écrire son numéro ?

---

## Exercice papier (sans ordinateur)

Cet exercice vous entraîne au format de l'examen final, qui se fait **sur feuille**. Fermez votre ordinateur et répondez sur papier.

Une fois que vous avez fini, **vérifiez vous-même** vos réponses : créez une page avec le HTML donné, ajoutez le script, et regardez le résultat dans l'onglet Éléments.

### Question 1 : Le DOM après le script

```html
<main>
  <h1 id="title">Chargement…</h1>
  <p class="status">En attente</p>
  <a id="link">Voir la fiche</a>
</main>
```

```js
document.querySelector('#title').textContent = 'Fiche du joueur';
document.querySelector('.status').classList.add('is-ready');
document.querySelector('#link').setAttribute('href', 'fiche.html');
```

Écrivez le HTML du `<main>` tel qu'il apparaît dans l'onglet Éléments après l'exécution du script.

### Question 2 : Le HTML produit

```js
const items = [
  { name: 'Potion', price: 5 },
  { name: 'Épée', price: 40 },
  { name: 'Carte', price: 2 },
];

const itemsHtml = items.map((item) => `<li>${item.name} : ${item.price} po</li>`).join('');
document.querySelector('#inventory').innerHTML = itemsHtml;
```

1. Écrivez **exactement** le texte contenu dans `itemsHtml`.
2. La page contient `<ul id="inventory"></ul>`. Qu'affiche-t-elle si on oublie `.join('')` ? Expliquez.

### Question 3 : Qui a quelle classe ?

```html
<ul>
  <li class="quest" data-points="10">Tutoriel</li>
  <li class="quest" data-points="40">Donjon</li>
  <li class="quest" data-points="25">Forêt</li>
  <li class="quest" data-points="60">Boss</li>
</ul>
```

```js
const quests = document.querySelectorAll('.quest');

quests.forEach((quest, index) => {
  const points = Number(quest.getAttribute('data-points'));
  if (points >= 25) {
    quest.classList.add('is-hard');
  }
  if (index === 0) {
    quest.classList.add('is-first');
  }
});

document.querySelector('.boss').classList.add('is-final');
```

1. Pour chacun des quatre `<li>`, écrivez ses classes à la fin du script.
2. La dernière ligne provoque une erreur : laquelle, et pourquoi ? Les classes ajoutées avant restent-elles ?

### Question 4 : La page n'a pas changé

```js
const members = ['La Tisseuse', 'Le Root'];

const membersHtml = members.map((member) => `<li>${member}</li>`).join('');
document.querySelector('#members').innerHTML = membersHtml;

members.push('La Stratège');
```

La page affiche deux noms, pas trois. Pourquoi ? Que faut-il ajouter pour que « La Stratège » apparaisse ?

---

## Boîte à outils

Ces notions ne sont pas toutes dans les slides du cours. Une ligne d'exemple suffit pour démarrer.

| Outil                               | À quoi ça sert                                                                                   | Exemple                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `forEach((element, index) => …)`    | Le callback reçoit aussi la position de l'élément.                                               | `cards.forEach((card, index) => console.log(index))`       |
| `getAttribute('…')`                 | Lire un attribut. Renvoie toujours un texte.                                                     | `fill.getAttribute('data-value')` donne `'80'`             |
| `data-…`                            | Un attribut libre pour ranger une donnée dans le HTML.                                           | `<div data-value="80">`                                    |
| `element.style.width`               | Écrire une largeur directement sur l'élément. À réserver aux valeurs qui dépendent d'une donnée. | `fill.style.width = '80%'`                                 |
| `join('')`                          | Coller les éléments d'un tableau en un seul texte, sans séparateur.                              | `['a', 'b'].join('')` donne `'ab'`                         |
| `classList.contains('…')`           | Savoir si un élément a une classe.                                                               | `card.classList.contains('tech')` donne `true` ou `false`  |
| `classList.toggle('…')`             | Ajouter la classe si elle est absente, la retirer sinon. Bonus 4.                                | `document.body.classList.toggle('light-theme')`            |
| `new Date().getHours()`             | L'heure actuelle, de 0 à 23. Bonus 4.                                                            | `const hour = new Date().getHours();`                      |
| `console.table()`                   | Afficher un tableau d'objets sous forme de grille, pour vérifier.                                | `console.table(professors)`                                |
| Onglet Éléments                     | Voir le DOM en direct dans les DevTools, tel que votre script l'a modifié.                       | **F12**, puis « Éléments » (ou « Elements »)               |

💡 **Chercher dans la documentation est un réflexe professionnel**, pas un aveu de faiblesse. La référence pour JavaScript est [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript). Essayez par exemple de chercher « MDN Element » ou « MDN Document ».

Au prochain TP, cette page devient interactive : vos fonctions réagiront aux clics.
