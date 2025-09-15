/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find the two main column areas (left/right)
  const areaContainers = gridContainer.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // LEFT COLUMN: headline + message block
  const leftArea = areaContainers[0];
  // Find all layout items in left column
  const leftItems = Array.from(leftArea.querySelectorAll('.umb-block-grid__layout-item'));
  // Collect all direct content blocks in left column
  const leftContent = [];
  leftItems.forEach(item => {
    // Find the actual block inside each layout item
    const block = item.querySelector('.headline-block, .message-block');
    if (block) leftContent.push(block);
  });

  // RIGHT COLUMN: image block
  const rightArea = areaContainers[1];
  // Find the image block in right column
  const rightItem = rightArea.querySelector('.image-block');

  // Table header
  const headerRow = ['Columns (columns24)'];
  // Table content row: left column (headline + message), right column (image)
  const contentRow = [leftContent, rightItem];

  // Build the table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}
