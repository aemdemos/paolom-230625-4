/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as in example
  const headerRow = ['Carousel (carousel6)'];

  // Each .w-tab-pane is a carousel slide
  const panes = element.querySelectorAll('.w-tab-pane');
  const rows = [headerRow];

  panes.forEach((pane) => {
    // --- IMAGE CELL ---
    let imgCell = null;
    // Find a container with utility-position-relative and an <img>
    // (First .utility-position-relative in this pane)
    const relDiv = pane.querySelector('.utility-position-relative');
    if (relDiv) {
      const img = relDiv.querySelector('img');
      if (img) {
        imgCell = img;
      }
    }
    
    // --- TEXT CELL ---
    let textCell = null;
    // Find the content grid (with .w-layout-grid.desktop-5-column, should be second grid in the slide)
    const textGrid = pane.querySelector('.w-layout-grid.grid-layout.desktop-5-column');
    if (textGrid) {
      textCell = textGrid;
    }
    // If no textGrid, use empty string (shouldn't happen in this example, but makes it robust)
    if (!textCell) textCell = '';
    
    rows.push([imgCell, textCell]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
