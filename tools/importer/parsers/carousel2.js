/* global WebImporter */
export default function parse(element, { document }) {
  // Find the horizontal flex container with slides
  const flexContainer = element.querySelector('.flex-horizontal.align-center.justify-center.flex-gap-md');
  if (!flexContainer) return;
  const slideWrappers = flexContainer.querySelectorAll(':scope > .custom-hero-to-place-wrapper');

  const rows = [];
  // Header as required by the block
  rows.push(['Carousel (carousel2)']);

  // Each slide: image only (first cell), second cell empty
  slideWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    if (img) {
      rows.push([img, '']);
    }
  });

  // Only create and replace if we found slides
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
