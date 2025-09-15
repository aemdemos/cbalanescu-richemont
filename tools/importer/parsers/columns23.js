/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  const columns = [];

  areaContainers.forEach((area) => {
    // Each area contains a .flexible-figure-block (the content for the column)
    const block = area.querySelector('.flexible-figure-block');
    if (block) {
      columns.push(block);
    } else {
      // If no block, push the area itself (edge case)
      columns.push(area);
    }
  });

  // Defensive: if no columns found, fallback to the whole element
  if (columns.length === 0) {
    columns.push(element);
  }

  // Build table rows
  const headerRow = ['Columns (columns23)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
