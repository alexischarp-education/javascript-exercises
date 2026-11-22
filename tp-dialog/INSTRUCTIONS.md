# TP Modale – Nuits Courtes, des mentions légales accessibles

Le festival étudiant Nuits Courtes a son site : un programme, des infos pratiques, un appel aux bénévoles. Tout en bas, dans le pied de page, un lien « Mentions légales »… qui ne fait rien. À vous d'écrire la fenêtre modale qui les affiche, et de la rendre utilisable **au clavier seul** : c'est ce qui sépare une modale qui marche d'une modale accessible.

Ce TP accompagne la **SAÉ 1.05 « Produire un site web »** : la modale des mentions légales, ouverte depuis le pied de page, fait partie des critères évalués de votre projet.

## Objectifs

À la fin de ce TP, vous saurez :

- créer une modale avec `<dialog>` et l'ouvrir avec `showModal()`, et expliquer pourquoi on n'utilise ni `show()` ni une `<div>` qu'on affiche et qu'on masque ;
- la fermer de toutes les façons attendues : bouton Fermer, touche Échap, clic sur le fond ;
- gérer le focus : il entre dans la modale à l'ouverture, il ne peut pas atteindre la page derrière, et il revient sur le bouton qui l'a ouverte à la fermeture ;
- relier chacun de ces comportements à un critère d'accessibilité (RGAA et WCAG) ;
- tester une interface au clavier, sans toucher la souris.

Le TP est une seule progression : chaque étape s'appuie sur la précédente. **Allez aussi loin que vous voulez.** À la fin de l'étape 6, votre modale répond aux exigences de la SAÉ ; les étapes suivantes l'améliorent et préparent un site qui a plusieurs modales.

Vous pouvez aussi travailler directement sur votre projet de SAÉ plutôt que sur la page du festival : lisez l'étape ici, appliquez-la chez vous. Le cours ([`COURS.md`](COURS.md)) vaut pour les deux.

## Règles du module

Ces règles s'appliquent à tous les TPs. Ce sont celles que l'on suit en entreprise.

- **Tout le code est en anglais, sauf le contenu.** Les noms de variables et de fonctions, les ids et les classes CSS sont en anglais, sans accent. Seul le contenu visible (titres, textes, messages) est en français. Les noms à utiliser vous sont donnés dans chaque consigne.
- Le nom d'une fonction commence par un **verbe à l'infinitif** : `openDialog`, `setUpDialog`.
- **`const` par défaut**, `let` seulement si la valeur change ensuite.
- **`===` et `!==` uniquement** pour comparer.
- **Template literals** (`` `...${variable}...` ``) plutôt que la concaténation avec `+`.
- **Des fonctions fléchées pour les écouteurs** : `button.addEventListener('click', () => { … });`.
- **Le HTML natif d'abord.** Quand un élément HTML fait déjà le travail (`<button>`, `<dialog>`), on l'utilise au lieu de le recoder en JavaScript. La modale s'écrit dans `index.html`, pas avec `innerHTML`.

---

## Le cours

Le cours est dans un fichier à part : [`COURS.md`](COURS.md). Il explique ce qu'est une modale, le focus et l'accessibilité, liste les critères RGAA et WCAG du TP, et contient la **boîte à outils** (tout ce qui est nouveau, avec un lien MDN). Lisez-le avant l'étape 0.

---

## Avant de commencer

Le dossier `tp-dialog/` contient :

```
tp-dialog/
├── INSTRUCTIONS.md   ← ce fichier
├── COURS.md          ← le cours et la boîte à outils
├── index.html        ← la page du festival (fournie, sans modale)
└── style.css         ← le style (fourni, y compris celui de la modale)
```

Comme au TP1, vous **créez vous-même** `script.js` et vous le reliez à la page. Cette fois, vous modifiez aussi `index.html` (pour écrire la modale, étape 1) et `style.css` (étape 5). À la fin de l'étape 6 :

```
tp-dialog/
├── INSTRUCTIONS.md
├── COURS.md
├── index.html        ← modifié : la <dialog> et le lien vers script.js
├── script.js         ← créé par vous
└── style.css         ← modifié à l'étape 5
```

