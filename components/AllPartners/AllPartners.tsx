"use client";
import { AspectRatio, Box, Link, Stack, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { usePartnersStore } from "app/states";
import { Reveal } from "components";
import Partner from "types/data/partner";
import getPlaceholderImageIfNone from "utils/getPlaceholderImageIfNone";

const PartnerImage = ({ name, href, imageUrl }: Partner) => {
  return (
    <AspectRatio
      ratio={1}
      minW="150px"
      minH="100px"
      maxH={150}
      overflow="hidden"
      p={4}
    >
      <Tooltip label={name} aria-label={name}>
        <Link href={href ?? "#"}>
          <Box
            position="relative"
            width="100%"
            height="100%"
            cursor="pointer"
            transition="filter 0.3s ease-in-out"
            scale={0.9}
            _hover={{
              filter: "grayscale(0%)",
              transition: "filter 0.3s ease-in-out",
              scale: 1,
            }}
          >
            <Image
              src={getPlaceholderImageIfNone(imageUrl, 400, 300)}
              loading="lazy"
              quality={75}
              fill
              alt={name}
              className="scale-90 object-contain transition-all duration-300 ease-in-out hover:scale-95"
            />
          </Box>
        </Link>
      </Tooltip>
    </AspectRatio>
  );
};

const AllPartners = () => {
  const { getPartners, partners } = usePartnersStore((state) => ({
    getPartners: state.getPartners,
    partners: state.partners,
  }));

  useEffect(() => {
    getPartners();
  }, [getPartners]);

  return (
    <Stack
      direction={"row"}
      spacing={6}
      justifyContent="center"
      mb={4}
      display="flex"
      flexWrap="wrap"
    >
      {partners.map((partner: Partner, index: number) => (
        <Reveal key={partner.name} delay={index * 0.1} className="mb-4">
          <PartnerImage
            id={partner.id}
            name={partner.name}
            href={partner.href}
            imageUrl={partner.imageUrl}
            active={partner.active}
          />
        </Reveal>
      ))}
    </Stack>
  );
};

export default AllPartners;
