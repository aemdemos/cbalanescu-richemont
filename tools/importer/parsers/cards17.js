/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all visible card elements (ignore display:none)
  const cards = Array.from(element.querySelectorAll(':scope > .document-card-block.card'))
    .filter(card => card.style.display !== 'none');

  cards.forEach(card => {
    // --- Image cell ---
    const img = card.querySelector('img');
    const imageCell = img ? img : '';

    // --- Text cell ---
    const cardBody = card.querySelector('.card-body');
    const cardFooter = card.querySelector('.card-footer');
    const textCell = document.createElement('div');

    // Type (optional, as small text)
    const type = cardBody ? cardBody.querySelector('.document-card-block__type') : null;
    if (type) {
      const typeDiv = document.createElement('div');
      typeDiv.textContent = type.textContent;
      typeDiv.style.fontSize = 'small';
      textCell.appendChild(typeDiv);
    }

    // Title (h3)
    const title = cardBody ? cardBody.querySelector('.card-title') : null;
    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.textContent = title.textContent;
      titleDiv.style.fontWeight = 'bold';
      textCell.appendChild(titleDiv);
    }

    // Description (if any, below heading)
    // There is no extra description in the source, so skip

    // Call-to-action (Download link)
    const link = cardFooter ? cardFooter.querySelector('a') : null;
    if (link) {
      // Clone the link and preserve its text and href
      const linkDiv = document.createElement('div');
      const clonedLink = link.cloneNode(true);
      linkDiv.appendChild(clonedLink);
      textCell.appendChild(linkDiv);
    }

    // Add row: [image, text content]
    rows.push([imageCell, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
