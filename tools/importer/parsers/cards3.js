/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as per block name
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];
  // Each card is a direct child div under the block
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach(card => {
    // The icon is in the first .icon child
    const iconWrapper = card.querySelector('.icon');
    // The text content is the <p> tag (always present in this block)
    const text = card.querySelector('p');
    // Defensive: If missing one, create empty placeholder
    rows.push([
      iconWrapper || document.createElement('span'),
      text || document.createElement('span')
    ]);
  });
  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
