import React from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHTMLProps {
  html: string;
}

const SanitizedHTML: React.FC<SanitizedHTMLProps> = ({ html }) => {
  const [sanitizedHtml, setSanitizedHtml] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSanitizedHtml(DOMPurify.sanitize(html));
    }
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default SanitizedHTML;