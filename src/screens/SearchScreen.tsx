import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowLeft, IconSearch, IconClose, IconStarFilled } from '../components/Icons';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type ThemeMode = 'light' | 'dark';
type SearchState = 'default' | 'results' | 'empty';

interface Props {
  theme: ThemeMode;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const allQuotes = [
  { id: 1, text: 'Мы — то, что мы делаем постоянно. Совершенство — не действие, а привычка.', author: 'Аристотель', tags: ['философия', 'привычки'], favorite: true },
  { id: 2, text: 'Будь собой; прочие роли уже заняты.', author: 'Оскар Уайльд', tags: ['жизнь'], favorite: false },
  { id: 3, text: 'Единственное, чего стоит бояться — это самого страха.', author: 'Ф. Рузвельт', tags: ['мужество'], favorite: true },
  { id: 4, text: 'В середине трудности лежит возможность.', author: 'А. Эйнштейн', tags: ['мотивация'], favorite: false },
  { id: 5, text: 'Образование — самое мощное оружие, которым можно изменить мир.', author: 'Н. Мандела', tags: ['мудрость'], favorite: true },
];

const allTags = ['философия', 'привычки', 'жизнь', 'мужество', 'мотивация', 'мудрость', 'любовь', 'творчество'];

export default function SearchScreen({ theme, onBack, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>('default');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const ruleBorder = isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';

  const filteredQuotes = allQuotes.filter(q => {
    const matchesQuery = !query || q.text.toLowerCase().includes(query.toLowerCase()) || q.author.toLowerCase().includes(query.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(t => q.tags.includes(t));
    const matchesFavorites = !showFavoritesOnly || q.favorite;
    return matchesQuery && matchesTags && matchesFavorites;
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) setState('results');
    else if (!selectedTags.length && !showFavoritesOnly) setState('default');
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    setState('results');
  };

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-10`}>
      {/* Header */}
      <div className="px-7 pt-5 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className={`p-1 ${muted}`}>
            <IconArrowLeft size={20} />
          </button>
          <div>
            <div className={`text-[10px] tracking-editorial uppercase ${muted}`}>Поиск</div>
            <h1 className="font-editorial text-[24px] leading-none tracking-tight mt-1">
              Найти <span className={accent}>цитату</span>
            </h1>
          </div>
        </div>

        {/* Search field — editorial underline */}
        <div className="relative">
          <IconSearch size={16} className={`absolute left-0 top-1/2 -translate-y-1/2 ${muted}`} />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Текст или автор..."
            className={`w-full pl-7 pr-7 pb-3 text-[15px] font-editorial border-b ${ruleBorder} focus:outline-none focus:border-current ${accent} ${ink} bg-transparent placeholder:${isLight ? 'text-[#b5afa6]' : 'text-[#4a4640]'}`}
          />
          {query && (
            <button onClick={() => { setQuery(''); setState('default'); }} className={`absolute right-0 top-1/2 -translate-y-1/2 ${muted}`}>
              <IconClose size={14} />
            </button>
          )}
        </div>

        {/* State switcher */}
        <div className="mt-5 flex items-center gap-3">
          <span className={`text-[9px] tracking-editorial uppercase ${muted}`}>Вид:</span>
          {([
            { id: 'default', label: 'Все' },
            { id: 'results', label: 'Результаты' },
            { id: 'empty', label: 'Пусто' },
          ] as { id: SearchState; label: string }[]).map((s) => (
            <button
              key={s.id}
              onClick={() => setState(s.id)}
              className={`text-[10px] tracking-editorial uppercase pb-0.5 border-b transition-all ${
                state === s.id ? `${accent} border-current` : `${muted} border-transparent`
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-7 pb-20">
        <AnimatePresence mode="wait">
          {state === 'default' && (
            <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Favorites toggle */}
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`w-full flex items-center justify-between py-4 border-b ${ruleBorder} mb-2`}
              >
                <div className="flex items-center gap-3">
                  <IconStarFilled size={14} className={showFavoritesOnly ? accent : muted} />
                  <span className={`text-[12px] tracking-wide ${ink}`}>Только избранные</span>
                </div>
                <div className={`w-8 h-[18px] rounded-full border transition-all flex items-center ${showFavoritesOnly ? (isLight ? 'bg-[#b87333] border-[#b87333]' : 'bg-[#d4944a] border-[#d4944a]') : ruleBorder}`}>
                  <div className={`w-[14px] h-[14px] rounded-full transition-transform ${showFavoritesOnly ? 'translate-x-[16px]' : 'translate-x-[2px]'} ${isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]'}`} />
                </div>
              </button>

              {/* Tags filter */}
              <div className="mb-6">
                <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-3`}>— Фильтр по тегам —</div>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {allTags.map((tag, i) => {
                    const selected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-[12px] tracking-wide pb-0.5 border-b transition-all ${
                          selected ? `${accent} border-current` : `${muted} border-transparent`
                        }`}
                      >
                        <span className={`font-editorial italic ${muted} mr-1`}>{String(i + 1).padStart(2, '0')}.</span>
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`h-px ${rule} mb-5`} />

              {/* All quotes — numbered */}
              <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-4`}>Вся коллекция</div>
              <div>
                {allQuotes.map((q, i) => (
                  <motion.button
                    key={q.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onNavigate('card')}
                    className={`w-full text-left py-4 border-b ${ruleBorder} group`}
                  >
                    <div className="flex gap-5">
                      <span className={`font-editorial text-[12px] ${muted} pt-1 w-6 tabular-nums`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-editorial text-[14px] leading-[1.35] tracking-tight line-clamp-2">
                          {q.text}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-[11px] tracking-editorial uppercase ${accent}`}>{q.author}</span>
                          {q.favorite && <IconStarFilled size={10} className={accent} />}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'results' && filteredQuotes.length > 0 && (
            <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-5`}>
                — Найдено: {String(filteredQuotes.length).padStart(2, '0')} —
              </div>
              {filteredQuotes.map((q, i) => (
                <motion.button
                  key={q.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onNavigate('card')}
                  className={`w-full text-left py-4 border-b ${ruleBorder}`}
                >
                  <div className="flex gap-5">
                    <span className={`font-editorial text-[12px] ${muted} pt-1 w-6 tabular-nums`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-editorial text-[14px] leading-[1.35] tracking-tight line-clamp-2">
                        {q.text}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-[11px] tracking-editorial uppercase ${accent}`}>{q.author}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {state === 'empty' && (
            <motion.div
              key="e"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className={`font-editorial ${accent} opacity-30 mb-6`} style={{ fontSize: '80px', lineHeight: 0.8 }}>
                ∅
              </div>
              <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-3`}>— Ничего не найдено —</div>
              <h3 className="font-editorial text-[22px] leading-tight mb-3">
                Пусто
              </h3>
              <p className={`text-[13px] leading-relaxed ${muted} max-w-[260px]`}>
                Попробуйте изменить запрос или убрать фильтры
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
