# TP1 – Convertisseur et présentation

Vous partez en voyage à Séoul et vous voulez savoir combien coûtera votre café en wons. Sur place, vous serez accueilli·e par votre correspondant, un étudiant américain installé là-bas, qui parle encore de la météo en degrés Fahrenheit. Avant le départ, vous lui préparez aussi une petite fiche de présentation. Votre seul outil : JavaScript.

## Objectifs

À la fin de ce TP, vous saurez :

- créer un fichier JavaScript, le relier à une page HTML et lire la console des DevTools ;
- déclarer des variables avec `const` et `let`, et choisir entre les deux ;
- faire des calculs en respectant la priorité des opérateurs ;
- construire des phrases avec les template literals ;
- identifier le type d'une valeur avec `typeof` et repérer les conversions automatiques de JavaScript.

**Durée estimée :** 1h30 à 2h pour le socle, plus 10 à 15 min pour l'exercice papier. Le bonus est pour celles et ceux qui ont fini en avance.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et les commentaires sont en anglais, en `camelCase`, sans accent : `amountInEuros`, `firstName`, `isStudent`. Seul le texte affiché (`'Bonjour'`) et les données (`'Angoulême'`) restent en français. Les noms de variables à utiliser vous sont donnés dans chaque consigne.
- **`const` par défaut**, `let` seulement si la valeur change ensuite.
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- Les noms de booléens commencent par `is`, `has` ou `can` : `isStudent`, `hasPet`, `canDrive`.

## Avant de commencer

Le dossier `tp1/` contient :

```
tp1/
├── INSTRUCTIONS.md   ← ce fichier
├── index.html        ← la page (fournie)
└── style.css         ← le style de la page (fourni)
```

Vous devez **créer vous-même** le fichier `script.js` dans ce même dossier, et le relier à `index.html`. À la fin du TP, votre dossier doit ressembler à ceci :

```
tp1/
├── INSTRUCTIONS.md
├── index.html        ← modifié : relié à script.js
├── script.js         ← créé par vous
└── style.css
```

Tout votre code JavaScript ira dans `script.js`. Tous les résultats s'afficheront dans la console.

---

## Étape 0 : Mise en place (Socle)

### Consigne

1. Dans le dossier `tp1/`, créez un fichier vide nommé `script.js`.
2. Dans `index.html`, importez votre fichier `script.js`.

   💡 On place l'import à la fin du `<body>`, juste avant la balise fermante `</body>`, pour que le navigateur ait lu toute la page HTML avant d'exécuter le script.

3. Vérifiez que l'import fonctionne : dans `script.js`, affichez un texte de votre choix dans la console (par exemple `script loaded`).

4. Ouvrez `index.html` dans votre navigateur, puis ouvrez les outils de développement (**F12**, ou **Cmd + Option + I** sur Mac) et allez dans l'onglet **Console**.

### Questions

Répondez en une phrase chacune :

1. Où apparaît votre message ?
2. Qu'est-ce qui a changé dans la page elle-même ?

### Le piège volontaire

Glissez volontairement une faute de frappe dans le nom de l'instruction qui affiche votre message (une lettre en moins, par exemple). Enregistrez, rechargez la page et regardez la console.

3. Quel message d'erreur s'affiche ? Sur quelle ligne de quel fichier JavaScript situe-t-il le problème ?

Corrigez la faute, rechargez, et vérifiez que le message revient.

💡 **Le réflexe à prendre dès maintenant :** quand quelque chose ne marche pas, on ouvre la console. Elle vous dit presque toujours ce qui ne va pas, et où.

<details>
<summary>Indice : rien ne s'affiche dans la console</summary>

- Vérifiez que vous avez bien **enregistré** les deux fichiers, puis **rechargé** la page.
- Vérifiez l'orthographe exacte du nom de fichier : `script.js`, tout en minuscules, dans le même dossier que `index.html`.
- Si le fichier est introuvable, la console affiche une erreur qui le dit (souvent avec « 404 » ou « Failed to load »).

</details>

### Validation

- [ ] `script.js` est créé et relié à `index.html`.
- [ ] Mon message s'affiche dans la console.
- [ ] J'ai répondu aux trois questions.
- [ ] J'ai lu l'erreur provoquée par ma faute de frappe, puis je l'ai corrigée.

---

## Étape A : Convertisseur de devises (Socle)

### Consigne

Un café coûte 4 €. Pour simplifier, on utilise un taux de change arrondi (et fictif) : 1 € = 1 500 ₩ (wons sud-coréens).

