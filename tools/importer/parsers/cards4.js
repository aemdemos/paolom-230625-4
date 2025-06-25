/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as specified
  const headerRow = ['Cards (cards4)'];
  // Get all cards (direct children <a> tags)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  // For each card, extract image and text content
  const rows = cards.map(card => {
    // Find the inner grid (holds both image and content)
    const grid = card.querySelector(':scope > .w-layout-grid');
    if (!grid) return null;
    // The image is always the first <img> in the grid
    const img = grid.querySelector('img');
    // For text content, exclude <img> and find the main <div> inside the grid
    const gridChildren = Array.from(grid.children);
    // Find the first <div> (content container) that's not the image
    let textDiv = gridChildren.find(child => child.tagName === 'DIV' && child !== img);
    // Fallback: if not found, use the grid as textDiv (shouldn't happen in normal cases)
    if (!textDiv) textDiv = grid;
    // Ensure at least an image and textDiv is present
    if (!img || !textDiv) return null;
    return [img, textDiv];
  }).filter(Boolean);
  // Compose the table with header row and card rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
