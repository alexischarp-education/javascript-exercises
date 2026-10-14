# TP4 – Validateur de mot de passe et pyramide

Une application d'inscription doit refuser les mots de passe trop faibles, et un designer vous demande d'afficher une pyramide de logos en texte. Deux missions sans rapport ? Pas tout à fait : dans les deux cas, vous allez écrire de petits outils réutilisables, les **fonctions**, puis les combiner. Pas encore d'interface : tout se passe dans la console.

## Objectifs

À la fin de ce TP, vous saurez :

- déclarer une fonction et l'appeler, et faire la différence entre les deux ;
- lui donner des paramètres et récupérer son résultat avec `return` ;
- savoir où une variable existe, et où elle n'existe pas (la **portée**) ;
- construire une fonction en combinant des fonctions plus petites ;
- passer une fonction à une autre fonction (un **callback**) avec `forEach`, `map`, `filter` et `find` ;
- écrire une fonction anonyme, puis une fonction fléchée.

Les étapes 0 à G forment le **Socle** : c'est l'essentiel du TP, à faire dans l'ordre. Le **Bonus** est pour celles et ceux qui ont fini en avance.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables, les noms de fonctions et les commentaires sont en anglais, en `camelCase`, sans accent : `password`, `isLongEnough`, `getStrengthScore`, `drawPyramid`. Seuls les messages affichés (`'Faible'`, `'Mot de passe trop court'`) et les valeurs de test (les exemples de mots de passe) restent en français. Les noms de fonctions et de variables à utiliser vous sont donnés dans chaque consigne.
- Le nom d'une fonction commence par un **verbe à l'infinitif** qui dit ce qu'elle fait : `getStrengthScore`, `drawPyramid`, `countDigits`. Quand elle répond par oui ou non, elle commence par `is`, `has` ou `can` : `isLongEnough`, `hasDigit`.
- **Une fonction fait une seule chose.** Si vous avez besoin d'un « et » pour décrire ce qu'elle fait, c'est sans doute deux fonctions.
- Les noms de tableaux sont au **pluriel**, les noms d'éléments au singulier : `for (const password of passwords)`.
- **`const` par défaut**, `let` seulement si la valeur change ensuite (compteurs, accumulateurs).
- **`===` et `!==` uniquement** pour comparer.
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.

## Avant de commencer

Le dossier `tp4/` contient :

```
tp4/
├── INSTRUCTIONS.md   ← ce fichier
├── index.html        ← la page (fournie)
└── style.css         ← le style de la page (fourni)
```

Vous devez **créer vous-même** le fichier `script.js` dans ce même dossier, et le relier à `index.html`. À la fin du TP, votre dossier doit ressembler à ceci :

```
tp4/
├── INSTRUCTIONS.md
├── index.html        ← modifié : relié à script.js
├── script.js         ← créé par vous
└── style.css
```

Tout votre code ira dans `script.js`, à la suite, étape après étape. Tous les résultats s'afficheront dans la console des outils de développement (**F12**), pas dans la page. Pour essayer une autre valeur : modifiez le code, enregistrez, rechargez la page.

Les notions utilisées dans ce TP (fonctions, boucles, conditions, méthodes de tableaux) sont dans le cours. Gardez-le sous la main : l'énoncé ne les réexplique pas.

**Deux choses à savoir pour ce TP :**

- Tout votre code est dans le même fichier : une variable ou une fonction ne peut être déclarée qu'**une seule fois** avec un nom donné. Sinon, la console affiche `Identifier '...' has already been declared` et plus rien ne s'exécute. Les noms donnés dans les consignes sont choisis pour éviter ce problème.
- **Une erreur arrête tout le script** : les lignes qui suivent ne s'exécutent pas. L'étape E vous en fait provoquer une volontairement, pour apprendre à la lire. Le reste du temps, une erreur dans la console est la première chose à corriger.

---

# Socle

## Étape 0 : Mise en place

1. Dans le dossier `tp4/`, créez un fichier `script.js`.
2. Dans `index.html`, importez votre fichier `script.js`.

   💡 On place l'import à la fin du `<body>`, juste avant la balise fermante `</body>`, pour que le navigateur ait lu toute la page HTML avant d'exécuter le script.

