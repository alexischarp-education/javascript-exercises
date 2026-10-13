# TP2 – Jeux et règles de décision

Votre BDE organise une soirée jeux, et c'est vous qui codez les arbitres : un « plus ou moins », un pierre-feuille-ciseaux contre l'ordinateur, et le contrôle des inscriptions au tournoi. Un arbitre ne doit jamais se tromper : vous allez apprendre à vérifier chaque cas.

## Objectifs

À la fin de ce TP, vous saurez :

- écrire des conditions avec `if`, `else if` et `else` ;
- comparer des valeurs avec `===`, `!==`, `<`, `>`, `<=` et `>=` ;
- combiner des conditions avec `&&`, `||` et `!`, en plaçant correctement les parenthèses ;
- stocker une règle dans un booléen bien nommé (`isAdult`, `canRegister`) ;
- tester **toutes les branches** d'une condition en changeant les valeurs à la main.

Le **bonus** est pour celles et ceux qui ont fini en avance.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et les commentaires sont en anglais, en `camelCase`, sans accent : `secretNumber`, `playerGuess`, `hasAcceptedTerms`. Seuls les messages affichés (`'Gagné !'`) restent en français. Les valeurs qui servent à la logique du programme sont aussi en anglais : `'rock'`, `'paper'`, `'scissors'`. Les noms de variables à utiliser vous sont donnés dans chaque consigne.
- **`const` par défaut**, `let` seulement si la valeur change ensuite.
- **`===` et `!==` uniquement** pour comparer (l'étape D explique pourquoi).
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- Les noms de booléens commencent par `is`, `has` ou `can` : `isAdult`, `hasParentalConsent`, `canRegister`.

## Avant de commencer

Le dossier `tp2/` contient :

```
tp2/
├── INSTRUCTIONS.md   ← ce fichier
├── index.html        ← la page (fournie)
└── style.css         ← le style de la page (fourni)
```

Vous devez **créer vous-même** le fichier `script.js` dans ce même dossier, et le relier à `index.html`. À la fin du TP, votre dossier doit ressembler à ceci :

```
tp2/
├── INSTRUCTIONS.md
├── index.html        ← modifié : relié à script.js
├── script.js         ← créé par vous
└── style.css
```

Tout votre code JavaScript ira dans `script.js`. Tous les résultats s'afficheront dans la console des outils de développement (**F12**), pas dans la page.

Les notions utilisées dans ce TP (comparaisons, opérateurs logiques, conditions) sont dans le cours. Gardez-le sous la main : l'énoncé ne les réexplique pas.

### Comment tester un script

Votre script s'exécute une fois, à chaque chargement de la page. Pour essayer un autre cas, **changez une valeur dans le code, enregistrez, puis rechargez la page**. Une condition avec trois branches demande donc au moins trois essais : un code dont on n'a pas vu chaque branche s'exécuter n'est pas un code testé.

---

## Étape 0 : Mise en place

1. Dans le dossier `tp2/`, créez un fichier `script.js`.
2. Dans `index.html`, importez votre fichier `script.js`.

   💡 On place l'import à la fin du `<body>`, juste avant la balise fermante `</body>`, pour que le navigateur ait lu toute la page HTML avant d'exécuter le script.

3. Vérifiez que l'import fonctionne : dans `script.js`, affichez un texte de votre choix dans la console, puis ouvrez `index.html` dans le navigateur avec la console ouverte.

💡 **Le réflexe :** quand quelque chose ne marche pas, on ouvre la console. Une erreur y est presque toujours signalée, avec le fichier et la ligne concernés.

---

## Étape A : Plus ou moins, une seule tentative

L'ordinateur choisit un nombre secret entre 1 et 100. Le joueur fait une seule proposition, et l'arbitre répond.

1. Déclarez `secretNumber`, tiré au hasard entre 1 et 100 :

   ```js
   const secretNumber = Math.floor(Math.random() * 100) + 1;
   ```

   `Math.random()` donne un nombre décimal entre 0 (inclus) et 1 (exclu). Multiplié par 100 puis arrondi à l'entier inférieur par `Math.floor()`, on obtient un entier de 0 à 99 ; le `+ 1` décale l'intervalle de 1 à 100.

2. Déclarez `playerGuess`, la proposition du joueur, avec la valeur `50`.
3. Avec `if`, `else if` et `else`, affichez :
   - `Trop grand !` si la proposition est plus grande que le nombre secret ;
   - `Trop petit !` si elle est plus petite ;
   - `Gagné !` si c'est le bon nombre.

### Testez les trois branches

Avec un tirage au hasard, impossible de savoir quelle branche va s'exécuter. Pour tester, on **fige** le tirage : on le remplace temporairement par une valeur connue, et on garde l'original en commentaire.

```js
const secretNumber = 42; // Math.floor(Math.random() * 100) + 1;
```

Le nombre secret vaut maintenant toujours `42`. Changez `playerGuess` pour provoquer chaque branche, en rechargeant la page à chaque fois :

| `playerGuess` | Résultat attendu |
| ------------- | ---------------- |
| `50`          | `Trop grand !`   |
| `30`          | `Trop petit !`   |
| `42`          | `Gagné !`        |

Une fois les trois branches vérifiées, **remettez le tirage au hasard**. Vous ferez la même chose à chaque étape de ce TP.

---

## Étape B : Pierre-feuille-ciseaux

Rappel des règles : la pierre casse les ciseaux, les ciseaux coupent la feuille, la feuille enveloppe la pierre. Deux coups identiques donnent une égalité.

1. Déclarez `playerChoice` avec l'une des trois valeurs `'rock'`, `'paper'` ou `'scissors'`.
2. Déclarez `computerRoll`, un nombre entier tiré au hasard **entre 0 et 2**. Inspirez-vous du tirage de l'étape A.
3. Déclarez `computerChoice` avec `let`, sans valeur. Avec `if`, `else if` et `else`, donnez-lui la valeur `'rock'` si `computerRoll` vaut `0`, `'paper'` s'il vaut `1`, et `'scissors'` s'il vaut `2`.
4. Affichez les deux choix.
5. Affichez le résultat : `Égalité`, `Vous gagnez !` ou `Vous perdez !`. Trois branches suffisent, en combinant les conditions avec `&&` et `||`.

Pourquoi `let` pour `computerChoice` ? Parce que la variable est créée sans valeur, puis reçoit sa valeur plus tard, dans l'une des branches.

### Résultat attendu

Avec `playerChoice` à `'rock'` et un tirage qui donne `'scissors'` :

```
Vous : rock | Ordinateur : scissors
Vous gagnez !
```

### Testez les combinaisons

Figez le tirage de l'ordinateur (par exemple `const computerRoll = 0; // Math.floor(...)`), puis testez ces combinaisons en changeant `playerChoice` et `computerRoll` :

| `playerChoice` | `computerChoice` | Résultat attendu |
| -------------- | ---------------- | ---------------- |
| `'rock'`       | `'rock'`         | `Égalité`        |
| `'rock'`       | `'scissors'`     | `Vous gagnez !`  |
| `'scissors'`   | `'paper'`        | `Vous gagnez !`  |
| `'rock'`       | `'paper'`        | `Vous perdez !`  |

<details>
<summary>Indice : construire les trois branches</summary>

- **Égalité :** une seule comparaison entre `playerChoice` et `computerChoice` suffit, quelle que soit la valeur.
- **Victoire :** il y a trois façons de gagner. Chacune s'écrit avec `&&` (« je joue ceci **et** l'ordinateur joue cela »). On les réunit avec `||` (« ou »), en entourant chaque cas de parenthèses pour que ce soit lisible.
- **Défaite :** si ce n'est ni une égalité ni une victoire… pas besoin de condition.

