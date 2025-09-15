/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero banner block
  const heroBlock = element.querySelector('.hero-banner-block');
  if (!heroBlock) return;

  // Find the background image (optional)
  const bgImg = heroBlock.querySelector('img.hero-banner-block__background');

  // Find the text container (optional)
  const textContainer = heroBlock.querySelector('.hero-banner-block__text');

  // Find the anchor link/button (optional)
  const anchorContainer = heroBlock.querySelector('.hero-banner-block__anchor-link-container');
  let ctaLink = null;
  if (anchorContainer) {
    ctaLink = anchorContainer.querySelector('a');
  }

  // Build the table rows
  const headerRow = ['Hero (hero8)'];

  // Row 2: Background image (optional)
  const imageRow = [bgImg ? bgImg : ''];

  // Row 3: Headline, subheading, CTA (combine all text and CTA)
  // We'll combine the text container and CTA link in one cell
  const contentCell = [];
  if (textContainer) contentCell.push(textContainer);
  if (ctaLink) contentCell.push(ctaLink);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create the table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