3. Vérifiez que l'import fonctionne : dans `script.js`, affichez un texte de votre choix dans la console, puis ouvrez `index.html` dans le navigateur avec la console ouverte.

💡 **Le réflexe :** quand quelque chose ne marche pas, on ouvre la console. Une erreur y est presque toujours signalée, avec le fichier et la ligne concernés.

---

## Étape A : Première fonction

### A.1 Déclarer, puis appeler

Recopiez cette fonction dans `script.js`, enregistrez, puis rechargez la page.

```js
function isLongEnough(password) {
  return password.length >= 8;
}
```

Regardez la console : **rien ne s'affiche**. Une fonction déclarée mais jamais appelée ne fait rien. C'est un outil rangé dans un tiroir : il faut le prendre pour s'en servir.

Ajoutez maintenant ces deux lignes, **prédisez** ce qui va s'afficher, puis rechargez.

```js
console.log(isLongEnough);
console.log(isLongEnough('abc'));
```

```
ƒ isLongEnough(password) {
  return password.length >= 8;
}
false
```

Sans parenthèses, `isLongEnough` désigne la fonction elle-même : la console l'affiche telle quelle, et son code **n'est pas exécuté**. Avec parenthèses, `isLongEnough('abc')` **appelle** la fonction : `password` reçoit `'abc'`, le corps s'exécute, et l'appel vaut le résultat renvoyé par `return`, ici `false`. Gardez cette différence en tête : elle resservira à l'étape F.

### A.2 Tester

Une fonction se teste en l'appelant avec **plusieurs valeurs**, dont les cas limites. Affichez le résultat de ces trois appels :

| Appel                                     | Attendu |
| ----------------------------------------- | ------- |
| `isLongEnough('')`                        | `false` |
| `isLongEnough('azerty7')` (7 caractères)  | `false` |
| `isLongEnough('azerty78')` (8 caractères) | `true`  |

Le cas **pile au seuil** est le plus important : c'est là que `>` et `>=` font la différence. Pensez-y pour toutes les fonctions à venir.

---

## Étape B : Les critères, avec des boucles

Un bon mot de passe ne se résume pas à sa longueur. Vous allez écrire trois fonctions qui vérifient la présence d'un chiffre, d'une majuscule et d'un caractère spécial.

Un texte se parcourt comme un tableau : `for (const character of password)` donne chaque caractère, un par un. Et `'0123456789'.includes(character)` indique si `character` est un chiffre.

1. Écrivez `hasDigit(password)`, qui renvoie `true` si le mot de passe contient au moins un chiffre, et `false` sinon.
2. Écrivez `hasUppercase(password)` sur le même modèle, en testant chaque caractère avec `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(character)`.
3. Écrivez `hasSpecialCharacter(password)` : au moins un caractère parmi `!@#$%&*?`.

Testez chaque fonction avec la chaîne vide, un mot de passe qui ne remplit pas le critère, et un mot de passe qui ne le remplit que par son **dernier** caractère :

| Appel                             | Attendu |
| --------------------------------- | ------- |
| `hasDigit('')`                    | `false` |
| `hasDigit('azerty')`              | `false` |
| `hasDigit('azerty7')`             | `true`  |
| `hasUppercase('bonjouR')`         | `true`  |
| `hasSpecialCharacter('bonjour!')` | `true`  |

Si `hasDigit('azerty7')` répond `false`, votre fonction s'est arrêtée trop tôt : le `return false` doit être **après** la boucle, pas dedans.

<details>
<summary>Indice : le schéma « trouvé / pas trouvé »</summary>

```js
function hasSomething(text) {
  for (const character of text) {
    if (/* character is what we are looking for */) {
      return true; // found: the answer is yes, stop right here
    }
  }
  return false; // the loop ended without finding anything: the answer is no
}
```

`return` termine la fonction **immédiatement**, même au milieu d'une boucle : dès qu'un chiffre est trouvé, inutile de regarder la suite. Le `return false`, lui, ne peut venir qu'une fois **tous** les caractères examinés. S'il était dans la boucle (dans un `else`, par exemple), la fonction répondrait « non » dès le premier caractère qui n'est pas un chiffre : pour `'azerty7'`, elle s'arrêterait au `a`.

