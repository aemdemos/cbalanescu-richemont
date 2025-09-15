/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a .history-card-block element
  function extractCard(card) {
    // Image (first cell)
    const img = card.querySelector('img');
    // Text content (second cell)
    const textContent = document.createElement('div');

    // Title
    const title = card.querySelector('.card-title');
    if (title) {
      textContent.appendChild(title);
    }
    // Description
    const desc = card.querySelector('.history-card-block__text');
    if (desc) {
      textContent.appendChild(desc);
    }
    // CTA
    const cta = card.querySelector('.card-footer a');
    if (cta) {
      textContent.appendChild(cta);
    }
    return [img, textContent];
  }

  // Find all cards in the block
  const cards = Array.from(element.querySelectorAll('.history-card-block'));

  // Build table rows
  const rows = cards.map(extractCard);

  // Header row as per spec
  const headerRow = ['Cards (cards1)'];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace original element with table
  element.replaceWith(table);
}
