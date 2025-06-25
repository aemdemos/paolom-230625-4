/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid (columns) container within the block
  const grid = element.querySelector('.w-layout-grid');
  // If not found, fallback to direct children of container
  let columns = [];
  if (grid) {
    columns = Array.from(grid.children);
  } else {
    // fallback: check for children in container
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }

  // The block header should match exactly: 'Columns (columns8)'
  const headerRow = ['Columns (columns8)'];
  // Each column is placed as a cell in the content row, preserving elements
  const contentRow = columns.map(col => col);

  // Only add the row if at least one column (avoid empty block)
  const rows = [headerRow];
  if (contentRow.length > 0) {
    rows.push(contentRow);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
