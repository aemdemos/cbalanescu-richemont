/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all visible cards
  const cardSelector = '.document-card-block.card';
  const cards = Array.from(element.querySelectorAll(cardSelector)).filter(card => {
    // Exclude cards that are hidden via display:none
    const style = card.getAttribute('style');
    if (style && style.includes('display: none')) return false;
    // Defensive: also check computed style if possible
    if (window.getComputedStyle && window.getComputedStyle(card).display === 'none') return false;
    return true;
  });

  // Header row
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // First cell: image
    const img = card.querySelector('img');
    // Defensive: fallback to null if not found
    const imageCell = img || '';

    // Second cell: text content
    const body = card.querySelector('.card-body');
    const footer = card.querySelector('.card-footer');

    // Compose text cell
    const cellContent = [];

    // Type (e.g., Document, Policy)
    const type = body ? body.querySelector('.document-card-block__type') : null;
    if (type) cellContent.push(type);

    // Title (h3)
    const title = body ? body.querySelector('.card-title') : null;
    if (title) cellContent.push(title);

    // Footer: download link or dropdown
    if (footer) {
      // If dropdown exists, add the button and the list of links
      const dropdown = footer.querySelector('.dropdown');
      if (dropdown) {
        // Add the dropdown button
        const button = dropdown.querySelector('button');
        if (button) cellContent.push(button);
        // Add all language links as a list
        const ul = dropdown.querySelector('ul');
        if (ul) {
          // Create a fragment to hold all links
          const langLinks = Array.from(ul.querySelectorAll('a')).map(a => a);
          if (langLinks.length) {
            // Wrap in a div for clarity
            const langDiv = document.createElement('div');
            langLinks.forEach(link => langDiv.appendChild(link));
            cellContent.push(langDiv);
          }
        }
      } else {
        // Otherwise, just add the download link
        const link = footer.querySelector('a');
        if (link) cellContent.push(link);
      }
    }

    rows.push([imageCell, cellContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
