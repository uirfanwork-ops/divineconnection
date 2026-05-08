import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingNatureVectors } from "@/components/nature-vectors";
import { VisitTracker } from "@/components/visit-tracker";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VisitTracker />
      <FloatingNatureVectors />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