Le style de la modale et de son fond est **déjà prêt** dans `style.css`, à condition d'utiliser les classes indiquées à l'étape 1. Vous n'avez pas de temps à passer sur le CSS, sauf à l'étape 5.

**Faites ce TP dans Chrome**, les indications des DevTools en dépendent. Sur Mac, Safari et Firefox ne donnent pas le focus aux liens avec Tab tant que vous n'avez pas activé la navigation au clavier (macOS : Réglages Système > Clavier > « Navigation au clavier » ; Safari : Réglages > Avancé > « Appuyer sur Tab pour mettre en évidence chaque élément »).

---

# Les étapes

## Étape 0 : Prise en main

1. Ouvrez `index.html` dans le navigateur. **Sans toucher la souris**, appuyez sur Tab plusieurs fois et suivez le focus. Combien d'appuis faut-il pour atteindre « Mentions légales » ? Notez tout ce qui vous paraît bizarre pendant ce parcours : on y reviendra.
2. Créez `script.js` dans le dossier `tp-dialog/` et importez-le à la fin du `<body>` de `index.html`, juste avant `</body>`. Affichez `script loaded` dans la console pour vérifier.
3. Dans `index.html`, trouvez le déclencheur « Mentions légales » dans le pied de page. Sélectionnez-le avec `querySelector` (son id est `legal-button`), rangez-le dans la constante `legalButton` et affichez-le dans la console.
4. Ce déclencheur est un `<button>` stylé pour ressembler à un lien. **Pourquoi pas un `<a href="#">` ?** Répondez en commentaire dans `script.js`, en deux ou trois phrases.

<details>
<summary>Indice</summary>

Comparez les deux. Que devient l'adresse dans la barre du navigateur quand on clique sur un `<a href="#">` ? Quelles touches activent un lien ? Et un bouton ? Que va annoncer un lecteur d'écran : « lien » ou « bouton » ?

La règle à retenir : **un lien emmène ailleurs, un bouton agit sur la page**. Et une `<div>` avec un écouteur de clic ? Elle ne reçoit même pas le focus.

</details>

📏 **RGAA 7.3, WCAG 2.1.1 (Clavier)** : tout ce qui marche à la souris doit marcher au clavier. Un `<button>` est focalisable et s'active avec Entrée et Espace, sans une ligne de JavaScript en plus.

---

## Étape 1 : Écrire la modale

Dans `index.html`, entre `</footer>` et votre balise `<script>`, écrivez la modale. Le CSS fourni attend cette structure :

```html
<dialog id="legal-dialog" class="dialog" …>
  <div class="dialog-header">
    <h2 …>Mentions légales</h2>
    <button …>×</button>
  </div>
  <div class="dialog-body">
    <h3>Éditeur du site</h3>
    <p>…</p>
    …
  </div>
</dialog>
```

1. Complétez les `…` :
   - le titre `<h2>` a l'id `legal-title` ;
   - le bouton est un `type="button"`, de classe `dialog-close`, d'id `legal-close-button`. Son seul contenu est `×` : donnez-lui un **nom accessible**, « Fermer », avec `aria-label` ;
   - la `<dialog>` est reliée à son titre avec `aria-labelledby="legal-title"`.
