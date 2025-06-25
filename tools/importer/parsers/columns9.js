/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns (direct children of the grid)
  const columns = Array.from(grid.children);

  // Header row: single cell as required
  const headerRow = ['Columns (columns9)'];
  // Content row: each cell is a column's content
  const contentRow = columns;

  // Table rows: header is a single column, content row has N columns
  const rows = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
