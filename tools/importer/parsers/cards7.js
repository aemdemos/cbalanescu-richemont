/* global WebImporter */
export default function parse(element, { document }) {
  // Find all image blocks (cards)
  const cardBlocks = element.querySelectorAll('.image-block');

  // Prepare the table rows
  const rows = [];
  // Header row as per spec
  const headerRow = ['Cards (cards7)'];
  rows.push(headerRow);

  // For each card, create a row: [image, text]
  cardBlocks.forEach((block) => {
    // The image is inside an <a> which wraps the <img>
    const link = block.querySelector('a');
    const img = link ? link.querySelector('img') : block.querySelector('img');
    if (!img) return; // Defensive: skip if no image

    // Clean up style attribute (remove double semicolons)
    if (img.hasAttribute('style')) {
      img.setAttribute('style', img.getAttribute('style').replace(/;+/g, ';').replace(/;$/, ''));
    }

    // First cell: the image (with link if present)
    let imageCell = link ? link.cloneNode(true) : img.cloneNode(true);

    // Second cell: the text overlay (title, etc)
    // In this HTML, the text is visually overlaid on the image, but is not present in the DOM as text.
    // We'll extract the alt attribute as the best available text content.
    let textCell;
    if (img && img.alt) {
      const alt = img.alt;
      let title = '';
      let desc = '';
      const logoIdx = alt.toLowerCase().indexOf('logo with');
      if (logoIdx > 0) {
        title = alt.slice(0, logoIdx).trim();
        desc = alt.slice(logoIdx + 'logo with'.length).trim();
      } else {
        const withIdx = alt.toLowerCase().indexOf(' with ');
        if (withIdx > 0) {
          title = alt.slice(0, withIdx).trim();
          desc = alt.slice(withIdx + 6).trim();
        } else {
          title = alt.trim();
        }
      }
      const frag = document.createDocumentFragment();
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title;
        frag.appendChild(h3);
      }
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc;
        frag.appendChild(p);
      }
      textCell = frag.childNodes.length ? Array.from(frag.childNodes) : [document.createTextNode(alt)];
    } else {
      textCell = [''];
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
