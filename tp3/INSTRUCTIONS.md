# TP3 – Playlist et statistiques

Vous développez le cœur d'une application musicale : la gestion d'une playlist et ses statistiques. Pas encore d'interface, tout se passe dans la console. L'interface viendra plus tard, mais c'est ici que tout commence.

**Le Niveau 1 contient l'essentiel du TP. Les niveaux suivants sont là pour aller plus loin.** Faites les étapes dans l'ordre. Au niveau 2, les étapes sont indépendantes : vous pouvez en sauter une.

## Objectifs

À la fin de ce TP, vous saurez :

- créer un tableau, lire et modifier ses éléments, et le parcourir avec `for...of` et `for` ;
- créer un objet, lire et modifier ses propriétés ;
- manipuler un tableau d'objets ;
- utiliser un **compteur** et un **accumulateur** pour calculer des statistiques ;
- écrire une boucle `while` sans tomber dans la boucle infinie.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et les commentaires sont en anglais, en `camelCase`, sans accent : `trackTitles`, `totalDuration`, `isLiked`. Le contenu n'est pas concerné : les titres et les artistes restent tels quels, et les messages affichés sont en français. Les valeurs qui servent à la logique du programme sont aussi en anglais : les genres `'rap'`, `'rock'`, `'pop'`, `'electro'`, `'jazz'`. Les noms de variables à utiliser vous sont donnés dans chaque consigne.
- Les noms de tableaux sont au **pluriel**, les noms d'éléments au singulier : `for (const track of playlist)`.
- **`const` par défaut**, `let` seulement si la valeur change ensuite (compteurs, accumulateurs).
- **`===` et `!==` uniquement** pour comparer.
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- Les noms de booléens commencent par `is`, `has` ou `can` : `isLiked`, `hasLyrics`.

## Avant de commencer

Le dossier `tp3/` contient :

```
tp3/
├── INSTRUCTIONS.md   ← ce fichier
├── index.html        ← la page (fournie)
└── style.css         ← le style de la page (fourni)
```

Vous devez **créer vous-même** le fichier `script.js` dans ce même dossier, et le relier à `index.html`. À la fin du TP, votre dossier doit ressembler à ceci :

```
tp3/
├── INSTRUCTIONS.md
├── index.html        ← modifié : relié à script.js
├── script.js         ← créé par vous
└── style.css
```

Tout votre code ira dans `script.js`, à la suite, étape après étape. Tous les résultats s'afficheront dans la console des outils de développement (**F12**), pas dans la page. Pour essayer une autre valeur : modifiez le code, enregistrez, rechargez la page.

Les notions utilisées dans ce TP (tableaux, objets, boucles, conditions) sont dans le cours. Gardez-le sous la main : l'énoncé ne les réexplique pas.

**Trois choses à savoir sur la console :**

- Elle affiche les tableaux et les objets de façon **dépliable** : cliquez sur le petit triangle pour voir le détail. Attention, le détail déplié montre le contenu **au moment où vous cliquez**, pas au moment du `console.log`. Si le tableau a été modifié entre-temps, fiez-vous à la ligne repliée.
- `console.table(playlist)` affiche un tableau d'objets sous forme de grille. C'est pratique pour **vérifier vos données**, mais les résultats demandés s'affichent avec `console.log`.
- Tout votre code est dans le même fichier : une variable ne peut être déclarée qu'**une seule fois** avec `const` ou `let`. Sinon, la console affiche `Identifier '...' has already been declared` et plus rien ne s'exécute. Les noms donnés dans les consignes sont choisis pour éviter ce problème.

---

# Niveau 1 : Essentiel

## Étape 0 : Mise en place

1. Dans le dossier `tp3/`, créez un fichier `script.js`.
2. Dans `index.html`, importez votre fichier `script.js`.

   💡 On place l'import à la fin du `<body>`, juste avant la balise fermante `</body>`, pour que le navigateur ait lu toute la page HTML avant d'exécuter le script.

3. Vérifiez que l'import fonctionne : dans `script.js`, affichez un texte de votre choix dans la console, puis ouvrez `index.html` dans le navigateur avec la console ouverte.

💡 **Le réflexe :** quand quelque chose ne marche pas, on ouvre la console. Une erreur y est presque toujours signalée, avec le fichier et la ligne concernés.

