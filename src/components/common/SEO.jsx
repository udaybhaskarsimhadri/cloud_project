import { useEffect } from 'react';

const SEO = ({
  title = 'AdventureX – Cloud-Based Adventure Tourism Platform',
  description = 'Book verified high-altitude Himalayan treks, river rafting, camping, scuba diving, and wilderness expeditions across India.',
  keywords = 'adventure tourism, trekking in India, Himalayas, river rafting, camping, scuba diving, Hampta Pass, Chadar trek'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title.includes('AdventureX') ? title : `${title} | AdventureX`;

    // Update Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;
  }, [title, description, keywords]);

  return null;
};

export default SEO;
