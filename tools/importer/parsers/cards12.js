/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all imageBlock elements from the grid
  function getImageBlocks(root) {
    // Find all .image-block containers inside the grid
    return Array.from(root.querySelectorAll('.image-block'));
  }

  // Find the grid container (defensive: look for .grid-container)
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Get all image blocks
  const imageBlocks = getImageBlocks(gridContainer);

  // Prepare header row
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // For each image block, create a card row
  imageBlocks.forEach((imgBlock) => {
    // Find the image (mandatory)
    const img = imgBlock.querySelector('img');
    // Defensive: skip if no image
    if (!img) return;

    // Find the link (optional, but in this HTML always present)
    const link = imgBlock.querySelector('a');

    // Use the alt text for the card title, but also try to extract any visible text overlay if present
    let titleText = '';
    // Try to find overlay text (if any)
    // In this HTML, the overlay is in the image itself, so fallback to alt
    titleText = img.getAttribute('alt') || '';
    titleText = titleText.trim();

    // Create a heading element for the title
    const heading = document.createElement('strong');
    heading.textContent = titleText;

    // If the link exists, wrap the heading in the link
    let textContent;
    if (link) {
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.appendChild(heading);
      textContent = linkEl;
    } else {
      textContent = heading;
    }

    // Card row: [image, textContent]
    // To ensure all text content is included, also add the alt text as a fallback if heading is empty
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