---

## Étape 1 : Un tableau, un objet

### 1.1 Le tableau

Ce tableau contient les titres de l'EP _FALL SEASON_ de Lefa (2021). Recopiez-le dans `script.js`, puis affichez-le avec `console.log(trackTitles)`.

```js
const trackTitles = ['Mentor', 'Tous mes plans', 'Penalty', 'La qualif', 'Meilleur price', 'Passionné'];
```

Affichez ensuite, une ligne à la fois :

1. le premier titre ;
2. le nombre de titres ;
3. le dernier titre, **sans écrire le nombre 5** : utilisez `trackTitles.length` ;
4. `trackTitles[10]`.

```
(6) ['Mentor', 'Tous mes plans', 'Penalty', 'La qualif', 'Meilleur price', 'Passionné']
Mentor
6
Passionné
undefined
```

Un index qui n'existe pas ne provoque **pas d'erreur** : on obtient `undefined`. Pensez-y quand un résultat est `undefined` sans raison apparente.

### 1.2 Modifier le tableau

1. Une faute s'est glissée dans le tableau : le vrai titre du 4e morceau est `'La quali'`, pas `'La qualif'`. Corrigez-le en le remplaçant par son index (`trackTitles[...] = ...`).
2. Ajoutez `'Walygator'` (un titre de Prince Waly) avec `push`, puis affichez le tableau.
3. Retirez-le avec `const removedTitle = trackTitles.pop();`, puis affichez `removedTitle` et `trackTitles.length`.

```
(7) ['Mentor', 'Tous mes plans', 'Penalty', 'La quali', 'Meilleur price', 'Passionné', 'Walygator']
Walygator
6
```

### 1.3 Parcourir le tableau

Avec `for...of`, affichez chaque titre sur une ligne.

```
Mentor
Tous mes plans
Penalty
La quali
Meilleur price
Passionné
```

### 1.4 L'objet

Cet objet décrit le morceau _Bleu_ de Prince Waly, sur l'album _Moussa_ (2022). Recopiez-le, puis affichez-le en entier avec `console.log(track)`.

```js
const track = {
  title: 'Bleu',
  artist: 'Prince Waly',
  durationInSeconds: 276,
  genre: 'rap',
  isLiked: false,
};
```

Affichez ensuite :

1. le titre, avec le point : `track.title` ;
2. le genre, avec les crochets : `track['genre']` ;
3. l'artiste, avec une clé stockée dans une variable : `const key = 'artist';` puis `track[key]`.

```
Bleu
rap
Prince Waly
```

Les crochets servent quand le nom de la propriété est dans une variable. `track.key` chercherait une propriété qui s'appelle vraiment « key ».

### 1.5 Modifier l'objet

1. Passez `isLiked` à `true`.
2. Ajoutez une propriété `releaseYear` qui vaut `2022` : il suffit de lui donner une valeur (`track.releaseYear = 2022;`).
3. Affichez l'objet : il contient maintenant 6 propriétés.
4. Avec un template literal, affichez `Bleu, par Prince Waly`.

```
{title: 'Bleu', artist: 'Prince Waly', durationInSeconds: 276, genre: 'rap', isLiked: true, releaseYear: 2022}
Bleu, par Prince Waly
```

Comme pour un index, une propriété inexistante ou mal orthographiée donne `undefined`, sans erreur. Si un résultat vaut `undefined`, affichez l'objet avec `console.log` et vérifiez l'orthographe.

---

## Étape 2 : Le tableau d'objets, la playlist

### 2.1 Les données

Cette playlist contient de vrais morceaux. Recopiez-la (un copier-coller est le bienvenu), puis vérifiez la saisie avec `console.table(playlist)`.

```js
const playlist = [
  { title: 'Mentor', artist: 'Lefa', durationInSeconds: 179, genre: 'rap', isLiked: true },
  { title: 'Balance ton quoi', artist: 'Angèle', durationInSeconds: 189, genre: 'pop', isLiked: false },
  { title: 'Smells Like Teen Spirit', artist: 'Nirvana', durationInSeconds: 301, genre: 'rock', isLiked: true },
  { title: 'So What', artist: 'Miles Davis', durationInSeconds: 562, genre: 'jazz', isLiked: true },
  { title: 'One More Time', artist: 'Daft Punk', durationInSeconds: 320, genre: 'electro', isLiked: false },
  { title: 'LoveGame', artist: 'Lady Gaga', durationInSeconds: 216, genre: 'pop', isLiked: false },
  { title: 'Miroir', artist: 'Prince Waly', durationInSeconds: 115, genre: 'rap', isLiked: true },
  { title: 'Un autre monde', artist: 'Téléphone', durationInSeconds: 271, genre: 'rock', isLiked: false },
];
```

