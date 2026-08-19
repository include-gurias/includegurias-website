"use client";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useMemo } from "react"; // Adicionei useMemo por segurança
import { usePrimaryPageVideosStore } from "app/states";
import EmblaCarousel from "./EmblaCarousel";

// Melhor definir fora para ser uma referência estática
const CAROUSEL_OPTIONS: EmblaOptionsType = { loop: true };

const VideosCarousel: React.FC = () => {
  const primaryPageVideos = usePrimaryPageVideosStore(
    (state) => state.primaryPageVideos
  );
  const getPrimaryPageVideos = usePrimaryPageVideosStore(
    (state) => state.getPrimaryPageVideos
  );

  useEffect(() => {
    getPrimaryPageVideos();
  }, [getPrimaryPageVideos]);


  return <EmblaCarousel slides={primaryPageVideos} options={CAROUSEL_OPTIONS} />;
};

export default VideosCarousel;