1. Déclarez deux constantes : `amountInEuros` (le montant en euros) et `exchangeRate` (le taux de change).
2. Déclarez une constante `amountInWon` qui contient le résultat du calcul.
3. Affichez le résultat dans la console avec un **template literal**.

En JavaScript, les nombres s'écrivent **sans espace** : `1500`, pas `1 500`.

### Résultat attendu

```
4 € = 6000 ₩
```

<details>
<summary>Indice</summary>

Un template literal s'écrit entre accents graves (`` ` ``, touche **AltGr + 7** sur PC, à gauche de Entrée sur Mac). On y insère une variable avec `${...}` :

```js
const city = 'Séoul';
console.log(`Direction ${city} !`);
```

</details>

### Validation

- [ ] Le montant et le taux sont dans deux `const`.
- [ ] La console affiche `4 € = 6000 ₩`.
- [ ] Si je change `amountInEuros` en `100`, la console affiche `100 € = 150000 ₩` sans autre modification.

---

## Étape B : Convertisseur de températures (Socle)

### Consigne

En Corée, comme en France, on mesure la température en degrés Celsius. Mais votre correspondant américain raisonne en degrés Fahrenheit : vous allez écrire un convertisseur dans les deux sens. Les formules sont :

- °C vers °F : multiplier par 9, diviser par 5, puis ajouter 32 ;
- °F vers °C : retirer 32, puis multiplier par 5 et diviser par 9.

1. Déclarez `temperatureCelsius` avec la valeur `100`, calculez `convertedFahrenheit`, et affichez le résultat.
2. Déclarez `temperatureFahrenheit` avec la valeur `98.6`, calculez `convertedCelsius`, et affichez le résultat.

En JavaScript, les nombres décimaux s'écrivent avec un **point** : `98.6`, pas `98,6`.

⚠️ **Attention à la priorité des opérateurs.** Comme en maths, `*` et `/` sont calculés avant `+` et `-`. Pour la deuxième formule, il faut retirer 32 **avant** de multiplier : les parenthèses sont indispensables.

### Résultat attendu

```
100 °C = 212 °F
98.6 °F = 37 °C
```

### Vérifiez vos formules

Changez les valeurs de départ et contrôlez avec ces valeurs connues :