</details>

---

## Étape C : Composition

Vous avez quatre petites fonctions. Il est temps de les combiner.

### C.1 Le score

Écrivez `getStrengthScore(password)`, qui renvoie un score de 0 à 4 : un point par critère rempli. Elle **appelle** `isLongEnough`, `hasDigit`, `hasUppercase` et `hasSpecialCharacter`, et incrémente une variable `let score = 0;` à chaque réponse `true`.

| Appel                           | Attendu |
| ------------------------------- | ------- |
| `getStrengthScore('azerty')`    | `0`     |
| `getStrengthScore('Azerty123')` | `3`     |
| `getStrengthScore('Abc123!x')`  | `4`     |

<details>
<summary>Indice</summary>

```js
let score = 0;
if (isLongEnough(password)) {
  score++;
}
// ... same thing for the three other criteria
return score;
```

`isLongEnough(password)` vaut déjà `true` ou `false` : inutile d'écrire `=== true`.

</details>

### C.2 L'étiquette

Écrivez `getStrengthLabel(score)`, qui renvoie `'Faible'` pour un score de 0 ou 1, `'Moyen'` pour 2 ou 3, et `'Fort'` pour 4. Une cascade `if (score <= 1)`, `else if (score <= 3)`, `else` suffit. Testez avec les scores 1, 2 et 4.

```
Faible
Moyen
Fort
```

### C.3 Le rapport

Affichez une ligne de rapport pour `'Abc123!x'`, puis une autre pour `'motdepasse1'`. Pour le premier :

```js
const firstScore = getStrengthScore('Abc123!x');
console.log(`Mot de passe "Abc123!x" : ${getStrengthLabel(firstScore)} (${firstScore}/4)`);
```

```
Mot de passe "Abc123!x" : Fort (4/4)
Mot de passe "motdepasse1" : Moyen (2/4)
```

Vous venez d'écrire deux fois presque la même chose. Imaginez-le pour cinquante mots de passe : l'étape F règle ce problème.

---

## Étape D : Pyramide

Pause dans les mots de passe : le designer veut sa pyramide.

### D.1 Avec une boucle

La méthode `repeat()` répète un texte : `'*'.repeat(3)` donne `'***'`, et `' '.repeat(2)` donne deux espaces. Avec une boucle `for` et `const height = 5;`, affichez cette pyramide :

```
    *
   ***
  *****
 *******
*********
```

Chaque `console.log` fait une ligne, et les espaces en début de ligne sont conservés dans la console. Pour la ligne `row` (de 1 à `height`), il faut `height - row` espaces, puis `2 * row - 1` étoiles.

<details>
<summary>Indice</summary>

| `row` | Espaces | Étoiles |
| ----- | ------- | ------- |
| 1     | 4       | 1       |
| 2     | 3       | 3       |
| 3     | 2       | 5       |
| 4     | 1       | 7       |
| 5     | 0       | 9       |

Dans le corps de la boucle, calculez `spaceCount` et `starCount` à partir de `row` et `height`, puis affichez les deux morceaux côte à côte dans un template literal : les espaces d'abord, les étoiles ensuite.

</details>

### D.2 Dans une fonction

Encapsulez votre boucle dans une fonction `drawPyramid(height)` : déplacez la boucle dans la fonction et supprimez la ligne `const height = 5;`, car `height` est maintenant le **paramètre**. Appelez-la avec les hauteurs 3 et 5.

```
  *
 ***
*****
    *
   ***
  *****
 *******
*********
```

Cette fonction **agit** (elle affiche), elle ne calcule rien : elle n'a pas de `return`, et un appel comme `drawPyramid(3)` vaut donc `undefined`. C'est normal pour une fonction dont le travail est d'afficher.

---

## Étape E : La portée, ou pourquoi ça plante

Recopiez ce script tel quel, rechargez, et lisez l'erreur.

```js
function countDigits(password) {
  let digitCount = 0;
  for (const character of password) {
    if ('0123456789'.includes(character)) {
      digitCount++;
    }
  }
}

countDigits('abc123');
console.log(digitCount);
```

```
Uncaught ReferenceError: digitCount is not defined
```

