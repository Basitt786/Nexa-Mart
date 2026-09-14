// app/(store)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ChatWidget from "@/components/ChatWidget";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <MobileBottomNav />
      <ChatWidget />
    </>
  );
}