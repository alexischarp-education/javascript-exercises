# TP6 – MMI Quest, la collection qui réagit

La guilde MMI a retrouvé ses cartes : cette fois, la page est déjà complète. Mais rien ne bouge. À vous de la rendre interactive : composer une équipe de 3 membres en cliquant, prévisualiser chaque recrutement au survol, chercher et filtrer. Tout se joue avec les **écouteurs d'événements**.

## Objectifs

À la fin de ce TP, vous saurez :

- brancher une fonction sur un événement avec `addEventListener` ;
- lire une donnée rangée dans un attribut `data-…` ;
- utiliser l'objet `event` ;
- réagir au clic (`click`), au survol (`mouseenter`, `mouseleave`), à la saisie (`input`) et au changement (`change`) ;
- lire la valeur d'un champ avec `.value`.

Les étapes 0 à 4 forment le **Socle** : c'est l'essentiel du TP, à faire dans l'ordre. Le **Bonus** est pour celles et ceux qui ont fini en avance.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et de fonctions, les ids et les classes CSS sont en anglais, sans accent. Seul le contenu visible (noms, titres, messages) est en français. Les noms à utiliser vous sont donnés dans chaque consigne.
- Le nom d'une fonction commence par un **verbe à l'infinitif** : `toggleHighlight`, `applyFilters`.
- **`const` par défaut**, `let` seulement si la valeur change ensuite.
- **`===` et `!==` uniquement** pour comparer.
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- **Des classes plutôt que des styles.** Le JavaScript ajoute ou retire une classe, et c'est le CSS qui décide du rendu.
- **`textContent` par défaut**, `innerHTML` seulement pour du HTML que **vous** avez écrit (voir TP5, étape 6).

## Avant de commencer

Le dossier `tp6/` contient :

```
tp6/
├── INSTRUCTIONS.md   ← ce fichier
├── index.html        ← la page (fournie, complète : cartes et filtres)
├── style.css         ← le thème pixel (fourni, complet)
├── script.js         ← les repères TODO (à compléter)
├── avatars/          ← les images des cartes (fournies)
└── pixel-studio/     ← le thème et son décor (fournis)
```

Contrairement au TP5, **les cartes sont déjà dans `index.html`** : le script n'a plus rien à générer. Il ne fait que réagir. Vous complétez `script.js` sous chaque `// TODO`. Vous ne modifiez ni `index.html` ni `style.css`.

**Le principe d'un écouteur** tient en une ligne :

```js
element.addEventListener('click', maFonction);
```

Quand l'événement `click` se produit sur `element`, le navigateur appelle `maFonction` et lui passe un objet `event` qui décrit ce qui s'est passé. **La fonction se donne sans parenthèses** : `maFonction`, pas `maFonction()`. Avec des parenthèses, elle s'exécuterait tout de suite, une seule fois, et `addEventListener` recevrait son résultat (`undefined`).

---

# Socle

## Étape 0 : Prise en main

1. Ouvrez `index.html` dans le navigateur, avec la console ouverte. La page est complète : huit cartes et deux filtres. Cliquez, survolez, tapez dans la recherche : **rien ne se passe**.
2. Sous `// STEP 0`, sélectionnez avec `querySelector` `#search-input`, `#domain-filter` et `#hover-panel`, et rangez chacun dans une constante : `searchInput`, `domainFilter`, `hoverPanel`.
3. Sélectionnez toutes les cartes de la grille avec `querySelectorAll('#card-grid .card')`, rangez-les dans `cards`, et affichez dans la console : `8 cartes dans la grille`.

---

## Étape 1 : Un clic recrute un membre

