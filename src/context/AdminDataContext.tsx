import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  VEHICLES, 
  OFFERS, 
  CERTIFIED_PRE_OWNED, 
  GENUINE_PARTS, 
  SHOWROOMS, 
  Vehicle, 
  VehicleGrade,
  Offer,
  PreOwnedVehicle,
  SparePart,
  Showroom
} from '../data/toyotaData';

export interface TestDriveLead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  preferredShowroom: string;
  modelId: string;
  modelName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  nationalIdOrIqama?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface ServiceAppointmentLead {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  showroom: string;
  vehicleModel: string;
  plateNumber: string;
  currentMileage: number;
  packageMileage: number;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  estimatedCost: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  assignedTechnician?: string;
}

export interface QuotationRecord {
  id: string;
  quotationNumber: string;
  fullName: string;
  phone: string;
  city: string;
  vehicleId: string;
  vehicleName: string;
  gradeName: string;
  vehiclePrice: number;
  vatAmount: number;
  totalWithVat: number;
  financeType: 'cash' | 'lease';
  downPaymentPercent?: number;
  downPaymentAmount?: number;
  durationMonths?: number;
  monthlyInstallment?: number;
  bankName?: string;
  createdAt: string;
  status: 'draft' | 'sent' | 'approved' | 'deal_closed';
}

interface AdminDataContextType {
  vehicles: Vehicle[];
  offers: Offer[];
  cpoVehicles: PreOwnedVehicle[];
  spareParts: SparePart[];
  showrooms: Showroom[];
  testDrives: TestDriveLead[];
  serviceAppointments: ServiceAppointmentLead[];
  quotations: QuotationRecord[];
  
  // Vehicle Actions
  addVehicle: (vehicle: Vehicle) => void;
  updateVehiclePrice: (vehicleId: string, newPrice: number) => void;
  toggleVehicleFeatured: (vehicleId: string) => void;
  deleteVehicle: (vehicleId: string) => void;
  
  // Offers Actions
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, updated: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;

  // CPO Actions
  addCPOVehicle: (cpo: PreOwnedVehicle) => void;
  updateCPOVehicle: (id: string, updated: Partial<PreOwnedVehicle>) => void;
  deleteCPOVehicle: (id: string) => void;

  // Spare Parts Actions
  addSparePart: (part: SparePart) => void;
  updateSparePartPrice: (id: string, newPrice: number) => void;
  deleteSparePart: (id: string) => void;

  // Showrooms Actions
  addShowroom: (showroom: Showroom) => void;
  updateShowroom: (id: string, updated: Partial<Showroom>) => void;
  deleteShowroom: (id: string) => void;
  
  // Test Drive Actions
  addTestDrive: (lead: Omit<TestDriveLead, 'id' | 'createdAt' | 'status'>) => void;
  updateTestDriveStatus: (id: string, status: TestDriveLead['status']) => void;
  deleteTestDrive: (id: string) => void;
  
  // Service Booking Actions
  addServiceAppointment: (appointment: Omit<ServiceAppointmentLead, 'id' | 'createdAt' | 'status'>) => void;
  updateServiceStatus: (id: string, status: ServiceAppointmentLead['status']) => void;
  deleteServiceAppointment: (id: string) => void;
  
  // Quotation Actions
  addQuotation: (quotation: Omit<QuotationRecord, 'id' | 'createdAt' | 'quotationNumber'>) => string;
  updateQuotationStatus: (id: string, status: QuotationRecord['status']) => void;
  deleteQuotation: (id: string) => void;

  // Export utility
  exportDataToCSV: (type: 'test_drives' | 'services' | 'quotations' | 'fleet') => void;

  // Stats Counters
  stats: {
    totalTestDrives: number;
    newTestDrivesCount: number;
    totalServices: number;
    pendingServicesCount: number;
    totalQuotations: number;
    totalPipelineValueSAR: number;
    totalFleetCount: number;
    totalOffersCount: number;
    totalCPOCount: number;
    totalPartsCount: number;
    totalShowroomsCount: number;
  };

