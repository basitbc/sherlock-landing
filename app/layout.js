'use client';

import "../public/assets/css/styles.css";
import "../public/assets/css/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DM_Sans } from "next/font/google";
import Wrapper from "@/components/layout/Wrapper";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import PackageContext from "@/utilis/PackageContext";
import { HeaderProvider } from "@/utilis/HeaderContext";
import { useState, useEffect } from "react";
import LeadsModal from "@/components/common/LeadsModal";
import WhatsApp from "@/components/common/Whatsapp";

const dmsans = DM_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [packageDetails, setPackageDetails] = useState([]);
  const [showLeadsModal, setShowLeadsModal] = useState(false);

  // Routes where header is transparent
  const transparentRoutes = ['/','/destinations','/destinations/kashmir'];
  const isTransparentRoute = transparentRoutes.includes(pathname);

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle LeadsModal timer - show after 10 seconds, only once per session
  useEffect(() => {
    // Check if modal has already been shown in this session
    const hasModalBeenShown = sessionStorage.getItem('leadsModalShown');
    
    if (!hasModalBeenShown) {
      const timer = setTimeout(() => {
        setShowLeadsModal(true);
        // Mark modal as shown in session storage
        sessionStorage.setItem('leadsModalShown', 'true');
      }, 10000); // 10 seconds

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle modal close
  const handleCloseModal = () => {
    setShowLeadsModal(false);
  };

  return (
    <html lang="en">
      <head></head>
      <body className={dmsans.className}>
        <PackageContext.Provider value={{ packageDetails, setPackageDetails }}>
          <HeaderProvider>
            <Header />
            <Wrapper>
              {/* Spacer only when header background is white */}
              {!isTransparentRoute && <div style={{ height: "5rem" }}></div>}
              {children}
            </Wrapper>
            <LeadsModal 
            handleClose={handleCloseModal}
              show={showLeadsModal} 
            />
            <WhatsApp />
          </HeaderProvider>
        </PackageContext.Provider>
      </body>
    </html>
  );
}