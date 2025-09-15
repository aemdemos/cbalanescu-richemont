/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the two main column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: image
  const leftArea = areaContainers[0];
  // Defensive: Find the image block inside left area
  const imageBlock = leftArea.querySelector('.image-block');
  let leftContent = imageBlock || leftArea;

  // Right column: message block (title + paragraphs)
  const rightArea = areaContainers[1];
  // Defensive: Find the message block inside right area
  const messageBlock = rightArea.querySelector('.message-block');
  let rightContent = messageBlock || rightArea;

  // Table header
  const headerRow = ['Columns (columns2)'];
  // Table content row: left and right columns
  const contentRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
