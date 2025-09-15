/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as per block requirements
  const headerRow = ['Columns (columns16)'];

  // Get all direct <li> children (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > li'));

  // For each column, extract its content (here, the <img> inside each <li>)
  const contentRow = columns.map((col) => {
    // Defensive: if the li has an image, use it; else, use the li itself
    const img = col.querySelector('img');
    return img || col;
  });

  // Build the table: header row, then one row with 3 columns (images)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
