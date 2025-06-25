/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Carousel (carousel5)'];

  // Each slide is a direct <a> child of the given element
  const slides = Array.from(element.querySelectorAll(':scope > a.tab-menu-link'));

  // For each slide, structure the row as: [image, text content]
  const rows = slides.map((slide) => {
    // First cell: the <img> element
    const img = slide.querySelector('img');
    // Second cell: any text content (most likely is SVG logo or other visual element)
    // We'll grab everything except the first img from the main <div> inside the <a>
    let textCell = '';
    // The tab menu has a structure: <a><div> ... <img> ... <div>stuff</div></div></a>
    // So, grab all children of the main div except the img
    const container = slide.querySelector('div');
    if (container) {
      const parts = [];
      Array.from(container.children).forEach((child) => {
        if (child !== img) {
          parts.push(child);
        }
      });
      // If there's text, use it
      if (parts.length > 0) {
        textCell = parts.length === 1 ? parts[0] : parts;
      }
    }
    // If no textCell found, try collecting any text after the img
    if (!textCell) {
      const afterImg = [];
      let foundImg = false;
      for (const node of slide.childNodes) {
        if (node === img) {
          foundImg = true;
          continue;
        }
        if (foundImg && (node.nodeType !== Node.TEXT_NODE || node.textContent.trim())) {
          afterImg.push(node);
        }
      }
      if (afterImg.length > 0) textCell = afterImg.length === 1 ? afterImg[0] : afterImg;
    }
    return [img, textCell];
  });

  // Compose the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
