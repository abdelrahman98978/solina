import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { QuickServicesBar } from './components/QuickServicesBar';
import { ExploreVehicles } from './components/ExploreVehicles';
import { DiscoverAlJabraniSection } from './components/DiscoverAlJabraniSection';
import { OffersSection } from './components/OffersSection';
import { GuestCommitmentSection } from './components/GuestCommitmentSection';
import { CarFinderWizard } from './components/CarFinderWizard';
import { Vehicle360Customizer } from './components/Vehicle360Customizer';
import { TechSimulator } from './components/TechSimulator';
import { GRPerformanceSection } from './components/GRPerformanceSection';
import { FinanceCalculator } from './components/FinanceCalculator';
import { CertifiedPreOwnedSection } from './components/CertifiedPreOwnedSection';
import { PartsAccessoriesSection } from './components/PartsAccessoriesSection';
import { ToyotaCinemaSection } from './components/ToyotaCinemaSection';
import { ShowroomsSection } from './components/ShowroomsSection';
import { WhyToyotaSection } from './components/WhyToyotaSection';
import { Footer } from './components/Footer';

// Admin Dashboard Component
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { TestDriveModal } from './components/TestDriveModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { QuotationModal } from './components/QuotationModal';

import { type Vehicle, type VehicleGrade } from './data/toyotaData';

const MainAppContent: React.FC = () => {
  const { language } = useLanguage();
  const { vehicles } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
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

  // Handlers
  const handleOpenTestDrive = (modelName?: string) => {
    setTestDriveDefaultModel(modelName);
    setTestDriveModalOpen(true);
  };

  const handleOpenServiceBooking = () => {
    setServiceBookingModalOpen(true);
  };

  const handleSelectVehicle = (vehicleId: string) => {
    const v = vehicles.find(item => item.id === vehicleId);
    if (v) {
      setSelectedVehicleForDetails(v);
    }
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

  const handleExploreModelFromHero = (modelId: string) => {
    const el = document.getElementById('explore-vehicles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    handleSelectVehicle(modelId);
  };

  // If Admin Dashboard is active, render it directly
  if (adminViewOpen) {
    return <AdminDashboard onClose={() => setAdminViewOpen(false)} />;
  }

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
      />

      <main className="flex-1">
        {/* 2. Hero Interactive Slider (Preserved as requested) */}
        <HeroSlider
          onOpenTestDrive={handleOpenTestDrive}
          onExploreModel={handleExploreModelFromHero}
        />

        {/* 3. Quick Action Services Hub (كيف يمكننا مساعدتك اليوم؟) */}
        <QuickServicesBar
          onOpenTestDrive={() => handleOpenTestDrive()}
          onOpenServiceBooking={handleOpenServiceBooking}
        />

        {/* 4. Interactive 360° Customizer Studio & Engine Sound Showcase */}
        <Vehicle360Customizer
          onOpenTestDrive={handleOpenTestDrive}
          onOpenDetails={handleSelectVehicle}
          onOpenQuotation={(v) => handleOpenQuotation(v, v.grades[0])}
        />

        {/* 5. Explore Vehicles Grid & Category Filters (استكشف جميع المركبات) */}
        <ExploreVehicles
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectVehicle={handleSelectVehicle}
          onOpenTestDrive={handleOpenTestDrive}
          onToggleCompare={handleToggleCompare}
          onOpenQuotation={(v) => handleOpenQuotation(v, v.grades[0])}
          comparedVehicleIds={comparedVehicles.map(v => v.id)}
        />

        {/* 6. Discover Al Jabrani & Future Innovations (اكتشف الجبراني) */}
        <DiscoverAlJabraniSection />

        {/* 7. Promotional Offers & Seasonal Deals (أحدث العروض: قد أكثر وادفع أقل) */}
        <OffersSection onOpenTestDrive={handleOpenTestDrive} />

        {/* 8. Our Commitment to Our Guests (التزامنا نحو ضيوفنا) */}
        <GuestCommitmentSection />

        {/* 9. Smart Car Matcher / AI Recommendation Wizard */}
        <CarFinderWizard
          onSelectVehicle={handleSelectVehicle}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 10. Hybrid Energy Flow & Safety Sense Simulator */}
        <TechSimulator />

        {/* 11. Performance Showcase */}
        <GRPerformanceSection
          onSelectVehicle={handleSelectVehicle}
          onOpenTestDrive={handleOpenTestDrive}
        />

        {/* 12. 4K Launch Cinema */}
        <ToyotaCinemaSection />

        {/* 13. Installment & Finance Calculator */}
        <FinanceCalculator
          onOpenTestDrive={handleOpenTestDrive}
          onOpenQuotation={(v, g, f) => handleOpenQuotation(v, g, f)}
        />

        {/* 14. Certified Pre-Owned (CPO) Vehicles */}
        <CertifiedPreOwnedSection
          onOpenTestDrive={(title) => handleOpenTestDrive(title)}
        />

        {/* 15. Genuine Spare Parts & Accessories Catalog */}
        <PartsAccessoriesSection onOpenTestDrive={handleOpenTestDrive} />

        {/* 16. Official Showrooms & Service Centers GPS Locator */}
        <ShowroomsSection />

        {/* 17. Why Al Jabrani Brand Pillars */}
        <WhyToyotaSection />
      </main>

      {/* 18. Official Multi-Column Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
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
