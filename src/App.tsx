import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Home, PlusCircle, Search, Settings, ArrowLeft, 
  Palette, Monitor, Smartphone, Map
} from 'lucide-react';
import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/HomeScreen';
import AddQuote from './screens/AddQuote';
import QuoteCard from './screens/QuoteCard';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import ScreenMap from './screens/ScreenMap';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('map');
  const [designVariant, setDesignVariant] = useState<DesignVariant>('minimal');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');

  const navigate = (screen: Screen) => {
    if (screen !== 'map') setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen(previousScreen);
  };

  const themeClasses = themeMode === 'light' 
    ? 'bg-warm-bg text-warm-text' 
    : 'bg-dark-bg text-dark-text';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding variant={designVariant} theme={themeMode} onStart={() => navigate('home')} />;
      case 'home':
        return <HomeScreen variant={designVariant} theme={themeMode} onNavigate={navigate} />;
      case 'add':
        return <AddQuote variant={designVariant} theme={themeMode} onBack={goBack} onSave={() => navigate('home')} />;
      case 'card':
        return <QuoteCard variant={designVariant} theme={themeMode} onBack={goBack} />;
      case 'search':
        return <SearchScreen variant={designVariant} theme={themeMode} onBack={goBack} onNavigate={navigate} />;
      case 'settings':
        return <SettingsScreen variant={designVariant} theme={themeMode} onBack={goBack} />;
      case 'map':
        return <ScreenMap variant={designVariant} theme={themeMode} onNavigate={navigate} />;
      default:
        return <HomeScreen variant={designVariant} theme={themeMode} onNavigate={navigate} />;
    }
  };

  return (
    <div className={`min-h-screen ${themeMode === 'light' ? 'bg-gray-100' : 'bg-gray-900'} transition-colors duration-300`}>
      {/* Control Panel */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="text-2xl">📖</span> Любимые цитаты
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">Design Concept</span>
          </h1>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Design Variant Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setDesignVariant('minimal')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  designVariant === 'minimal' 
                    ? 'bg-white dark:bg-gray-600 shadow text-deep-blue dark:text-amber' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Monitor size={12} className="inline mr-1" />
                Минимализм
              </button>
              <button
                onClick={() => setDesignVariant('emotional')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  designVariant === 'emotional' 
                    ? 'bg-white dark:bg-gray-600 shadow text-deep-blue dark:text-amber' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <Palette size={12} className="inline mr-1" />
                Эмоциональный
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {themeMode === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
            </button>

            {/* Screen Map */}
            <button
              onClick={() => navigate('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentScreen === 'map'
                  ? 'bg-deep-blue text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Map size={12} />
              Карта экранов
            </button>
          </div>
        </div>
      </div>

      {/* Phone Preview */}
      <div className="pt-24 pb-20 flex justify-center items-start">
        <div className="flex flex-col items-center">
          {/* Variant Label */}
          <div className={`mb-4 text-center ${themeMode === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            <span className="text-sm font-medium">
              {designVariant === 'minimal' ? '🖥️ Вариант 1: Минимализм' : '🎨 Вариант 2: Эмоциональный'}
            </span>
            <span className="text-xs block mt-0.5 opacity-60">
              {themeMode === 'light' ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
            </span>
          </div>
          <div className={`phone-frame ${themeClasses} relative`}>
          <div className="phone-notch" />
          
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-3 pb-1">
            <span className={`text-xs font-medium ${themeMode === 'light' ? 'text-black' : 'text-white'}`}>9:41</span>
            <div className="flex items-center gap-1">
              <div className={`w-4 h-2.5 rounded-sm border ${themeMode === 'light' ? 'border-black' : 'border-white'}`}>
                <div className={`w-2.5 h-full rounded-sm ${themeMode === 'light' ? 'bg-black' : 'bg-white'}`} />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="h-full w-full overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen + designVariant + themeMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gray-500/30 z-50" />
          </div>
        </div>
        
        {/* Screen info */}
        <div className={`mt-6 text-center max-w-[390px] ${themeMode === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          <p className="text-xs">
            {currentScreen === 'map' && '📱 Карта экранов — навигация по всем экранам приложения'}
            {currentScreen === 'onboarding' && '👋 Онбординг — знакомство с приложением'}
            {currentScreen === 'home' && '🏠 Главная — цитата дня, фильтры и список цитат'}
            {currentScreen === 'add' && '✍️ Добавление — форма для новой цитаты'}
            {currentScreen === 'card' && '💬 Карточка — полный просмотр цитаты и действия'}
            {currentScreen === 'search' && '🔍 Поиск — нахождение цитат по тексту, тегам'}
            {currentScreen === 'settings' && '⚙️ Настройки — тема, напоминания, экспорт'}
          </p>
        </div>
        </div>
      </div>

      {/* Bottom Navigation (for non-map screens) */}
      {currentScreen !== 'map' && currentScreen !== 'onboarding' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <NavButton icon={<Home size={16} />} label="Главная" active={currentScreen === 'home'} onClick={() => navigate('home')} />
            <NavButton icon={<Search size={16} />} label="Поиск" active={currentScreen === 'search'} onClick={() => navigate('search')} />
            <NavButton icon={<PlusCircle size={16} />} label="Добавить" active={currentScreen === 'add'} onClick={() => navigate('add')} />
            <NavButton icon={<Settings size={16} />} label="Настройки" active={currentScreen === 'settings'} onClick={() => navigate('settings')} />
          </div>
        </div>
      )}

      {/* Design Concept Info */}
      <div className={`max-w-3xl mx-auto px-6 pb-12 ${themeMode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        <div className={`p-6 rounded-2xl ${themeMode === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${themeMode === 'light' ? 'text-gray-800' : 'text-white'}`}>
            📖 Дизайн-концепция «Любимые цитаты»
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className={`font-medium mb-1 ${themeMode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Платформа</h4>
              <p>Telegram Mini App, mobile-first, 390px (iPhone)</p>
            </div>
            <div>
              <h4 className={`font-medium mb-1 ${themeMode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Стиль</h4>
              <p>Спокойный, тёплый, минималистичный</p>
            </div>
            <div>
              <h4 className={`font-medium mb-1 ${themeMode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Цвета</h4>
              <p>Глубокий синий (#1a2744) + тёплый янтарный (#e8a838)</p>
            </div>
            <div>
              <h4 className={`font-medium mb-1 ${themeMode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Типографика</h4>
              <p>Inter (UI) + Playfair Display (акценты)</p>
            </div>
          </div>
          <div className={`mt-4 pt-4 border-t ${themeMode === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
            <h4 className={`font-medium mb-2 ${themeMode === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              🎯 Два варианта дизайна:
            </h4>
            <div className="flex gap-4 text-xs">
              <div className={`flex-1 p-3 rounded-lg ${themeMode === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'}`}>
                <strong>1. Минимализм</strong> — чистые линии, нейтральные цвета, акцент на функциональность
              </div>
              <div className={`flex-1 p-3 rounded-lg ${themeMode === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'}`}>
                <strong>2. Эмоциональный</strong> — выразительная типографика (serif italic), мягкие градиенты, тёплые акценты
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
        active 
          ? 'text-deep-blue dark:text-amber bg-blue-50 dark:bg-amber/10' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