Pourtant, `digitCount` est bien déclarée, et `countDigits('abc123')` a bien compté 3 chiffres. Mais `digitCount` est déclarée **dans** la fonction : elle n'existe qu'entre ses accolades. C'est sa **portée**. En dehors, elle n'existe pas, d'où le `ReferenceError`. Le paramètre `password` suit la même règle. Pour faire sortir une valeur d'une fonction, il n'y a qu'un chemin : `return`.

Corrigez : ajoutez `return digitCount;` à la fin de la fonction, remplacez les deux dernières lignes par `console.log(countDigits('abc123'));`, et vérifiez.

```
3
```

---

## Étape F : Les callbacks

Recopiez ce tableau. Toutes les fonctions des étapes A à C restent disponibles : vous allez les réutiliser.

```js
const passwords = ['azerty', 'Azerty123', '', 'motdepasse1', 'Abc123!x', 'Mmi!2026'];
```

### F.1 `forEach` : agir sur chaque élément

1. Écrivez `showStrength(password)`, qui affiche la même ligne qu'à l'étape C.3 pour le mot de passe reçu. Elle appelle `getStrengthScore` et `getStrengthLabel`.
2. Écrivez `passwords.forEach(showStrength);`.

```
Mot de passe "azerty" : Faible (0/4)
Mot de passe "Azerty123" : Moyen (3/4)
Mot de passe "" : Faible (0/4)
Mot de passe "motdepasse1" : Moyen (2/4)
Mot de passe "Abc123!x" : Fort (4/4)
Mot de passe "Mmi!2026" : Fort (4/4)
```

`forEach` parcourt le tableau et, pour chaque élément, **appelle** la fonction qu'on lui a donnée, en lui passant l'élément. Une fonction passée à une autre fonction s'appelle un **callback**.

Remarquez qu'on passe `showStrength` **sans parenthèses** : on donne la fonction à `forEach`, c'est lui qui l'appellera, six fois. Souvenez-vous de l'étape A.1.

**L'erreur classique.** Pour la voir sans rien casser dans votre script, tapez directement dans la console des DevTools `passwords.forEach(showStrength())`, avec les parenthèses :

```
Uncaught TypeError: Cannot read properties of undefined (reading 'length')
    at isLongEnough (script.js:...)
    at getStrengthScore (script.js:...)
    at showStrength (script.js:...)
```

Avec les parenthèses, `showStrength()` est exécutée **tout de suite**, sans mot de passe (`password` vaut `undefined`), avant même que `forEach` ne démarre. `isLongEnough` tente alors `undefined.length`, ce qui plante. Les lignes `at …` montrent la chaîne des appels, de la fonction qui a planté jusqu'à la vôtre.

### F.2 `map` : transformer chaque élément

1. Écrivez `const scores = passwords.map(getStrengthScore);`, puis affichez `scores` et `passwords`.

   ```
   (6) [0, 3, 0, 2, 4, 4]
   (6) ['azerty', 'Azerty123', '', 'motdepasse1', 'Abc123!x', 'Mmi!2026']
   ```

   `map` appelle la fonction pour chaque élément, comme `forEach`, mais **range chaque résultat dans un nouveau tableau**, qu'il renvoie. Le tableau de départ n'est pas modifié.

2. Écrivez `getPasswordLabel(password)`, qui compose deux fonctions : elle calcule le score avec `getStrengthScore`, puis le donne à `getStrengthLabel`, et renvoie le résultat. Puis `const labels = passwords.map(getPasswordLabel);`.

   ```
   (6) ['Faible', 'Moyen', 'Faible', 'Moyen', 'Fort', 'Fort']
   ```

   Pourquoi ne pas écrire directement `passwords.map(getStrengthLabel)` ? Parce que `map` donne à la fonction **l'élément du tableau**, un mot de passe, alors que `getStrengthLabel` attend un score. Elle rendrait n'importe quoi, sans aucune erreur pour vous prévenir.

### F.3 `filter` : sélectionner des éléments

1. Écrivez `isStrong(password)`, qui renvoie `true` si le score vaut 4. Puis `const strongPasswords = passwords.filter(isStrong);` et affichez le résultat.

   ```
   (2) ['Abc123!x', 'Mmi!2026']
   ```

   `filter` appelle la fonction pour chaque élément et garde, dans un nouveau tableau, ceux pour lesquels elle a renvoyé `true`. Le callback doit donc répondre par oui ou non : c'est un `is…` ou un `has…`.