2. Dans `.dialog-body`, un `<h3>` et un `<p>` par rubrique. Inventez le contenu ou reprenez celui-ci (il est fictif) :
   - **Éditeur du site** : Association Nuits Courtes, 12 rue des Projecteurs, 16000 Angoulême, contact@nuits-courtes.example (faites-en un lien `mailto:`) ;
   - **Directrice de la publication** : Camille Martin, présidente de l'association ;
   - **Hébergeur** : PixelHost SAS, 1 avenue des Serveurs, 75000 Paris ;
   - **Crédits** : conception et réalisation par les étudiantes et étudiants de BUT MMI ;
   - **Données personnelles** : ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle.

   Sur un vrai site, ces mentions sont **obligatoires** (loi pour la confiance dans l'économie numérique).
3. Rechargez : **rien ne s'affiche**. Normal : une `<dialog>` est invisible tant qu'elle n'est pas ouverte. Dans l'onglet Éléments, ajoutez à la main l'attribut `open` sur la `<dialog>` (double-clic sur la balise) : elle apparaît, en bas de la page, sans fond assombri. Retirez l'attribut.
4. Toujours dans l'onglet Éléments, sélectionnez la `<dialog>` et ouvrez le panneau **Accessibilité**. Notez son **rôle** et son **nom**. Sélectionnez ensuite le bouton × : quel est son nom ? Retirez un instant son `aria-label` : que devient le nom ? Qu'entendrait une personne aveugle ? Remettez l'`aria-label`.

Répondez en commentaire dans `index.html`, juste au-dessus de la `<dialog>` :

- Pourquoi `aria-labelledby` vers le titre plutôt qu'un `aria-label` sur la `<dialog>` ?
- Pourquoi n'a-t-on pas écrit `role="dialog"` ?

📏 **RGAA 7.1, WCAG 4.1.2 (Nom, rôle et valeur)** : chaque composant a un rôle (ici « boîte de dialogue », donné par `<dialog>`) et un nom qu'une technologie d'assistance peut annoncer.

---

## Étape 2 : Ouvrir

1. Dans `script.js`, sélectionnez la `<dialog>` et rangez-la dans `legalDialog`.
2. Écoutez le `click` sur `legalButton`, et dans le callback appelez `legalDialog.showModal()`.
3. Testez à la souris. La modale s'affiche au centre, la page s'assombrit derrière. Essayez de cliquer sur un lien du menu : rien. Dans la console, tapez `legalDialog.open`, et regardez la `<dialog>` dans l'onglet Éléments.
4. Vous n'avez pas encore écrit de code de fermeture. Appuyez quand même sur Échap.

### `show()` ou `showModal()` ?

Remplacez `showModal()` par `show()`, rechargez, et remplissez ce tableau (rechargez la page entre deux tests, le bouton × ne fait encore rien) :

| Test                                                         | `show()` | `showModal()` |
| ------------------------------------------------------------ | -------- | ------------- |
| Le fond est assombri                                         |          |               |
| Où la boîte apparaît-elle ?                                  |          |               |
| Un clic sur « Programme », dans le menu, fonctionne          |          |               |
| Focus sur le bouton ×, puis Maj + Tab : où va le focus ?     |          |               |
| Échap ferme la boîte                                         |          |               |

Remettez `showModal()`.

`show()` ouvre une boîte **non modale** : la page reste utilisable derrière, comme pour une petite fenêtre de chat posée dans un coin. Pour des mentions légales, on veut l'inverse : tant qu'elles sont ouvertes, le clavier et le lecteur d'écran ne doivent pas se perdre dans la page derrière.

Répondez en commentaire dans `script.js` : **que faudrait-il coder à la main si on utilisait une `<div>` qu'on affiche et qu'on masque au lieu d'une `<dialog>` ?** Faites la liste (relisez [`COURS.md`](COURS.md)).

---

## Étape 3 : Fermer

1. Sélectionnez le bouton × (`#legal-close-button`) et rangez-le dans `legalCloseButton`.
2. Écoutez le `click` sur ce bouton, et appelez `legalDialog.close()`.
3. Testez à la souris, puis au clavier : Tab jusqu'au ×, puis Entrée. Rouvrez, et cette fois Espace.
4. Rouvrez, et appuyez sur **Échap**. La modale se ferme, sans que vous ayez écrit une ligne pour ça : c'est `showModal()` qui le gère.
5. La modale fermée a-t-elle disparu de la page ? Regardez dans l'onglet Éléments.

### L'autre façon de fermer : `<form method="dialog">`

Il existe une façon de fermer sans JavaScript : placer le bouton dans un formulaire dont la méthode est `dialog`.

```html
<form method="dialog">
  <button class="dialog-close" aria-label="Fermer">×</button>
</form>
```

Quand on clique sur un bouton de ce formulaire, le navigateur ferme la `<dialog>` qui le contient. Pour l'instant, on garde `close()` : c'est une ligne de JavaScript que vous saurez expliquer. Vous utiliserez `<form method="dialog">` à l'étape 8, là où il est vraiment utile.

📏 **RGAA 12.9, WCAG 2.1.2 (Pas de piège au clavier)** : on peut toujours sortir de la modale au clavier, avec Échap ou avec le bouton ×.

---

## Étape 4 : Gérer le focus

### 4.1 Où est le focus ?

Pour suivre le focus en direct, ouvrez l'onglet Console, cliquez sur l'icône « œil » (**Créer une expression en direct**) et tapez `document.activeElement`. La valeur se met à jour toute seule.

1. Au clavier, allez jusqu'à « Mentions légales » et ouvrez la modale avec Entrée. Où est le focus ?
2. Appuyez sur Tab plusieurs fois, puis sur Maj + Tab. Le focus atteint-il la page derrière ?

À l'ouverture, le navigateur place le focus sur le **premier élément focalisable** de la modale : ici, le ×. Ensuite, Tab tourne dans la modale **et** dans l'interface du navigateur (barre d'adresse, onglets), mais n'atteint jamais la page derrière. Ce n'est pas un bug : le focus ne doit pas se perdre dans la page, mais l'utilisateur doit pouvoir rejoindre la barre d'adresse. On n'écrit donc **pas** de code pour enfermer le focus dans la modale : `showModal()` fait exactement ce qu'il faut.

### 4.2 Choisir où le focus arrive

Le premier élément focalisable convient souvent, mais pas toujours. L'APG recommande :

- **en général**, le premier élément focalisable de la modale ;
- **pour un long contenu**, si focaliser le premier élément interactif risque de faire défiler le début du texte hors de la vue, un élément **statique** en haut de la modale (le titre, par exemple), rendu focalisable avec `tabindex="-1"`.

Des mentions légales, c'est un long texte. Ici, le × est en haut de la modale, à côté du titre : lui donner le focus laisse le début du texte visible, et le lecteur d'écran annonce « Mentions légales, boîte de dialogue », puis « Fermer, bouton ». **On garde donc le focus sur le ×**, et on rend ce choix explicite avec l'attribut `autofocus` :

1. Ajoutez `autofocus` sur le bouton ×. Si quelqu'un ajoute un jour un lien avant lui, le focus restera au bon endroit.

Si le bouton de fermeture était tout en bas (un « J'ai lu » à la fin d'un long texte, par exemple), on mettrait plutôt le focus sur le titre : `<h2 id="legal-title" tabindex="-1" autofocus>`. Jamais de `tabindex` sur la `<dialog>` elle-même : MDN l'interdit, elle ne doit pas recevoir le focus.

### 4.3 Rendre le focus au déclencheur

Fermez la modale. Où devrait aller le focus ? L'APG est clair : **sur l'élément qui a ouvert la modale**. Sinon, une personne au clavier repart du haut de la page, et refait ses huit Tab.

Les navigateurs récents s'en chargent souvent tout seuls. Fermez avec Échap et regardez votre expression en direct dans Chrome : le focus revient sur « Mentions légales ». Mais le navigateur ne peut rendre le focus qu'à l'élément qui l'avait **avant** l'ouverture. Or sur **Safari**, un clic ne donne pas le focus à un bouton : ouverte à la souris, la modale rendrait le focus… à la page entière. On gère donc le retour du focus **nous-mêmes**, pour comprendre le mécanisme et ne pas dépendre du navigateur.

1. En haut de `script.js`, après les sélections, déclarez `let lastTrigger = null;`. Pourquoi `let` ?
2. Dans l'écouteur du clic sur `legalButton`, **avant** `showModal()`, mémorisez le déclencheur : `lastTrigger = legalButton;`. On n'utilise pas `document.activeElement` ici, pour la même raison : sur Safari, il vaudrait `<body>` après un clic.
3. Écoutez l'événement **`close`** sur `legalDialog`. Dans le callback, si `lastTrigger` n'est pas `null`, donnez-lui le focus avec `lastTrigger.focus()`.
4. Testez chaque façon de fermer (×, Échap) et vérifiez à chaque fois l'expression en direct.

**Pourquoi l'événement `close` ?** Il se produit **après chaque fermeture, quelle que soit la façon de fermer** : bouton × (`close()`), touche Échap, `<form method="dialog">`, ou `legalDialog.close()` tapé dans la console. En mettant le retour du focus à cet endroit, on l'écrit une seule fois et aucun cas n'est oublié.

**Pourquoi mémoriser `lastTrigger` s'il n'y a qu'un déclencheur ?** On pourrait écrire `legalButton.focus()`. Mais dès que plusieurs boutons ouvrent une modale (sur votre site de SAÉ, ou à l'étape 8), l'écouteur de `close` n'a pas à savoir lequel l'a ouverte.

<details>
<summary>Indice</summary>

```js
legalDialog.addEventListener('close', () => {
  // …
});
```

</details>

📏 **RGAA 12.8, WCAG 2.4.3 (Parcours du focus)** : le focus entre dans la modale, ne peut pas atteindre la page derrière, et revient sur le déclencheur à la fermeture.

---

## Étape 5 : Le focus visible

Un **piège** est caché dans `style.css`. Pensez à ce que vous avez noté de bizarre à l'étape 0.

1. Parcourez la page avec Tab. Sur quels éléments voit-on où est le focus ? Sur lesquels ne le voit-on pas ?
2. Trouvez dans `style.css` la règle responsable. Au-dessus, expliquez en commentaire **pourquoi c'est un problème** pour une personne qui navigue au clavier.
3. Corrigez : supprimez la propriété fautive, et ajoutez une règle `button:focus-visible` avec un contour bien visible. Inspirez-vous de ce que le fichier fait déjà pour les liens.
4. Testez : Tab jusqu'à un bouton, le contour apparaît. Cliquez sur un bouton à la souris : pas de contour. Ouvrez la modale au clavier : le contour est sur le ×. Ouvrez-la à la souris : pas de contour.

**Pourquoi `:focus-visible` et pas `:focus` ?** `:focus` s'applique dès qu'un élément a le focus, y compris après un clic de souris, quand le contour ne sert à rien. `:focus-visible` laisse le navigateur décider : il montre le contour quand le focus doit être vu, en pratique au clavier.

Dans la modale, le fond est clair : le CSS fourni y prévoit une couleur de contour plus foncée (règle `.dialog :focus-visible`). Vérifiez que le contour du × se voit bien.

📏 **RGAA 10.7, WCAG 2.4.7 (Visibilité du focus)** : on ne supprime **jamais** `outline` sans le remplacer par un indicateur aussi visible.

---

## Étape 6 : La recette clavier

En entreprise, la **recette** est la série de tests qu'on passe avant de livrer. Celle-ci se fait **sans toucher la souris**. Posez-la à côté du clavier.

- [ ] J'atteins « Mentions légales » avec Tab, et je vois à chaque instant où est le focus.
- [ ] Entrée ouvre la modale.
- [ ] Espace ouvre la modale.
- [ ] À l'ouverture, le focus est sur le ×, et je le vois.
- [ ] Avec Tab et Maj + Tab, le focus reste dans la modale ou passe dans l'interface du navigateur, jamais sur la page derrière.
- [ ] Échap ferme la modale, et le focus revient sur « Mentions légales ».
- [ ] Le × (Entrée ou Espace) ferme la modale, et le focus revient sur « Mentions légales ».
- [ ] Après la fermeture, Maj + Tab mène à « Nous écrire » : je reprends mon parcours là où je l'avais laissé.
- [ ] Le focus est visible à chaque étape, dans la page comme dans la modale.

Puis échangez de place avec votre voisin·e : chacun passe la recette sur le TP de l'autre. Une personne qui n'a pas écrit le code trouve d'autres problèmes.

---

> ### 🎯 Point d'étape : votre modale est conforme
>
> Votre modale répond maintenant aux exigences de la SAÉ. Répondez en commentaire dans `script.js`, en deux ou trois phrases : **pourquoi rend-on le focus dans l'écouteur de l'événement `close`, et pas dans l'écouteur du clic sur le × ?**
>
> Puis, sans regarder votre code :
>
> - [ ] Je sais ce que `showModal()` apporte de plus que `show()`.
> - [ ] Je sais pourquoi le déclencheur est un `<button>` et pas un `<a href="#">`.
> - [ ] Je sais à quoi sert `aria-labelledby`, et pourquoi on n'écrit ni `role="dialog"` ni `aria-modal`.
> - [ ] Je sais quand l'événement `close` se produit.
> - [ ] Je sais pourquoi on ne supprime jamais `outline` sans le remplacer, et ce que fait `:focus-visible`.
> - [ ] Je sais relier chaque étape à un critère du RGAA.
>
> Une case non cochée ? Relisez l'étape correspondante avant de continuer.

---

## Étape 7 : Fermer en cliquant sur le fond

Beaucoup d'utilisateurs s'attendent à fermer une modale en cliquant à côté.

1. Écoutez le `click` sur `legalDialog` lui-même. Dans le callback, si `event.target === legalDialog`, fermez la modale.
2. Testez : un clic sur le fond ferme, un clic sur le texte ne ferme pas.
3. Expliquez en commentaire **pourquoi ça marche**. Indices : le `::backdrop` est un pseudo-élément, pas un élément, donc un clic sur le fond est reçu par… ? Et un clic sur un paragraphe de la modale, quel est son `event.target` ?
4. Le CSS fourni met `padding: 0` sur `.dialog` et place les marges intérieures sur `.dialog-header` et `.dialog-body`. Ajoutez un instant `padding: 2rem` à `.dialog`, et cliquez dans cette marge. Que se passe-t-il ? Pourquoi ? Retirez-le.
5. Le focus revient-il bien sur « Mentions légales » ? Vous n'avez rien eu à ajouter : c'est tout l'intérêt de l'événement `close`.

Il existe un attribut qui fait la même chose sans JavaScript : `<dialog closedby="any">`. Il fonctionne dans Chrome et Edge (depuis la version 134) et dans Firefox (depuis la version 141), mais **pas encore dans Safari** à l'automne 2026. Vérifiez sur [caniuse.com](https://caniuse.com/mdn-html_elements_dialog_closedby) avant de compter dessus : en attendant, l'astuce `event.target === legalDialog` marche partout.

---

## Étape 8 : Une confirmation « Oui / Non »

La page contient un bouton « Proposer mon aide » (`#volunteer-button`) et un paragraphe vide `#volunteer-status`. Ce paragraphe a un `role="status"` : quand son texte change, un lecteur d'écran le lit, sans déplacer le focus.

1. Écrivez une seconde modale `#volunteer-dialog`, avec les classes `dialog dialog-small`, reliée à son titre `<h2>` « Devenir bénévole ? ». Son contenu est un `<form method="dialog" class="dialog-body">` qui contient le titre, une phrase d'explication, et une `<div class="dialog-actions">` avec deux boutons :

   ```html
   <button class="button button-secondary" value="no">Non, pas cette fois</button>
   <button class="button" value="yes">Oui, je m'inscris</button>
   ```

   Lequel doit recevoir le focus à l'ouverture ? L'APG conseille, pour une confirmation, l'action **la moins lourde de conséquences**. Ajoutez `autofocus` au bon bouton.
2. Ouvrez-la au clic sur `#volunteer-button`, sans oublier `lastTrigger`.
3. Écoutez son événement `close`. `volunteerDialog.returnValue` contient la `value` du bouton qui a fermé la boîte. Si c'est `'yes'`, écrivez `Merci ! Vous recevrez le planning des bénévoles par e-mail.` dans `#volunteer-status`, sinon `Pas de souci : la proposition reste ouverte jusqu’au 1er mars.` Puis rendez le focus.
4. Testez Oui, Non et Échap. Que vaut `returnValue` après Échap ?
5. **Le piège.** `returnValue` n'est pas remis à zéro quand la boîte s'ouvre. Ajoutez la fermeture au clic sur le fond (étape 7) à cette modale, puis : cliquez sur Oui, rouvrez, cliquez sur le fond. Quel message s'affiche ? Corrigez en écrivant `volunteerDialog.returnValue = '';` juste avant `showModal()`.
---

## Étape 9 : Factoriser

Votre code se répète d'une modale à l'autre : sélection, ouverture, retour du focus, clic sur le fond. Le but de cette étape : qu'ajouter une troisième modale ne demande plus que du HTML.

1. Écrivez `openDialog(dialog, trigger)`, qui mémorise le déclencheur, remet `returnValue` à `''` et ouvre la modale.
2. Écrivez `setUpDialog(dialog)`, qui pose sur une modale l'écouteur de `close` (retour du focus) et celui du clic sur le fond. Appliquez-la à toutes les `<dialog>` de la page avec `querySelectorAll` et `forEach`.
3. Ajoutez à chaque déclencheur un attribut `data-dialog` qui contient l'id de sa modale : `data-dialog="legal-dialog"`. Sélectionnez tous les déclencheurs avec `querySelectorAll('[data-dialog]')` et, au clic, retrouvez la modale avec `` document.querySelector(`#${trigger.dataset.dialog}`) ``. `dataset.dialog` lit l'attribut `data-dialog`, comme `getAttribute('data-dialog')` au TP6.
4. Mettez le × des mentions légales dans un `<form method="dialog">` : il n'a plus besoin d'écouteur.
5. Seul le message de `#volunteer-status` reste propre à la modale des bénévoles : gardez son écouteur de `close` à part.
6. Supprimez l'ancien code, puis repassez la recette clavier de l'étape 6 sur les deux modales.

---

## Étape 10 : La page ne défile plus derrière

Ouvrez la modale et faites tourner la molette : la page défile derrière le fond (sur un grand écran, réduisez d'abord la hauteur de la fenêtre). Ajoutez dans `style.css` :

```css
body:has(dialog[open]) {
  overflow: hidden;
}
```

Lisez le sélecteur à voix haute : « le `body` qui contient une `dialog` ouverte ». Testez. `dialog[open]` vise aussi une boîte ouverte avec `show()` ; pour ne viser que les modales, il existe `dialog:modal`.

---

## Étape 11 : Avec un lecteur d'écran

Activez le lecteur d'écran de votre système : **VoiceOver** sur Mac (Cmd + F5, et Cmd + F5 de nouveau pour l'arrêter), **NVDA** sur Windows (gratuit, à installer). Au clavier :

1. Comment le déclencheur est-il annoncé ?
2. À l'ouverture, entendez-vous le nom de la modale et son rôle ? Que dit le lecteur pour le × ?
3. Retirez `aria-labelledby` de la `<dialog>` : qu'est-ce qui change ? Remettez-le.
4. Essayez de lire la page derrière la modale ouverte. Est-ce possible ?

---

## Et maintenant : votre projet de SAÉ 1.05

Vous avez maintenant tout ce qu'il faut pour la modale des mentions légales de votre projet « Si j'étais… ». Ce TP n'est pas un modèle à recopier : votre site a sa propre structure, son propre contenu et son propre style. Mais les exigences sont les mêmes :

- le déclencheur, dans le pied de page, est un `<button>` ;
- la modale est une `<dialog>` ouverte avec `showModal()`, nommée par son titre avec `aria-labelledby` ;
- le bouton de fermeture a un nom accessible ;
- le focus entre dans la modale et revient sur le déclencheur, quelle que soit la façon de fermer ;
- le focus est visible partout sur votre site, pas seulement dans la modale ;
- votre site passe la recette clavier de l'étape 6.

À l'oral, vous devrez expliquer une ligne de votre JavaScript avec un vocabulaire précis. Commentez votre code comme vous l'avez fait ici : ces commentaires sont votre fiche de révision.
