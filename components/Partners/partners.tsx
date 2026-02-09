"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePartnersStore } from "app/states";
import PartnerSlide from "./partnerSlide";
import "./partners.css";

export default function Partners() {
  const partners = usePartnersStore((state) => state.partners);
  const getPartners = usePartnersStore((state) => state.getPartners);

  useEffect(() => {
    getPartners();
  }, [getPartners]);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-8">
      <div 
        ref={containerRef}
        className="marquee marquee--8" 
        id="first-line"
        style={{ 
          "--marquee-items": partners.length 
        } as React.CSSProperties}
      >
        {partners.map((partner, index) => (
  <motion.div
    key={partner.name || index}
    className="marquee__item"
    style={{ "--marquee-item-index": index + 1 } as React.CSSProperties}
    // ... animações
  >
    <PartnerSlide 
      imageUrl={partner.imageUrl} 
      name={partner.name} 
      priority={index < 4} 
    />
  </motion.div>
))}
      </div>
    </div>
  );
}