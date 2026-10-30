import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Star, BookOpen, Film, Mic, MessageCircle, Heart, MoreHorizontal, Settings } from 'lucide-react';

type Screen = 'onboarding' | 'home' | 'add' | 'card' | 'search' | 'settings' | 'map';
type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';
type HomeState = 'default' | 'empty' | 'loading' | 'error';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onNavigate: (screen: Screen) => void;
}

const quotes = [
  { id: 1, text: 'Мы — то, что мы делаем постоянно. Совершенство — не действие, а привычка.', author: 'Аристотель', source: 'Никомахова этика', date: '12 янв', tags: ['философия', 'привычки'], favorite: true },
  { id: 2, text: 'Будь собой; прочие роли уже заняты.', author: 'Оскар Уайльд', source: 'Личная заметка', date: '10 янв', tags: ['жизнь', 'личность'], favorite: false },
  { id: 3, text: 'Единственное, чего стоит бояться — это самого страха.', author: 'Франклин Рузвельт', source: 'Инаугурационная речь, 1933', date: '8 янв', tags: ['мужество', 'история'], favorite: true },
  { id: 4, text: 'В середине трудности лежит возможность.', author: 'Альберт Эйнштейн', source: 'Письмо другу', date: '5 янв', tags: ['мотивация'], favorite: false },
];

const quoteOfDay = {
  text: 'Жизнь — это то, что с тобой происходит, пока ты строишь другие планы.',
  author: 'Джон Леннон',
  source: 'Интервью Playboy, 1980',
};

