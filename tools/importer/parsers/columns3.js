/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  const columns = [];

  areaContainers.forEach((area) => {
    // Each area contains a .umb-block-grid__layout-container with content blocks
    const layoutContainer = area.querySelector('.umb-block-grid__layout-container');
    if (!layoutContainer) {
      columns.push('');
      return;
    }
    // Gather all direct layout items (blocks) in this column
    const blocks = Array.from(layoutContainer.children);
    // Compose a fragment for this column
    const frag = document.createDocumentFragment();
    blocks.forEach((block) => {
      // For video blocks, only include the video element (not overlay/play button)
      const video = block.querySelector('video');
      if (video) {
        frag.appendChild(video);
        return;
      }
      // Otherwise, include the whole block
      frag.appendChild(block);
    });
    columns.push(frag);
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns3)'];
  // Table body: one row, two columns
  const tableRows = [columns];

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...tableRows], document);

  // Replace original element
  element.replaceWith(blockTable);
}
