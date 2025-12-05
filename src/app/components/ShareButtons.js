'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ShareButtons = ({ title }) => {
  const [pageUrl, setPageUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareLinks = [
    {
      name: 'X',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`,
      icon: '/follow_x.svg',
    }
  ];

  return (
    <div className="flex items-center gap-4 my-4">
      <span className="text-lg font-semibold text-gray-800">Share:</span>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label={`Share on ${link.name}`}
          >
            <Image src={link.icon} alt={`${link.name} icon`} width={24} height={24} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
          aria-label="Copy link"
        >
          <Image src="/ic_link.svg" alt="Copy link icon" width={24} height={24} />
          <span className={`text-sm ${isCopied ? 'text-green-600' : 'text-gray-700'}`}>
            {isCopied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
