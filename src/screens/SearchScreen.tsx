import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, X, Star, Filter } from 'lucide-react';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';
type SearchState = 'default' | 'results' | 'empty';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const allQuotes = [
  { id: 1, text: 'Мы — то, что мы делаем постоянно. Совершенство — не действие, а привычка.', author: 'Аристотель', tags: ['философия', 'привычки'], favorite: true },
  { id: 2, text: 'Будь собой; прочие роли уже заняты.', author: 'Оскар Уайльд', tags: ['жизнь', 'личность'], favorite: false },
  { id: 3, text: 'Единственное, чего стоит бояться — это самого страха.', author: 'Франклин Рузвельт', tags: ['мужество'], favorite: true },
  { id: 4, text: 'В середине трудности лежит возможность.', author: 'Альберт Эйнштейн', tags: ['мотивация'], favorite: false },
  { id: 5, text: 'Образование — самое мощное оружие, которым можно изменить мир.', author: 'Нельсон Мандела', tags: ['мудрость', 'образование'], favorite: true },
];

const allTags = ['философия', 'привычки', 'жизнь', 'личность', 'мужество', 'мотивация', 'мудрость', 'образование', 'любовь', 'творчество'];

export default function SearchScreen({ variant, theme, onBack, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>('default');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  const filteredQuotes = allQuotes.filter(q => {
    const matchesQuery = !query || 
      q.text.toLowerCase().includes(query.toLowerCase()) ||
      q.author.toLowerCase().includes(query.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(t => q.tags.includes(t));
    const matchesFavorites = !showFavoritesOnly || q.favorite;
    return matchesQuery && matchesTags && matchesFavorites;
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setState('results');
    } else if (!selectedTags.length && !showFavoritesOnly) {
      setState('default');
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setState('results');
  };

  return (
    <div className={`h-full w-full flex flex-col ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-10`}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className={`p-1.5 rounded-lg ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            <ArrowLeft size={20} />
          </button>
          <h2 className={`text-lg font-bold ${isLight ? 'text-deep-blue' : 'text-amber'} ${isEmotional ? 'italic' : ''}`}
            style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
            Поиск
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`} />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Поиск по тексту или автору..."
            className={`w-full pl-10 pr-10 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
              isLight 
                ? 'bg-white border border-warm-border focus:ring-deep-blue/30 text-warm-text placeholder:text-gray-300' 
                : 'bg-dark-card border border-dark-border focus:ring-amber/30 text-dark-text placeholder:text-gray-600'
            }`}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setState('default'); }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* State Switcher */}
        <div className="flex gap-1 mt-3">
          {(['default', 'results', 'empty'] as SearchState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                state === s
                  ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                  : isLight ? 'bg-white border border-warm-border text-warm-muted' : 'bg-dark-card border border-dark-border text-dark-muted'
              }`}
            >
              {s === 'default' ? '📋 По умолчанию' : s === 'results' ? '✅ Результаты' : '🔎 Пусто'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-20">
        <AnimatePresence mode="wait">
          {state === 'default' && (
            <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl mb-4 w-full ${
                  isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'
                }`}
              >
                <Filter size={14} className={isLight ? 'text-warm-muted' : 'text-dark-muted'} />
                <span className={`text-sm ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>Фильтры</span>
                <span className={`ml-auto text-xs ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                  {showFilters ? '▼' : '▶'}
                </span>
              </button>

              {/* Filters Panel */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4 space-y-3"
                >
                  {/* Favorites Filter */}
                  <div className={`p-3 rounded-xl ${isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'}`}>
                    <button
                      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                      className="flex items-center gap-2 w-full"
                    >
                      <Star size={14} className={showFavoritesOnly ? 'text-amber fill-amber' : isLight ? 'text-warm-muted' : 'text-dark-muted'} />
                      <span className={`text-sm ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                        Только избранное
                      </span>
                      <div className={`ml-auto w-10 h-5 rounded-full transition-all ${
                        showFavoritesOnly 
                          ? isLight ? 'bg-deep-blue' : 'bg-amber'
                          : isLight ? 'bg-gray-200' : 'bg-gray-700'
                      }`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          showFavoritesOnly ? 'translate-x-5' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </div>
                    </button>
                  </div>

                  {/* Tags */}
                  <div className={`p-3 rounded-xl ${isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'}`}>
                    <div className={`text-xs font-medium mb-2 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                      Теги
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                            selectedTags.includes(tag)
                              ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                              : isLight ? 'bg-gray-100 text-warm-text' : 'bg-gray-700 text-dark-text'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Recent / All */}
              <div className={`text-xs font-medium uppercase tracking-wider mb-3 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Все цитаты
              </div>
              <div className="space-y-2">
                {allQuotes.map((quote, i) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <SearchResultItem quote={quote} isLight={isLight} isEmotional={isEmotional} onClick={() => onNavigate('card')} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'results' && filteredQuotes.length > 0 && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={`text-xs font-medium mb-3 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Найдено: {filteredQuotes.length}
              </div>
              <div className="space-y-2">
                {filteredQuotes.map((quote, i) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <SearchResultItem quote={quote} isLight={isLight} isEmotional={isEmotional} onClick={() => onNavigate('card')} highlight={query} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'empty' && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center ${
                isLight ? 'bg-gray-100' : 'bg-gray-800'
              }`}>
                <span className="text-4xl">🔎</span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                Ничего не найдено
              </h3>
              <p className={`text-sm max-w-[240px] ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Попробуйте изменить запрос или убрать фильтры
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SearchResultItem({ quote, isLight, isEmotional, onClick, highlight }: { 
  quote: typeof allQuotes[0]; isLight: boolean; isEmotional: boolean; onClick: () => void; highlight?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all active:scale-[0.98] ${
        isLight 
          ? 'bg-white border border-warm-border hover:shadow-sm' 
          : 'bg-dark-card border border-dark-border hover:border-amber/30'
      }`}
    >
      <div className="flex items-start gap-2">
        {quote.favorite && <Star size={12} className="text-amber fill-amber mt-1 flex-shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-relaxed line-clamp-2 ${isLight ? 'text-warm-text' : 'text-dark-text'} ${
            isEmotional ? 'italic' : ''
          }`} style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
            «{quote.text}»
          </p>
          <div className={`text-xs mt-1.5 ${isLight ? 'text-deep-blue' : 'text-amber'}`}>
            — {quote.author}
          </div>
          <div className="flex gap-1 mt-1.5">
            {quote.tags.map((tag) => (
              <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isLight ? 'bg-gray-100 text-gray-500' : 'bg-gray-700 text-gray-400'
              }`}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
