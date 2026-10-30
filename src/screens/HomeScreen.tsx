import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSearch, IconSettings, IconPlus, IconStar, IconStarFilled } from '../components/Icons';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type ThemeMode = 'light' | 'dark';
type HomeState = 'default' | 'empty' | 'loading' | 'error';

interface Props {
  theme: ThemeMode;
  onNavigate: (screen: Screen) => void;
}

const quotes = [
  { id: 1, text: 'Мы — то, что мы делаем постоянно. Совершенство — не действие, а привычка.', author: 'Аристотель', source: 'Никомахова этика', date: '12 янв', tags: ['философия'], favorite: true },
  { id: 2, text: 'Будь собой; прочие роли уже заняты.', author: 'Оскар Уайльд', source: 'Заметка', date: '10 янв', tags: ['жизнь'], favorite: false },
  { id: 3, text: 'Единственное, чего стоит бояться — это самого страха.', author: 'Ф. Рузвельт', source: 'Речь, 1933', date: '8 янв', tags: ['мужество'], favorite: true },
  { id: 4, text: 'В середине трудности лежит возможность.', author: 'А. Эйнштейн', source: 'Письмо', date: '5 янв', tags: ['мотивация'], favorite: false },
];

const quoteOfDay = {
  text: 'Жизнь — это то, что с тобой происходит, пока ты строишь другие планы.',
  author: 'Джон Леннон',
  source: 'Интервью, 1980',
};

