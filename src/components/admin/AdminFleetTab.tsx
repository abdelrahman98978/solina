import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Edit3, 
  Star, 
  Check, 
  X, 
  DollarSign, 
  Layers,
  Info,
  Plus,
  Trash2,
  Download,
  Eye,
  BookOpen,
  Palette
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Vehicle, VehicleGrade, getBrandMeta } from '../../data/toyotaData';
import { VehicleCatalogModal } from '../VehicleCatalogModal';

export const AdminFleetTab: React.FC = () => {
  const { 
    vehicles, 
    addVehicle, 
    updateVehicle, 
    toggleVehicleFeatured, 
    deleteVehicle, 
    exportDataToCSV 
  } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>('all');
  const [catalogVehicle, setCatalogVehicle] = useState<Vehicle | null>(null);
  
  // Edit Vehicle Modal State
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editNameAr, setEditNameAr] = useState('');
  const [editNameEn, setEditNameEn] = useState('');
  const [editPriceInput, setEditPriceInput] = useState<string>('');
  const [editCategory, setEditCategory] = useState<Vehicle['category']>('sedan');
  const [editPowertrain, setEditPowertrain] = useState<Vehicle['powertrain']>('هايبرد');
  const [editFuelEconomy, setEditFuelEconomy] = useState('');
  const [editHorsepower, setEditHorsepower] = useState('');
  const [editCardImage, setEditCardImage] = useState('');
  const [editGrades, setEditGrades] = useState<VehicleGrade[]>([]);

  // Add Vehicle Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicleForm, setNewVehicleForm] = useState({
    nameAr: '',
    nameEn: '',
    year: 2026,
    category: 'suv' as Vehicle['category'],
    bodyTypeAr: 'دفع رباعي فاخرة',
    powertrain: 'هايبرد' as Vehicle['powertrain'],
    priceStartingFrom: 145000,
    fuelEconomy: '21.5 كم/لتر',
    engineSpec: '2.5L Hybrid Dynamic Force',
    horsepower: '240 حصان',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/prado-306x122.webp'
  });

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = 
      v.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand =
      selectedBrand === 'all' ||
      (selectedBrand === 'toyota' ? (!v.brand || v.brand === 'toyota') : v.brand === selectedBrand);
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesPowertrain = selectedPowertrain === 'all' || v.powertrain === selectedPowertrain;

    return matchesSearch && matchesBrand && matchesCategory && matchesPowertrain;
  });

  const handleOpenEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setEditNameAr(v.nameAr);
    setEditNameEn(v.nameEn);
    setEditPriceInput(v.priceStartingFrom.toString());
    setEditCategory(v.category);
    setEditPowertrain(v.powertrain);
    setEditFuelEconomy(v.fuelEconomy);
    setEditHorsepower(v.horsepower);
    setEditCardImage(v.cardImage);
    setEditGrades(v.grades.map(g => ({ ...g })));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    const parsedPrice = parseFloat(editPriceInput);
    if (isNaN(parsedPrice) || parsedPrice <= 0) return;

    const syncedGrades = editGrades.length > 0
      ? editGrades.map((g, i) => i === 0 ? { ...g, price: parsedPrice } : g)
      : editingVehicle.grades;

    updateVehicle(editingVehicle.id, {
      nameAr: editNameAr,
      nameEn: editNameEn,
      priceStartingFrom: parsedPrice,
      monthlyInstallmentStartingFrom: Math.round((parsedPrice * 0.9) / 60),
      category: editCategory,
      powertrain: editPowertrain,
      isHybrid: editPowertrain === 'هايبرد' || editPowertrain === 'كهربائي',
      fuelEconomy: editFuelEconomy,
      horsepower: editHorsepower,
      cardImage: editCardImage,
      grades: syncedGrades
    });
    setEditingVehicle(null);
  };

  const handleAddNewVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicleForm.nameAr) return;

    const idSlug = (newVehicleForm.nameEn || newVehicleForm.nameAr)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `solina-model-${Date.now()}`;

    const price = Number(newVehicleForm.priceStartingFrom);
    const created: Vehicle = {
      id: `${idSlug}-${newVehicleForm.year}`,
      nameAr: newVehicleForm.nameAr,
      nameEn: newVehicleForm.nameEn || newVehicleForm.nameAr,
      year: Number(newVehicleForm.year),
      brand: 'toyota',
      category: newVehicleForm.category,
      bodyTypeAr: newVehicleForm.bodyTypeAr,
      bodyTypeEn: newVehicleForm.category.toUpperCase(),
      priceStartingFrom: price,
      monthlyInstallmentStartingFrom: Math.round((price * 0.9) / 60),
      fuelEconomy: newVehicleForm.fuelEconomy,
      fuelEconomyEn: newVehicleForm.fuelEconomy,
      engineSpec: newVehicleForm.engineSpec,
      engineSpecEn: newVehicleForm.engineSpec,
      horsepower: newVehicleForm.horsepower,
      horsepowerEn: newVehicleForm.horsepower,
      torque: '350 نيوتن.متر',
      seats: newVehicleForm.category === 'suv' ? 7 : 5,
      transmissionAr: 'أوتوماتيكي ذكي',
      transmissionEn: 'Automatic',
      powertrain: newVehicleForm.powertrain,
      drivetrain: newVehicleForm.category === 'suv' ? 'دفع رباعي 4WD' : 'دفع أمامي FWD',
      drivetrainEn: newVehicleForm.category === 'suv' ? '4WD' : 'FWD',
      isNew: true,
      isFeatured: true,
      isHybrid: newVehicleForm.powertrain === 'هايبرد' || newVehicleForm.powertrain === 'كهربائي',
      cardImage: newVehicleForm.cardImage,
      heroImage: newVehicleForm.cardImage,
      overviewUrl: '#',
      colors: [
        { id: 'pearl-white', name: 'أبيض لؤلؤي', nameEn: 'Pearl White', hex: '#F5F5F5' },
        { id: 'midnight-black', name: 'أسود ملكي', nameEn: 'Midnight Black', hex: '#111111' }
      ],
      grades: [
        {
          name: 'فئة GLX القياسية',
          nameEn: 'GLX Standard',
          price: price,
          engine: newVehicleForm.engineSpec,
          engineEn: newVehicleForm.engineSpec,
          transmission: 'أوتوماتيكي',
          transmissionEn: 'Automatic',
          features: ['نظام سولينا للأمان الذكي', 'شاشة لمس 12.3 بوصة', 'كاميرا محيطية 360 درجة'],
          featuresEn: ['Solina Safety Sense', '12.3" Infotainment Display', '360 Surround Camera']
        },
        {
          name: 'فئة VIP فل كامل',
          nameEn: 'VIP Flagship',
          price: Math.round(price * 1.15),
          engine: newVehicleForm.engineSpec,
          engineEn: newVehicleForm.engineSpec,
          transmission: 'أوتوماتيكي',
          transmissionEn: 'Automatic',
          features: ['مقاعد جلد نابا فاخر', 'سقف بانورامي', 'نظام صوتي JBL بـ 14 سماعة'],
          featuresEn: ['Nappa Leather Seats', 'Panoramic Roof', '14-Speaker JBL Audio']
        }
      ]
    };

    addVehicle(created);
    setShowAddModal(false);
    setNewVehicleForm({
      ...newVehicleForm,
      nameAr: '',
      nameEn: ''
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header & Filters Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display flex items-center gap-2">
              <Car className="w-5 h-5 text-[#0056B3]" />
              <span>{language === 'ar' ? 'إدارة أسطول سيارات سولينا والأسعار (2026 Fleet)' : 'Solina Fleet Inventory & Pricing Management'}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {language === 'ar' 
                ? 'تحكم كامل في إضافة الموديلات، تعديل الأسعار والفئات، وإبراز السيارات على الصفحة الرئيسية مع المعاينة المباشرة.' 
                : 'Manage starting cash prices, trim levels, showroom visibility, and featured showcase status.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-100 text-gray-700 font-mono">
              {language === 'ar' ? `${vehicles.length} موديل مسجل` : `${vehicles.length} Models`}
            </span>

            <button
              onClick={() => exportDataToCSV('fleet')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ar' ? 'تصدير CSV' : 'Export CSV'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0056B3] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة موديل جديد' : 'Add New Model'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-gray-100">
          {/* Search Input */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث باسم الموديل أو المعرّف...' : 'Search model name or ID...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-10 pl-3 focus:ring-2 focus:ring-[#0056B3] outline-none"
            />
          </div>

          {/* Brand Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-bold outline-none cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'جميع العلامات التجارية' : 'All Brands'}</option>
              <option value="toyota">{language === 'ar' ? 'سولينا / تويوتا (Solina)' : 'Solina / Toyota'}</option>
              <option value="jetour">{language === 'ar' ? 'جيتور (Jetour)' : 'Jetour'}</option>
              <option value="byd">{language === 'ar' ? 'بي واي دي (BYD)' : 'BYD'}</option>
              <option value="hyundai">{language === 'ar' ? 'هيونداي (Hyundai)' : 'Hyundai'}</option>
              <option value="lexus">{language === 'ar' ? 'لكزس (Lexus)' : 'Lexus'}</option>
              <option value="mercedes">{language === 'ar' ? 'مرسيدس بنز (Mercedes)' : 'Mercedes-Benz'}</option>
              <option value="bmw">{language === 'ar' ? 'بي إم دبليو (BMW)' : 'BMW'}</option>
              <option value="porsche">{language === 'ar' ? 'بورشه (Porsche)' : 'Porsche'}</option>
              <option value="landrover">{language === 'ar' ? 'رينج روفر (Land Rover)' : 'Range Rover'}</option>
              <option value="gmc">{language === 'ar' ? 'جي إم سي (GMC)' : 'GMC'}</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'جميع الفئات (All)' : 'All Categories'}</option>
              <option value="suv">{language === 'ar' ? 'دفع رباعي وSUV' : 'SUV & 4x4'}</option>
              <option value="sedan">{language === 'ar' ? 'سيدان (Sedan)' : 'Sedan'}</option>
              <option value="commercial">{language === 'ar' ? 'تجارية وبيك آب' : 'Commercial & Pickups'}</option>
              <option value="gr">{language === 'ar' ? 'أداء رياضي GR' : 'Gazoo Racing (GR)'}</option>
            </select>
          </div>

          {/* Powertrain Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedPowertrain}
              onChange={(e) => setSelectedPowertrain(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'كل المحركات' : 'All Powertrains'}</option>
              <option value="بنزين">{language === 'ar' ? 'بنزين (Petrol)' : 'Petrol'}</option>
              <option value="هايبرد">{language === 'ar' ? 'هايبرد هجين (HEV)' : 'Hybrid Electric'}</option>
              <option value="ديزل">{language === 'ar' ? 'تيربو ديزل (Diesel)' : 'Diesel'}</option>
              <option value="كهربائي">{language === 'ar' ? 'كهربائي بالكامل (BEV)' : 'Electric (BEV)'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Vehicles Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 text-start">{language === 'ar' ? 'السيارة والعلامة' : 'Vehicle'}</th>
                <th className="py-4 px-4 text-start">{language === 'ar' ? 'الألوان والداخلية' : 'Colors & Interior'}</th>
                <th className="py-4 px-4 text-start">{language === 'ar' ? 'الفئة والمحرك' : 'Category & Powertrain'}</th>
                <th className="py-4 px-4 text-start">{language === 'ar' ? 'السعر النقدي الأساسي' : 'Starting Price (SAR)'}</th>
                <th className="py-4 px-4 text-center">{language === 'ar' ? 'الفئات المتاحة' : 'Grades/Trims'}</th>
                <th className="py-4 px-4 text-center">{language === 'ar' ? 'مميزة بالرئيسية' : 'Featured'}</th>
                <th className="py-4 px-6 text-center">{language === 'ar' ? 'الكتالوج والإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((v) => {
                const brandMeta = getBrandMeta(v.brand);
                return (
                <tr key={v.id} className="hover:bg-blue-50/20 transition-colors">
                  {/* Vehicle Info & Image */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-12 rounded-xl bg-gray-100/70 p-1 flex items-center justify-center border border-gray-200/60 shrink-0">
                        <img 
                          src={v.cardImage} 
                          alt={v.nameAr} 
                          className="max-h-full max-w-full object-contain filter drop-shadow-sm" 
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 inline-block mb-0.5">
                          {language === 'ar' ? brandMeta.brandName : brandMeta.brandNameEn}
                        </span>
                        <span className="font-bold text-gray-900 text-sm block">
                          {language === 'ar' ? v.nameAr : v.nameEn}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: {v.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Colors & Interior Preview */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      {v.interiorImage && (
                        <img
                          src={v.interiorImage}
                          alt="داخلية"
                          title="المقصورة الداخلية"
                          onClick={() => setCatalogVehicle(v)}
                          className="w-12 h-9 rounded-lg object-cover border border-gray-200 cursor-pointer hover:opacity-80"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {(v.colors || []).slice(0, 6).map((c) => (
                            <span
                              key={c.id}
                              title={c.name}
                              style={{ backgroundColor: c.hex }}
                              className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-500 block">
                          {v.colors?.length || 0} ألوان • {v.interiorGallery?.length || 4} صور داخلية
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category & Powertrain */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                        {language === 'ar' ? v.bodyTypeAr : v.bodyTypeEn}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          v.powertrain === 'هايبرد' || v.powertrain === 'كهربائي' ? 'bg-emerald-100 text-emerald-800' :
                          v.powertrain === 'ديزل' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {v.powertrain}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">{v.fuelEconomy}</span>
                      </div>
                    </div>
                  </td>

                  {/* Starting Price */}
                  <td className="py-4 px-4 font-mono font-bold text-gray-900 text-sm">
                    {formatPrice(v.priceStartingFrom)} ر.س
                    <span className="block text-[10px] font-semibold text-[#0056B3] mt-0.5">
                      {formatPrice(v.monthlyInstallmentStartingFrom)} ر.س/ش
                    </span>
                  </td>

                  {/* Trims Count */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 font-bold text-gray-700 font-mono text-[11px]">
                      <Layers className="w-3 h-3 text-gray-500" />
                      {v.grades.length} فئات
                    </span>
                  </td>

                  {/* Featured Switch */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => toggleVehicleFeatured(v.id)}
                      title={v.isFeatured ? 'إلغاء التمييز' : 'تمييز بالصفحة الرئيسية'}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        v.isFeatured 
                          ? 'bg-amber-100 text-amber-600 shadow-sm ring-1 ring-amber-300' 
                          : 'bg-gray-100 text-gray-400 hover:text-amber-500'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${v.isFeatured ? 'fill-amber-500' : ''}`} />
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setCatalogVehicle(v)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold transition-all cursor-pointer text-xs"
                        title="الكتالوج والداخلية PDF"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'الكتالوج' : 'Catalog'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(v)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-[#0056B3] text-[#0056B3] hover:text-white font-bold transition-all cursor-pointer text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(language === 'ar' ? `هل أنت متأكد من حذف ${v.nameAr} من الأسطول؟` : `Delete ${v.nameEn}?`)) {
                            deleteVehicle(v.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-gray-100 hover:bg-red-600 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="حذف الموديل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Full Vehicle & Price Edit Modal with Live Card Preview */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#0056B3]" />
                <h3 className="font-bold text-gray-900 text-base">
                  {language === 'ar' ? `تعديل ومعاينة بيانات: ${editingVehicle.nameAr}` : `Edit Model & Pricing: ${editingVehicle.nameEn}`}
                </h3>
              </div>
              <button 
                onClick={() => setEditingVehicle(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
              {/* Left Form Fields (7 Cols) */}
              <div className="md:col-span-7 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">اسم الموديل (عربي):</label>
                    <input
                      type="text"
                      required
                      value={editNameAr}
                      onChange={(e) => setEditNameAr(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 font-bold outline-none focus:border-[#0056B3]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Model Name (EN):</label>
                    <input
                      type="text"
                      required
                      value={editNameEn}
                      onChange={(e) => setEditNameEn(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 font-bold outline-none focus:border-[#0056B3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">السعر النقدي الأساسي (ر.س):</label>
                    <input
                      type="number"
                      required
                      value={editPriceInput}
                      onChange={(e) => setEditPriceInput(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-[#0056B3] font-mono font-black text-sm rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-[#0056B3]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">منظومة الحركة:</label>
                    <select
                      value={editPowertrain}
                      onChange={(e) => setEditPowertrain(e.target.value as any)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 font-bold outline-none"
                    >
                      <option value="هايبرد">هايبرد (HEV)</option>
                      <option value="بنزين">بنزين (Petrol)</option>
                      <option value="ديزل">تيربو ديزل (Diesel)</option>
                      <option value="كهربائي">كهربائي (BEV)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">كفاءة الوقود:</label>
                    <input
                      type="text"
                      value={editFuelEconomy}
                      onChange={(e) => setEditFuelEconomy(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">القوة الحصانية:</label>
                    <input
                      type="text"
                      value={editHorsepower}
                      onChange={(e) => setEditHorsepower(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">رابط صورة السيارة:</label>
                  <input
                    type="text"
                    value={editCardImage}
                    onChange={(e) => setEditCardImage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-700 font-mono text-[11px] outline-none"
                  />
                </div>

                {/* Grades Prices Editor */}
                {editGrades.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="font-bold text-gray-800 block">أسعار الفئات الفرعية ({editGrades.length} فئات):</label>
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {editGrades.map((grade, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                          <span className="font-bold text-gray-800 truncate flex-1">{grade.name}</span>
                          <input
                            type="number"
                            value={idx === 0 ? editPriceInput : grade.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (idx === 0) setEditPriceInput(e.target.value);
                              setEditGrades(prev => prev.map((g, i) => i === idx ? { ...g, price: val } : g));
                            }}
                            className="w-28 bg-white border border-gray-200 rounded-lg p-1.5 font-mono font-bold text-gray-900 text-end"
                          />
                          <span className="text-[10px] text-gray-500">ر.س</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Live Preview Card (5 Cols) */}
              <div className="md:col-span-5 flex flex-col justify-between bg-slate-50 p-4 rounded-2xl border border-gray-200 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mb-3">
                    <span className="flex items-center gap-1 text-[#0056B3]">
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة حية لبطاقة العرض</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">مباشر</span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
                    <div className="h-28 flex items-center justify-center bg-gray-50 rounded-xl p-2">
                      <img 
                        src={editCardImage} 
                        alt={editNameAr} 
                        className="max-h-full max-w-full object-contain filter drop-shadow" 
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0056B3]">
                        {editPowertrain} • {editFuelEconomy}
                      </span>
                      <h4 className="font-bold text-gray-900 text-sm mt-1.5">{editNameAr}</h4>
                      <p className="text-[11px] text-gray-400">{editNameEn}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">يبدأ من</span>
                        <strong className="text-sm font-black text-[#0056B3] font-mono">
                          {formatPrice(Number(editPriceInput) || 0)} ر.س
                        </strong>
                      </div>
                      <div className="text-end">
                        <span className="text-[10px] text-gray-400 block">القسط التقديري</span>
                        <span className="text-xs font-bold text-gray-800 font-mono">
                          {formatPrice(Math.round(((Number(editPriceInput) || 0) * 0.9) / 60))} ر.س/ش
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl text-blue-800 text-[11px] flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                  <span>
                    ينعكس هذا التعديل فوراً على الصفحة الرئيسية، القوائم المنسدلة، وحاسبة التمويل وعروض الأسعار.
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#0056B3] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>حفظ واعتماد التعديلات</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingVehicle(null)}
                    className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all cursor-pointer text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add New Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddNewVehicle} className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-200 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Car className="w-5 h-5 text-[#0056B3]" />
                <span>إضافة موديل جديد لأسطول سولينا 2026</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">اسم السيارة (عربي):</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: سولينا سنتشري VIP 2026"
                  value={newVehicleForm.nameAr}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, nameAr: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none focus:border-[#0056B3]"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Model Name (EN):</label>
                <input
                  type="text"
                  placeholder="Solina Century VIP 2026"
                  value={newVehicleForm.nameEn}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, nameEn: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none focus:border-[#0056B3]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">الفئة:</label>
                <select
                  value={newVehicleForm.category}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none"
                >
                  <option value="suv">دفع رباعي SUV</option>
                  <option value="sedan">سيدان</option>
                  <option value="commercial">تجارية</option>
                  <option value="gr">رياضية GR</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">المحرك:</label>
                <select
                  value={newVehicleForm.powertrain}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, powertrain: e.target.value as any }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none"
                >
                  <option value="هايبرد">هايبرد</option>
                  <option value="بنزين">بنزين</option>
                  <option value="ديزل">ديزل</option>
                  <option value="كهربائي">كهربائي</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">السعر الأساسي (ر.س):</label>
                <input
                  type="number"
                  required
                  value={newVehicleForm.priceStartingFrom}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, priceStartingFrom: Number(e.target.value) }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-mono font-bold text-gray-900 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">المواصفات الميكانيكية:</label>
                <input
                  type="text"
                  value={newVehicleForm.engineSpec}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, engineSpec: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">استهلاك الوقود:</label>
                <input
                  type="text"
                  value={newVehicleForm.fuelEconomy}
                  onChange={(e) => setNewVehicleForm(prev => ({ ...prev, fuelEconomy: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-gray-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">رابط الصورة الرسمية:</label>
              <input
                type="text"
                value={newVehicleForm.cardImage}
                onChange={(e) => setNewVehicleForm(prev => ({ ...prev, cardImage: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-mono text-[11px] text-gray-700 outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#0056B3] hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                حفظ وإدراج في أسطول سولينا
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Digital Catalog & Interior Modal */}
      <VehicleCatalogModal
        vehicle={catalogVehicle}
        isOpen={!!catalogVehicle}
        onClose={() => setCatalogVehicle(null)}
      />
    </div>
  );
};
