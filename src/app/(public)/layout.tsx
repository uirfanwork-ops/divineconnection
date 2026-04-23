import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingNatureVectors } from "@/components/nature-vectors";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FloatingNatureVectors />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
