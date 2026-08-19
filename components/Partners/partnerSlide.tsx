"use client";
import Image from "next/image";
import getPlaceholderImageIfNone from "utils/getPlaceholderImageIfNone";

type PartnerSlideProps = {
  imageUrl: string;
  name: string;
  priority?: boolean;
};

const PartnerSlide = ({
  imageUrl,
  name,
  priority = false,
}: PartnerSlideProps) => {
  return (
    <div className="relative flex size-full items-center justify-center">
      <Image
        src={getPlaceholderImageIfNone(imageUrl, 400, 300)}
        className="object-contain"
        quality={60}
        fill
        sizes="(max-width: 700px) 150px, 250px"
        // Mudança principal aqui:
        priority={priority}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        alt={`${name} logo`}
      />
    </div>
  );
};

export default PartnerSlide;
