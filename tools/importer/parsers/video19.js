/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the hero block containing the video
  const heroBlock = element.querySelector('.hero-block');
  if (!heroBlock) return;

  // Find all video elements inside the hero block
  const videos = heroBlock.querySelectorAll('video');
  let videoSrc = '';
  let videoEl = null;

  // Prefer desktop video if available, fallback to first
  let desktopVideo = null;
  let mobileVideo = null;
  videos.forEach((vid) => {
    if (vid.classList.contains('d-none') && vid.classList.contains('d-md-block')) {
      desktopVideo = vid;
    } else if (vid.classList.contains('d-block') && vid.classList.contains('d-md-none')) {
      mobileVideo = vid;
    }
  });
  videoEl = desktopVideo || mobileVideo || videos[0];

  // Get video source URL
  if (videoEl) {
    const source = videoEl.querySelector('source');
    if (source && source.src) {
      videoSrc = source.src;
    }
  }

  // Compose the video link element
  let videoLink = null;
  if (videoSrc) {
    videoLink = document.createElement('a');
    videoLink.href = videoSrc;
    videoLink.textContent = videoSrc;
  }

  // Get the title text if present
  const titleEl = heroBlock.querySelector('.hero-block__title');
  let titleText = '';
  if (titleEl) {
    titleText = titleEl.textContent.trim();
  }

  // Compose the cell content: video preview, title text, and link
  const cellContent = [];
  if (videoEl) {
    cellContent.push(videoEl.cloneNode(true));
  }
  if (titleText) {
    cellContent.push(document.createElement('br'));
    cellContent.push(titleText);
  }
  if (videoLink) {
    cellContent.push(document.createElement('br'));
    cellContent.push(videoLink);
  }

  // Table rows
  const headerRow = ['Video (video19)'];
  const contentRow = [cellContent];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