Chaque élément du tableau est un objet. `playlist[0]` est le premier morceau, et `playlist[0].title` son titre.

### 2.2 Afficher la playlist

Avec `for...of`, affichez chaque morceau. Nommez l'élément `track` : `for (const track of playlist)`. Dans la boucle, `track` désigne le morceau en cours (ce n'est plus l'objet de l'étape 1).

```
Mentor — Lefa (179 s)
Balance ton quoi — Angèle (189 s)
Smells Like Teen Spirit — Nirvana (301 s)
So What — Miles Davis (562 s)
One More Time — Daft Punk (320 s)
LoveGame — Lady Gaga (216 s)
Miroir — Prince Waly (115 s)
Un autre monde — Téléphone (271 s)
```

Le tiret long `—` se copie depuis cet énoncé. Le format `3:35` viendra au niveau 2 : pour l'instant, les secondes suffisent.

### 2.3 Ajouter un morceau

Ajoutez ce morceau avec `push`, en écrivant l'objet directement entre les parenthèses, puis affichez le nombre de morceaux.

```js
{ title: 'Papaoutai', artist: 'Stromae', durationInSeconds: 232, genre: 'pop', isLiked: true }
```

```
La playlist contient 9 morceaux.
```

### 2.4 Compter les morceaux likés

C'est le premier **compteur** du TP. Le principe tient en trois temps :

1. **avant** la boucle : on crée une variable à 0 avec `let` (sa valeur va changer) ;
2. **dans** la boucle : on l'augmente de 1 quand la condition est vraie ;
3. **après** la boucle : on l'affiche.

Créez `let likedCount = 0;` et comptez les morceaux dont `isLiked` vaut `true`.

```
5 morceaux likés sur 9
```

<details>
<summary>Indice</summary>

Pour augmenter un compteur de 1 : `likedCount++;` (ou `likedCount += 1;`). Attention à ne pas mettre le `console.log` **dans** la boucle : il s'afficherait 9 fois.

</details>

### 2.5 Filtrer par genre

Déclarez `const searchedGenre = 'rock';` et affichez seulement les morceaux de ce genre.

```
Smells Like Teen Spirit — Nirvana
Un autre monde — Téléphone
```

Testez ensuite avec `'pop'` (3 morceaux), puis remettez `'rock'`.

---

## Étape 3 : Statistiques avec un accumulateur

Toutes les questions portent sur `playlist` (9 morceaux), avec les durées en secondes.

### 3.1 Durée totale

Un **accumulateur** fonctionne comme un compteur, mais au lieu d'ajouter 1, on ajoute une valeur à chaque tour. Créez `let totalDuration = 0;` avant la boucle, ajoutez-y la durée de chaque morceau, et affichez le total après la boucle.

```
Durée totale : 2385 s
```

<details>
<summary>Indice</summary>

`totalDuration += track.durationInSeconds;` est le raccourci de `totalDuration = totalDuration + track.durationInSeconds;`.

</details>

### 3.2 Durée moyenne

Déclarez `averageDuration` : la durée totale divisée par le nombre de morceaux. Pas besoin de nouvelle boucle.

```
Durée moyenne : 265 s
```

### 3.3 Le plus long et le plus court

Pour trouver le **maximum**, on garde en mémoire le meilleur élément vu jusqu'ici :