2. Écrivez `isTooShort(password)`, en réutilisant `isLongEnough` avec l'opérateur `!`. Puis affichez les mots de passe trop courts dans `tooShortPasswords`.

   ```
   (2) ['azerty', '']
   ```

### F.4 `find` : chercher le premier

Écrivez `isWeak(password)` (score de 0 ou 1), puis `const firstWeakPassword = passwords.find(isWeak);` et affichez le résultat.

```
azerty
```

`find` renvoie le **premier élément** pour lequel le callback a répondu `true` : l'élément lui-même, pas un tableau. Quand aucun élément ne convient, `find` renvoie `undefined`, là où `filter` renvoie un tableau vide.

### F.5 La fonction anonyme

Jusqu'ici, chaque callback avait un nom. Pour un critère qui ne sert qu'une fois, on peut écrire la fonction **directement dans l'appel**, sans nom. Le filtre de F.3 s'écrirait ainsi (à lire, pas à recopier : `tooShortPasswords` existe déjà) :

```js
const tooShortPasswords = passwords.filter(function (password) {
  return password.length < 8;
});
```

⚠️ Regardez bien la dernière ligne : `}` ferme la fonction, `)` ferme l'appel à `filter`, et `;` termine l'instruction. Ces `});` sont la source d'erreurs la plus fréquente avec les callbacks : si la console affiche `Unexpected token` ou `missing )`, c'est là qu'il faut regarder.

Écrivez avec une fonction anonyme :

1. `longPasswords` : les mots de passe de 10 caractères ou plus, avec `filter` ;
2. `passwordLengths` : la longueur de chaque mot de passe, avec `map`.

```
(1) ['motdepasse1']
(6) [6, 9, 0, 11, 8, 8]
```

Une fonction anonyme n'a pas de nom, donc on ne peut pas la réutiliser ailleurs. Si un critère sert deux fois, donnez-lui un nom.

---

## Étape G : Les fonctions fléchées

La **fonction fléchée** est l'écriture courte de la fonction anonyme : le mot `function` disparaît, une flèche `=>` sépare les paramètres du corps, et quand le corps tient en une seule expression, les accolades et le `return` disparaissent aussi. Le filtre de F.5 devient (toujours à lire, pas à recopier) :

```js
const tooShortPasswords = passwords.filter((password) => password.length < 8);
```

Réécrivez `longPasswords` et `passwordLengths` de l'étape F.5 en fonctions fléchées courtes. Gardez la version anonyme en commentaire pour comparer. Les résultats ne changent pas.

```
(1) ['motdepasse1']
(6) [6, 9, 0, 11, 8, 8]
```

Deux choses à retenir :

- Dès qu'il y a des accolades, il n'y a plus de renvoi automatique : il faut un `return`. Sans lui, la fonction renvoie `undefined`, et `map` en remplit son tableau.
- Dans ce module : `function` pour les fonctions qu'on déclare et qu'on réutilise, fonction fléchée pour les callbacks.

---

> ### 🎯 Jalon : vous avez vu l'essentiel
>
> Pour finir le Socle, répondez en commentaire dans `script.js`, en deux ou trois phrases : **qu'est-ce qu'un callback, et pourquoi le passe-t-on sans parenthèses ?**
>
> Puis, sans regarder votre code :
>
> - [ ] Je sais ce qui change entre `isLongEnough` et `isLongEnough('abc')`.
> - [ ] Je sais pourquoi une fonction sans `return` vaut `undefined`.
> - [ ] Je sais pourquoi une variable déclarée dans une fonction n'existe pas en dehors.
> - [ ] Je sais choisir entre `forEach`, `map`, `filter` et `find`.
>
> Une case non cochée ? Relisez l'étape correspondante avant de passer au bonus.

---

# Bonus

Des défis indépendants, à faire dans l'ordre que vous voulez. Ils utilisent les fonctions du Socle et les outils de la [boîte à outils](#boîte-à-outils), en bas de ce document.

