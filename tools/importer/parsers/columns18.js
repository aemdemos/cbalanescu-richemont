/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Columns (columns18)'];

  // Defensive: Find the grid container holding the three columns
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Each .umb-block-grid__area is a column
  const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');
  if (!areaContainers.length) return;

  // For each area, extract the main content block (the card)
  const columns = Array.from(areaContainers).map(area => {
    // Find the message block card inside this area
    const card = area.querySelector('.message-block.card');
    // Defensive: If not found, fallback to area itself
    return card || area;
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
