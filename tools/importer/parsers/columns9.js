/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all column areas
  const areaContainers = element.querySelectorAll('.umb-block-grid__area');
  if (!areaContainers || areaContainers.length === 0) return;

  // 2. Build header row as per block spec
  const headerRow = ['Columns (columns9)'];

  // 3. For each column, extract the content (preserving semantic structure)
  const contentRow = Array.from(areaContainers).map((area) => {
    // Find the flexible-figure-block inside this area
    const block = area.querySelector('.flexible-figure-block');
    if (!block) return '';
    // We'll preserve the heading and body structure
    const header = block.querySelector('.flexible-figure-block__header');
    const body = block.querySelector('.flexible-figure-block__body');
    // Compose a fragment
    const frag = document.createElement('div');
    if (header) {
      // Use the heading as-is (preserving h3)
      Array.from(header.childNodes).forEach((n) => frag.appendChild(n.cloneNode(true)));
    }
    if (body) {
      Array.from(body.childNodes).forEach((n) => frag.appendChild(n.cloneNode(true)));
    }
    return frag;
  });

  // 4. Compose the table rows
  const rows = [headerRow, contentRow];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the new table
  element.replaceWith(table);
}
