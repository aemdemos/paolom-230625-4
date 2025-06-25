/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row exactly as in example
  const cells = [
    ['Carousel (carousel2)']
  ];

  // Find the flex container with slides inside the provided element
  const flexContainer = element.querySelector('.flex-horizontal.align-center.justify-center');
  if (!flexContainer) return;

  // Each slide is a direct child div with class 'custom-hero-to-place-wrapper'
  const slideDivs = flexContainer.querySelectorAll(':scope > div.custom-hero-to-place-wrapper');

  slideDivs.forEach((slideDiv) => {
    // The image for the slide
    const img = slideDiv.querySelector('img');
    if (!img) return; // skip if no image

    // Try to extract text content for the second cell, for structure and extensibility
    // Look for possible sibling or children elements (heading, paragraph, etc.)
    // For current HTML, there is no text, so leave empty, but structure is ready for content
    let textContent = '';
    
    // If you expect slides to sometimes contain text, you could do:
    // const textBlocks = Array.from(slideDiv.children).filter(child => child !== img && child.tagName !== 'IMG');
    // if (textBlocks.length > 0) textContent = textBlocks;
    
    cells.push([
      img,
      textContent
    ]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
