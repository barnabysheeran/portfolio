import ImageWrapper from '../../../image-wrapper/ImageWrapper';

import type { ImageDescriptions } from '../../../../../../type/image';

import styles from './ImageSliderGalleryBlock.module.css';

type ImageSliderGalleryBlockProps = {
  imageDescriptions: ImageDescriptions;
};

export default function ImageSliderGalleryBlock({
  imageDescriptions,
}: ImageSliderGalleryBlockProps) {
  return (
    <div className={styles['image-slider-block']}>
      {imageDescriptions.map((imageDescription, index) => (
        <ImageWrapper
          key={imageDescription.url}
          src={imageDescription.url}
          alt={`Image ${index + 1}`}
          width={imageDescription.width}
          height={imageDescription.height}
        />
      ))}
    </div>
  );
}
