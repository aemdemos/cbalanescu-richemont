/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the brands block container
  const brandsBlock = Array.from(element.children).find(child => child.classList && child.classList.contains('brands-block'));
  if (!brandsBlock) return;

  // Get all brand links (each contains an image)
  const brandLinks = Array.from(brandsBlock.children).filter(child => child.tagName === 'A');

  // There are 24 brands, visually arranged in 4 rows of 6 columns
  const columnsPerRow = 6;
  const rows = [];
  for (let i = 0; i < brandLinks.length; i += columnsPerRow) {
    // For each row, get the next 6 brand links
    const rowLinks = brandLinks.slice(i, i + columnsPerRow);
    // Each cell is the <a> element (with its image)
    rows.push(rowLinks);
  }

  // Table header
  const headerRow = ['Columns (columns20)'];

  // Build the table data: header + rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
