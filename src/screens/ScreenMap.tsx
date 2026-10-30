import { motion } from 'framer-motion';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onNavigate: (screen: Screen) => void;
}

const screens = [
  { id: 'onboarding' as Screen, name: 'Онбординг', emoji: '👋', desc: 'Приветствие и объяснение ценности', x: 50, y: 8 },
  { id: 'home' as Screen, name: 'Главная', emoji: '🏠', desc: 'Цитата дня, список, фильтры', x: 50, y: 25 },
  { id: 'add' as Screen, name: 'Добавить цитату', emoji: '✍️', desc: 'Текст, автор, источник, теги', x: 20, y: 42 },
  { id: 'card' as Screen, name: 'Карточка цитаты', emoji: '💬', desc: 'Полный текст, действия', x: 50, y: 42 },
  { id: 'search' as Screen, name: 'Поиск и фильтры', emoji: '🔍', desc: 'Поиск, теги, дата, избранное', x: 80, y: 42 },
  { id: 'settings' as Screen, name: 'Настройки', emoji: '⚙️', desc: 'Тема, напоминания, экспорт', x: 50, y: 60 },
];

const states = [
  { name: 'Пустая коллекция', emoji: '📭', desc: 'Главный экран без цитат' },
  { name: 'Пустой результат поиска', emoji: '🔎', desc: 'Ничего не найдено' },
  { name: 'Загрузка списка', emoji: '⏳', desc: 'Скелетон-загрузка' },
  { name: 'Ошибка сети', emoji: '❌', desc: 'Кнопка «Повторить»' },
  { name: 'Подтверждение удаления', emoji: '⚠️', desc: 'Модальное окно' },
  { name: 'Успешное сохранение', emoji: '✅', desc: 'Тост-уведомление' },
];

const flows = [
  {
    title: 'Сохранение цитаты',
    steps: ['Главная', 'Нажать «+»', 'Заполнить форму', 'Сохранить', 'Главная (новая цитата вверху)'],
    emoji: '✍️'
  },
  {
    title: 'Просмотр цитаты',
    steps: ['Главная', 'Нажать на цитату', 'Карточка', 'Действия', 'Назад на главную'],
    emoji: '👁️'
  },
  {
    title: 'Поиск цитаты',
    steps: ['Главная', 'Поиск', 'Ввести запрос', 'Результаты', 'Выбрать цитату'],
    emoji: '🔍'
  },
  {
    title: 'Первый запуск',
    steps: ['Онбординг', 'Начать', 'Главная (пустая)', 'Добавить первую цитату'],
    emoji: '🚀'
  },
];

export default function ScreenMap({ variant, theme, onNavigate }: Props) {
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  return (
    <div className={`h-full w-full overflow-y-auto scrollbar-hide ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-10`}>
      <div className="px-5 pt-4 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${isLight ? 'text-deep-blue' : 'text-amber'} ${isEmotional ? 'font-serif italic' : ''}`}>
            Карта экранов
          </h1>
          <p className={`text-sm mt-1 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            Структура приложения «Любимые цитаты»
          </p>
        </div>

        {/* Screen Flow */}
        <div className="mb-8">
          <h2 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            Навигация
          </h2>
          <div className="relative">
            {screens.map((screen, i) => (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="mb-2"
              >
                <button
                  onClick={() => onNavigate(screen.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    isLight 
                      ? 'bg-white border border-warm-border hover:border-deep-blue/30 hover:shadow-sm' 
                      : 'bg-dark-card border border-dark-border hover:border-amber/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{screen.emoji}</span>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                        {screen.name}
                      </div>
                      <div className={`text-xs ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                        {screen.desc}
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      isLight ? 'bg-gray-100 text-gray-500' : 'bg-gray-700 text-gray-400'
                    }`}>
                      →
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Flows */}
        <div className="mb-8">
          <h2 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            Пользовательские сценарии
          </h2>
          {flows.map((flow, i) => (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`mb-3 p-3 rounded-xl ${
                isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{flow.emoji}</span>
                <span className={`text-sm font-medium ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                  {flow.title}
                </span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {flow.steps.map((step, j) => (
                  <span key={j} className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-md ${
                      isLight ? 'bg-blue-50 text-deep-blue' : 'bg-amber/10 text-amber'
                    }`}>
                      {step}
                    </span>
                    {j < flow.steps.length - 1 && (
                      <span className={`text-xs ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>→</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* States */}
        <div className="mb-8">
          <h2 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            Состояния
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {states.map((state, i) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`p-3 rounded-xl text-center ${
                  isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'
                }`}
              >
                <span className="text-2xl block mb-1">{state.emoji}</span>
                <span className={`text-xs font-medium block ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                  {state.name}
                </span>
                <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                  {state.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Design Principles */}
        <div className={`p-4 rounded-xl ${
          isLight ? 'bg-gradient-to-br from-blue-50 to-amber-50 border border-blue-100' : 'bg-gradient-to-br from-deep-blue/20 to-amber/10 border border-amber/20'
        }`}>
          <h3 className={`text-sm font-semibold mb-2 ${isLight ? 'text-deep-blue' : 'text-amber'}`}>
            🎨 Принципы дизайна
          </h3>
          <ul className={`text-xs space-y-1.5 ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
            <li>• Мобильный first, ширина 390px (iPhone)</li>
            <li>• Нативный вид Telegram Mini App</li>
            <li>• Спокойный, тёплый, минималистичный</li>
            <li>• Читаемая типографика с акцентом на текст цитат</li>
            <li>• Поддержка светлой и тёмной темы</li>
            <li>• Глубокий синий + тёплый янтарный</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
