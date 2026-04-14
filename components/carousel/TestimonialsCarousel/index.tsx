"use client";

import { Spinner } from "@chakra-ui/react";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect } from "react";
import { useTestimonialsStore } from "app/states";
import EmblaCarousel from "./EmblaCarousel";
import "./embla.css";

const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: "auto" };

const TestimonialsCarousel = () => {
  const testimonials = useTestimonialsStore((state) => state.testimonials);
  const getTestimonials = useTestimonialsStore(
    (state) => state.getTestimonials
  );
  const loading = useTestimonialsStore((state) => state.testimonial_loading);

  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <EmblaCarousel slides={testimonials} options={OPTIONS} />
      )}
    </>
  );
};

export default TestimonialsCarousel;
