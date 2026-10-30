import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconHome, IconSearch, IconPlus, IconSettings } from './components/Icons';
import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/HomeScreen';
import AddQuote from './screens/AddQuote';
import QuoteCard from './screens/QuoteCard';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import type { Screen, ThemeMode } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quotes_onboarded');
    if (saved === 'true') {
      setHasOnboarded(true);
      setCurrentScreen('home');
    }
  }, []);

  const navigate = (screen: Screen) => {
    if (screen !== 'onboarding') setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => setCurrentScreen(previousScreen);

  const handleStart = () => {
    localStorage.setItem('quotes_onboarded', 'true');
    setHasOnboarded(true);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding theme={themeMode} onStart={handleStart} />;
      case 'home':
        return <HomeScreen theme={themeMode} onNavigate={navigate} />;
      case 'add':
        return <AddQuote theme={themeMode} onBack={goBack} onSave={() => navigate('home')} />;
      case 'card':
        return <QuoteCard theme={themeMode} onBack={goBack} />;
      case 'search':
        return <SearchScreen theme={themeMode} onBack={goBack} onNavigate={navigate} />;
      case 'settings':
        return <SettingsScreen theme={themeMode} onBack={goBack} setTheme={setThemeMode} />;
      default:
        return <HomeScreen theme={themeMode} onNavigate={navigate} />;
    }
  };

  const isLight = themeMode === 'light';

  return (
    <div className="min-h-screen bg-[#2a2825] flex items-center justify-center py-8 px-4">
      <div className="phone-frame relative">
        <div className="phone-notch" />

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-3.5 pb-1">
          <span className={`text-[11px] font-medium tabular-nums ${isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]'}`}>
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-[18px] h-[9px] rounded-[2px] border ${isLight ? 'border-[#1c1c1c]' : 'border-[#e8e2d6]'}`}>
              <div className={`w-[12px] h-full rounded-[1px] ${isLight ? 'bg-[#1c1c1c]' : 'bg-[#e8e2d6]'}`} />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-full w-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen + themeMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>

          {/* Home Indicator */}
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] rounded-full ${
            isLight ? 'bg-[#1c1c1c]/20' : 'bg-[#e8e2d6]/20'
          } z-50`} />
        </div>
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'onboarding' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className={`flex items-center border ${isLight ? 'bg-[#f5f0e8]/95 border-[#d4cdc2] text-[#1c1c1c]' : 'bg-[#1e1c18]/95 border-[#2e2b25] text-[#e8e2d6]'} backdrop-blur-xl rounded-2xl px-2 py-2 shadow-xl`}>
            <NavBtn icon={<IconHome size={16} />} label="Главная" active={currentScreen === 'home'} onClick={() => navigate('home')} theme={themeMode} />
            <NavBtn icon={<IconSearch size={16} />} label="Поиск" active={currentScreen === 'search'} onClick={() => navigate('search')} theme={themeMode} />
            <NavBtn icon={<IconPlus size={16} />} label="Новая" active={currentScreen === 'add'} onClick={() => navigate('add')} theme={themeMode} />
            <NavBtn icon={<IconSettings size={16} />} label="Настройки" active={currentScreen === 'settings'} onClick={() => navigate('settings')} theme={themeMode} />
          </div>
        </div>
      )}
    </div>
  );
}

function NavBtn({ icon, label, active, onClick, theme }: {
  icon: React.ReactNode; label: string; active: boolean; onClick: () => void; theme: ThemeMode;
}) {
  const isLight = theme === 'light';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-full transition-all ${
        active
          ? isLight ? 'text-[#b87333]' : 'text-[#d4944a]'
          : isLight ? 'text-[#8a8580] hover:text-[#1c1c1c]' : 'text-[#7a7368] hover:text-[#e8e2d6]'
      }`}
    >
      {icon}
      <span className="text-[9px] tracking-editorial uppercase">{label}</span>
    </button>
  );
}
