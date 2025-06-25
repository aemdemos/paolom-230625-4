/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row for the block name
  const headerRow = ['Cards (cards3)'];

  // Each child div is a card
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare rows: each with 2 columns: [icon, text content]
  const rows = cardDivs.map(card => {
    // Get the icon container (includes SVG)
    const iconDiv = card.querySelector('.icon');
    // Get the text content. There is one <p> per card, may contain <strong> or <b> but that stays as is.
    const textDiv = card.querySelector('p');
    // Fallbacks if missing (should not generally happen in this block)
    return [iconDiv || '', textDiv || ''];
  });

  // Build the table: first row header, then a row per card
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
