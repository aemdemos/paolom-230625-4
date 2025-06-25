/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];
  // Find all immediate child card links
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));
  const rows = cards.map(card => {
    // Find image (first img inside the card)
    const img = card.querySelector('img');
    // Find grid layout inside the card (usually direct child of <a>)
    const grid = card.querySelector('div.w-layout-grid');
    // Inside grid: first child is img, second child is the text block
    const gridChildren = Array.from(grid.children);
    let imgEl = gridChildren.find(child => child.tagName === 'IMG');
    let textEl = gridChildren.find(child => child !== imgEl);
    // Remove the "Read" CTA at the end of text block (if present)
    if (textEl && textEl.lastElementChild && textEl.lastElementChild.textContent.trim().toLowerCase() === 'read') {
      textEl.removeChild(textEl.lastElementChild);
    }
    // Reference the actual DOM elements directly (no cloning)
    return [imgEl, textEl];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