1. **avant** la boucle : `let longestTrack = playlist[0];` (le premier morceau est le plus long… tant qu'on n'en a pas vu d'autre) ;
2. **dans** la boucle : si le morceau en cours est plus long que `longestTrack`, il le remplace ;
3. **après** la boucle : on affiche `longestTrack`.

```
Morceau le plus long : So What (562 s)
```

Faites de même avec `let shortestTrack` pour le plus court.

```
Morceau le plus court : Miroir (115 s)
```

### À retenir : un seul motif, trois usages

| Motif            | Avant la boucle           | Dans la boucle                        | Exemple                  |
| ---------------- | ------------------------- | ------------------------------------- | ------------------------ |
| **Compteur**     | `let count = 0;`          | `+ 1` si la condition est vraie       | nombre de morceaux likés |
| **Accumulateur** | `let total = 0;`          | `+ valeur` à chaque tour              | durée totale             |
| **Maximum**      | `let best = playlist[0];` | on remplace si l'élément est meilleur | morceau le plus long     |

Dans les trois cas : une variable `let` créée **avant** la boucle, mise à jour **dans** la boucle, lue **après** la boucle.

---

> ### 🎯 Jalon : vous avez vu l'essentiel
>
> Si vous êtes arrivé·e ici, vous avez vu l'essentiel : tableaux, objets, tableaux d'objets, parcours avec `for...of`, compteurs et accumulateurs. Les étapes suivantes approfondissent.
>
> Pour finir ce niveau, répondez en commentaire dans `script.js`, en deux ou trois phrases : **quelle différence entre un compteur et un accumulateur, et pourquoi la variable est-elle créée avec `let` avant la boucle ?**
>
> Puis, sans regarder votre code :
>
> - [ ] Je sais accéder au dernier élément d'un tableau, quelle que soit sa taille.
> - [ ] Je sais pourquoi un index ou une propriété inexistants donnent `undefined`.
> - [ ] Je sais lire la propriété d'un objet dans un tableau d'objets (`playlist[2].artist`).
> - [ ] Je sais compter les éléments qui respectent une condition.
> - [ ] Je sais calculer une somme avec un accumulateur.
>
> Une case non cochée ? Relisez l'étape correspondante avant de continuer.

---

# Niveau 2 : Approfondissement

Les étapes de ce niveau sont **indépendantes** : faites-les dans l'ordre que vous voulez, ou sautez-en une. Elles utilisent les données du niveau 1.

## Étape 4 : Boucles sur des nombres et `while`

### 4.1 Avec `for`

1. Avec une boucle `for` qui utilise un index `i`, affichez les titres de `trackTitles` en liste numérotée. La numérotation commence à 1, alors que les index commencent à 0.

   ```
   1. Mentor
   2. Tous mes plans
   3. Penalty
   4. La quali
   5. Meilleur price
   6. Passionné
   ```

2. Calculez la somme des nombres de 1 à 100 avec un accumulateur `let numbersSum = 0;`.

   ```
   Somme de 1 à 100 : 5050
   ```

### 4.2 Avec `while`

⚠️ Une boucle `while` tourne tant que sa condition est vraie. Si rien ne la rend fausse un jour, elle ne s'arrête jamais et l'onglet se fige. Ce n'est pas grave : fermez l'onglet, corrigez le code dans l'éditeur, puis rouvrez la page. Votre fichier ne risque rien.

Avec `let countdown = 10;` et une boucle `while`, affichez un compte à rebours, puis `Décollage !`.

```
10
9
...
1
Décollage !
```

---

## Étape 5 : Formater les durées

### 5.1 Une durée au format `3:35`

215 secondes, c'est 3 minutes (3 × 60 = 180) et 35 secondes (le reste). En JavaScript :

```js
const durationToFormat = 215;
const minutes = Math.floor(durationToFormat / 60); // 3
const seconds = durationToFormat % 60; // 35, the remainder of the division
```

Affichez `minutes:seconds`, puis testez avec ces valeurs de `durationToFormat` :

| `durationToFormat` | Attendu |
| ------------------ | ------- |
| `215`              | `3:35`  |
| `180`              | `3:00`  |
| `61`               | `1:01`  |

<details>
<summary>Indice : j'obtiens <code>1:1</code> au lieu de <code>1:01</code></summary>

Quand les secondes valent moins de 10, il faut ajouter un `0` devant. Créez ``let secondsText = `${seconds}`;``, puis, `if (seconds < 10)`, remplacez sa valeur par `` `0${seconds}` ``. Ce même problème donne `3:0` pour 180.

</details>

### 5.2 La playlist avec les durées

Réaffichez la playlist avec les durées formatées. Le calcul se fait **dans** la boucle, pour chaque morceau : utilisez d'autres noms, par exemple `trackMinutes`, `trackSeconds` et `trackSecondsText`.

```
Mentor — Lefa (2:59)
Balance ton quoi — Angèle (3:09)
Smells Like Teen Spirit — Nirvana (5:01)
So What — Miles Davis (9:22)
One More Time — Daft Punk (5:20)
LoveGame — Lady Gaga (3:36)
Miroir — Prince Waly (1:55)
Un autre monde — Téléphone (4:31)
Papaoutai — Stromae (3:52)
```

💡 Vous avez écrit deux fois le même calcul de minutes et de secondes. Au prochain TP, les **fonctions** permettront de l'écrire une seule fois et de le réutiliser.

---

## Étape 6 : Rechercher un titre

Déclarez `const searchedText = 'game';`. Parcourez la playlist et affichez le **premier** morceau dont le titre contient ce texte, **sans tenir compte des majuscules**.

1. Avant la boucle, créez `let foundTrack = null;` (« rien trouvé pour l'instant »).
2. Dans la boucle, si le titre contient le texte cherché, rangez le morceau dans `foundTrack` et arrêtez la boucle avec `break`.
3. Après la boucle, si `foundTrack` vaut toujours `null`, affichez `Aucun résultat`. Sinon, affichez le morceau.

```
Trouvé : LoveGame — Lady Gaga
```

Testez :

| `searchedText` | Attendu                               |
| -------------- | ------------------------------------- |
| `'game'`       | `Trouvé : LoveGame — Lady Gaga`       |
| `'MONDE'`      | `Trouvé : Un autre monde — Téléphone` |
| `'zouk'`       | `Aucun résultat`                      |

<details>
<summary>Indice : <code>'game'</code> ne trouve pas <code>LoveGame</code></summary>

`includes` tient compte des majuscules : `'LoveGame'` ne contient pas `'game'`, mais `'Game'`. Passez les **deux** textes en minuscules avant de comparer : `track.title.toLowerCase()` et `searchedText.toLowerCase()`.

</details>

---

# Niveau 3 : Bonus

Des défis indépendants, à faire dans l'ordre que vous voulez.

### Bonus 1 : Plus de méthodes de tableaux

On travaille sur `trackTitles` tel qu'il est à la fin de l'étape 1 :

```
(6) ['Mentor', 'Tous mes plans', 'Penalty', 'La quali', 'Meilleur price', 'Passionné']
```

Pour chaque ligne, **prédisez** le résultat, puis vérifiez.

| Code                                                                                | Ce que fait la méthode                                  |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `trackTitles.unshift('Bleu');` puis afficher le tableau                             | ajoute un élément **au début**                          |
| `const firstTitle = trackTitles.shift();` puis afficher `firstTitle` et la longueur | retire le premier élément et le renvoie                 |
| `trackTitles.includes('Penalty')`                                                   | indique si l'élément est présent (`true` / `false`)     |
| `trackTitles.includes('penalty')`                                                   |                                                         |
| `trackTitles.indexOf('Meilleur price')`                                             | donne l'index de l'élément                              |
| `trackTitles.indexOf('La qualif')`                                                  |                                                         |
| `trackTitles.join(' \| ')`                                                          | colle les éléments en un seul texte, avec un séparateur |
| `trackTitles.slice(0, 3)` puis afficher la longueur                                 | copie une partie du tableau, de l'index 0 à 3 (exclu)   |

```
(7) ['Bleu', 'Mentor', 'Tous mes plans', 'Penalty', 'La quali', 'Meilleur price', 'Passionné']
Bleu
6
true
false
4
-1
Mentor | Tous mes plans | Penalty | La quali | Meilleur price | Passionné
(3) ['Mentor', 'Tous mes plans', 'Penalty']
6
```

Que renvoie `indexOf` quand l'élément est absent ? Pourquoi `includes('penalty')` renvoie-t-il `false` ? `slice` a-t-il modifié `trackTitles` ?

### Bonus 2 : Durées totales

1. Affichez la durée totale de la playlist (`totalDuration`, calculée à l'étape 3) en minutes et secondes, avec le calcul de l'étape 5.

   ```
   Durée totale : 39 min 45 s
   ```

2. Avec `const targetGenre = 'rock';` et un accumulateur `let targetGenreDuration = 0;`, calculez la durée totale des seuls morceaux de ce genre.

   ```
   Durée des morceaux rock : 9 min 32 s
   ```

   Avec `'jazz'`, vous devez obtenir `9 min 22 s`.

Si la playlist était vide, que vaudrait la durée moyenne de l'étape 3 ? Pourquoi ? (Vous pouvez tester avec un tableau vide `[]`.)

### Bonus 3 : Parcourir les propriétés d'un objet

`for...in` parcourt les **noms des propriétés** d'un objet. Avec l'objet `track` de l'étape 1, affichez chaque propriété sous la forme `nom = valeur`. Nommez la variable de boucle `propertyName`.

```
title = Bleu
artist = Prince Waly
durationInSeconds = 276
genre = rap
isLiked = true
releaseYear = 2022
```

<details>
<summary>Indice</summary>

Le nom de la propriété est dans une variable : pour lire sa valeur, il faut les crochets, comme à l'étape 1.4.

</details>

### Bonus 4 : Compter par genre

Construisez un objet `genreCounts` qui compte les morceaux de chaque genre, **sans écrire les genres à la main** : les clés sont créées au fur et à mesure.

Pour chaque morceau, si `genreCounts[genre] === undefined`, ce genre n'a pas encore été vu : initialisez-le à 1. Sinon, augmentez-le de 1. Affichez ensuite le résultat avec `for...in` (bonus 3).

```
rap : 2
pop : 3
rock : 2
jazz : 1
electro : 1
```

### Bonus 5 : La playlist à l'envers

Affichez les titres du dernier au premier, avec une boucle `for` qui part de la fin. Puis trouvez une deuxième façon avec `reverse()`, **sans modifier `playlist`** (indice : `reverse()` modifie le tableau, `slice()` en fait une copie).

```
Papaoutai
Un autre monde
...
Mentor
```

### Bonus 6 : Trier par durée, à la main

🧗 **C'est un défi.** Triez une copie de la playlist (`const sortedPlaylist = playlist.slice();`) par durée croissante, **sans utiliser `sort`**, avec deux boucles imbriquées. Le principe du « tri à bulles » : on compare chaque morceau avec son voisin, et on les échange s'ils sont dans le mauvais ordre. On recommence jusqu'à ce que plus rien ne bouge.

```
115 s — Miroir
179 s — Mentor
189 s — Balance ton quoi
216 s — LoveGame
232 s — Papaoutai
271 s — Un autre monde
301 s — Smells Like Teen Spirit
320 s — One More Time
562 s — So What
```

### Bonus 7 : Le piège de `sort()`

Triez le tableau `[10, 9, 1, 100]` avec `sort()` et affichez-le.

```
(4) [1, 10, 100, 9]
```

Pourquoi ce résultat ? (Repensez à l'ordre du dictionnaire.) On verra au prochain TP comment trier correctement des nombres.

### Bonus 8 : Mélanger la playlist

Mélangez une copie de la playlist avec `Math.random()`, comme le mode « aléatoire » d'une application musicale. Chaque rechargement doit donner un ordre différent, avec les 9 morceaux présents une seule fois.

---

## Exercice papier (sans ordinateur, 10 à 15 min)

Cet exercice vous entraîne au format de l'examen final, qui se fait **sur feuille**. Fermez votre ordinateur et répondez sur papier. Les questions sont classées par priorité : si vous n'avez fait que le niveau 1, traitez les questions 1 et 2.

Une fois que vous avez fini, **vérifiez vous-même** vos réponses : recopiez chaque script dans la console des DevTools (ou dans un `script.js`) et comparez. Pour les tableaux de trace, ajoutez un `console.log` à la fin du corps de la boucle.

### Question 1 (niveau 1) : Suivre une boucle

```js
const points = [3, 8, 5, 10];
let bonusTotal = 0;

for (let i = 0; i < points.length; i++) {
  if (points[i] >= 5) {
    bonusTotal += points[i];
  } else {
    bonusTotal -= 1;
  }
}

console.log(bonusTotal);
```

Complétez le tableau avec les valeurs **à la fin de chaque tour**, puis indiquez ce qu'affiche le `console.log`.

| Tour | `i` | `points[i]` | `bonusTotal` |
| ---- | --- | ----------- | ------------ |
| 1    |     |             |              |
| 2    |     |             |              |
| 3    |     |             |              |
| 4    |     |             |              |

### Question 2 (niveau 1) : Un tableau d'objets

```js
const products = [
  { name: 'Casque', price: 59, isInStock: true },
  { name: 'Câble USB', price: 9, isInStock: false },
  { name: 'Enceinte', price: 89, isInStock: true },
  { name: 'Micro', price: 45, isInStock: true },
];

for (const product of products) {
  if (product.isInStock) {
    console.log(`${product.name} : ${product.price} €`);
  } else {
    console.log(`${product.name} : rupture (${product.stock})`);
  }
}
```

1. Écrivez **exactement** ce qu'affiche ce script.
2. Écrivez le code qui calcule, avec un accumulateur `stockTotal`, le prix total des produits **en stock**. Quelle valeur obtenez-vous ?

### Question 3 (bonus) : Méthodes de tableaux

```js
const queue = ['Lina', 'Hugo', 'Sami'];
queue.push('Inès');
const firstPerson = queue.shift();
queue.unshift('Zoé');
const lastPerson = queue.pop();
const firstTwo = queue.slice(0, 2);
console.log(firstPerson, lastPerson);
console.log(firstTwo, queue.length);
```

1. Écrivez le contenu de `queue` après chacune des lignes 2 à 6.
2. Écrivez ce qu'affichent les deux `console.log`.

### Question 4 (niveau 2, facultative) : Suivre un `while`

```js
let budget = 50;
let ticketCount = 0;

while (budget >= 12) {
  budget -= 12;
  ticketCount++;
}

console.log(`${ticketCount} places, reste ${budget} €`);
```

Complétez le tableau avec les valeurs **à la fin de chaque tour** (ajoutez des lignes si besoin), puis indiquez ce qu'affiche le `console.log`.

| Tour | `budget` | `ticketCount` | `budget >= 12` ? |
| ---- | -------- | ------------- | ---------------- |
| 1    |          |               |                  |
| 2    |          |               |                  |
| …    |          |               |                  |

---

## Boîte à outils

Ces notions ne sont pas toutes dans les slides du cours. Une ligne d'exemple suffit pour démarrer.

| Outil             | À quoi ça sert                                                             | Exemple                                                  |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| `+=`, `-=`        | Ajouter (ou retirer) une valeur à une variable.                            | `total += 5;` équivaut à `total = total + 5;`            |
| `++`, `--`        | Augmenter (ou diminuer) une variable de 1.                                 | `count++;` équivaut à `count = count + 1;`               |
| `break`           | Sortir immédiatement d'une boucle.                                         | `if (track.isLiked) { break; }`                          |
| `.length`         | Nombre d'éléments d'un tableau, ou de caractères d'un texte.               | `[4, 7].length` donne `2`, `'Miroir'.length` donne `6`   |
| `.includes()`     | Savoir si un tableau contient un élément, ou un texte un morceau de texte. | `'LoveGame'.includes('Game')` donne `true`               |
| `.toLowerCase()`  | Mettre un texte en minuscules.                                             | `'LoveGame'.toLowerCase()` donne `'lovegame'`            |
| `Math.floor()`    | Arrondir à l'entier inférieur.                                             | `Math.floor(215 / 60)` donne `3`                         |
| `%`               | Reste de la division entière.                                              | `215 % 60` donne `35`                                    |
| `console.table()` | Afficher un tableau d'objets sous forme de grille, pour vérifier.          | `console.table(playlist);`                               |
| `slice()`         | Copier un tableau (ou une partie). Bonus.                                  | `const copy = playlist.slice();`                         |
| `reverse()`       | Inverser l'ordre d'un tableau (le modifie). Bonus.                         | `copy.reverse();`                                        |
| `Math.random()`   | Nombre décimal au hasard entre 0 (inclus) et 1 (exclu). Bonus.             | `Math.floor(Math.random() * 9)` donne un entier de 0 à 8 |

💡 **Chercher dans la documentation est un réflexe professionnel**, pas un aveu de faiblesse. La référence pour JavaScript est [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript). Essayez par exemple de chercher « MDN Array methods » ou « MDN Object ».

Au prochain TP, vous découvrirez les **fonctions** : elles rendront toutes ces boucles réutilisables, sans avoir à les réécrire à chaque fois.
