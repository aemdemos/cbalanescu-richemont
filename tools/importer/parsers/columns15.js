/* global WebImporter */
export default function parse(element, { document }) {
  // Find the three area columns in order
  const areas = Array.from(
    element.querySelectorAll('.umb-block-grid__area-container > .umb-block-grid__area')
  );

  // For each area, get its two figure-blocks (in order)
  // We'll build two rows, each with three columns
  const topRow = [];
  const bottomRow = [];

  areas.forEach((area) => {
    const layoutItems = area.querySelectorAll('.umb-block-grid__layout-item');
    // Top cell
    if (layoutItems[0]) {
      const fig = layoutItems[0].querySelector('.figure-block');
      if (fig) {
        // Use the actual element reference, not a clone
        topRow.push(fig);
      } else {
        // Empty cell
        topRow.push(document.createElement('div'));
      }
    } else {
      topRow.push(document.createElement('div'));
    }
    // Bottom cell
    if (layoutItems[1]) {
      const fig = layoutItems[1].querySelector('.figure-block');
      if (fig) {
        bottomRow.push(fig);
      } else {
        bottomRow.push(document.createElement('div'));
      }
    } else {
      bottomRow.push(document.createElement('div'));
    }
  });

  // Defensive: ensure we have 3 columns per row (fill with empty if missing)
  while (topRow.length < 3) topRow.push(document.createElement('div'));
  while (bottomRow.length < 3) bottomRow.push(document.createElement('div'));

  // Table header as required
  const headerRow = ['Columns (columns15)'];
  const tableRows = [
    headerRow,
    topRow,
    bottomRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
