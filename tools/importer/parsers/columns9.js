/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (contains the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid. These are the columns.
  const columns = Array.from(grid.children);

  // The header row should be a single cell with the exact text
  const headerRow = ['Columns (columns9)'];
  // The content row should have one cell per column
  const contentRow = columns;

  const tableData = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
