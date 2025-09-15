/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the main grid container
  const grid = element.querySelector('.umb-block-grid__layout-container');
  if (!grid) return;

  // Find all the top-level areas (columns)
  const areaContainers = Array.from(element.querySelectorAll('.umb-block-grid__area'));

  // Defensive: If no areas found, fallback to direct children
  const columns = areaContainers.length ? areaContainers : getDirectChildren(grid, 'div');

  // For each column, gather its visible content
  const columnCells = columns.map((area) => {
    // Each area has its own .umb-block-grid__layout-container
    const layoutContainer = area.querySelector('.umb-block-grid__layout-container');
    if (!layoutContainer) return '';
    // Gather all layout items in this area
    const layoutItems = getDirectChildren(layoutContainer, 'div');
    // For each layout item, get its content div (usually the first child)
    const contentBlocks = layoutItems.map(item => {
      // Defensive: find the first div inside the item
      const contentDiv = item.querySelector(':scope > div');
      return contentDiv || item;
    });
    // Return as array if multiple, or single element if only one
    return contentBlocks.length > 1 ? contentBlocks : contentBlocks[0];
  });

  // Build table rows
  const headerRow = ['Columns (columns25)'];
  const contentRow = columnCells;

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(block);
}
