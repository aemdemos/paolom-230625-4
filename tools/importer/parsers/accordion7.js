/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as specified
  const headerRow = ['Accordion'];
  const rows = [];

  // Get all accordion items (each .w-dropdown)
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');

  accordionItems.forEach(item => {
    // Title: get the .paragraph-lg inside the .w-dropdown-toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg') || toggle;
    } else {
      // fallback: create a blank cell if not found
      title = document.createElement('div');
      title.textContent = '';
    }

    // Content: get the .w-dropdown-list > .utility-padding-all-1rem > .rich-text or .w-richtext
    let content;
    const nav = item.querySelector('nav.w-dropdown-list');
    if (nav) {
      // Look for .utility-padding-all-1rem inside nav
      const pad = nav.querySelector('.utility-padding-all-1rem');
      if (pad) {
        // Prefer rich text
        const rich = pad.querySelector('.rich-text, .w-richtext');
        if (rich) {
          content = rich;
        } else {
          // fallback: use all children of pad
          content = pad;
        }
      } else {
        // fallback: use nav itself
        content = nav;
      }
    } else {
      content = document.createElement('div');
      content.textContent = '';
    }

    rows.push([title, content]);
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
