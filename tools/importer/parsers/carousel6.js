/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in example
  const headerRow = ['Carousel (carousel6)'];
  const rows = [headerRow];

  // Each .w-tab-pane is a slide
  const panes = element.querySelectorAll('.w-tab-pane');

  panes.forEach((pane) => {
    // Find image: it's inside a grid with class utility-position-relative, then 'img'
    let img = pane.querySelector('.utility-position-relative img');
    // Fallback: just grab the first img in this pane if above fails
    if (!img) img = pane.querySelector('img');

    // Find text content grid (should contain a quote, name, and role)
    // It has grid-layout and utility-padding-all-2rem
    let textGrid = pane.querySelector('.grid-layout.utility-padding-all-2rem');
    // Fallback: try for just utility-padding-all-2rem
    if (!textGrid) textGrid = pane.querySelector('.utility-padding-all-2rem');

    // Will collect quote (p), name, role in order
    const textCellContent = [];
    if (textGrid) {
      // Grab the main quote (p)
      const quote = textGrid.querySelector('p');
      if (quote) textCellContent.push(quote);
      // Grab name (paragraph-xl utility-margin-bottom-0-5rem)
      const name = textGrid.querySelector('.paragraph-xl.utility-margin-bottom-0-5rem');
      if (name) textCellContent.push(name);
      // Grab role (paragraph-lg utility-margin-bottom-0)
      const role = textGrid.querySelector('.paragraph-lg.utility-margin-bottom-0');
      if (role) textCellContent.push(role);
    }

    // Build the row
    rows.push([
      img || '',
      textCellContent.length > 0 ? textCellContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
