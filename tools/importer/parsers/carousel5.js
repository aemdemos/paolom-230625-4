/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [
    ['Carousel (carousel5)'],
  ];

  const slides = Array.from(element.querySelectorAll(':scope > a'));

  slides.forEach((slide) => {
    // Image: get the first img
    const img = slide.querySelector('img');

    // Text: try to collect all text content that might exist in the slide (for future-proofing)
    // We'll select anything that isn't the image: headings, paragraphs, links, divs with text, etc.
    let textElements = [];
    // Gather all non-image descendants that are not SVG/logo
    const nonImageEls = Array.from(slide.querySelectorAll(':scope > *'));
    for (const el of nonImageEls) {
      // skip the image node itself
      if (el === img) continue;
      // skip svg/logo wrappers
      if (el.querySelector('svg')) continue;
      // If element has visible text or contains headings/paragraphs/links, include it
      // (for robustness)
      if (el.matches('h1,h2,h3,h4,h5,h6,p,a,span,div')) {
        if (el.textContent.trim() !== '' || el.querySelector('a,button')) {
          textElements.push(el);
        }
      }
    }
    // If nothing found, leave empty string
    const textCell = textElements.length > 0 ? textElements : '';

    cells.push([
      img,
      textCell,
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
