# Javascript Exercices

Travaux pratiques du module « Introduction au JavaScript » (BUT MMI, 1re année, S1).

Chaque TP est un mini-projet indépendant, rangé dans son propre dossier. Vous pouvez faire n'importe quel TP sans avoir fait les précédents.

| Dossier                       | Thème                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| [`tp1/`](tp1/INSTRUCTIONS.md) | Variables, types, opérations, template literals, `typeof`, `undefined` / `null`            |
| [`tp2/`](tp2/INSTRUCTIONS.md) | Comparaisons, `===` / `!==`, opérateurs logiques `&&` `\|\|` `!`, `if` / `else if` / `else` |
| [`tp3/`](tp3/INSTRUCTIONS.md) | Boucles (`for`, `while`, `for...of`), tableaux, objets, tableaux d'objets                  |
| [`tp4/`](tp4/INSTRUCTIONS.md) | Fonctions, paramètres et `return`, portée, callbacks (`forEach`, `map`, `filter`, `find`)  |

## Comment travailler

1. Ouvrez le dossier du TP dans votre éditeur.
2. Lisez `INSTRUCTIONS.md` et suivez les étapes dans l'ordre.
3. Ouvrez `index.html` dans votre navigateur, avec les outils de développement (F12) ouverts.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise. Elles sont aussi rappelées dans l'énoncé de chaque TP.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et les commentaires sont en anglais, en `camelCase`, sans accent : `amountInEuros`, `firstName`, `isStudent`. Seul le texte affiché (`'Bonjour'`) et les données (`'Angoulême'`) restent en français. Les noms de variables à utiliser vous sont donnés dans chaque consigne.
- Les noms de tableaux sont au **pluriel**, les noms d'éléments au singulier : `for (const track of playlist)`.
- **`const` par défaut**, `let` seulement si la valeur change ensuite.
- **`===` et `!==` uniquement** pour comparer, jamais `==` ni `!=` (le TP2 explique pourquoi).
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- Les noms de booléens commencent par `is`, `has` ou `can` : `isStudent`, `hasPet`, `canDrive`.