</details>

<details>
<summary>Indice : le résultat est toujours le même</summary>

Avez-vous pensé à figer le tirage ? Si oui, vérifiez que `computerChoice` contient bien ce que vous croyez : affichez-le. Une faute de frappe comme `'scisors'` ou `'Rock'` suffit à ne jamais être égale à `'scissors'` ou `'rock'`.

</details>

---

## Étape C : Validation d'inscription

Pour s'inscrire au tournoi, la règle est la suivante :

> On peut s'inscrire si on a accepté les conditions **et** (on est majeur **ou** on a l'autorisation de ses parents).

1. Déclarez `age` (un nombre), `hasParentalConsent` et `hasAcceptedTerms` (deux booléens).
2. Déclarez un booléen `isAdult` qui vaut `true` si la personne a 18 ans ou plus.
3. Déclarez un booléen `canRegister` qui traduit la règle ci-dessus, en une seule ligne.
4. Affichez un message adapté :
   - `Inscription validée !` si l'inscription est possible ;
   - sinon, la raison du refus : `Refusé : vous devez accepter les conditions.` ou `Refusé : autorisation parentale requise pour les mineurs.`

⚠️ **Les parenthèses comptent.** Comme `*` passe avant `+` en calcul, `&&` passe avant `||` : JavaScript regroupe les `&&` en premier. Si vous oubliez les parenthèses de la règle, votre code ne dira plus la même chose.

