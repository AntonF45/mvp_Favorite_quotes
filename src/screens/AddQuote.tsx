import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Check, BookOpen, Film, Mic, MessageCircle } from 'lucide-react';

type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onBack: () => void;
  onSave: () => void;
}

export default function AddQuote({ variant, theme, onBack, onSave }: Props) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  const availableTags = [
    { id: 'философия', emoji: '🧠' },
    { id: 'мотивация', emoji: '🔥' },
    { id: 'жизнь', emoji: '🌱' },
    { id: 'любовь', emoji: '❤️' },
    { id: 'мудрость', emoji: '🦉' },
    { id: 'юмор', emoji: '😄' },
    { id: 'работа', emoji: '💼' },
    { id: 'творчество', emoji: '🎨' },
  ];

  const sources = [
    { id: 'book', label: 'Книга', emoji: '📚' },
    { id: 'film', label: 'Фильм', emoji: '🎬' },
    { id: 'podcast', label: 'Подкаст', emoji: '🎙️' },
    { id: 'life', label: 'Разговор', emoji: '💬' },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onSave();
    }, 1500);
  };

  return (
    <div className={`h-full w-full flex flex-col ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-10`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-3 border-b ${
        isLight ? 'border-warm-border' : 'border-dark-border'
      }`}>
        <button onClick={onBack} className={`p-1.5 rounded-lg ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
          <ArrowLeft size={20} />
        </button>
        <h2 className={`text-base font-semibold ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
          Новая цитата
        </h2>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            text.trim()
              ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
              : isLight ? 'bg-gray-200 text-gray-400' : 'bg-gray-700 text-gray-500'
          }`}
        >
          Сохранить
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 space-y-5">
        {/* Quote Text */}
        <div>
          <label className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
            isLight ? 'text-warm-muted' : 'text-dark-muted'
          }`}>
            Текст цитаты *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите цитату..."
            rows={4}
            className={`w-full p-3 rounded-xl text-sm leading-relaxed resize-none transition-all focus:outline-none focus:ring-2 ${
              isLight 
                ? 'bg-white border border-warm-border focus:ring-deep-blue/30 text-warm-text placeholder:text-gray-300' 
                : 'bg-dark-card border border-dark-border focus:ring-amber/30 text-dark-text placeholder:text-gray-600'
            } ${isEmotional ? 'italic' : ''}`}
            style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}
          />
          <div className={`text-right text-[10px] mt-1 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            {text.length} символов
          </div>
        </div>

        {/* Author */}
        <div>
          <label className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
            isLight ? 'text-warm-muted' : 'text-dark-muted'
          }`}>
            Автор
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Кто сказал?"
            className={`w-full p-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
              isLight 
                ? 'bg-white border border-warm-border focus:ring-deep-blue/30 text-warm-text placeholder:text-gray-300' 
                : 'bg-dark-card border border-dark-border focus:ring-amber/30 text-dark-text placeholder:text-gray-600'
            }`}
          />
        </div>

        {/* Source */}
        <div>
          <label className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
            isLight ? 'text-warm-muted' : 'text-dark-muted'
          }`}>
            Источник
          </label>
          <div className="flex gap-2 mb-2">
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => setSource(s.label)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  source === s.label
                    ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                    : isLight ? 'bg-white border border-warm-border text-warm-text' : 'bg-dark-card border border-dark-border text-dark-text'
                }`}
              >
                <span>{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Название книги, фильма..."
            className={`w-full p-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
              isLight 
                ? 'bg-white border border-warm-border focus:ring-deep-blue/30 text-warm-text placeholder:text-gray-300' 
                : 'bg-dark-card border border-dark-border focus:ring-amber/30 text-dark-text placeholder:text-gray-600'
            }`}
          />
        </div>

        {/* Tags */}
        <div>
          <label className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
            isLight ? 'text-warm-muted' : 'text-dark-muted'
          }`}>
            Теги
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTags.includes(tag.id)
                    ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                    : isLight ? 'bg-white border border-warm-border text-warm-text' : 'bg-dark-card border border-dark-border text-dark-text'
                }`}
              >
                <span>{tag.emoji}</span>
                {tag.id}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Comment */}
        <div>
          <label className={`text-xs font-medium uppercase tracking-wider mb-2 block ${
            isLight ? 'text-warm-muted' : 'text-dark-muted'
          }`}>
            Личный комментарий
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Почему эта цитата важна для вас?"
            rows={2}
            className={`w-full p-3 rounded-xl text-sm leading-relaxed resize-none transition-all focus:outline-none focus:ring-2 ${
              isLight 
                ? 'bg-white border border-warm-border focus:ring-deep-blue/30 text-warm-text placeholder:text-gray-300' 
                : 'bg-dark-card border border-dark-border focus:ring-amber/30 text-dark-text placeholder:text-gray-600'
            }`}
          />
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-8 left-5 right-5"
          >
            <div className={`flex items-center gap-3 p-4 rounded-2xl shadow-lg ${
              isLight ? 'bg-green-50 border border-green-200' : 'bg-green-900/30 border border-green-700'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isLight ? 'bg-green-100' : 'bg-green-800'
              }`}>
                <Check size={16} className={isLight ? 'text-green-600' : 'text-green-300'} />
              </div>
              <span className={`text-sm font-medium ${isLight ? 'text-green-800' : 'text-green-200'}`}>
                Цитата сохранена!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
