/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the text cell for each card
  function buildTextCell(card) {
    const cardBody = card.querySelector('.card-body');
    if (!cardBody) return '';
    const parts = [];
    // Title (h3)
    const title = cardBody.querySelector('.card-title');
    if (title) parts.push(title.textContent.trim());
    // Description (p)
    const desc = cardBody.querySelector('.manually-pick-item-card__description');
    if (desc) parts.push(desc.textContent.trim());
    // Join with double line break for markdown block rendering
    return parts.join('\n\n');
  }

  // Get all visible cards only
  const cards = Array.from(element.children).filter(card => {
    // Defensive: skip cards with display:none
    const style = card.getAttribute('style');
    return !style || !/display\s*:\s*none/.test(style);
  });

  // Build table rows
  const rows = cards.map(card => {
    // Image (first cell)
    const img = card.querySelector('img');
    // Text content (second cell)
    const textCell = buildTextCell(card);
    return [img, textCell];
  });

  // Table header
  const headerRow = ['Cards (cards11)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
