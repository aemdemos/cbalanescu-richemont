/* global WebImporter */
export default function parse(element, { document }) {
  // All brand image URLs from the Richemont website
  const brandImageMap = {
    'buccellati': 'https://www.richemont.com/media/051gb54l/buccellati-3.png',
    'cartier': 'https://www.richemont.com/media/tfnarxnr/cartier.png',
    'van-cleef-arpels': 'https://www.richemont.com/media/heinhgzv/van-cleef.png',
    'vhernier': 'https://www.richemont.com/media/5ewpfsct/maisons_logohp_vhernier_grey.png',
    'a-lange-und-soehne': 'https://www.richemont.com/media/t14nzh0u/a-lange.png',
    'baume-mercier': 'https://www.richemont.com/media/zvgp5jfi/baume-mercier-logo.png',
    'iwc-schaffhausen': 'https://www.richemont.com/media/3iflatdk/iwc.png',
    'jaeger-lecoultre': 'https://www.richemont.com/media/wz4lreem/jaeger-lecoultre.png',
    'panerai': 'https://www.richemont.com/media/wf0hal5s/panerai.png',
    'piaget': 'https://www.richemont.com/media/snbfrd1f/piaget.png',
    'roger-dubuis': 'https://www.richemont.com/media/lkrkdbws/rogerdubuis_logohp_299x160.png',
    'vacheron-constantin': 'https://www.richemont.com/media/n4zedw3f/vacheron-constantin-logo.png',
    'alaia': 'https://www.richemont.com/media/rkifssjn/alaia-logo-homepage.png',
    'chloe': 'https://www.richemont.com/media/50sjtxgq/chloé-2.png',
    'delvaux': 'https://www.richemont.com/media/clinr41k/maisons_logohp_delvaux_grey.png',
    'dunhill': 'https://www.richemont.com/media/01kmwdxd/dunhill_logohp_299x160.png',
    'gfore': 'https://www.richemont.com/media/aqpgldym/maisons_logohp_gfore_grey.png',
    'gianvito-rossi': 'https://www.richemont.com/media/0azbbsi0/gianvito-rossi-1.png',
    'montblanc': 'https://www.richemont.com/media/vjlboqwm/montblanc-logo.png',
    'peter-millar': 'https://www.richemont.com/media/gsegkk33/peter-millar-logo.png',
    'purdey': 'https://www.richemont.com/media/4oqjyrex/group-369.png',
    'serapian': 'https://www.richemont.com/media/b11h1jkk/serapian.png',
    'timevallee': 'https://www.richemont.com/media/fi0lwqw0/timevallée-logo.png',
    'watchfinder-co': 'https://www.richemont.com/media/lrkozji2/watchfinder-co.png'
  };

  // Find the brands block container
  const brandsBlock = element.querySelector('.brands-block');
  if (!brandsBlock) return;

  // Get all brand links
  const brandLinks = Array.from(brandsBlock.querySelectorAll('a.brands-block__link'));
  if (brandLinks.length === 0) return;

  // Create table rows (4 rows of 6 columns each)
  const columnsPerRow = 6;
  const rows = [];
  
  for (let i = 0; i < brandLinks.length; i += columnsPerRow) {
    const rowLinks = brandLinks.slice(i, i + columnsPerRow);
    const contentRow = rowLinks.map(link => {
      const brandId = link.id;
      const imageSrc = brandImageMap[brandId];
      
      if (imageSrc) {
        // Create image element
        const img = document.createElement('img');
        img.className = 'brands-block__link-image w-100 img-fluid';
        img.loading = 'lazy';
        img.src = imageSrc;
        img.alt = `${brandId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} logo`;
        img.setAttribute('width', '299');
        img.setAttribute('height', '160');
        img.style.maxWidth = '299px';
        
        // Create wrapper link
        const wrapper = document.createElement('a');
        wrapper.href = link.href;
        wrapper.id = link.id;
        wrapper.className = link.className;
        wrapper.appendChild(img);
        
        return wrapper;
      }
      
      // Fallback to brand name
      return brandId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    });
    
    rows.push(contentRow);
  }

  // Create and replace with table
  const headerRow = ['Columns (columns20)'];
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
