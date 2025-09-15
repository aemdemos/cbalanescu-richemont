/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns (columns10)'];

  // Find the grid container for columns
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find all direct child areas (columns)
  const areaContainer = gridContainer.querySelector('.umb-block-grid__area-container');
  if (!areaContainer) return;
  const areas = Array.from(areaContainer.querySelectorAll(':scope > .umb-block-grid__area'));

  // Only keep areas that have actual content
  const contentRow = areas
    .map(area => {
      const layoutContainer = area.querySelector(':scope > .umb-block-grid__layout-container');
      if (layoutContainer && layoutContainer.textContent.trim()) {
        return layoutContainer;
      }
      return null;
    })
    .filter(cell => cell);

  // If there are no content columns, do nothing
  if (contentRow.length === 0) return;

  // Compose the table
  const tableRows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