| °C                   | °F   |
| -------------------- | ---- |
| 0 (l'eau gèle)       | 32   |
| 100 (l'eau bout)     | 212  |
| 37 (le corps humain) | 98.6 |

<details>
<summary>Indice : j'obtiens 194.22222222222223 au lieu de 37</summary>

Vous avez sans doute écrit `temperatureFahrenheit - 32 * 5 / 9`. JavaScript calcule d'abord `32 * 5 / 9`, puis le retire à `temperatureFahrenheit`. Entourez la soustraction de parenthèses pour qu'elle soit faite en premier.

</details>

### Validation

- [ ] Les deux conversions affichent `100 °C = 212 °F` et `98.6 °F = 37 °C`.
- [ ] J'ai vérifié avec `0 °C = 32 °F`.
- [ ] Je sais expliquer pourquoi les parenthèses sont nécessaires dans la deuxième formule.

---

## Étape C : Fiche de présentation (Socle)

### Consigne

1. Déclarez quatre constantes avec vos informations (ou celles d'un personnage inventé) :
   - `firstName` : un prénom (texte) ;
   - `age` : un âge (nombre) ;
   - `city` : une ville (texte) ;
   - `isStudent` : `true` ou `false`.
2. **Version 1, concaténation :** construisez la phrase de présentation avec l'opérateur `+` uniquement, et affichez-la.
3. **Version 2, template literal :** réécrivez la même phrase avec un template literal, et affichez-la.
4. Comparez les deux lignes de code. Laquelle est la plus facile à lire ? À écrire sans erreur ? Notez votre réponse en commentaire dans `script.js` (en anglais, par exemple `// The template literal is easier to read because...`).

### Résultat attendu

Les deux versions doivent afficher **exactement** la même phrase. Avec les valeurs `'Léa'`, `19`, `'Angoulême'` et `true` :

```
Je m'appelle Léa, j'ai 19 ans et j'habite à Angoulême. Étudiante : true.
Je m'appelle Léa, j'ai 19 ans et j'habite à Angoulême. Étudiante : true.
```

<details>
<summary>Indice : l'apostrophe casse ma chaîne</summary>

Dans `'Je m'appelle'`, l'apostrophe de « m'appelle » ferme la chaîne trop tôt. Pour la version concaténée, deux solutions :

- échapper l'apostrophe avec un antislash : `'Je m\'appelle '` ;
- entourer la chaîne de guillemets doubles : `"Je m'appelle "`.

Le template literal, lui, n'a pas ce problème. C'est un argument de plus pour la comparaison.

</details>

<details>
<summary>Indice : les espaces ont disparu</summary>

Avec `+`, JavaScript colle les morceaux tels quels. Si vous voyez `Léa,j'ai`, il manque un espace à l'intérieur d'une de vos chaînes.

</details>

### Validation

- [ ] Les quatre variables sont déclarées avec `const` et les bons types.
- [ ] Les deux versions affichent exactement la même phrase.
- [ ] J'ai noté ma comparaison en commentaire.

---

## Étape D : Chasse aux types (Socle)

### Consigne

Pour chaque expression du tableau :

1. **Prédisez d'abord**, sans rien taper, la valeur obtenue et le résultat de `typeof`. Notez vos prédictions (sur une feuille ou directement dans ce fichier).
2. **Vérifiez ensuite** dans `script.js`, en affichant la valeur et son type :

   ```js
   console.log('10' + 5, typeof ('10' + 5));
   ```

   Pour la ligne `score`, déclarez d'abord la variable sans lui donner de valeur : `let score;`

3. Comparez avec vos prédictions. Ce n'est pas grave de vous tromper : c'est même le but, ces cas sont des pièges classiques.

| Expression                   | Valeur prédite | `typeof` prédit | Valeur réelle | `typeof` réel |
| ---------------------------- | -------------- | --------------- | ------------- | ------------- |
| `'10' + 5`                   |                |                 |               |               |
| `'10' * 2`                   |                |                 |               |               |
| `'5' - 2`                    |                |                 |               |               |
| `'abc' * 2`                  |                |                 |               |               |
| `true + 1`                   |                |                 |               |               |
| `0.1 + 0.2`                  |                |                 |               |               |
| `10 % 3`                     |                |                 |               |               |
| `2 ** 3`                     |                |                 |               |               |
| `null`                       |                |                 |               |               |
| `undefined`                  |                |                 |               |               |
| `score` (après `let score;`) |                |                 |               |               |

<details>
<summary>Indice : pourquoi des parenthèses dans <code>typeof ('10' + 5)</code> ?</summary>

`typeof` s'applique à ce qui le suit immédiatement. Sans parenthèses, `typeof '10' + 5` calcule d'abord `typeof '10'` (qui vaut `'string'`), puis y colle `5` : on obtient `'string5'`. Les parenthèses forcent le calcul de l'expression entière avant de demander son type.

</details>

<details>
<summary>Indice : comment distinguer <code>'105'</code> et <code>105</code> dans la console ?</summary>

Dans la console du navigateur, les nombres et les textes n'ont pas la même couleur. Et surtout, la colonne `typeof` lève le doute.

</details>

### Question de synthèse

Répondez en deux ou trois phrases, en commentaire à la fin de la section dans `script.js` : **quand JavaScript convertit-il tout seul une valeur d'un type vers un autre, et pourquoi est-ce risqué ?**

### Validation

- [ ] J'ai noté toutes mes prédictions **avant** de vérifier.
- [ ] J'ai rempli les colonnes « réelles » à partir de la console.
- [ ] J'ai répondu à la question de synthèse.

---

## Bonus

Ces exercices utilisent les outils de la [boîte à outils](#boîte-à-outils), en bas de ce document.

### Bonus 1 : Arrondir les conversions

Remplacez le taux arrondi par un taux plus précis (fictif lui aussi) : `1612.37`. La console affiche maintenant un montant avec des centimes de won, qui n'existent pas. Utilisez `Math.round()` pour arrondir le montant au won près.

```
4 € = 6449 ₩
```

Pour la conversion de `70` °F en °C, utilisez `toFixed(2)` pour afficher exactement deux décimales.

```
70 °F = 21.11 °C
```

Question : que renvoie `typeof` sur le résultat de `toFixed(2)` ? Qu'est-ce que cela implique si vous voulez continuer à calculer avec ce résultat ?

### Bonus 2 : Calculer son âge

Au lieu d'écrire l'âge à la main dans l'étape C, déclarez une constante `birthYear` (votre année de naissance) et une constante `currentYear` obtenue avec `new Date().getFullYear()`. Calculez `computedAge` et affichez-le.

```
Né·e en 2007, j'ai 19 ans en 2026.
```

(Le calcul est approximatif : il ne tient pas compte du fait que votre anniversaire soit déjà passé ou non cette année. On saura le corriger plus tard dans le module.)

### Bonus 3 : Prix TTC et prix remisé

Une paire d'écouteurs coûte 80 € HT. La TVA est de 20 % et le magasin propose une remise de 15 % sur le prix TTC.

Déclarez `priceExcludingTax`, `vatRate` et `discountRate` (les taux s'écrivent en décimal : 20 % = `0.2`), puis calculez `priceIncludingTax` et `discountedPrice`.

```
Prix HT : 80 €
Prix TTC : 96 €
Prix après remise de 15 % : 81.6 €
```

Astuce : pour afficher `15 %` à partir de `discountRate`, il faut faire un petit calcul dans le `${...}`.

### Validation

- [ ] Bonus 1 : le montant en wons est arrondi à l'unité et la température s'affiche avec deux décimales.
- [ ] Bonus 2 : l'âge est calculé à partir de l'année en cours.
- [ ] Bonus 3 : les trois prix sont corrects.

---

## Exercice papier (sans ordinateur, 10 à 15 min)

Cet exercice vous entraîne au format de l'examen final, qui se fait **sur feuille**. Fermez votre ordinateur et répondez sur papier.

Une fois que vous avez fini, **vérifiez vous-même** vos réponses : recopiez chaque script dans la console des DevTools (ou dans un `script.js`) et comparez. Pour l'exercice 1, ajoutez un `console.log(stock, price, total);` après chaque ligne pour voir les valeurs intermédiaires.

### Exercice 1 : Suivre les variables

```js
let stock = 10;
let price = 4;
let total = 0;
total = stock * price;
stock = stock - 3;
price = price + 1;
total = total + stock * price;
stock = stock * 2;
price = total % stock;
total = total - price * 2;
```

Complétez le tableau avec la valeur de chaque variable **après** l'exécution de chaque ligne. Mettez un tiret (–) si la variable n'existe pas encore.

| Ligne | `stock` | `price` | `total` |
| ----- | ------- | ------- | ------- |
| 1     |         |         |         |
| 2     |         |         |         |
| 3     |         |         |         |
| 4     |         |         |         |
| 5     |         |         |         |
| 6     |         |         |         |
| 7     |         |         |         |
| 8     |         |         |         |
| 9     |         |         |         |
| 10    |         |         |         |

### Exercice 2 : Ce qu'affiche la console

Écrivez **exactement** ce qu'affiche chaque `console.log`.

```js
const quantity = 3;
const unitPrice = '7';
const label = 'Lot';

console.log(quantity + unitPrice);
console.log(quantity * unitPrice);
console.log(label + quantity + 2);
console.log(quantity + 2 + label);
console.log(unitPrice - 2 + quantity);
console.log(`${label} de ${quantity + 2} articles`);
console.log(`Total : ${quantity * unitPrice} €`);
```

### Exercice 3 : Quel type à la fin ?

**a)** Quelle est la valeur de `result` à la fin, et que vaut `typeof result` ?

```js
let result;
result = '4' * '2';
result = result + '';
result = result - 1;
result = `${result}`;
```

**b)** Que vaut `typeof message` à la fin ?

```js
let message;
const messageType = typeof message;
message = messageType;
```

---

## Boîte à outils

Ces notions ne sont pas dans les slides du cours. Une ligne d'exemple suffit pour démarrer.

| Outil                      | À quoi ça sert                                                                               | Exemple                                         |
| -------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `toFixed(n)`               | Formater un nombre avec `n` décimales. **Renvoie un texte** (string).                        | `(21.5892).toFixed(2)` donne `'21.59'`          |
| `Math.round()`             | Arrondir à l'entier le plus proche. Renvoie un nombre.                                       | `Math.round(4.6)` donne `5`                     |
| `new Date().getFullYear()` | Obtenir l'année en cours.                                                                    | `const currentYear = new Date().getFullYear();` |
| `NaN`                      | « Not a Number » : le résultat d'un calcul impossible. Son `typeof` est pourtant `'number'`. | `'abc' * 2` donne `NaN`                         |
| DevTools                   | Ouvrir les outils de développement du navigateur.                                            | **F12**, ou **Cmd + Option + I** sur Mac        |

💡 **Chercher dans la documentation est un réflexe professionnel**, pas un aveu de faiblesse. La référence pour JavaScript est [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript). Essayez par exemple de chercher « MDN toFixed ».
