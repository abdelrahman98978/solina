import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { QuickServicesBar } from './components/QuickServicesBar';
import { ExploreVehicles } from './components/ExploreVehicles';
import { OffersSection } from './components/OffersSection';
import { DiscoverSolinaSection } from './components/DiscoverSolinaSection';
import { GuestCommitmentSection } from './components/GuestCommitmentSection';
import { Vehicle360Customizer } from './components/Vehicle360Customizer';
import { CarFinderWizard } from './components/CarFinderWizard';
import { TechSimulator } from './components/TechSimulator';
import { GRPerformanceSection } from './components/GRPerformanceSection';
import { FinanceCalculator } from './components/FinanceCalculator';
import { CertifiedPreOwnedSection } from './components/CertifiedPreOwnedSection';
import { PartsAccessoriesSection } from './components/PartsAccessoriesSection';
import { SolinaCinemaSection } from './components/SolinaCinemaSection';
import { ShowroomsSection } from './components/ShowroomsSection';
import { WhySolinaSection } from './components/WhySolinaSection';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { SolinaQualitySection } from './components/SolinaQualitySection';
import { SolinaFleetShowcase } from './components/SolinaFleetShowcase';
import { SolinaHeadquartersShowcase } from './components/SolinaHeadquartersShowcase';
import { SolinaBrandHeritage } from './components/SolinaBrandHeritage';
import { SolinaMobileAppSection } from './components/SolinaMobileAppSection';
import { SolinaAIAssistant } from './components/SolinaAIAssistant';

// Standalone Pages
import { VehicleModelPage } from './components/VehicleModelPage';
import { OffersPage } from './pages/OffersPage';
import { OwnersPage } from './pages/OwnersPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ShowroomsPage } from './pages/ShowroomsPage';
import { SolinaAppPage } from './pages/SolinaAppPage';
import { SolinaAppExperience } from './components/SolinaAppExperience';

// Admin Dashboard Component
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { TestDriveModal } from './components/TestDriveModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { QuotationModal } from './components/QuotationModal';

import { type Vehicle, type VehicleGrade, VEHICLES } from './data/toyotaData';

type AppRoute = 'home' | 'offers' | 'owners' | 'discover' | 'showrooms' | 'vehicle' | 'app' | 'mobile-app' | 'erp' | 'admin';

