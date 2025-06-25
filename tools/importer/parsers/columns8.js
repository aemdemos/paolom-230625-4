/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (the columns)
  const columns = Array.from(grid.children);

  // Ensure we have at least one column
  if (columns.length === 0) return;

  // Table header: block name exactly as in the example
  const headerRow = ['Columns (columns8)'];

  // Table content row: each cell is a reference to each of the column elements
  const contentRow = columns;

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the entire section element with the new table
  element.replaceWith(table);
}
