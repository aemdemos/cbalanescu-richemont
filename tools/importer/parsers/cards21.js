/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all imageBlock cards from the grid
  function extractCards(root) {
    const cards = [];
    // Find all .umb-block-grid__layout-item[data-content-element-type-alias="imageBlock"]
    const items = root.querySelectorAll('.umb-block-grid__layout-item[data-content-element-type-alias="imageBlock"]');
    items.forEach(item => {
      const imageBlock = item.querySelector('.image-block');
      if (imageBlock) {
        // The image is inside an <a> (logo as image, link as href)
        const link = imageBlock.querySelector('a');
        const img = imageBlock.querySelector('img');
        if (img) {
          // First cell: the image (with link if present)
          let imageCell;
          if (link) {
            // Clone the link and its children to avoid moving from DOM
            imageCell = link.cloneNode(true);
          } else {
            imageCell = img.cloneNode(true);
          }
          // Second cell: Use the alt text as the title (mandatory text content)
          const altText = img.getAttribute('alt') || '';
          let textCell = '';
          if (altText) {
            // Use a heading for the alt text
            const heading = document.createElement('strong');
            heading.textContent = altText;
            textCell = heading;
          }
          // Always ensure at least some text content is present
          cards.push([imageCell, textCell]);
        }
      }
    });
    return cards;
  }

  // Build the table rows
  const headerRow = ['Cards (cards21)'];
  const cardRows = extractCards(element);

  // Only create the table if there are cards
  if (cardRows.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...cardRows
    ], document);
    element.replaceWith(table);
  }
}
