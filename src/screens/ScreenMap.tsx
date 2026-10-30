import { motion } from 'framer-motion';
import { IconArrowRight, IconMap } from '../components/Icons';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type ThemeMode = 'light' | 'dark';

interface Props {
  theme: ThemeMode;
  onNavigate: (screen: Screen) => void;
}

const screens = [
  { id: 'onboarding' as Screen, num: '01', name: 'Онбординг', desc: 'Знакомство с ценностью приложения' },
  { id: 'home' as Screen, num: '02', name: 'Главная', desc: 'Цитата дня, список, фильтры' },
  { id: 'add' as Screen, num: '03', name: 'Добавить цитату', desc: 'Текст, автор, источник, теги' },
  { id: 'card' as Screen, num: '04', name: 'Карточка цитаты', desc: 'Полный текст и действия' },
  { id: 'search' as Screen, num: '05', name: 'Поиск и фильтры', desc: 'Поиск, теги, избранное' },
  { id: 'settings' as Screen, num: '06', name: 'Настройки', desc: 'Тема, напоминания, экспорт' },
];

const flows = [
  { num: 'i.', title: 'Сохранение цитаты', steps: ['Главная', 'Новая', 'Форма', 'Сохранить', 'Главная'] },
  { num: 'ii.', title: 'Просмотр цитаты', steps: ['Главная', 'Карточка', 'Действия', 'Назад'] },
  { num: 'iii.', title: 'Поиск', steps: ['Главная', 'Поиск', 'Запрос', 'Результат'] },
  { num: 'iv.', title: 'Первый запуск', steps: ['Онбординг', 'Начать', 'Главная', 'Добавить'] },
];

const states = [
  { num: 'a.', name: 'Пустая коллекция', desc: 'Главный экран без цитат' },
  { num: 'b.', name: 'Пустой результат поиска', desc: 'Ничего не найдено' },
  { num: 'c.', name: 'Загрузка списка', desc: 'Скелетон-загрузка' },
  { num: 'd.', name: 'Ошибка сети', desc: 'Кнопка «Повторить»' },
  { num: 'e.', name: 'Подтверждение удаления', desc: 'Модальное окно' },
  { num: 'f.', name: 'Успешное сохранение', desc: 'Экран подтверждения' },
];

export default function ScreenMap({ theme, onNavigate }: Props) {
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const ruleBorder = isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';

  return (
    <div className={`h-full w-full overflow-y-auto scrollbar-hide ${paper} ${ink} pt-10`}>
      <div className="px-7 pt-5 pb-10">
        {/* Header */}
        <div className="mb-10">
          <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-2`}>№ 00 · Навигация</div>
          <h1 className="font-editorial text-[32px] leading-[1.05] tracking-tight">
            Карта<br /><span className={accent}>экранов</span>
          </h1>
          <div className={`h-px ${rule} mt-5`} />
        </div>

        {/* Screens */}
        <div className="mb-10">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-5`}>— Экраны —</div>
          {screens.map((screen, i) => (
            <motion.button
              key={screen.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => onNavigate(screen.id)}
              className={`w-full text-left py-4 border-b ${ruleBorder} group flex items-center gap-5`}
            >
              <span className={`font-editorial text-[13px] ${accent} tabular-nums w-7`}>
                {screen.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className={`text-[15px] font-editorial tracking-tight ${ink} group-hover:opacity-70 transition-opacity`}>
                  {screen.name}
                </div>
                <div className={`text-[11px] ${muted} mt-0.5`}>{screen.desc}</div>
              </div>
              <IconArrowRight size={14} className={`${muted} group-hover:translate-x-1 transition-transform`} />
            </motion.button>
          ))}
        </div>

        {/* User Flows */}
        <div className="mb-10">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-5`}>— Сценарии —</div>
          {flows.map((flow, i) => (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className={`py-4 border-b ${ruleBorder}`}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className={`text-[12px] ${accent} font-medium`}>{flow.num}</span>
                <span className={`text-[13px] ${ink}`}>{flow.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap pl-7">
                {flow.steps.map((step, j) => (
                  <span key={j} className="flex items-center gap-2">
                    <span className={`text-[11px] tracking-wide ${ink}`}>{step}</span>
                    {j < flow.steps.length - 1 && (
                      <span className={`${muted}`}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* States */}
        <div className="mb-10">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-5`}>— Состояния —</div>
          {states.map((state, i) => (
            <motion.div
              key={state.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className={`py-3 border-b ${ruleBorder} flex items-baseline gap-4`}
            >
              <span className={`text-[12px] ${accent} w-5 font-medium`}>{state.num}</span>
              <div className="flex-1">
                <div className={`text-[13px] ${ink}`}>{state.name}</div>
                <div className={`text-[11px] ${muted} mt-0.5`}>{state.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design principles */}
        <div className={`pt-6 border-t ${ruleBorder}`}>
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>— Принципы —</div>
          <div className="space-y-3">
            {[
              'Мобильный first · 390px · iPhone',
              'Нативный вид Telegram Mini App',
              'Бумажный фон · чернильный текст · один тёплый акцент',
              'Крупная типографика · большие кавычки · нумерация',
              'Тонкие линии · 1.5px · без заливки',
              'Много воздуха · цитата — главный герой',
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex items-baseline gap-3"
              >
                <span className={`text-[11px] ${accent} font-medium`}>
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className={`text-[12px] leading-relaxed ${ink}`}>{p}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`text-center mt-10 text-[10px] tracking-editorial uppercase ${muted}`}>
          — конец карты —
        </div>
      </div>
    </div>
  );
}
