import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Copy, Share2, Edit3, Trash2, Check, X } from 'lucide-react';

type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onBack: () => void;
}

export default function QuoteCard({ variant, theme, onBack }: Props) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  const quote = {
    text: 'Мы — то, что мы делаем постоянно. Совершенство — не действие, а привычка.',
    author: 'Аристотель',
    source: 'Никомахова этика',
    date: '12 января 2025',
    tags: ['философия', 'привычки', 'мудрость'],
    comment: 'Эта цитата напоминает мне, что каждый день — это возможность стать лучше. Маленькие привычки формируют нашу жизнь.',
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`h-full w-full flex flex-col ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-10`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-3 ${
        isLight ? '' : ''
      }`}>
        <button onClick={onBack} className={`p-1.5 rounded-lg ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-lg transition-all ${
              isFavorite 
                ? 'text-amber' 
                : isLight ? 'text-warm-muted' : 'text-dark-muted'
            }`}
          >
            <Star size={18} className={isFavorite ? 'fill-amber' : ''} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className={`p-2 rounded-lg ${isLight ? 'text-warm-muted hover:text-red-500' : 'text-dark-muted hover:text-red-400'}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Quote Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4"
        >
          {/* Decorative quote mark */}
          <div className={`text-5xl mb-2 ${isLight ? 'text-amber/20' : 'text-amber/15'}`} 
            style={{ fontFamily: 'Playfair Display, serif' }}>
            ❝
          </div>

          {/* Quote Text */}
          <p className={`text-xl leading-relaxed mb-6 ${isLight ? 'text-deep-blue' : 'text-amber'} ${
            isEmotional ? 'italic' : ''
          }`} style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
            {quote.text}
          </p>

          {/* Author */}
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              isLight ? 'bg-deep-blue/10 text-deep-blue' : 'bg-amber/20 text-amber'
            }`}>
              {quote.author[0]}
            </div>
            <div>
              <div className={`text-sm font-semibold ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                {quote.author}
              </div>
              <div className={`text-xs ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                {quote.source}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className={`text-xs mt-3 mb-5 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            📅 {quote.date}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quote.tags.map((tag) => (
              <span key={tag} className={`text-xs px-3 py-1 rounded-full ${
                isLight ? 'bg-deep-blue/5 text-deep-blue border border-deep-blue/10' : 'bg-amber/10 text-amber border border-amber/20'
              }`}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Personal Comment */}
          {quote.comment && (
            <div className={`p-4 rounded-xl ${
              isLight ? 'bg-amber/5 border border-amber/10' : 'bg-amber/5 border border-amber/10'
            }`}>
              <div className={`text-[10px] uppercase tracking-wider font-semibold mb-2 ${
                isLight ? 'text-amber-dark' : 'text-amber'
              }`}>
                💭 Мой комментарий
              </div>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                {quote.comment}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Actions Bar */}
      <div className={`px-5 py-4 border-t ${isLight ? 'border-warm-border bg-warm-bg' : 'border-dark-border bg-dark-bg'}`}>
        <div className="flex items-center justify-around">
          <ActionButton
            icon={<Copy size={18} />}
            label={copied ? 'Скопировано!' : 'Копировать'}
            onClick={handleCopy}
            isLight={isLight}
            active={copied}
          />
          <ActionButton
            icon={<Share2 size={18} />}
            label="Поделиться"
            onClick={() => {}}
            isLight={isLight}
          />
          <ActionButton
            icon={<Edit3 size={18} />}
            label="Редактировать"
            onClick={() => {}}
            isLight={isLight}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowDelete(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full p-6 rounded-t-3xl ${
                isLight ? 'bg-warm-bg' : 'bg-dark-card'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                  Удалить цитату?
                </h3>
                <button onClick={() => setShowDelete(false)} className={`p-1 rounded-lg ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                  <X size={20} />
                </button>
              </div>
              <p className={`text-sm mb-6 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Эта цитата будет удалена навсегда. Это действие нельзя отменить.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold ${
                    isLight ? 'bg-gray-100 text-warm-text' : 'bg-gray-700 text-dark-text'
                  }`}
                >
                  Отмена
                </button>
                <button
                  onClick={() => { setShowDelete(false); onBack(); }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold bg-red-500 text-white"
                >
                  Удалить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy Success Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 left-5 right-5"
          >
            <div className={`flex items-center gap-3 p-3 rounded-xl shadow-lg ${
              isLight ? 'bg-green-50 border border-green-200' : 'bg-green-900/30 border border-green-700'
            }`}>
              <Check size={16} className={isLight ? 'text-green-600' : 'text-green-300'} />
              <span className={`text-sm font-medium ${isLight ? 'text-green-800' : 'text-green-200'}`}>
                Цитата скопирована!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon, label, onClick, isLight, active }: { 
  icon: React.ReactNode; label: string; onClick: () => void; isLight: boolean; active?: boolean 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
        active 
          ? isLight ? 'bg-green-50 text-green-600' : 'bg-green-900/20 text-green-300'
          : isLight ? 'text-warm-muted hover:text-deep-blue' : 'text-dark-muted hover:text-amber'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