### Bonus 1 : Dire pourquoi

Un mot de passe refusé sans explication, c'est frustrant. Écrivez `getMissingCriteria(password)`, qui renvoie un **tableau** contenant un message par critère non rempli, construit avec `push` :

- `'Mot de passe trop court (8 caractères minimum)'` ;
- `'Il manque un chiffre'` ;
- `'Il manque une majuscule'` ;
- `'Il manque un caractère spécial (!@#$%&*?)'`.

Pour un mot de passe fort, le tableau est vide. Testez avec `'Abc123!x'` et `'motdepasse1'` :

```
[]
(2) ['Il manque une majuscule', 'Il manque un caractère spécial (!@#$%&*?)']
```

Puis écrivez `showMissingCriteria(password)`, qui affiche `Mot de passe "…" accepté` si le tableau est vide, sinon `Mot de passe "…" refusé :` suivi des messages, un par ligne, avec `forEach`. Appliquez-la à tous les mots de passe avec `passwords.forEach(showMissingCriteria)`.

```
Mot de passe "azerty" refusé :
- Mot de passe trop court (8 caractères minimum)
- Il manque un chiffre
- Il manque une majuscule
- Il manque un caractère spécial (!@#$%&*?)
Mot de passe "Azerty123" refusé :
- Il manque un caractère spécial (!@#$%&*?)
...
Mot de passe "Abc123!x" accepté
Mot de passe "Mmi!2026" accepté
```

### Bonus 2 : La pyramide du designer

1. Le designer ne veut pas d'étoiles. Ajoutez un second paramètre à `drawPyramid` : `drawPyramid(height, symbol = '*')`. Le `= '*'` est une **valeur par défaut** : si on n'indique pas de symbole, `symbol` vaut `'*'`, et vos appels de l'étape D continuent de fonctionner. Testez `drawPyramid(3, '#')` puis `drawPyramid(3)`.

   ```
     #
    ###
   #####
     *
    ***
   *****
   ```

2. Écrivez `drawInvertedPyramid(height, symbol = '*')`, la pyramide à l'envers.

   ```
   #####
    ###
     #
   ```

