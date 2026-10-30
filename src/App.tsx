import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconHome, IconSearch, IconPlus, IconSettings, IconMap, IconSun, IconMoon } from './components/Icons';
import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/HomeScreen';
import AddQuote from './screens/AddQuote';
import QuoteCard from './screens/QuoteCard';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import ScreenMap from './screens/ScreenMap';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type ThemeMode = 'light' | 'dark';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('map');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');

  const navigate = (screen: Screen) => {
    if (screen !== 'map') setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => setCurrentScreen(previousScreen);

  const isLight = themeMode === 'light';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding theme={themeMode} onStart={() => navigate('home')} />;
      case 'home':
        return <HomeScreen theme={themeMode} onNavigate={navigate} />;
      case 'add':
        return <AddQuote theme={themeMode} onBack={goBack} onSave={() => navigate('home')} />;
      case 'card':
        return <QuoteCard theme={themeMode} onBack={goBack} />;
      case 'search':
        return <SearchScreen theme={themeMode} onBack={goBack} onNavigate={navigate} />;
      case 'settings':
        return <SettingsScreen theme={themeMode} onBack={goBack} />;
      case 'map':
        return <ScreenMap theme={themeMode} onNavigate={navigate} />;
      default:
        return <HomeScreen theme={themeMode} onNavigate={navigate} />;
    }
  };

  const screenLabel: Record<Screen, string> = {
    map: 'Карта экранов',
    onboarding: 'Онбординг',
    home: 'Главная',
    add: 'Добавить цитату',
    card: 'Карточка',
    search: 'Поиск',
    settings: 'Настройки',
  };

  return (
    <div className="min-h-screen bg-[#2a2825] text-[#e8e2d6] py-8 px-4">
      {/* Top Control Bar */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] tracking-editorial uppercase text-[#b5afa6]">№ 01</span>
              <h1 className="text-2xl font-editorial text-[#e8e2d6]">Любимые цитаты</h1>
            </div>
            <p className="text-xs text-[#8a8580] mt-1 tracking-wide">
              Telegram Mini App · Design Concept · 390 × 844
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('map')}
              className={`flex items-center gap-2 px-4 py-2 text-xs tracking-editorial uppercase transition-all border ${
                currentScreen === 'map'
                  ? 'bg-[#b87333] text-[#1c1c1c] border-[#b87333]'
                  : 'bg-transparent text-[#b5afa6] border-white/10 hover:border-[#b87333]/50 hover:text-[#e8e2d6]'
              }`}
            >
              <IconMap size={14} />
              Карта
            </button>
            <button
              onClick={() => setThemeMode(isLight ? 'dark' : 'light')}
              className="flex items-center gap-2 px-4 py-2 text-xs tracking-editorial uppercase text-[#b5afa6] border border-white/10 hover:border-[#b87333]/50 hover:text-[#e8e2d6] transition-all"
            >
              {isLight ? <IconMoon size={14} /> : <IconSun size={14} />}
              {isLight ? 'Тёмная' : 'Светлая'}
            </button>
          </div>
        </div>
      </div>

      {/* Phone Preview */}
      <div className="flex justify-center pb-12">
        <div className="flex flex-col items-center">
          {/* Screen label */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-[#b87333]/40" />
            <span className="text-[10px] tracking-editorial uppercase text-[#b87333]">
              {screenLabel[currentScreen]}
            </span>
            <div className="h-px w-8 bg-[#b87333]/40" />
          </div>

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

          {/* Caption under phone */}
          <div className="mt-8 text-center max-w-[390px]">
            <p className="text-[10px] tracking-editorial uppercase text-[#8a8580]">
              {currentScreen === 'map' && 'Навигация по всем экранам приложения'}
              {currentScreen === 'onboarding' && 'Знакомство с ценностью приложения'}
              {currentScreen === 'home' && 'Цитата дня, список, фильтры · переключайте состояния ниже'}
              {currentScreen === 'add' && 'Форма сохранения новой цитаты'}
              {currentScreen === 'card' && 'Полный просмотр · действия · удаление'}
              {currentScreen === 'search' && 'Поиск по тексту, автору, тегам'}
              {currentScreen === 'settings' && 'Тема, напоминания, экспорт данных'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'map' && currentScreen !== 'onboarding' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className={`flex items-center border ${isLight ? 'bg-[#f5f0e8]/95 border-[#d4cdc2] text-[#1c1c1c]' : 'bg-[#1e1c18]/95 border-[#2e2b25] text-[#e8e2d6]'} backdrop-blur-xl rounded-full px-2 py-2 shadow-2xl`}>
            <NavBtn icon={<IconHome size={16} />} label="Главная" active={currentScreen === 'home'} onClick={() => navigate('home')} theme={themeMode} />
            <NavBtn icon={<IconSearch size={16} />} label="Поиск" active={currentScreen === 'search'} onClick={() => navigate('search')} theme={themeMode} />
            <NavBtn icon={<IconPlus size={16} />} label="Новая" active={currentScreen === 'add'} onClick={() => navigate('add')} theme={themeMode} />
            <NavBtn icon={<IconSettings size={16} />} label="Настройки" active={currentScreen === 'settings'} onClick={() => navigate('settings')} theme={themeMode} />
          </div>
        </div>
      )}

      {/* Editorial Footer */}
      <div className="max-w-5xl mx-auto pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <div className="text-[10px] tracking-editorial uppercase text-[#b87333] mb-2">Платформа</div>
            <p className="text-[#b5afa6] leading-relaxed">Telegram Mini App · iPhone 390px · Mobile-first</p>
          </div>
          <div>
            <div className="text-[10px] tracking-editorial uppercase text-[#b87333] mb-2">Палитра</div>
            <p className="text-[#b5afa6] leading-relaxed">Бумажный фон · Чернильный текст · Янтарный акцент</p>
          </div>
          <div>
            <div className="text-[10px] tracking-editorial uppercase text-[#b87333] mb-2">Типографика</div>
            <p className="text-[#b5afa6] leading-relaxed">Playfair Display · Inter · Крупные кавычки · Нумерация</p>
          </div>
          <div>
            <div className="text-[10px] tracking-editorial uppercase text-[#b87333] mb-2">Принципы</div>
            <p className="text-[#b5afa6] leading-relaxed">Воздух · Тонкие линии · Книжный премиум · Цитата — главный герой</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] tracking-editorial uppercase text-[#8a8580]">
          <span>№ 01 · Дизайн-концепция</span>
          <span>Минимализм · Редакционный стиль</span>
        </div>
      </div>
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
