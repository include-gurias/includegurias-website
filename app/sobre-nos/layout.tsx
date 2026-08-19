import { Metadata } from "next";
import { getLayout } from "components";
import baseMetadata from "utils/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Saiba mais - Include Gurias",
  description: "Conheça mais sobre o projeto Include Gurias e sua equipe!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return getLayout(children);
}