Vous composez une **équipe de 3 membres maximum**. Un clic sur une carte la recrute (elle s'entoure en doré), un second clic la retire. L'en-tête affiche les membres et les totaux de leurs stats.

Les stats de chaque carte sont rangées dans des attributs `data-creativity`, `data-rigor` et `data-patience` (regardez l'onglet Éléments). Les constantes `maxTeamSize` (3) et le message par défaut sont fournis en haut de `script.js`.

1. Écrivez `getTeamCards()`, sans paramètre : elle renvoie les éléments `.card.is-highlighted` de la page (`querySelectorAll`). **Les membres de l'équipe, ce sont les cartes qui ont cette classe** : pas de tableau à tenir à jour.
2. Écrivez `sumStat(cardList, stat)` : elle additionne une stat sur une liste de cartes. Avec une variable `total` et `forEach`, lisez ``card.getAttribute(`data-${stat}`)`` de chaque carte, convertissez-le avec `Number(…)` et ajoutez-le. Elle **renvoie** le total.
3. Écrivez `updateTeam()` : elle récupère l'équipe, construit un tableau des noms (`card.querySelector('.card-name').textContent`, `push`), puis écrit :
   - dans `#guild-stats` : `Équipe (2/3) : La Tisseuse, Le Root`, ou `Équipe (0/3) : aucun membre` si l'équipe est vide (`join(', ')` colle les noms) ;
   - dans `#guild-message` : `Total : créativité 130 · rigueur 187 · patience 175`.
4. Écrivez `toggleTeamMember(card)` : si la carte n'est pas dans l'équipe **et** que l'équipe est déjà pleine, la fonction s'arrête (`return`). Sinon elle bascule `is-highlighted` sur la carte (`classList.toggle`) puis appelle `updateTeam()`.
5. Parcourez `cards` avec `forEach` et, sur chaque carte, écoutez `click` :

```js
card.addEventListener('click', (event) => {
  console.log(event.type, event.target);
  toggleTeamMember(card);
});
```

Recrutez trois cartes, puis essayez d'en recruter une quatrième : rien ne se passe. Retirez-en une : la quatrième devient possible. Dans la console, `event.target` est l'élément **réellement cliqué** : cliquez sur l'avatar, sur le nom, sur le fond de la carte, et regardez comment il change.

<details>
<summary>Indice</summary>

La fonction fléchée `() => toggleTeamMember(card)` est l'« enveloppe » qui permet de passer un argument : on ne peut pas écrire `toggleTeamMember(card)` directement dans `addEventListener`, ce serait un appel immédiat.

</details>

---

## Étape 2 : Le survol prévisualise le recrutement

Avant de cliquer, on veut savoir ce que donnerait le recrutement. Le survol d'une carte affiche, dans `#hover-panel`, **les totaux de l'équipe si on y ajoutait cette carte**.

1. Écrivez `showCardPreview(card)`. Le texte dépend de la situation (trois cas, dans cet ordre) :
   - la carte est déjà dans l'équipe : `La Tisseuse fait partie de l'équipe : cliquez pour le retirer.`
   - l'équipe est pleine : `L'équipe est complète (3 maximum) : retirez un membre pour recruter La Tisseuse.`
   - sinon : `Avec La Tisseuse : créativité 130, rigueur 187, patience 175.` Les totaux sont ceux de l'équipe actuelle **plus** les stats de `card`.

   Utilisez `textContent`, et `return` après chacun des deux premiers cas.
2. Écrivez `resetCardPreview()` : elle remet `defaultHoverMessage` dans `hoverPanel`.
3. Dans la boucle de l'étape 1, ajoutez les écouteurs `mouseenter` (qui appelle `showCardPreview`) et `mouseleave` (qui appelle `resetCardPreview`).
4. Testez : survolez une carte, **cliquez**, sans bouger la souris. Le texte du panneau est périmé : il décrit l'équipe d'avant le clic. Ajoutez `showCardPreview(card)` dans l'écouteur de `click`, juste après `toggleTeamMember(card)`.

Survolez les cartes : le panneau annonce ce que chaque recrutement donnerait, et il reste cohérent après chaque clic.

---

## Étape 3 : La recherche suit la frappe

Taper dans `#search-input` doit masquer les cartes dont le nom ne contient pas le texte saisi.

1. Écrivez `applyFilters()`. Elle :
   - lit `searchInput.value`, lui retire les espaces autour avec `trim()` et le met en minuscules avec `toLowerCase()` ;
   - lit `domainFilter.value` (pour l'instant `'all'`, on y revient à l'étape 4) ;
   - parcourt `cards` ; une carte est **visible** si son nom (en minuscules) contient la recherche (`includes`) **et** si le domaine vaut `'all'` ou si la carte a la classe de ce domaine (`classList.contains`) ;
   - applique `classList.toggle('is-hidden', !isVisible)` à chaque carte : le deuxième argument force l'ajout (`true`) ou le retrait (`false`) de la classe ;
   - écrit `Cartes affichées : 3 sur 8` dans `#card-count`, avec le vrai nombre de cartes visibles.
2. Écoutez l'événement `input` sur `searchInput` pour appeler `applyFilters`.

Tapez `le` : seules les cartes dont le nom contient « le » restent. Effacez : tout revient.

**`input` ou `change` ?** Remplacez `'input'` par `'change'` et retapez : le filtre ne se déclenche plus qu'au moment où vous quittez le champ. `input` se produit à **chaque modification** du champ (frappe, collage, effacement), `change` seulement quand la valeur est **validée**. Remettez `input`.

<details>
<summary>Indice</summary>

`.value` est toujours un texte. Pour compter les cartes visibles, déclarez `let visibleCount = 0;` avant la boucle et ajoutez 1 à chaque carte visible.

</details>

---

## Étape 4 : Le menu de domaine

Choisir un domaine dans `#domain-filter` doit ne garder que les cartes de ce domaine.

1. Écoutez l'événement `change` sur `domainFilter`, et appelez… `applyFilters`. Rien d'autre à écrire.

Choisissez `Tech` : deux cartes. Tapez maintenant `root` dans la recherche : une seule. Les deux filtres se **combinent**, parce que `applyFilters` relit les deux champs à chaque fois, quel que soit celui qui a déclenché l'événement.

Pour un `<select>`, `change` se produit dès qu'on choisit une autre option.

---

> ### 🎯 Jalon : vous avez vu l'essentiel
>
> Pour finir le Socle, répondez en commentaire dans `script.js`, en deux ou trois phrases : **pourquoi écrit-on `addEventListener('click', maFonction)` et non `addEventListener('click', maFonction())` ?**
>
> Puis, sans regarder votre code :
>
> - [ ] Je sais ce que contient `event.target`.
> - [ ] Je sais pourquoi les membres de l'équipe sont « les cartes qui ont la classe `is-highlighted` » et non un tableau à part.
> - [ ] Je sais la différence entre `input` et `change`.
> - [ ] Je sais pourquoi `.value` demande souvent un `Number(…)`.
> - [ ] Je sais pourquoi `applyFilters` relit les deux champs à chaque fois.
>
> Une case non cochée ? Relisez l'étape correspondante avant de passer au bonus.

---

# Bonus

### Bonus 1 : Échap vide la recherche

Écoutez l'événement `keydown` sur `searchInput`. `event.key` contient le nom de la touche (`'Escape'`). Quand c'est Échap, videz le champ (`searchInput.value = ''`) et relancez `applyFilters()`.

### Bonus 2 : Vider l'équipe

Le bouton `#clear-button` est déjà dans la page. Au clic, il doit retirer `is-highlighted` de toutes les cartes, remettre l'en-tête à jour avec `updateTeam()` et le panneau de survol avec `resetCardPreview()`.

---

## Exercice papier (sans ordinateur)

Cet exercice vous entraîne au format de l'examen final, qui se fait **sur feuille**. Fermez votre ordinateur et répondez sur papier.

Une fois que vous avez fini, **vérifiez vous-même** vos réponses : créez une page avec le HTML donné, ajoutez le script, et testez dans le navigateur.

### Question 1 : Le compteur de likes

```html
<button id="like">J'aime</button>
<p id="likes">0 like</p>
```

```js
let likes = 0;
const button = document.querySelector('#like');
const counter = document.querySelector('#likes');

button.addEventListener('click', () => {
  likes = likes + 1;
  counter.textContent = `${likes} likes`;
});

console.log(likes);
```

1. Que contient la console juste après le chargement de la page, avant tout clic ?
2. Quel texte contient le `<p>` juste après le chargement ? Et après trois clics ?
3. On remplace l'écouteur par `button.addEventListener('click', increment());`, où `increment` est une fonction qui ajoute 1 à `likes` et ne renvoie rien. De combien `likes` augmente-t-il au chargement ? Et quand on clique ? Expliquez.

### Question 2 : Qui est ouvert ?

```html
<p class="panel">A</p>
<p class="panel">B</p>
```

```js
const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
  panel.addEventListener('click', () => panel.classList.toggle('is-open'));
});
```

L'utilisateur clique sur A, puis de nouveau sur A, puis sur B. Quels `<p>` ont la classe `is-open` à la fin ? Expliquez.

### Question 3 : `input` ou `change` ?

```html
<input id="name" type="text" />
```

```js
const field = document.querySelector('#name');

field.addEventListener('input', () => console.log(`input : ${field.value}`));
field.addEventListener('change', () => console.log(`change : ${field.value}`));
```

1. L'utilisateur clique dans le champ, tape `H` puis `i`, puis clique ailleurs sur la page. Écrivez, dans l'ordre, tout ce qui apparaît dans la console.
2. Il clique de nouveau dans le champ puis ailleurs, sans rien taper. Que se passe-t-il ?

### Question 4 : La valeur d'un champ

```html
<input id="quantity" type="text" value="3" />
<button id="add">+1</button>
<p id="total"></p>
```

```js
document.querySelector('#add').addEventListener('click', () => {
  const quantity = document.querySelector('#quantity').value;
  document.querySelector('#total').textContent = quantity + 1;
});
```

1. Que contient `#total` après un clic sur le bouton ? Pourquoi ?
2. Corrigez le script pour obtenir `4`.

---

## Boîte à outils

Ces notions ne sont pas toutes dans les slides du cours. Une ligne d'exemple suffit pour démarrer.

| Outil                                    | À quoi ça sert                                                                             | Exemple                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `addEventListener('type', fonction)`     | Appeler une fonction quand l'événement se produit. La fonction se donne sans parenthèses.   | `button.addEventListener('click', handleClick)`             |
| `event`                                  | Le paramètre reçu par la fonction : il décrit l'événement.                                 | `(event) => console.log(event.type)`                        |
| `event.target`                           | L'élément réellement touché (l'avatar, le nom… et pas forcément la carte).                  | `console.log(event.target)`                                 |
| `event.key`                              | Le nom de la touche pour `keydown`.                                                        | `event.key === 'Escape'`                                    |
| `click`                                  | Clic sur l'élément.                                                                        | `card.addEventListener('click', …)`                         |
| `mouseenter`, `mouseleave`               | La souris entre sur / quitte l'élément.                                                    | `card.addEventListener('mouseenter', …)`                    |
| `input`                                  | La valeur d'un champ a changé (à chaque frappe).                                           | `field.addEventListener('input', …)`                        |
| `change`                                 | La valeur est validée (champ quitté, option choisie).                                      | `select.addEventListener('change', …)`                      |
| `getAttribute('data-…')`                 | Lire une donnée rangée dans le HTML. Renvoie un texte : `Number(…)` pour calculer.        | `Number(card.getAttribute('data-rigor'))`                   |
| `.value`                                 | La valeur d'un champ (`input`, `select`). **Toujours un texte.**                           | `Number(field.value)`                                       |
| `classList.toggle('…', booléen)`         | Avec le 2ᵉ argument : `true` ajoute la classe, `false` la retire.                           | `card.classList.toggle('is-hidden', !isVisible)`            |
| `text.includes('…')`                     | `true` si le texte en contient un autre.                                                   | `'La Tisseuse'.includes('tiss')` donne `false` (casse !)    |
| `text.trim()`, `text.toLowerCase()`      | Retirer les espaces autour / passer en minuscules.                                         | `' Le Root '.trim().toLowerCase()` donne `'le root'`        |

💡 **Chercher dans la documentation est un réflexe professionnel.** MDN a une liste de tous les événements : cherchez « MDN Event reference ».