  resetToDefaultData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Initial Mock Records to populate Dashboard on first load
const INITIAL_TEST_DRIVES: TestDriveLead[] = [
  {
    id: 'TD-10492',
    fullName: 'عبدالله السعدي',
    phone: '0501234567',
    city: 'الرياض',
    preferredShowroom: 'مركز خريص الرئيسي',
    modelId: 'prado-2026',
    modelName: 'سولينا لاند كروزر برادو 2026',
    preferredDate: '2026-08-20',
    preferredTimeSlot: '10:00 ص - 12:00 م',
    nationalIdOrIqama: '1084729381',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    notes: 'مهتم بفئة TXL First Edition'
  },
  {
    id: 'TD-10491',
    fullName: 'سعود فهد القحطاني',
    phone: '0559876543',
    city: 'جدة',
    preferredShowroom: 'مركز طريق المدينة',
    modelId: 'camry-2026',
    modelName: 'سولينا كامري 2026 هايبرد',
    preferredDate: '2026-08-21',
    preferredTimeSlot: '04:00 م - 06:00 م',
    nationalIdOrIqama: '1029384756',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    notes: 'يرغب في معرفة برامج التمويل بدون دفعة أولى'
  },
  {
    id: 'TD-10490',
    fullName: 'فيصل محمد الدوسري',
    phone: '0543219876',
    city: 'الدمام والخبر',
    preferredShowroom: 'مركز طريق الملك فهد',
    modelId: 'lc300-2026',
    modelName: 'سولينا لاند كروزر LC300 2026',
    preferredDate: '2026-08-22',
    preferredTimeSlot: '07:00 م - 09:00 م',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    notes: 'تم تأكيد الموعد عبر الهاتف مع العميل'
  }
];

const INITIAL_SERVICES: ServiceAppointmentLead[] = [
  {
    id: 'SRV-8821',
    fullName: 'خالد إبراهيم المنصور',
    phone: '0567891234',
    city: 'الرياض',
    showroom: 'مركز خريص الرئيسي',
    vehicleModel: 'سولينا راف فور 2024 هايبرد',
    plateNumber: 'أ ب ج 4492',
    currentMileage: 20450,
    packageMileage: 20000,
    serviceType: 'صيانة دورية 20,000 كم (صيانة سريعة 45 دقيقة)',
    preferredDate: '2026-08-18',
    preferredTime: '09:30 ص',
    estimatedCost: 680,
    status: 'in_progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    assignedTechnician: 'م. أحمد الشريف'
  },
  {
    id: 'SRV-8820',
    fullName: 'مها عبدالعزيز الشمري',
    phone: '0533334455',
    city: 'جدة',
    showroom: 'مركز طريق المدينة',
    vehicleModel: 'سولينا كامري 2023',
    plateNumber: 'د هـ و 7120',
    currentMileage: 41200,
    packageMileage: 40000,
    serviceType: 'صيانة كبرى 40,000 كم (شاملة السوائل)',
    preferredDate: '2026-08-19',
    preferredTime: '11:00 ص',
    estimatedCost: 990,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
  }
];

const INITIAL_QUOTATIONS: QuotationRecord[] = [
  {
    id: 'QUO-2026-9041',
    quotationNumber: 'ALJ-QUO-9041',
    fullName: 'عمر ياسين المالكي',
    phone: '0507788990',
    city: 'الرياض',
    vehicleId: 'prado-2026',
    vehicleName: 'سولينا لاند كروزر برادو 2026',
    gradeName: 'TXL 2.4L Turbo First Edition',
    vehiclePrice: 228850,
    vatAmount: 34327.5,
    totalWithVat: 263177.5,
    financeType: 'lease',
    downPaymentPercent: 10,
    downPaymentAmount: 26317.75,
    durationMonths: 60,
    monthlyInstallment: 3450,
    bankName: 'مصرف الراجحي',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'sent'
  },
  {
    id: 'QUO-2026-9040',
    quotationNumber: 'ALJ-QUO-9040',
    fullName: 'بندر ناصر العتيبي',
    phone: '0551122334',
    city: 'الخبر',
    vehicleId: 'camry-2026',
    vehicleName: 'سولينا كامري 2026 هايبرد',
    gradeName: 'LUMIERE HEV 2.5L',
    vehiclePrice: 148925,
    vatAmount: 22338.75,
    totalWithVat: 171263.75,
    financeType: 'cash',
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    status: 'approved'
  }
];

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initialize with defaults
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('toyota_admin_vehicles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return VEHICLES;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('toyota_admin_offers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return OFFERS;
  });

  const [cpoVehicles, setCpoVehicles] = useState<PreOwnedVehicle[]>(() => {
    const saved = localStorage.getItem('toyota_admin_cpo');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return CERTIFIED_PRE_OWNED;
  });

  const [spareParts, setSpareParts] = useState<SparePart[]>(() => {
    const saved = localStorage.getItem('toyota_admin_parts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return GENUINE_PARTS;
  });

  const [showrooms, setShowrooms] = useState<Showroom[]>(() => {
    const saved = localStorage.getItem('toyota_admin_showrooms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return SHOWROOMS;
  });

  const [testDrives, setTestDrives] = useState<TestDriveLead[]>(() => {
    const saved = localStorage.getItem('toyota_admin_test_drives');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TEST_DRIVES;
  });

  const [serviceAppointments, setServiceAppointments] = useState<ServiceAppointmentLead[]>(() => {
    const saved = localStorage.getItem('toyota_admin_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SERVICES;
  });

  const [quotations, setQuotations] = useState<QuotationRecord[]>(() => {
    const saved = localStorage.getItem('toyota_admin_quotations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_QUOTATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('toyota_admin_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_cpo', JSON.stringify(cpoVehicles));
  }, [cpoVehicles]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_parts', JSON.stringify(spareParts));
  }, [spareParts]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_showrooms', JSON.stringify(showrooms));
  }, [showrooms]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_test_drives', JSON.stringify(testDrives));
  }, [testDrives]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_services', JSON.stringify(serviceAppointments));
  }, [serviceAppointments]);

  useEffect(() => {
    localStorage.setItem('toyota_admin_quotations', JSON.stringify(quotations));
  }, [quotations]);

  // Vehicle Methods
  const addVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => [vehicle, ...prev]);
  };

  const updateVehiclePrice = (vehicleId: string, newPrice: number) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const monthly = Math.round((newPrice * 0.9) / 60);
        return {
          ...v,
          priceStartingFrom: newPrice,
          monthlyInstallmentStartingFrom: monthly
        };
      }
      return v;
    }));
  };

  const toggleVehicleFeatured = (vehicleId: string) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        return { ...v, isFeatured: !v.isFeatured };
      }
      return v;
    }));
  };

  const deleteVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
  };

  // Offers Methods
  const addOffer = (offer: Offer) => {
    setOffers(prev => [offer, ...prev]);
  };

  const updateOffer = (id: string, updated: Partial<Offer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  // CPO Methods
  const addCPOVehicle = (cpo: PreOwnedVehicle) => {
    setCpoVehicles(prev => [cpo, ...prev]);
  };

  const updateCPOVehicle = (id: string, updated: Partial<PreOwnedVehicle>) => {
    setCpoVehicles(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCPOVehicle = (id: string) => {
    setCpoVehicles(prev => prev.filter(c => c.id !== id));
  };

  // Spare Parts Methods
  const addSparePart = (part: SparePart) => {
    setSpareParts(prev => [part, ...prev]);
  };

  const updateSparePartPrice = (id: string, newPrice: number) => {
    setSpareParts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  const deleteSparePart = (id: string) => {
    setSpareParts(prev => prev.filter(p => p.id !== id));
  };

  // Showroom Methods
  const addShowroom = (showroom: Showroom) => {
    setShowrooms(prev => [showroom, ...prev]);
  };

  const updateShowroom = (id: string, updated: Partial<Showroom>) => {
    setShowrooms(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteShowroom = (id: string) => {
    setShowrooms(prev => prev.filter(s => s.id !== id));
  };

  // Test Drive Methods
  const addTestDrive = (lead: Omit<TestDriveLead, 'id' | 'createdAt' | 'status'>) => {
    const randomId = `TD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry: TestDriveLead = {
      ...lead,
      id: randomId,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setTestDrives(prev => [newEntry, ...prev]);
  };

  const updateTestDriveStatus = (id: string, status: TestDriveLead['status']) => {
    setTestDrives(prev => prev.map(td => td.id === id ? { ...td, status } : td));
  };

  const deleteTestDrive = (id: string) => {
    setTestDrives(prev => prev.filter(td => td.id !== id));
  };

  // Service Booking Methods
  const addServiceAppointment = (appointment: Omit<ServiceAppointmentLead, 'id' | 'createdAt' | 'status'>) => {
    const randomId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry: ServiceAppointmentLead = {
      ...appointment,
      id: randomId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setServiceAppointments(prev => [newEntry, ...prev]);
  };

  const updateServiceStatus = (id: string, status: ServiceAppointmentLead['status']) => {
    setServiceAppointments(prev => prev.map(srv => srv.id === id ? { ...srv, status } : srv));
  };

  const deleteServiceAppointment = (id: string) => {
    setServiceAppointments(prev => prev.filter(srv => srv.id !== id));
  };

  // Quotation Methods
  const addQuotation = (quotation: Omit<QuotationRecord, 'id' | 'createdAt' | 'quotationNumber'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const quotationNumber = `ALJ-QUO-${randomNum}`;
    const id = `QUO-2026-${randomNum}`;
    const newEntry: QuotationRecord = {
      ...quotation,
      id,
      quotationNumber,
      createdAt: new Date().toISOString()
    };
    setQuotations(prev => [newEntry, ...prev]);
    return quotationNumber;
  };

  const updateQuotationStatus = (id: string, status: QuotationRecord['status']) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const deleteQuotation = (id: string) => {
    setQuotations(prev => prev.filter(q => q.id !== id));
  };

  // Export Data to CSV
  const exportDataToCSV = (type: 'test_drives' | 'services' | 'quotations' | 'fleet') => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = `toyota_alj_${type}_${new Date().toISOString().split('T')[0]}.csv`;

    if (type === 'test_drives') {
      headers = ['ID', 'Full Name', 'Phone', 'City', 'Showroom', 'Vehicle', 'Date', 'Time', 'National ID', 'Status'];
      rows = testDrives.map(td => [
        td.id,
        td.fullName,
        td.phone,
        td.city,
        td.preferredShowroom,
        td.modelName,
        td.preferredDate,
        td.preferredTimeSlot,
        td.nationalIdOrIqama || '-',
        td.status
      ]);
    } else if (type === 'services') {
      headers = ['ID', 'Customer', 'Phone', 'City', 'Showroom', 'Vehicle', 'Plate', 'Mileage', 'Service Type', 'Date', 'Cost (SAR)', 'Status'];
      rows = serviceAppointments.map(s => [
        s.id,
        s.fullName,
        s.phone,
        s.city,
        s.showroom,
        s.vehicleModel,
        s.plateNumber,
        s.currentMileage.toString(),
        s.serviceType,
        s.preferredDate,
        s.estimatedCost.toString(),
        s.status
      ]);
    } else if (type === 'quotations') {
      headers = ['Quote #', 'Customer', 'Phone', 'Vehicle', 'Grade', 'Price (SAR)', 'VAT 15%', 'Total with VAT', 'Finance Type', 'Monthly Installment', 'Status'];
      rows = quotations.map(q => [
        q.quotationNumber,
        q.fullName,
        q.phone,
        q.vehicleName,
        q.gradeName,
        q.vehiclePrice.toString(),
        q.vatAmount.toString(),
        q.totalWithVat.toString(),
        q.financeType,
        (q.monthlyInstallment || 0).toString(),
        q.status
      ]);
    } else if (type === 'fleet') {
      headers = ['ID', 'Model Ar', 'Model En', 'Year', 'Category', 'Powertrain', 'Starting Price (SAR)', 'Monthly (SAR)', 'Fuel Economy'];
      rows = vehicles.map(v => [
        v.id,
        v.nameAr,
        v.nameEn,
        v.year.toString(),
        v.category,
        v.powertrain,
        v.priceStartingFrom.toString(),
        v.monthlyInstallmentStartingFrom.toString(),
        v.fuelEconomy
      ]);
    }

    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(e => e.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetToDefaultData = () => {
    setVehicles(VEHICLES);
    setOffers(OFFERS);
    setCpoVehicles(CERTIFIED_PRE_OWNED);
    setSpareParts(GENUINE_PARTS);
    setShowrooms(SHOWROOMS);
    setTestDrives(INITIAL_TEST_DRIVES);
    setServiceAppointments(INITIAL_SERVICES);
    setQuotations(INITIAL_QUOTATIONS);
    localStorage.removeItem('toyota_admin_vehicles');
    localStorage.removeItem('toyota_admin_offers');
    localStorage.removeItem('toyota_admin_cpo');
    localStorage.removeItem('toyota_admin_parts');
    localStorage.removeItem('toyota_admin_showrooms');
    localStorage.removeItem('toyota_admin_test_drives');
    localStorage.removeItem('toyota_admin_services');
    localStorage.removeItem('toyota_admin_quotations');
  };

  // Calculated Aggregate Stats
  const totalPipelineValueSAR = quotations.reduce((acc, q) => acc + q.totalWithVat, 0);
  const newTestDrivesCount = testDrives.filter(td => td.status === 'new').length;
  const pendingServicesCount = serviceAppointments.filter(s => s.status === 'pending').length;

  const stats = {
    totalTestDrives: testDrives.length,
    newTestDrivesCount,
    totalServices: serviceAppointments.length,
    pendingServicesCount,
    totalQuotations: quotations.length,
    totalPipelineValueSAR,
    totalFleetCount: vehicles.length,
    totalOffersCount: offers.length,
    totalCPOCount: cpoVehicles.length,
    totalPartsCount: spareParts.length,
    totalShowroomsCount: showrooms.length
  };

  return (
    <AdminDataContext.Provider
      value={{
        vehicles,
        offers,
        cpoVehicles,
        spareParts,
        showrooms,
        testDrives,
        serviceAppointments,
        quotations,
        addVehicle,
        updateVehiclePrice,
        toggleVehicleFeatured,
        deleteVehicle,
        addOffer,
        updateOffer,
        deleteOffer,
        addCPOVehicle,
        updateCPOVehicle,
        deleteCPOVehicle,
        addSparePart,
        updateSparePartPrice,
        deleteSparePart,
        addShowroom,
        updateShowroom,
        deleteShowroom,
        addTestDrive,
        updateTestDriveStatus,
        deleteTestDrive,
        addServiceAppointment,
        updateServiceStatus,
        deleteServiceAppointment,
        addQuotation,
        updateQuotationStatus,
        deleteQuotation,
        exportDataToCSV,
        stats,
        resetToDefaultData
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
