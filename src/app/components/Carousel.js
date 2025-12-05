"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import Image from 'next/image';

/**
 * @typedef {object} CarouselItem
 * @property {string} id - Unique identifier for the item.
 * @property {string} srcPath - Image source URL.
 * @property {string} altText - Alt text for the image.
 * @property {string} [title] - Optional title overlay.
 * @property {string} [subtitle] - Optional subtitle overlay.
 */

/**
 * A feature-rich, accessible, and responsive image carousel component.
 * @param {object} props - The component props.
 * @param {CarouselItem[]} props.items - An array of image objects to display.
 */
export const Carousel = ({
  items,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showThumbnails = false,
  showIndex = true, // <-- Add this line
  isImageClickable = false,
  showTitle = false,
  showSubtitle = false,
  onImageChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef(null);

  const currentItem = items[currentIndex];

  const goToSlide = useCallback((index) => {
    // Only update if the index is new and valid to prevent re-triggering loading on the same image.
    if (index !== currentIndex && index >= 0 && index < items.length) {
      setCurrentIndex(index);
      setIsImageLoading(true);
      setImageError(false);
      onImageChange?.(index);
    }
  }, [currentIndex, items.length, onImageChange]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  }, [currentIndex, items.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, items.length, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Home':
          goToSlide(0);
          break;
        case 'End':
          goToSlide(items.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, goToSlide, items.length]);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsImageLoading(false);
    setImageError(true);
  }, []);

  // Effect to handle cached images
  useEffect(() => {
    const img = imageRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) {
        handleImageLoad();
      } else {
        handleImageError();
      }
    }
  }, [currentItem.srcPath, handleImageLoad, handleImageError]);
  if (!items.length) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full rounded-2xl", className)} role="region" aria-label="Image carousel">
      {/* Main Image Display */}
      <div
        className="relative w-full aspect-video md:aspect-video lg:h-[calc(100vh-72px)] mb-4 overflow-hidden bg-gray-100 group"
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Failed to load image</p>
          </div>
        ) : (
          isImageClickable && currentItem.link ? (
            <a href={currentItem.link} target="_blank" rel="noopener noreferrer">
              <Image
                ref={imageRef}
                key={currentItem.id}
                src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${currentItem.srcPath}`}
                alt={currentItem.altText}
                fill={true}
                priority={currentIndex === 0}
                className="object-cover"
                sizes="100vw"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </a>
          ) : (
            <Image
              ref={imageRef}
              key={currentItem.id}
              src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${currentItem.srcPath}`}
              alt={currentItem.altText}
              fill={true}
              priority={currentIndex === 0}
              className={cn(
                "transition-opacity duration-300 object-cover rounded-2xl",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              sizes="100vw"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )
        )}

        {/* Navigation Arrows */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-15 h-10 bg-white hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-black transition-all duration-200 md:opacity-20 md:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-15 h-10 bg-white hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-black transition-all duration-200 md:opacity-20 md:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Text Overlay */}
        {(showTitle && currentItem.title) || (showSubtitle && currentItem.subtitle) ? (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 md:py-8 md:px-16">
            <div className="text-white">
              {showTitle && currentItem.title && (
                <h2 className="text-xl md:text-4xl font-semibold mb-1">{currentItem.title}</h2>
              )}
              {showSubtitle && currentItem.subtitle && (
                <p className="text-sm opacity-90">{currentItem.subtitle}</p>
              )}
            </div>
          </div>
        ) : null}

        {/* Image Counter */}
        {showIndex && (
          <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {currentIndex + 1} / {items.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && items.length > 1 && (
        <ThumbnailNavigation
          items={items}
          currentIndex={currentIndex}
          onThumbnailClick={goToSlide}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    srcPath: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    link: PropTypes.string, // Added for clickable images
  })).isRequired,
  className: PropTypes.string,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  showArrows: PropTypes.bool,
  showThumbnails: PropTypes.bool,
  showIndex: PropTypes.bool, // <-- Add this line
  isImageClickable: PropTypes.bool,
  showTitle: PropTypes.bool,
  showSubtitle: PropTypes.bool,
  onImageChange: PropTypes.func,
};

const ThumbnailNavigation = React.memo(({
  items,
  currentIndex,
  onThumbnailClick,
  onPrevious,
  onNext,
}) => {
  const thumbnailContainerRef = useRef(null);

  // Effect to scroll the active thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailContainerRef.current.children[currentIndex];
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-2xl">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors duration-200 shadow-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Thumbnails */}
      <div ref={thumbnailContainerRef} className="flex gap-2 p-2 overflow-x-auto max-w-md scrollbar-hide">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onThumbnailClick(index)}
            className={cn(
              "relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200",
              currentIndex === index
                ? "ring-2 ring-blue-500 shadow-lg scale-105"
                : "ring-1 ring-gray-200 hover:ring-gray-300 hover:scale-102"
            )}
            aria-label={`Go to image ${index + 1}: ${item.altText}`}
          >
            <Image
              key={item.id}
              src={`${process.env.NEXT_PUBLIC_Image_BASE_URL}/${item.srcPath}`}
              alt={item.altText}
              fill={true}
              sizes="64px"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors duration-200 shadow-sm"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
});

ThumbnailNavigation.displayName = 'ThumbnailNavigation';

ThumbnailNavigation.propTypes = {
  items: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onThumbnailClick: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Carousel;