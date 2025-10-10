import ImageSliderGalleryBlock from './block/ImageSliderGalleryBlock';

import type { ImageDescriptions } from '../../../../../type/image';

import styles from './ImageSliderGallery.module.css';

type ImageSliderGalleryProps = {
  imageDescriptions: ImageDescriptions;
};

export default function ImageSliderGallery({
  imageDescriptions,
}: ImageSliderGalleryProps) {
  return (
    <div className={styles['image-slider-gallery']}>
      <ImageSliderGalleryBlock imageDescriptions={imageDescriptions} />
    </div>
  );
}