const MainAppContent: React.FC = () => {
  const { language } = useLanguage();
  const { vehicles } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>('sedan');
  
  // Active Navigation Route
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [dedicatedVehicle, setDedicatedVehicle] = useState<Vehicle | null>(null);

  // Screen type detection (Mobile vs Desktop)
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Admin View State
  const [adminViewOpen, setAdminViewOpen] = useState<boolean>(false);

  // Modals state
  const [testDriveModalOpen, setTestDriveModalOpen] = useState<boolean>(false);
  const [testDriveDefaultModel, setTestDriveDefaultModel] = useState<string | undefined>(undefined);
  
  const [serviceBookingModalOpen, setServiceBookingModalOpen] = useState<boolean>(false);
  
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<Vehicle | null>(null);
  
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([]);
  const [isComparisonDrawerOpen, setIsComparisonDrawerOpen] = useState<boolean>(false);

  const [quotationModalOpen, setQuotationModalOpen] = useState<boolean>(false);
  const [quotationVehicle, setQuotationVehicle] = useState<Vehicle | null>(null);
  const [quotationGrade, setQuotationGrade] = useState<VehicleGrade | undefined>(undefined);
  const [quotationFinanceDetails, setQuotationFinanceDetails] = useState<any>(undefined);

  // Check URL pathname on initial load and back/forward browser actions
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('/erp') || path.includes('/admin') || hash.includes('erp') || hash.includes('admin')) {
        setCurrentRoute('erp');
        setDedicatedVehicle(null);
      } else if (path.includes('/offers') || hash.includes('offers')) {
        setCurrentRoute('offers');
        setDedicatedVehicle(null);
      } else if (path.includes('/owners') || hash.includes('owners')) {
        setCurrentRoute('owners');
        setDedicatedVehicle(null);
      } else if (path.includes('/discover') || hash.includes('discover')) {
        setCurrentRoute('discover');
        setDedicatedVehicle(null);
      } else if (path.includes('/showrooms') || path.includes('/locations') || hash.includes('showrooms')) {
        setCurrentRoute('showrooms');
        setDedicatedVehicle(null);
      } else if (path.includes('/app') || path.includes('/mobile-app') || hash.includes('app')) {
        setCurrentRoute('app');
        setDedicatedVehicle(null);
      } else if (path.includes('/vehicles/')) {
        const targetQuery = path.split('/vehicles/')[1].replace(/\/$/, '');
        const found = vehicles.find(v => 
          v.id.toLowerCase().includes(targetQuery) || 
          v.nameEn.toLowerCase().includes(targetQuery)
        );
        if (found) {
          setDedicatedVehicle(found);
          setCurrentRoute('vehicle');
        } else {
          setCurrentRoute('home');
        }
      } else {
        setCurrentRoute('home');
        setDedicatedVehicle(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [vehicles]);

  // Route Navigation Handlers
  const navigateTo = (route: string, customPath?: string) => {
    setCurrentRoute((['home', 'offers', 'owners', 'discover', 'showrooms', 'vehicle', 'app', 'mobile-app'].includes(route) ? route : 'home') as AppRoute);
    setDedicatedVehicle(null);
    window.history.pushState({}, '', customPath || (route === 'home' ? '/' : `/${route}`));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicle = (vehicleId: string) => {
    const v = vehicles.find(item => item.id === vehicleId);
    if (v) {
      setDedicatedVehicle(v);
      setCurrentRoute('vehicle');
      window.history.pushState({}, '', `/vehicles/${v.id.replace('-2026', '')}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    navigateTo('home');
  };

  const handleOpenTestDrive = (modelName?: string) => {
    setTestDriveDefaultModel(modelName);
    setTestDriveModalOpen(true);
  };

  const handleOpenServiceBooking = () => {
    setServiceBookingModalOpen(true);
  };

  const handleToggleCompare = (vehicle: Vehicle) => {
    setComparedVehicles((prev) => {
      const exists = prev.some((v) => v.id === vehicle.id);
      if (exists) {
        return prev.filter((v) => v.id !== vehicle.id);
      } else {
        if (prev.length >= 4) {
          alert(language === 'ar' ? 'يمكنك مقارنة 4 سيارات كحد أقصى' : 'Maximum 4 vehicles can be compared simultaneously');
          return prev;
        }
        return [...prev, vehicle];
      }
    });
  };

  const handleRemoveComparedVehicle = (vehicleId: string) => {
    setComparedVehicles(prev => prev.filter(v => v.id !== vehicleId));
  };

  const handleClearComparedVehicles = () => {
    setComparedVehicles([]);
  };

  const handleOpenQuotation = (vehicle: Vehicle, grade?: VehicleGrade, financeDetails?: any) => {
    setQuotationVehicle(vehicle);
    setQuotationGrade(grade || vehicle.grades[0]);
    setQuotationFinanceDetails(financeDetails);
    setQuotationModalOpen(true);
  };

  // If Admin Dashboard is active, render it directly
  if (adminViewOpen) {
    return <AdminDashboard onClose={() => setAdminViewOpen(false)} />;
  }

  // Common Modals Wrapper
  const renderModals = () => (
    <>
      <TestDriveModal
        isOpen={testDriveModalOpen}
        onClose={() => setTestDriveModalOpen(false)}
        defaultModelName={testDriveDefaultModel}
      />

      <ServiceBookingModal
        isOpen={serviceBookingModalOpen}
        onClose={() => setServiceBookingModalOpen(false)}
      />

      <VehicleDetailModal
        isOpen={!!selectedVehicleForDetails}
        onClose={() => setSelectedVehicleForDetails(null)}
        vehicle={selectedVehicleForDetails}
        onOpenTestDrive={handleOpenTestDrive}
        onOpenQuotation={(v, g) => handleOpenQuotation(v, g)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedVehicleForDetails ? comparedVehicles.some(v => v.id === selectedVehicleForDetails.id) : false}
      />

      <ComparisonDrawer
        isOpen={isComparisonDrawerOpen}
        onClose={() => setIsComparisonDrawerOpen(false)}
        comparedVehicles={comparedVehicles}
        onRemoveVehicle={handleRemoveComparedVehicle}
        onClearAll={handleClearComparedVehicles}
        onOpenTestDrive={handleOpenTestDrive}
      />

      {quotationVehicle && (
        <QuotationModal
          isOpen={quotationModalOpen}
          onClose={() => setQuotationModalOpen(false)}
          vehicle={quotationVehicle}
          selectedGrade={quotationGrade}
          financingDetails={quotationFinanceDetails}
        />
      )}

      {/* Solina AI Smart Assistant Floating Widget & Chat Modal */}
      <SolinaAIAssistant
        showFloatingTrigger={!isMobileScreen}
        onSelectVehicle={handleSelectVehicle}
        onOpenTestDrive={handleOpenTestDrive}
        onOpenServiceBooking={handleOpenServiceBooking}
        onNavigate={navigateTo}
      />
    </>
  );

  // 0. ERP & DEALERSHIP MANAGEMENT DASHBOARD (DMS & ZATCA 2)
  if (adminViewOpen || currentRoute === 'erp' || currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col font-arabic">
        <AdminDashboard onClose={() => {
          setAdminViewOpen(false);
          handleBackToHome();
        }} />
      </div>
    );
  }

  // 1. DEDICATED VEHICLE MODEL PAGE
  if (currentRoute === 'vehicle' && dedicatedVehicle) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-arabic">
        <VehicleModelPage
          vehicle={dedicatedVehicle}
          onBackToHome={handleBackToHome}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenQuotation={(v, g, f) => handleOpenQuotation(v, g, f)}
          onSelectOtherVehicle={(id) => handleSelectVehicle(id)}
          onOpenServiceBooking={handleOpenServiceBooking}
          onOpenCompare={() => setIsComparisonDrawerOpen(true)}
          comparisonCount={comparedVehicles.length}
        />
        {renderModals()}
      </div>
    );
  }

  // 2. OFFERS PAGE
  if (currentRoute === 'offers') {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-arabic">
        <OffersPage
          onBackToHome={handleBackToHome}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenServiceBooking={handleOpenServiceBooking}
          onSelectVehicle={handleSelectVehicle}
        />
        {renderModals()}
      </div>
    );
  }

  // 3. OWNERS PAGE
  if (currentRoute === 'owners') {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-arabic">
        <OwnersPage
          onBackToHome={handleBackToHome}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenServiceBooking={handleOpenServiceBooking}
          onSelectVehicle={handleSelectVehicle}
        />
        {renderModals()}
      </div>
    );
  }

  // 4. DISCOVER SOLINA PAGE
  if (currentRoute === 'discover') {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-arabic">
        <DiscoverPage
          onBackToHome={handleBackToHome}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenServiceBooking={handleOpenServiceBooking}
          onSelectVehicle={handleSelectVehicle}
        />
        {renderModals()}
      </div>
    );
  }

  // 5. SHOWROOMS & CENTERS PAGE
  if (currentRoute === 'showrooms') {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-arabic">
        <ShowroomsPage
          onBackToHome={handleBackToHome}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenServiceBooking={handleOpenServiceBooking}
          onSelectVehicle={handleSelectVehicle}
        />
        {renderModals()}
      </div>
    );
  }

  // 6. SOLINA MOBILE APP INTERACTIVE PAGE
  if (currentRoute === 'app' || currentRoute === 'mobile-app') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-arabic">
        <SolinaAppPage
          onNavigateHome={handleBackToHome}
          onNavigateBack={handleBackToHome}
          onSelectVehicle={handleSelectVehicle}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenServiceBooking={handleOpenServiceBooking}
        />
        {renderModals()}
      </div>
    );
  }

  // 7. NATIVE MOBILE APP VIEW (When viewed on Mobile Phone only)
  if (isMobileScreen && currentRoute === 'home') {
    return (
      <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col font-arabic">
        <SolinaAppExperience
          isNativeMobileView={true}
          onSelectVehicle={handleSelectVehicle}
          onOpenTestDrive={handleOpenTestDrive}
          onOpenServiceBooking={handleOpenServiceBooking}
        />
        {renderModals()}
      </div>
    );
  }

  // 8. MAIN DESKTOP HOMEPAGE (Desktop View: All Official Sections)
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-arabic">
      {/* 1. Global Navigation Header */}
      <Header
        onOpenTestDrive={handleOpenTestDrive}
        onOpenServiceBooking={handleOpenServiceBooking}
        onOpenCompare={() => setIsComparisonDrawerOpen(true)}
        comparisonCount={comparedVehicles.length}
        onSelectCategory={setSelectedCategory}
        onSelectVehicle={handleSelectVehicle}
        onOpenAdmin={() => setAdminViewOpen(true)}
        onNavigate={navigateTo}
      />

      <main className="flex-1">
        {/* 2. Official 2026 Hero Slider */}
        <HeroSlider
          onOpenTestDrive={handleOpenTestDrive}
          onExploreModel={handleSelectVehicle}
        />

        {/* 3. Quick Action Services Bar */}
        <QuickServicesBar
          onOpenTestDrive={() => handleOpenTestDrive()}
          onOpenServiceBooking={handleOpenServiceBooking}
        />

        {/* Section Divider */}
        <SectionDivider />

        {/* 4. Explore Vehicles Carousel & Category Tabs */}
        <ExploreVehicles
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectVehicle={handleSelectVehicle}
          onOpenTestDrive={handleOpenTestDrive}
          onToggleCompare={handleToggleCompare}
          onOpenQuotation={(v) => handleOpenQuotation(v, v.grades[0])}
          comparedVehicleIds={comparedVehicles.map(v => v.id)}
        />

        {/* Section Divider */}
        <SectionDivider />

        {/* 5. Promotional Offers (قد أكثر وادفع أقل) */}
        <OffersSection onOpenTestDrive={handleOpenTestDrive} />

        {/* Section Divider */}
        <SectionDivider />

        {/* 6. Solina Grand Fleet Floor (صالة العرض الكبرى وأسطول 2026) */}
        <SolinaFleetShowcase
          onOpenTestDrive={(model) => handleOpenTestDrive(model)}
          onExploreVehicles={() => {
            const el = document.getElementById('explore-vehicles');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectVehicle={handleSelectVehicle}
        />

        {/* Section Divider */}
        <SectionDivider />

        {/* 7. Discover Solina (ابتكار تثق به) */}
        <DiscoverSolinaSection />

        {/* Section Divider */}
        <SectionDivider />

        {/* 8. Solina Quality Section (جودة تتجاوز التوقعات) */}
        <SolinaQualitySection
          onOpenTestDrive={() => handleOpenTestDrive()}
          onNavigateToDiscover={() => navigateTo('discover')}
        />

        {/* Section Divider */}
        <SectionDivider />

        {/* 9. Solina Headquarters Landmark (المقر الرئيسي وصالات العرض) */}
        <SolinaHeadquartersShowcase
          onNavigateToShowrooms={() => navigateTo('showrooms')}
          onOpenQuotation={() => handleOpenQuotation(vehicles[0], vehicles[0].grades[0])}
        />

        {/* Section Divider */}
        <SectionDivider />

        {/* 10. Solina Brand & Heritage (راية التميز وهوية سولينا) */}
        <SolinaBrandHeritage
          onNavigateToDiscover={() => navigateTo('discover')}
          onOpenTestDrive={() => handleOpenTestDrive()}
        />

        {/* Section Divider */}
        <SectionDivider />

        {/* 11. Solina Mobile Application Showcase (تطبيق سولينا للسيارات) */}
        <SolinaMobileAppSection onNavigateToApp={() => navigateTo('app')} />

        {/* Section Divider */}
        <SectionDivider />

        {/* 12. Guest Commitment Section (التزامنا نحو ضيوفنا) */}
        <GuestCommitmentSection />
      </main>

      {/* 8. Official Multi-Column Footer */}
      <Footer />

      {/* Interactive Modals */}
      {renderModals()}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <MainAppContent />
      </AdminDataProvider>
    </LanguageProvider>
  );
}

export default App;
