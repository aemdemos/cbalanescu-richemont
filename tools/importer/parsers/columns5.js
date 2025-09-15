/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the two main column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: text content
  const leftArea = areaContainers[0];
  // Find the message block inside left area
  const leftContentBlock = leftArea.querySelector('.message-block');
  // Defensive: fallback to area itself if not found
  const leftCellContent = leftContentBlock || leftArea;

  // Right column: image content
  const rightArea = areaContainers[1];
  // Find the image block inside right area
  const rightContentBlock = rightArea.querySelector('.image-block');
  // Defensive: fallback to area itself if not found
  const rightCellContent = rightContentBlock || rightArea;

  // Table header
  const headerRow = ['Columns (columns5)'];
  // Table content row: two columns
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