export default function HomeScreen({ theme, onNavigate }: Props) {
  const [state, setState] = useState<HomeState>('default');
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';
  const accentBg = isLight ? 'bg-[#b87333]' : 'bg-[#d4944a]';

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-10`}>
      {/* Header */}
      <div className="px-7 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-1`}>Коллекция</div>
            <h1 className="font-editorial text-[28px] leading-none tracking-tight">
              Мои <span className={accent}>цитаты</span>
            </h1>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <button onClick={() => onNavigate('search')} className={`p-2.5 rounded-full transition-colors ${isLight ? 'hover:bg-[#e5ddd0]' : 'hover:bg-[#1e1c18]'}`}>
              <IconSearch size={18} className={muted} />
            </button>
            <button onClick={() => onNavigate('settings')} className={`p-2.5 rounded-full transition-colors ${isLight ? 'hover:bg-[#e5ddd0]' : 'hover:bg-[#1e1c18]'}`}>
              <IconSettings size={18} className={muted} />
            </button>
          </div>
        </div>

        {/* State switcher — editorial */}
        <div className="mt-5 flex items-center gap-3">
          <span className={`text-[9px] tracking-editorial uppercase ${muted}`}>Вид:</span>
          {([
            { id: 'default', label: 'Список' },
            { id: 'empty', label: 'Пусто' },
            { id: 'loading', label: 'Загрузка' },
            { id: 'error', label: 'Ошибка' },
          ] as { id: HomeState; label: string }[]).map((s) => (
            <button
              key={s.id}
              onClick={() => setState(s.id)}
              className={`text-[10px] tracking-editorial uppercase pb-0.5 border-b transition-all ${
                state === s.id
                  ? `${accent} border-current`
                  : `${muted} border-transparent hover:border-current`
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        <AnimatePresence mode="wait">
          {state === 'loading' && <LoadingState key="l" isLight={isLight} rule={rule} muted={muted} />}
          {state === 'error' && <ErrorState key="e" isLight={isLight} muted={muted} accent={accent} onRetry={() => setState('default')} />}
          {state === 'empty' && <EmptyState key="em" isLight={isLight} muted={muted} accent={accent} onAdd={() => onNavigate('add')} />}
          {state === 'default' && (
            <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Quote of the Day — hero */}
              <div className="px-7 pt-2 pb-6">
                <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>
                  — Цитата дня —
                </div>
                <div className={`p-6 rounded-2xl ${isLight ? 'bg-[#ede7db]' : 'bg-[#1e1c18]'}`}>
                  <p className="font-editorial text-[20px] leading-[1.35] tracking-tight">
                    <span className={`${accent} text-[24px] mr-1`}>"</span>
                    {quoteOfDay.text}
                    <span className={`${accent} text-[24px] ml-1`}>"</span>
                  </p>
                  <div className={`mt-4 pt-3 border-t ${rule}`}>
                    <div className={`text-[12px] ${ink}`}>— {quoteOfDay.author}</div>
                    <div className={`text-[10px] tracking-editorial uppercase ${muted} mt-0.5`}>{quoteOfDay.source}</div>
                  </div>
                </div>
              </div>

              {/* Divider with label */}
              <div className="px-7 mt-8 mb-5 flex items-center gap-4">
                <div className={`flex-1 h-px ${rule}`} />
                <span className={`text-[10px] tracking-editorial uppercase ${muted}`}>Недавние</span>
                <div className={`flex-1 h-px ${rule}`} />
              </div>

              {/* Numbered list */}
              <div className="px-7 space-y-0">
                {quotes.map((q, i) => (
                  <motion.button
                    key={q.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => onNavigate('card')}
                    className={`w-full text-left py-5 border-b ${rule} group transition-colors`}
                  >
                    <div className="flex gap-5">
                      <span className={`text-[13px] ${muted} pt-1 w-6 tabular-nums font-medium`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-editorial text-[15px] leading-[1.4] tracking-tight line-clamp-2 group-hover:opacity-70 transition-opacity">
                          {q.text}
                        </p>
                        <div className="flex items-center gap-3 mt-2.5">
                          <span className={`text-[11px] tracking-editorial uppercase ${accent}`}>
                            {q.author}
                          </span>
                          <span className={`text-[10px] ${muted}`}>{q.date}</span>
                          {q.favorite && <IconStarFilled size={11} className={accent} />}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className={`text-center py-8 text-[10px] tracking-editorial uppercase ${muted}`}>
                — конец —
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB — editorial plus */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => onNavigate('add')}
        className={`absolute bottom-8 right-7 w-12 h-12 flex items-center justify-center transition-all rounded-full border-2 ${accent} ${isLight ? 'border-[#b87333] text-[#b87333] bg-[#f5f0e8]/80' : 'border-[#d4944a] text-[#d4944a] bg-[#171512]/80'} backdrop-blur-sm`}
      >
        <IconPlus size={20} />
      </motion.button>
    </div>
  );
}

function LoadingState({ isLight, rule, muted }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-7 pt-4 space-y-6">
      {/* Skeleton hero */}
      <div className={`p-6 rounded-2xl ${isLight ? 'bg-[#ede7db]' : 'bg-[#1e1c18]'}`}>
        <div className={`h-2 w-24 rounded-full mb-5 ${isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]'}`} />
        <div className={`h-6 w-full rounded-full mb-2 ${isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]'}`} />
        <div className={`h-6 w-3/4 rounded-full mb-2 ${isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]'}`} />
        <div className={`h-3 w-32 rounded-full mt-5 ${isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]'}`} />
      </div>
      <div className={`h-px ${rule}`} />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-5 py-5 border-b" style={{ borderColor: isLight ? '#d4cdc2' : '#2e2b25' }}>
          <div className={`h-4 w-6 rounded-full ${isLight ? 'bg-[#e5ddd0]' : 'bg-[#2e2b25]'}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-4 w-full rounded-full ${isLight ? 'bg-[#e5ddd0]' : 'bg-[#2e2b25]'}`} />
            <div className={`h-4 w-2/3 rounded-full ${isLight ? 'bg-[#e5ddd0]' : 'bg-[#2e2b25]'}`} />
            <div className={`h-2.5 w-20 rounded-full mt-2 ${isLight ? 'bg-[#e5ddd0]' : 'bg-[#2e2b25]'}`} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function ErrorState({ isLight, muted, accent, onRetry }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 px-8 text-center">
      <div className={`w-16 h-16 rounded-full border-2 ${isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]'} flex items-center justify-center mb-6`}>
        <span className={`text-[24px] ${accent}`}>!</span>
      </div>
      <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-3`}>— Ошибка —</div>
      <h3 className="font-editorial text-[24px] leading-tight mb-3">
        Не удалось<br />загрузить
      </h3>
      <p className={`text-[13px] leading-relaxed ${muted} max-w-[260px] mb-8`}>
        Проверьте подключение к сети и попробуйте снова
      </p>
      <button
        onClick={onRetry}
        className={`px-8 py-3.5 rounded-xl border text-[11px] tracking-editorial uppercase transition-all active:scale-95 ${
          isLight ? 'border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#f5f0e8]' : 'border-[#e8e2d6] text-[#e8e2d6] hover:bg-[#e8e2d6] hover:text-[#171512]'
        }`}
      >
        Повторить
      </button>
    </motion.div>
  );
}

function EmptyState({ isLight, muted, accent, onAdd }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 px-8 text-center">
      <div className={`w-20 h-20 rounded-full border-2 ${isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]'} flex items-center justify-center mb-6`}>
        <span className={`text-[32px] font-editorial ${accent}`}>?</span>
      </div>
      <h3 className="font-editorial text-[24px] leading-tight mb-3">
        Пока<br />тишина
      </h3>
      <p className={`text-[13px] leading-relaxed ${muted} max-w-[260px] mb-8`}>
        Сохраните первую цитату, которая тронула вас сегодня
      </p>
      <button
        onClick={onAdd}
        className={`px-8 py-3.5 rounded-xl border text-[11px] tracking-editorial uppercase transition-all active:scale-95 ${
          isLight ? 'border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-[#f5f0e8]' : 'border-[#e8e2d6] text-[#e8e2d6] hover:bg-[#e8e2d6] hover:text-[#171512]'
        }`}
      >
        Добавить первую
      </button>
    </motion.div>
  );
}
