"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type HomeGalleryProps = {
  images: string[];
  youtubeUrl?: string;
  maxImages?: number;
  showVideoSlot?: boolean;
  mainImage?: string;
  useNaturalImageSize?: boolean;
};

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function HomeGallery({
  images,
  youtubeUrl,
  maxImages,
  showVideoSlot = false,
  mainImage,
  useNaturalImageSize = false,
}: HomeGalleryProps) {
  const galleryImages = images.slice(0, maxImages ?? images.length);
  const preferredMainImage =
    mainImage &&
    galleryImages.find(
      (image) =>
        image === mainImage ||
        decodeURIComponent(image) === decodeURIComponent(mainImage),
    );
  const orderedImages = preferredMainImage
    ? [
        preferredMainImage,
        ...galleryImages.filter((image) => image !== preferredMainImage),
      ]
    : galleryImages;
  const [previewIndex, setPreviewIndex] = useState(-1);
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);
  const hasVideoArea = Boolean(embedUrl) || showVideoSlot;

  if (orderedImages.length === 0) {
    return (
      <div className="flex h-[512px] w-full items-center justify-center rounded-sm border border-dashed border-border bg-card/30 p-6 text-center text-sm text-muted-foreground">
        Bu project uchun rasm topilmadi. <br />
        Iltimos rasmlarni `public/gallery/Barakot-website` papkasiga joylang.
      </div>
    );
  }

  const mainImageSrc = orderedImages[0];
  const sideImages = hasVideoArea ? orderedImages : orderedImages.slice(1);
  const slides = orderedImages.map((src) => ({ src }));
  const galleryLayoutClass =
    "grid w-full grid-cols-1 gap-3 md:h-[512px] md:grid-cols-12";
  const mainContainerClass = useNaturalImageSize
    ? "flex h-[260px] items-center justify-center overflow-hidden rounded-sm border border-border bg-card/30 p-2 sm:h-[320px] md:col-span-7 md:h-[512px]"
    : "flex h-[260px] items-center justify-center overflow-hidden rounded-sm border border-border bg-card/30 sm:h-[320px] md:col-span-7 md:h-full";
  const sideGridClass = useNaturalImageSize
    ? "grid grid-cols-2 gap-3 md:col-span-5 md:h-[512px] md:grid-rows-3"
    : "grid grid-cols-2 gap-3 md:col-span-5 md:h-full md:grid-rows-3";

  return (
    <>
      <div className={galleryLayoutClass}>
        <div className={mainContainerClass}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Project YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full rounded-sm border border-border"
            />
          ) : hasVideoArea ? (
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-border bg-card/40 px-4 text-center text-sm text-muted-foreground">
              Video uchun joy
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPreviewIndex(0)}
              className={
                useNaturalImageSize
                  ? "flex h-full w-full items-center justify-center overflow-hidden"
                  : "relative h-full w-full"
              }
            >
              {useNaturalImageSize ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainImageSrc}
                  alt="Project main image"
                  loading="eager"
                  className="block h-auto max-h-full w-auto max-w-full"
                />
              ) : (
                <Image
                  src={mainImageSrc}
                  alt="Project main image"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
              )}
            </button>
          )}
        </div>

        <div className={sideGridClass}>
          {sideImages.map((src, index) => (
            <button
              type="button"
              key={`${src}-${index}`}
              onClick={() => setPreviewIndex(hasVideoArea ? index : index + 1)}
              className={
                useNaturalImageSize
                  ? "flex h-24 w-full items-center justify-center overflow-hidden rounded-sm border border-border bg-zinc-100 p-1 sm:h-28 md:[height:calc((512px-1.5rem)/3)] md:min-h-0"
                  : "relative h-24 overflow-hidden rounded-sm border border-border bg-zinc-100 sm:h-28 md:h-auto md:min-h-0"
              }
            >
              {useNaturalImageSize ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={`Project gallery thumbnail ${index + 1}`}
                  loading="eager"
                  className="block h-auto max-h-full w-auto max-w-full"
                />
              ) : (
                <Image
                  src={src}
                  alt={`Project gallery thumbnail ${index + 1}`}
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 768px) 20vw, 100vw"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={previewIndex >= 0}
        close={() => setPreviewIndex(-1)}
        slides={slides}
        index={previewIndex}
      />
    </>
  );
}
