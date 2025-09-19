/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all visible cards only
  const cards = Array.from(element.querySelectorAll(':scope > a.latest-article-card'))
    .filter(card => card.style.display !== 'none');

  // Table header
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Image cell
    const img = card.querySelector('img');
    const imageCell = img ? img : '';

    // Text cell
    const cardBody = card.querySelector('.card-body');
    const textContainer = document.createElement('div');

    // Date (optional, styled as small text)
    const date = cardBody.querySelector('.latest-article-card__date');
    if (date) {
      // Use a <div> with the date's text content
      const dateDiv = document.createElement('div');
      dateDiv.textContent = date.textContent;
      textContainer.appendChild(dateDiv);
    }

    // Title (h2)
    const title = cardBody.querySelector('.card-title');
    if (title) {
      const heading = document.createElement('h2');
      heading.textContent = title.textContent;
      textContainer.appendChild(heading);
    }

    // If there is any additional description below the title, include it (none in this case, but for flexibility)
    // For this HTML, there is no extra description, but if there were, we would add it here.
    // Example:
    // const desc = cardBody.querySelector('.description');
    // if (desc) {
    //   const descDiv = document.createElement('div');
    //   descDiv.textContent = desc.textContent;
    //   textContainer.appendChild(descDiv);
    // }

    // Wrap the text cell in a link if the card is a link
    const href = card.getAttribute('href');
    let textCell;
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.appendChild(textContainer);
      textCell = link;
    } else {
      textCell = textContainer;
    }

    rows.push([imageCell, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
