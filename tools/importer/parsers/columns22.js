/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate area containers for columns
  const layoutContainer = element.querySelector('.umb-block-grid__layout-container');
  if (!layoutContainer) return;

  // Find the job-listings-component block
  const jobListingsBlock = layoutContainer.querySelector('.job-listings-component');
  if (!jobListingsBlock) return;

  // Get the two column areas (left and right)
  const areaContainers = jobListingsBlock.querySelectorAll('.umb-block-grid__area');
  if (areaContainers.length < 2) return;

  // Left column: message block (title, text, CTA)
  const leftContent = areaContainers[0].querySelector('.message-block.job');
  // Right column: listings (empty in this case, but keep structure)
  const rightContent = areaContainers[1].querySelector('.latest-listings');

  // Defensive: If missing, use empty div
  const leftCell = leftContent ? leftContent : document.createElement('div');
  const rightCell = rightContent ? rightContent : document.createElement('div');

  // Table header row (block name)
  const headerRow = ['Columns (columns22)'];
  // Table content row (two columns)
  const contentRow = [leftCell, rightCell];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