### Testez avec ce tableau

| `age` | `hasParentalConsent` | `hasAcceptedTerms` | Message attendu                                             |
| ----- | -------------------- | ------------------ | ----------------------------------------------------------- |
| `20`  | `false`              | `true`             | `Inscription validée !`                                     |
| `16`  | `true`               | `true`             | `Inscription validée !`                                     |
| `16`  | `false`              | `true`             | `Refusé : autorisation parentale requise pour les mineurs.` |
| `16`  | `true`               | `false`            | `Refusé : vous devez accepter les conditions.`              |

<details>
<summary>Indice : la ligne <code>16 / true / false</code> affiche « Inscription validée ! »</summary>

C'est le piège des parenthèses. Sans elles, `hasAcceptedTerms && isAdult || hasParentalConsent` se lit « (a accepté **et** est majeur) **ou** a l'autorisation ». Avec l'autorisation parentale, on passe même sans avoir accepté les conditions. Placez les parenthèses autour du « ou ».

</details>

<details>
<summary>Indice : comment trouver la raison du refus ?</summary>

Après avoir testé `canRegister`, il reste à savoir **pourquoi** c'est refusé. L'opérateur `!` inverse un booléen : `!hasAcceptedTerms` se lit « n'a pas accepté les conditions ».

</details>

---

## Étape D : Le piège de `==`

JavaScript possède deux opérateurs d'égalité : `===` (égalité stricte) et `==` (égalité « souple »). Cette étape est la **seule** du module où vous avez le droit d'écrire `==`, pour comprendre pourquoi on ne l'utilise pas.

Pour chaque comparaison du tableau, **prédisez d'abord** `true` ou `false`, puis vérifiez dans `script.js` avec un `console.log`. Ces cas sont des pièges classiques : vous tromper fait partie de l'exercice.

| Comparaison   | Prédiction | Résultat réel |
| ------------- | ---------- | ------------- |
| `5 === '5'`   |            |               |
| `5 == '5'`    |            |               |
| `0 == false`  |            |               |
| `'' == false` |            |               |
| `NaN === NaN` |            |               |
| `'10' > '9'`  |            |               |

<details>
<summary>Indice : <code>'10' > '9'</code></summary>

Quand on compare deux **textes**, JavaScript les compare comme dans un dictionnaire, caractère par caractère : il compare d'abord `'1'` et `'9'`. Dès qu'un des deux côtés est un nombre, il compare des nombres.

</details>

---

> ### 🎯 Jalon : vous avez vu l'essentiel
>
> Pour finir, répondez en commentaire dans `script.js`, en deux ou trois phrases : **pourquoi n'utilise-t-on que `===` et `!==` dans ce module ?**
>
> Puis, sans regarder votre code :
>
> - [ ] Je sais figer un tirage au hasard pour tester chaque branche d'une condition.
> - [ ] Je sais pourquoi la dernière branche, le `else`, n'a pas besoin de condition.
> - [ ] Je sais pourquoi les parenthèses changent le sens d'une règle qui mélange `&&` et `||`.
> - [ ] Je sais ce que fait `!` devant un booléen.
>
> Une case non cochée ? Relisez l'étape correspondante avant de passer au bonus.

