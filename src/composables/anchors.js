// Deterministic DOM id for an `### h4` subheading within a subsection. Both the
// renderer (RuleBlock.vue) and the search indexer (useSearch.js) call this with the
// parent subsection id and the heading's 1-based order in the body, so a search hit
// on a subheading scrolls to that exact heading rather than the subsection top.
export function h4AnchorId(subId, n) {
  return `${subId}-h${n}`
}
