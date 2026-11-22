# Cours – Une modale accessible avec `<dialog>`

Ce cours accompagne le [TP Modale](INSTRUCTIONS.md) et votre projet de SAÉ 1.05. Lisez-le avant de commencer, puis gardez-le ouvert : les étapes du TP y renvoient.

## Une modale

Une **modale** est une fenêtre qui s'ouvre par-dessus la page et qui **bloque le reste** tant qu'elle est ouverte : on ne peut plus cliquer ni naviguer derrière, il faut la fermer pour revenir à la page.

HTML a un élément fait pour ça : `<dialog>`. Fermé, il est invisible. Trois lignes de JavaScript suffisent pour s'en servir :

```js
myDialog.showModal(); // opens the dialog as a modal
myDialog.close(); // closes it
myDialog.addEventListener('close', () => { … }); // runs after every closing
```

Ce que `showModal()` vous donne **sans écrire une ligne de plus** :

- le navigateur annonce l'élément comme une **boîte de dialogue** aux lecteurs d'écran ;
- le reste de la page devient **inerte** : plus de clic, plus de Tab, plus de lecteur d'écran derrière la modale ;
- la touche **Échap** ferme la modale ;
- un fond, le pseudo-élément `::backdrop`, recouvre la page, et vous le stylez en CSS ;
- le **focus** entre dans la modale à l'ouverture.

Avec une `<div>` qu'on affiche et qu'on masque, il faudrait tout recoder à la main. C'est pour ça que tant de modales sur le Web sont inutilisables au clavier.

Pas besoin d'ajouter `role="dialog"` ni `aria-modal="true"` : `<dialog>` les a déjà. C'est la **première règle d'ARIA** : si un élément HTML natif fait déjà le travail, on n'ajoute pas d'ARIA.

## Le focus

Le **focus**, c'est l'élément qui reçoit les frappes du clavier. Il n'y en a qu'un à la fois. Au clavier :

| Touche          | Effet                                                    |
| --------------- | -------------------------------------------------------- |
| **Tab**         | Focus sur l'élément suivant (lien, bouton, champ…)       |
| **Maj + Tab**   | Focus sur l'élément précédent                            |
| **Entrée**      | Active un lien ou un bouton                              |
| **Espace**      | Active un bouton (pas un lien)                           |
| **Échap**       | Ferme une modale                                         |

Beaucoup de gens naviguent au clavier : personnes avec un handicap moteur, personnes aveugles qui utilisent un lecteur d'écran, ou simplement utilisateurs pressés. Pour elles, la page n'existe qu'à travers le focus. S'il disparaît, s'il saute à un endroit inattendu ou s'il reste coincé, la page devient inutilisable.

En JavaScript, `document.activeElement` contient l'élément qui a le focus.

## L'accessibilité (a11y)

L'**accessibilité** numérique, c'est faire en sorte qu'un site soit utilisable par tout le monde, quel que soit son handicap ou sa façon de naviguer. On l'écrit souvent **a11y** : un a, onze lettres (« ccessibilit »), un y.

Deux référentiels :

