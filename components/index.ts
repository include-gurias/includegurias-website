// layout
export { default as Header } from "./Header/Header";
export { default as Footer } from "./Footer/Footer";
export { default as ChakraProvider } from "./Providers/ChakraProvider";

// buttons
export { default as FloatButton } from "./Buttons/FloatButton/FloatButton";
export { default as SocialButton } from "./Buttons/SocialButton/SocialButton";
export { default as PrimaryButton } from "./Buttons/PrimaryButton";

//cards
export { default as NewsCard } from "./Cards/NewsCard";
export { default as TestimonialsCard } from "./Cards/TestmonialCard";
export { default as SocialMediaCard } from "./Cards/SocialMediaCard";
export { default as WhatWeDoCard } from "./Cards/WhatWeDoCard";
export { BolsistaCard } from "./Cards/TeamCards";
export { TeamCard } from "./Cards/TeamCards";
export { default as FounderCard } from "./Cards/FounderCard";
export { default as MaterialCard } from "./Cards/MaterialCard";
export { default as WomanCard } from "./Cards/WomanCard";
export { default as MissionValuesCard } from "./Cards/MissionValuesCard";
export { default as EventCard } from "./Cards/EventCard";

// sections
export { default as NewsSection } from "./News/NewsSection";
export { default as TestimonialsSection } from "./Testemonials/TestimonialsSection";
export { default as MileStone } from "./MileStone/MileStoneSection";
// animations
export { default as Reveal } from "./Animations/Reveal";
export { default as RevealProps } from "./Animations/Reveal";
export { default as RotateReveal } from "./Animations/RotateReveal";
export { default as AnimatedWavyText } from "./Animations/AnimatedWavyText";

// svgs
export { default as MotionBlob } from "./svgs/MotionBlob";
export { default as MainVideoArrow } from "./svgs/arrow";
export { default as Love } from "./svgs/love";

export { default as VideoFrame } from "./VideoFrame/VideoFrame";
export { default as SeeMoreArrow } from "./SeeMoreArrow/SeeMoreArrow";

// Text
export { HeadingText } from "./Text/Headings";
export { SubHeadingText } from "./Text/Headings";
export { SubText } from "./Text/Headings";
export { MegaTitle } from "./Text/Headings";

//Team
export { TeamWithNoFounder } from "./Team/Team";
export { TeamForAboutUs } from "./Team/Team";
export { default as AllPeople } from "./Team/AllPeople";
export { default as BolsistasSection } from "./Team/BolsistasSection";

//About Us
export { default as AboutUsValues } from "./AboutUs/AboutUsValues";
export { default as AllPartners } from "./AllPartners/AllPartners";

export { default as WhatWeDoSection } from "./WhatWeDo/WhatWeDo";
export { default as VideoCarousel } from "./carousel/VideoCarousel";
export { default as Partners } from "./Partners/partners";
export { default as TestimonialsCarousel } from "./carousel/TestimonialsCarousel";
export { default as Timeline } from "./Timeline/Timeline";
export { default as SearchBar } from "./SearchBar/SearchBar";

export {
  getLayout,
  getCleanLayout,
  getOnlyHeaderLayout,
  getRootLayout,
  HeaderAndFooter,
  OnlyHeader,
  CleanLayout,
} from "./Layout";
