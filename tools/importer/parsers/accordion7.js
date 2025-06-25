/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for Accordion block
  const cells = [['Accordion']];

  // Get all direct accordion items (each .accordion.w-dropdown)
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');

  accordionItems.forEach((item) => {
    // Title cell: .w-dropdown-toggle > .paragraph-lg (the title text element)
    let titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleEl) {
      // fallback to .w-dropdown-toggle's first child
      const toggle = item.querySelector('.w-dropdown-toggle');
      if (toggle && toggle.children.length > 0) {
        titleEl = toggle.children[0];
      }
    }

    // Content cell: .w-dropdown-list > * (wrap all content inside the dropdown list)
    let contentEl = null;
    const dropdownList = item.querySelector('.w-dropdown-list');
    if (dropdownList) {
      // If there's only one direct content block, reference it; else, wrap in a div
      const contentNodes = Array.from(dropdownList.children);
      if (contentNodes.length === 1) {
        contentEl = contentNodes[0];
      } else if (contentNodes.length > 1) {
        const wrapper = document.createElement('div');
        contentNodes.forEach(node => wrapper.appendChild(node));
        contentEl = wrapper;
      } else {
        // If empty, create an empty div
        contentEl = document.createElement('div');
      }
    } else {
      // If no dropdown list, create an empty div
      contentEl = document.createElement('div');
    }

    if (titleEl && contentEl) {
      cells.push([titleEl, contentEl]);
    }
    // If one of the cells is missing, skip this item (avoid incomplete rows)
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