export default function HomeScreen({ variant, theme, onNavigate }: Props) {
  const [state, setState] = useState<HomeState>('default');
  const [activeFilter, setActiveFilter] = useState('все');
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  const filters = [
    { id: 'все', label: 'Все', emoji: '📋' },
    { id: 'книги', label: 'Книги', emoji: '📚' },
    { id: 'фильмы', label: 'Фильмы', emoji: '🎬' },
    { id: 'подкасты', label: 'Подкасты', emoji: '🎙️' },
    { id: 'жизнь', label: 'Жизнь', emoji: '💬' },
  ];

  return (
    <div className={`h-full w-full flex flex-col ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-10`}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${isLight ? 'text-deep-blue' : 'text-amber'} ${isEmotional ? 'italic' : ''}`}
              style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
              Мои цитаты
            </h1>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
              {quotes.length} сохранённых
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('search')}
              className={`p-2 rounded-xl ${isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'}`}
            >
              <Search size={16} className={isLight ? 'text-warm-muted' : 'text-dark-muted'} />
            </button>
            <button 
              onClick={() => onNavigate('settings')}
              className={`p-2 rounded-xl ${isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'}`}
            >
              <Settings size={16} className={isLight ? 'text-warm-muted' : 'text-dark-muted'} />
            </button>
          </div>
        </div>

        {/* State Switcher (for demo) */}
        <div className={`mt-3 p-2 rounded-xl ${isLight ? 'bg-blue-50/50 border border-blue-100' : 'bg-blue-900/10 border border-blue-800/30'}`}>
          <div className={`text-[9px] uppercase tracking-wider font-semibold mb-1.5 ${isLight ? 'text-blue-400' : 'text-blue-400/70'}`}>
            Демо: переключение состояний
          </div>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {(['default', 'empty', 'loading', 'error'] as HomeState[]).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all ${
                  state === s
                    ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                    : isLight ? 'bg-white border border-warm-border text-warm-muted' : 'bg-dark-card border border-dark-border text-dark-muted'
                }`}
              >
                {s === 'default' ? '📋 Список' : s === 'empty' ? '📭 Пусто' : s === 'loading' ? '⏳ Загрузка' : '❌ Ошибка'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-20">
        <AnimatePresence mode="wait">
          {state === 'loading' && <LoadingState key="loading" isLight={isLight} />}
          {state === 'error' && <ErrorState key="error" isLight={isLight} onRetry={() => setState('default')} />}
          {state === 'empty' && <EmptyState key="empty" isLight={isLight} isEmotional={isEmotional} onAdd={() => onNavigate('add')} />}
          {state === 'default' && (
            <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Quote of the Day */}
              <QuoteOfDayCard quote={quoteOfDay} isLight={isLight} isEmotional={isEmotional} />

              {/* Filters */}
              <div className="flex gap-2 mt-5 mb-4 overflow-x-auto scrollbar-hide pb-1">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      activeFilter === f.id
                        ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                        : isLight ? 'bg-white border border-warm-border text-warm-text' : 'bg-dark-card border border-dark-border text-dark-text'
                    }`}
                  >
                    <span>{f.emoji}</span>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Quotes List */}
              <div className="space-y-3">
                {quotes.map((quote, i) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <QuoteItem quote={quote} isLight={isLight} isEmotional={isEmotional} onClick={() => onNavigate('card')} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onNavigate('add')}
        className={`absolute bottom-6 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
          isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
        }`}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
}

function QuoteOfDayCard({ quote, isLight, isEmotional }: { quote: typeof quoteOfDay; isLight: boolean; isEmotional: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl relative overflow-hidden ${
        isLight 
          ? 'bg-gradient-to-br from-deep-blue to-deep-blue-light text-white' 
          : 'bg-gradient-to-br from-amber/20 to-amber/5 border border-amber/20'
      }`}
    >
      <div className="absolute top-2 right-3 text-2xl opacity-20" style={{ fontFamily: 'Playfair Display, serif' }}>❝</div>
      <div className={`text-[10px] uppercase tracking-wider font-semibold mb-2 ${
        isLight ? 'text-white/70' : 'text-amber'
      }`}>
        ✨ Цитата дня
      </div>
      <p className={`text-sm leading-relaxed mb-3 ${isLight ? 'text-white/95' : 'text-dark-text'} ${
        isEmotional ? 'italic' : ''
      }`} style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
        {quote.text}
      </p>
      <div className={`text-xs ${isLight ? 'text-white/70' : 'text-dark-muted'}`}>
        — {quote.author}
      </div>
      <div className={`text-[10px] mt-0.5 ${isLight ? 'text-white/50' : 'text-dark-muted/70'}`}>
        {quote.source}
      </div>
    </motion.div>
  );
}

function QuoteItem({ quote, isLight, isEmotional, onClick }: { quote: typeof quotes[0]; isLight: boolean; isEmotional: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all active:scale-[0.98] ${
        isLight 
          ? 'bg-white border border-warm-border hover:shadow-sm' 
          : 'bg-dark-card border border-dark-border hover:border-amber/30'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-relaxed line-clamp-2 ${isLight ? 'text-warm-text' : 'text-dark-text'} ${
            isEmotional ? 'italic' : ''
          }`} style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
            «{quote.text}»
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-medium ${isLight ? 'text-deep-blue' : 'text-amber'}`}>
              {quote.author}
            </span>
            <span className={`text-[10px] ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
              {quote.date}
            </span>
          </div>
        </div>
        {quote.favorite && (
          <Star size={14} className="text-amber fill-amber flex-shrink-0 mt-1" />
        )}
      </div>
      {quote.tags.length > 0 && (
        <div className="flex gap-1.5 mt-2">
          {quote.tags.map((tag) => (
            <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full ${
              isLight ? 'bg-gray-100 text-gray-500' : 'bg-gray-700 text-gray-400'
            }`}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

function EmptyState({ isLight, isEmotional, onAdd }: { isLight: boolean; isEmotional: boolean; onAdd: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center ${
        isLight ? 'bg-deep-blue/5' : 'bg-amber/10'
      }`}>
        <span className="text-4xl">📭</span>
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
        Пока пусто
      </h3>
      <p className={`text-sm mb-6 max-w-[240px] ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
        Сохраните свою первую цитату, которая вас вдохновила
      </p>
      <button
        onClick={onAdd}
        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
          isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
        }`}
      >
        ✍️ Добавить цитату
      </button>
    </motion.div>
  );
}

function LoadingState({ isLight }: { isLight: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 pt-2"
    >
      {/* Skeleton Quote of the Day */}
      <div className={`p-4 rounded-2xl ${isLight ? 'bg-gray-200/50' : 'bg-dark-card'}`}>
        <div className={`h-3 w-20 rounded mb-3 ${isLight ? 'bg-gray-300' : 'bg-gray-700'}`} />
        <div className={`h-4 w-full rounded mb-2 ${isLight ? 'bg-gray-300' : 'bg-gray-700'}`} />
        <div className={`h-4 w-3/4 rounded mb-3 ${isLight ? 'bg-gray-300' : 'bg-gray-700'}`} />
        <div className={`h-3 w-24 rounded ${isLight ? 'bg-gray-300' : 'bg-gray-700'}`} />
      </div>
      {/* Skeleton list */}
      {[1, 2, 3].map((i) => (
        <div key={i} className={`p-4 rounded-xl ${isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'}`}>
          <div className={`h-3 w-full rounded mb-2 ${isLight ? 'bg-gray-200' : 'bg-gray-700'} animate-pulse`} />
          <div className={`h-3 w-2/3 rounded mb-3 ${isLight ? 'bg-gray-200' : 'bg-gray-700'} animate-pulse`} />
          <div className={`h-2.5 w-20 rounded ${isLight ? 'bg-gray-200' : 'bg-gray-700'} animate-pulse`} />
        </div>
      ))}
    </motion.div>
  );
}

function ErrorState({ isLight, onRetry }: { isLight: boolean; onRetry: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center ${
        isLight ? 'bg-red-50' : 'bg-red-900/20'
      }`}>
        <span className="text-4xl">❌</span>
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
        Ошибка загрузки
      </h3>
      <p className={`text-sm mb-6 max-w-[240px] ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
        Не удалось загрузить цитаты. Проверьте подключение к интернету.
      </p>
      <button
        onClick={onRetry}
        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
          isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
        }`}
      >
        🔄 Повторить
      </button>
    </motion.div>
  );
}