- le **[RGAA](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)** (Référentiel général d'amélioration de l'accessibilité), le référentiel officiel français. La version en vigueur est la **4.1.2** ; une version 5 est annoncée ;
- les **[WCAG 2.2](https://www.w3.org/Translations/WCAG22-fr/)** (Règles pour l'accessibilité des contenus web), le référentiel international du W3C, sur lequel le RGAA s'appuie. Chaque critère a un niveau : A (indispensable), AA, AAA.

Voici les critères que vous allez respecter dans ce TP, étape par étape :

| Ce qu'on fait                                                                                                       | Étape  | RGAA 4.1                                                                         | WCAG 2.2                                                                                           |
| ------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Le déclencheur est un `<button>` (pas un `<a href="#">` ni une `<div>`), utilisable au clavier                      | 0      | [7.3](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#7.3)   | [2.1.1 Clavier](https://www.w3.org/Translations/WCAG22-fr/#keyboard) (A)                           |
| La modale a un nom accessible (`aria-labelledby` vers son titre), le bouton × a un nom (« Fermer »)                 | 1      | [7.1](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#7.1)   | [4.1.2 Nom, rôle et valeur](https://www.w3.org/Translations/WCAG22-fr/#name-role-value) (A)        |
| Le focus entre dans la modale, la page derrière est inaccessible pendant l'ouverture, le focus revient sur le déclencheur | 2 et 4 | [12.8](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#12.8) | [2.4.3 Parcours du focus](https://www.w3.org/Translations/WCAG22-fr/#focus-order) (A)              |
| On peut toujours sortir de la modale au clavier (Échap, bouton Fermer)                                              | 3      | [12.9](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#12.9) | [2.1.2 Pas de piège au clavier](https://www.w3.org/Translations/WCAG22-fr/#no-keyboard-trap) (A)   |
| Le focus est toujours visible (`:focus-visible`, jamais `outline: none` sans remplacement)                          | 5      | [10.7](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#10.7) | [2.4.7 Visibilité du focus](https://www.w3.org/Translations/WCAG22-fr/#focus-visible) (AA)         |

Les critères du RGAA sont rédigés comme des questions. Leur intitulé exact :

- **7.1** : « Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ? »
- **7.3** : « Chaque script est-il contrôlable par le clavier et par tout dispositif de pointage (hors cas particuliers) ? »
- **10.7** : « Dans chaque page web, pour chaque élément recevant le focus, la prise de focus est-elle visible ? »
- **12.8** : « Dans chaque page web, l'ordre de tabulation est-il cohérent ? »
- **12.9** : « Dans chaque page web, la navigation ne doit pas contenir de piège au clavier. Cette règle est-elle respectée ? »

Pour savoir comment une modale **doit** se comporter, la référence est le motif [Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) de l'ARIA Authoring Practices Guide (APG), publié par le W3C. Pour l'élément lui-même : la page MDN de [`<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/dialog).

---

## Boîte à outils

Tout ce qui est nouveau dans ce TP, avec un lien vers MDN. Une ligne d'exemple suffit pour démarrer.

| Outil                                                                                                                         | À quoi ça sert                                                                                             | Exemple                                                     |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [`<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/dialog)                                        | Une boîte de dialogue. Invisible tant qu'elle n'est pas ouverte.                                            | `<dialog id="legal-dialog">…</dialog>`                      |
| [`showModal()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/showModal)                                    | Ouvrir la boîte **en modale** : fond, page inerte, Échap.                                                   | `legalDialog.showModal()`                                   |
| [`show()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/show)                                              | Ouvrir la boîte **sans** la rendre modale. Pas pour des mentions légales.                                   | `legalDialog.show()`                                        |
| [`close()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/close)                                            | Fermer la boîte.                                                                                           | `legalDialog.close()`                                       |
| [`.open`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/open)                                               | `true` si la boîte est ouverte (elle a alors l'attribut `open`).                                            | `console.log(legalDialog.open)`                             |
| [événement `close`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/close_event)                              | Se produit **après chaque fermeture**, quelle que soit la façon de fermer.                                  | `legalDialog.addEventListener('close', …)`                  |
| [`::backdrop`](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/::backdrop)                                  | Le fond posé derrière une modale. Il se style en CSS.                                                      | `.dialog::backdrop { background: … }`                       |
| [`<form method="dialog">`](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/form#method)                     | Un bouton dans ce formulaire ferme la boîte, sans JavaScript.                                              | `<form method="dialog"><button>OK</button></form>`          |
| [`returnValue`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/returnValue)                                  | La `value` du bouton qui a fermé la boîte (avec `form method="dialog"`). Étape 8.                          | `if (dialog.returnValue === 'yes')`                         |
| [`document.activeElement`](https://developer.mozilla.org/fr/docs/Web/API/Document/activeElement)                              | L'élément qui a le focus.                                                                                  | `console.log(document.activeElement)`                       |
| [`focus()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus)                                                  | Donner le focus à un élément.                                                                              | `legalButton.focus()`                                       |
| [`autofocus`](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Global_attributes/autofocus)                           | Dans une `<dialog>` : l'élément qui reçoit le focus à l'ouverture.                                          | `<button autofocus>`                                        |
| [`tabindex="-1"`](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Global_attributes/tabindex)                        | Rend un élément focalisable **par le code** (ou `autofocus`), sans l'ajouter au parcours de Tab.           | `<h2 tabindex="-1">`                                        |
| [`:focus-visible`](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:focus-visible)                          | Style appliqué quand le focus doit être montré (en pratique : au clavier).                                  | `button:focus-visible { outline: … }`                       |
| [`aria-labelledby`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby)        | Donner un nom à un élément en pointant vers l'id d'un texte visible.                                       | `<dialog aria-labelledby="legal-title">`                    |
| [`aria-label`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label)                  | Donner un nom à un élément qui n'a pas de texte clair (une icône, un ×).                                    | `<button aria-label="Fermer">×</button>`                    |
| [`data-…` et `dataset`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset)                                    | Lire un attribut `data-…` plus court qu'avec `getAttribute`. Étape 9.                                      | `data-dialog="legal-dialog"` → `trigger.dataset.dialog`     |
| [`closedby`](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/dialog#closedby)                               | Choisir comment la boîte peut se fermer. Support incomplet. Étape 7.                                       | `<dialog closedby="any">`                                   |
| [`:has()`](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors/:has)                                            | Sélectionner un élément selon ce qu'il contient. Étape 10.                                                 | `body:has(dialog[open])`                                    |
| Expression en direct (DevTools)                                                                                               | Une expression réévaluée en continu dans la console. Icône « œil » en haut de l'onglet Console.            | `document.activeElement`                                    |
| Panneau Accessibilité (DevTools)                                                                                              | Le rôle et le nom accessible de l'élément sélectionné. Onglet Éléments, puis « Accessibilité ».             | Rôle `dialog`, nom « Mentions légales »                     |
