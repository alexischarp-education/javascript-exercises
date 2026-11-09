// TP6 – MMI Quest, events
// The page is already complete: the cards, the filters and the panels are in index.html.
// Your job is to make it react. Write your code below each TODO, in the order of the steps.

// Provided: the team can hold at most 3 members.
const maxTeamSize = 3;

// Provided: the text of #hover-panel when no card is hovered (same text as in index.html).
const defaultHoverMessage = 'Survolez une carte pour voir ce que son recrutement changerait.';

// STEP 0: Getting started
// TODO: select #search-input, #domain-filter and #hover-panel and keep each one in a constant
//       (searchInput, domainFilter, hoverPanel)
// TODO: select all the cards of the grid and display how many there are in the console

// STEP 1: Click to recruit
// TODO: write getTeamCards(), sumStat(cards, stat) and updateTeam()
// TODO: write toggleTeamMember(card)
// TODO: listen to the click on each card

// STEP 2: Hover to preview
// TODO: write showCardPreview(card) and resetCardPreview()
// TODO: listen to mouseenter and mouseleave on each card
// TODO: refresh the preview after a click

// STEP 3: Typing in the search field
// TODO: write applyFilters()
// TODO: listen to the input event on #search-input

// STEP 4: Changing the domain
// TODO: listen to the change event on #domain-filter

// BONUS
