"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type HomeGalleryProps = {
  images: string[];
  youtubeUrl?: string;
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

export function HomeGallery({ images, youtubeUrl }: HomeGalleryProps) {
  const galleryImages = images;
  const [previewIndex, setPreviewIndex] = useState(-1);
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

  if (galleryImages.length === 0) {
    return (
      <div className="flex h-[512px] w-full items-center justify-center rounded-sm border border-dashed border-border bg-card/30 p-6 text-center text-sm text-muted-foreground">
        Bu project uchun rasm topilmadi. <br />
        Iltimos rasmlarni `public/gallery/Barakot-website` papkasiga joylang.
      </div>
    );
  }

  const slides = galleryImages.map((src) => ({ src }));

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-3 md:h-[512px] md:grid-cols-12">
        <div className="flex h-[260px] items-center justify-center rounded-sm border border-border bg-card/30 sm:h-[320px] md:col-span-7 md:h-full">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Project YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full rounded-sm border border-border"
            />
          ) : (
            <div className="flex h-[88%] w-[92%] items-center justify-center rounded-sm border border-dashed border-border bg-background/50 p-4 text-center text-sm text-muted-foreground">
              YouTube video uchun frame
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-5 md:h-full md:grid-rows-3">
          {galleryImages.map((src, index) => (
            <button
              type="button"
              key={`${src}-${index}`}
              onClick={() => setPreviewIndex(index)}
              className="relative h-24 overflow-hidden rounded-sm border border-border bg-zinc-100 sm:h-28 md:h-auto md:min-h-0"
            >
              <Image
                src={src}
                alt={`Project gallery thumbnail ${index + 1}`}
                fill
                loading="eager"
                className="object-cover"
                sizes="(min-width: 768px) 20vw, 100vw"
              />
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
