/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the brands block container
  const brandsBlock = Array.from(element.children).find(child => child.classList && child.classList.contains('brands-block'));
  if (!brandsBlock) return;

  // Get all brand links (each link contains an image)
  const brandLinks = Array.from(brandsBlock.querySelectorAll('a.brands-block__link'));

  // There are 24 brands, visually arranged in 4 rows x 6 columns
  // We'll build rows of 6 columns each
  const columnsPerRow = 6;
  const rows = [];
  for (let i = 0; i < brandLinks.length; i += columnsPerRow) {
    // Each cell is the <a> element (with its image)
    const row = brandLinks.slice(i, i + columnsPerRow);
    rows.push(row);
  }

  // Table header
  const headerRow = ['Columns (columns20)'];

  // Build the table data: header + content rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