---

## Bonus

Ces exercices utilisent les outils de la [boîte à outils](#boîte-à-outils), en bas de ce document.

### Bonus 1 : Saisir la proposition avec `prompt()`

Dans l'étape A, remplacez la valeur de `playerGuess` par une saisie de l'utilisateur :

```js
const playerGuess = prompt('Votre proposition (entre 1 et 100) :');
```

Figez le nombre secret à `42`, rechargez la page et tapez `42` dans la fenêtre. Le résultat est-il correct ? Selon l'ordre de vos conditions, il peut ne pas l'être.

1. Affichez `typeof playerGuess`. Qu'est-ce que `prompt()` renvoie, même quand on tape un nombre ?
2. Expliquez en commentaire pourquoi `===` échoue alors que `>` et `<` semblent fonctionner (repensez à l'étape D).
3. Corrigez le problème avec `Number()`, puis vérifiez de nouveau les trois branches.

### Bonus 2 : Indice de proximité

Dans l'étape A, quand le joueur n'a pas trouvé, ajoutez un indice selon l'**écart** entre la proposition et le nombre secret :

- `Brûlant !` si l'écart est de 5 ou moins ;
- `Tiède` si l'écart est de 20 ou moins ;
- `Froid` sinon.

L'écart doit toujours être positif, que la proposition soit trop grande ou trop petite : stockez-le dans une constante `distance` calculée avec `Math.abs()`.

Testez avec le nombre secret figé à `42` :

| `playerGuess` | Écart | Messages attendus          |
| ------------- | ----- | -------------------------- |
| `45`          | 3     | `Trop grand !` `Brûlant !` |
| `37`          | 5     | `Trop petit !` `Brûlant !` |
| `30`          | 12    | `Trop petit !` `Tiède`     |
| `62`          | 20    | `Trop grand !` `Tiède`     |
| `80`          | 38    | `Trop grand !` `Froid`     |
| `42`          | 0     | `Gagné !` (pas d'indice)   |

### Bonus 3 : Pierre-feuille-ciseaux-lézard-Spock

On ajoute deux coups : `'lizard'` (lézard) et `'spock'`. Les règles :

- les ciseaux coupent la feuille et décapitent le lézard ;
- la feuille enveloppe la pierre et réfute Spock ;
- la pierre écrase le lézard et casse les ciseaux ;
- le lézard empoisonne Spock et mange la feuille ;
- Spock casse les ciseaux et vaporise la pierre.

Partez de votre étape B. Combien de façons de gagner y a-t-il maintenant ? Que faut-il changer dans le tirage de l'ordinateur et dans la traduction du nombre en coup ? Combien de combinaisons faudrait-il tester ?

### Bonus 4 : Un cas par combinaison

Réécrivez le résultat de l'étape B avec des conditions en cascade, **un cas par combinaison** : testez d'abord `playerChoice`, puis, à l'intérieur de chaque branche, testez `computerChoice` (un `if` peut contenir un autre `if`). Gardez votre version avec `&&` et `||` en commentaire pour comparer.

Figez le tirage et testez les 9 combinaisons :

| `playerChoice` | `computerChoice` | Résultat attendu |
| -------------- | ---------------- | ---------------- |
| `'rock'`       | `'rock'`         | `Égalité`        |
| `'rock'`       | `'paper'`        | `Vous perdez !`  |
| `'rock'`       | `'scissors'`     | `Vous gagnez !`  |
| `'paper'`      | `'rock'`         | `Vous gagnez !`  |
| `'paper'`      | `'paper'`        | `Égalité`        |
| `'paper'`      | `'scissors'`     | `Vous perdez !`  |
| `'scissors'`   | `'rock'`         | `Vous perdez !`  |
| `'scissors'`   | `'paper'`        | `Vous gagnez !`  |
| `'scissors'`   | `'scissors'`     | `Égalité`        |

Laquelle des deux versions est la plus courte ? Laquelle est la plus facile à relire ?

---

## Exercice papier (sans ordinateur, 10 à 15 min)

Cet exercice vous entraîne au format de l'examen final, qui se fait **sur feuille**. Fermez votre ordinateur et répondez sur papier.

Une fois que vous avez fini, **vérifiez vous-même** vos réponses : recopiez chaque script dans la console des DevTools (ou dans un `script.js`), changez les valeurs pour chaque cas, et comparez.

### Exercice 1 : Lire une cascade

```js
const temperature = 28;
const isRaining = false;

if (temperature > 25 && !isRaining) {
  console.log('Direction la plage');
} else if (temperature >= 15 && !isRaining) {
  console.log('Balade en ville');
} else if (isRaining) {
  console.log('Cinéma');
} else {
  console.log('Soirée jeux à la maison');
}
```

Qu'affiche ce script pour chacun des jeux de valeurs suivants ?

| Cas | `temperature` | `isRaining` | Affichage |
| --- | ------------- | ----------- | --------- |
| a   | `28`          | `false`     |           |
| b   | `25`          | `false`     |           |
| c   | `30`          | `true`      |           |
| d   | `12`          | `false`     |           |

### Exercice 2 : Traduire une règle

Voici la règle d'un cinéma :

> Tarif réduit si la personne a moins de 12 ans ou plus de 65 ans, sauf le samedi.

1. Avec les variables `age` (un nombre) et `isSaturday` (un booléen), écrivez **un seul** `if` (avec un `else`) qui affiche `Tarif réduit` ou `Plein tarif`. Utilisez `&&`, `||`, `!` et des parenthèses.
2. Qu'affiche votre code dans ces trois cas ?

| Cas | `age` | `isSaturday` | Affichage |
| --- | ----- | ------------ | --------- |
| a   | `8`   | `false`      |           |
| b   | `70`  | `true`       |           |
| c   | `65`  | `false`      |           |

### Exercice 3 : Évaluer une expression

```js
const hasTicket = true;
const isVip = false;
const isBanned = false;

const canEnter = (hasTicket || isVip) && !isBanned;
```

1. Évaluez `canEnter` **pas à pas** : remplacez chaque variable par sa valeur, puis calculez une opération à la fois, en écrivant chaque étape.
2. Complétez la table pour d'autres valeurs :

| `hasTicket` | `isVip` | `isBanned` | `hasTicket \|\| isVip` | `!isBanned` | `canEnter` |
| ----------- | ------- | ---------- | ---------------------- | ----------- | ---------- |
| `true`      | `false` | `false`    |                        |             |            |
| `false`     | `true`  | `false`    |                        |             |            |
| `false`     | `false` | `false`    |                        |             |            |
| `true`      | `true`  | `true`     |                        |             |            |
| `false`     | `true`  | `true`     |                        |             |            |

---

## Boîte à outils

Ces notions ne sont pas dans les slides du cours. Une ligne d'exemple suffit pour démarrer.

| Outil           | À quoi ça sert                                                                   | Exemple                                                |
| --------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `Math.random()` | Obtenir un nombre décimal au hasard, entre 0 (inclus) et 1 (exclu).              | `Math.random()` donne par exemple `0.7302…`            |
| `Math.floor()`  | Arrondir à l'entier **inférieur**.                                               | `Math.floor(4.9)` donne `4`                            |
| `Math.abs()`    | Obtenir la valeur absolue d'un nombre (sans son signe). Bonus 2.                 | `Math.abs(-7)` donne `7`                               |
| `prompt()`      | Afficher une fenêtre de saisie. **Renvoie toujours un texte** (string). Bonus 1. | `const answer = prompt('Votre prénom ?');`             |
| `Number()`      | Convertir une valeur en nombre. Renvoie `NaN` si c'est impossible.               | `Number('42')` donne `42`, `Number('abc')` donne `NaN` |
| DevTools        | Ouvrir les outils de développement du navigateur.                                | **F12**, ou **Cmd + Option + I** sur Mac               |

💡 **Chercher dans la documentation est un réflexe professionnel**, pas un aveu de faiblesse. La référence pour JavaScript est [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript). Essayez par exemple de chercher « MDN Math.random ».
