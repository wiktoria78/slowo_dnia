import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ShareButton - Component for sharing word of the day on social media
 * Uses Web Share API when available, falls back to clipboard copy
 */
export default function ShareButton({ word }) {
  const [copied, setCopied] = useState(false);

  const shareText = `Słowo dnia: ${word.word}`;
  const shareUrl = window.location.href;

  const handleShare = async () => {
    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Słowo Dnia',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error - do nothing
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // Fallback: copy to clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      const fullText = `${shareText} ${shareUrl}`;
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getShareIcon = () => {
    if (copied) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    );
  };

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 min-w-[140px]
        ${copied 
          ? 'bg-green-600 text-white' 
          : 'bg-primary text-white hover:bg-primary/90'
        }
      `}
      aria-label={copied ? 'Skopiowano do schowka' : 'Udostępnij'}
    >
      {getShareIcon()}
      <span className="hidden sm:inline">
        {copied ? 'Skopiowano' : 'Udostępnij'}
      </span>
    </motion.button>
  );
}