3. 🧗 **C'est un défi.** Écrivez `drawDiamond(height, symbol = '*')`. Vérifiez d'abord que `drawPyramid(3)` suivi de `drawInvertedPyramid(2)` ne donne **pas** le bon résultat (regardez l'alignement), puis trouvez une solution. Indice : écrivez une fonction `drawRow(spaceCount, symbolCount, symbol)` qui affiche une seule ligne, et faites-la appeler par les trois autres fonctions.

   ```
     *
    ***
   *****
    ***
     *
   ```

### Bonus 3 : Tous ? Au moins un ?

`every` et `some` prennent un callback qui répond par oui ou non, comme `filter`, mais renvoient un seul booléen : `every` vaut `true` si **tous** les éléments répondent `true`, `some` si **au moins un** répond `true`. Écrivez `isVeryLong(password)` (16 caractères ou plus), puis prédisez et vérifiez :

```js
console.log(passwords.every(hasDigit));
console.log(passwords.every(isLongEnough));
console.log(passwords.some(isStrong));
console.log(passwords.some(isVeryLong));
```

Puis le cas limite : que valent `[].every(hasDigit)` et `[].some(isStrong)` sur un tableau vide ? Prédisez, vérifiez, et expliquez en commentaire.

### Bonus 4 : Trier avec un callback

Triez `const numbers = [10, 9, 1, 100];` avec `numbers.sort()` et affichez le résultat.

```
(4) [1, 10, 100, 9]
```

Sans callback, `sort` compare les valeurs **comme des textes**, caractère par caractère : `'10'` passe avant `'9'`. Pour trier des nombres, on lui donne une fonction de comparaison qui reçoit deux éléments : si elle renvoie un nombre négatif, le premier passe devant ; positif, le second passe devant ; zéro, ils sont équivalents.

1. Triez `numbers` avec `numbers.sort((a, b) => a - b)`, puis dans l'ordre décroissant.

   ```
   (4) [1, 9, 10, 100]
   (4) [100, 10, 9, 1]
   ```

2. Triez les mots de passe du plus fort au plus faible, par score, et affichez-les avec `showStrength`. Attention : `sort` **modifie** le tableau, faites-en d'abord une copie avec `slice()`. Les mots de passe de même score gardent leur ordre d'origine.

   ```
   Mot de passe "Abc123!x" : Fort (4/4)
   Mot de passe "Mmi!2026" : Fort (4/4)
   Mot de passe "Azerty123" : Moyen (3/4)
   Mot de passe "motdepasse1" : Moyen (2/4)
   Mot de passe "azerty" : Faible (0/4)
   Mot de passe "" : Faible (0/4)
   ```

### Bonus 5 : Générer un mot de passe

Écrivez `generatePassword(length)`, qui construit un mot de passe au hasard : partez de `const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';`, puis, `length` fois, ajoutez à `let generatedPassword = '';` un caractère tiré au hasard. `allowedCharacters[index]` donne le caractère à cet index, comme pour un tableau. Testez avec `showStrength(generatePassword(12));` : chaque rechargement donne un mot de passe différent.

```
Mot de passe "k2P!xq9Lm@aZ" : Fort (4/4)
```

Un mot de passe généré de 12 caractères peut-il être `Moyen` ? Rechargez plusieurs fois pour vérifier, et expliquez en commentaire.

Puis écrivez `generateStrongPassword(length)`, qui recommence tant que le mot de passe généré n'est pas fort (`isStrong`). On ne sait pas combien d'essais il faudra : c'est un cas pour `while`. Dernière question, **à ne pas tester** : que se passerait-il avec `generateStrongPassword(6)` ? Pourquoi ?

### Bonus 6 : La pyramide avec `while`

⚠️ Une boucle `while` tourne tant que sa condition est vraie. Si rien ne la rend fausse un jour, elle ne s'arrête jamais et l'onglet se fige. Ce n'est pas grave : fermez l'onglet, corrigez le code dans l'éditeur, puis rouvrez la page. Votre fichier ne risque rien.

Écrivez `drawPyramidWithWhile(height)`, qui affiche la même pyramide que `drawPyramid` avec une boucle `while`. Le compteur `row` est créé **avant** la boucle avec `let row = 1;`, et augmenté **dans** la boucle. Appelez-la avec la hauteur 4.

```
   *
  ***
 *****
*******
```

Entre `for` et `while`, laquelle est la plus lisible quand on connaît le nombre de tours à l'avance ? Laquelle rend l'oubli de l'incrémentation le plus facile ?

---

## Exercice papier (sans ordinateur)

Cet exercice vous entraîne au format de l'examen final, qui se fait **sur feuille**. Fermez votre ordinateur et répondez sur papier. Les questions sont classées par priorité : la question 5 est facultative.

Une fois que vous avez fini, **vérifiez vous-même** vos réponses : recopiez chaque script dans la console des DevTools (ou dans un `script.js`) et comparez.

### Question 1 : Déclarer, appeler, renvoyer

```js
function getDoubledPrice(price) {
  return price * 2;
}

function showPrice(price) {
  console.log(`Prix : ${price} €`);
}

const doubledPrice = getDoubledPrice(15);
const result = showPrice(doubledPrice);
console.log(doubledPrice);
console.log(result);
showPrice(getDoubledPrice(5));
```

1. Écrivez **exactement** ce qu'affiche ce script, dans l'ordre.
2. Que vaut `result` ? Pourquoi ?
3. `getDoubledPrice` est déclarée une fois. Combien de fois est-elle appelée ?

### Question 2 : Suivre une fonction avec une boucle

```js
function findFirstEven(numbers) {
  for (const number of numbers) {
    if (number % 2 === 0) {
      return number;
    }
  }
  return null;
}

console.log(findFirstEven([3, 7, 8, 10]));
console.log(findFirstEven([1, 5]));
console.log(findFirstEven([]));
```

1. Écrivez ce qu'affichent les trois `console.log`.
2. Lors du premier appel, combien de tours de boucle sont exécutés ?
3. Si le `return null` était déplacé **dans** la boucle, dans un `else`, qu'afficherait le premier appel ?

### Question 3 : La portée

```js
const bonus = 10;

function addBonus(score) {
  const total = score + bonus;
  return total;
}

console.log(addBonus(5));
console.log(bonus);
console.log(total);
```

Écrivez ce qu'affiche ce script, y compris l'erreur éventuelle, et expliquez chaque ligne en une phrase.

### Question 4 : Les callbacks

```js
const prices = [12, 30, 8, 45];

function isExpensive(price) {
  return price > 20;
}

const expensivePrices = prices.filter(isExpensive);
const doubledPrices = prices.map((price) => price * 2);
const firstExpensivePrice = prices.find(isExpensive);
const firstHugePrice = prices.find((price) => price > 100);
const forEachResult = prices.forEach(isExpensive);

console.log(expensivePrices);
console.log(doubledPrices);
console.log(firstExpensivePrice);
console.log(firstHugePrice);
console.log(forEachResult);
console.log(prices);
```

1. Écrivez ce qu'affichent les six `console.log`.
2. Écrivez, avec `filter` et une fonction fléchée courte, le code qui garde les prix inférieurs ou égaux à 12.

### Question 5 (facultative) : Écrire une fonction

Écrivez `getAverage(numbers)`, qui renvoie la moyenne d'un tableau de nombres, avec un accumulateur et une boucle `for...of`. Que renvoie-t-elle pour `[10, 20]` ? Et pour `[]` ? Pourquoi ?

---

## Boîte à outils

Ces notions ne sont pas toutes dans les slides du cours. Une ligne d'exemple suffit pour démarrer.

| Outil                   | À quoi ça sert                                                                  | Exemple                                            |
| ----------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| `.length`               | Nombre de caractères d'un texte, ou d'éléments d'un tableau.                    | `'azerty'.length` donne `6`                        |
| `.includes()`           | Savoir si un texte contient un caractère, ou un tableau un élément.             | `'0123456789'.includes('7')` donne `true`          |
| `.repeat(n)`            | Répéter un texte `n` fois.                                                      | `'ab'.repeat(3)` donne `'ababab'`                  |
| `!`                     | Inverser un booléen.                                                            | `!isLongEnough('abc')` donne `true`                |
| `.forEach(callback)`    | Appeler la fonction pour chaque élément. Renvoie `undefined`.                   | `passwords.forEach(showStrength);`                 |
| `.map(callback)`        | Transformer chaque élément. Renvoie un nouveau tableau.                         | `passwords.map(getStrengthScore)`                  |
| `.filter(callback)`     | Garder les éléments pour lesquels le callback renvoie `true`.                   | `passwords.filter(isStrong)`                       |
| `.find(callback)`       | Renvoyer le premier élément qui convient, ou `undefined`.                       | `passwords.find(isWeak)`                           |
| `.push()`               | Ajouter un élément à la fin d'un tableau. Bonus 1.                              | `missingCriteria.push('Il manque un chiffre');`    |
| Paramètre par défaut    | Valeur utilisée quand l'argument n'est pas fourni. Bonus 2.                     | `function draw(height, symbol = '*') { … }`        |
| `.every()`, `.some()`   | Tous les éléments conviennent ? Au moins un ? Renvoie un booléen. Bonus 3.      | `passwords.some(isStrong)`                         |
| `.sort(callback)`       | Trier avec une fonction de comparaison. Modifie le tableau. Bonus 4.            | `numbers.sort((a, b) => a - b)`                    |
| `.slice()`              | Copier un tableau. Bonus 4.                                                     | `const copy = passwords.slice();`                  |
| `text[i]`               | Le caractère à l'index `i` d'un texte. Bonus 5.                                 | `'abc'[1]` donne `'b'`                             |
| `Math.random()`         | Nombre décimal au hasard entre 0 (inclus) et 1 (exclu). Bonus 5.                | `Math.floor(Math.random() * 10)` donne 0 à 9       |
| DevTools                | Ouvrir les outils de développement du navigateur.                               | **F12**, ou **Cmd + Option + I** sur Mac           |

💡 **Chercher dans la documentation est un réflexe professionnel**, pas un aveu de faiblesse. La référence pour JavaScript est [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript). Essayez par exemple de chercher « MDN Array filter » ou « MDN fonctions fléchées ».

Au prochain TP, vos fonctions sortiront enfin de la console : elles réagiront aux clics et modifieront la page.
