import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowLeft, IconCheck } from '../components/Icons';

type ThemeMode = 'light' | 'dark';

interface Props {
  theme: ThemeMode;
  onBack: () => void;
  onSave: () => void;
}

export default function AddQuote({ theme, onBack, onSave }: Props) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const ruleBorder = isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';
  const fieldBg = isLight ? 'bg-transparent' : 'bg-transparent';

  const availableTags = ['философия', 'мотивация', 'жизнь', 'любовь', 'мудрость', 'юмор', 'работа', 'творчество'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => onSave(), 1400);
  };

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-10`}>
      {/* Header */}
      <div className={`px-7 pt-5 pb-4 flex items-center justify-between border-b ${ruleBorder}`}>
        <button onClick={onBack} className={`p-1 ${muted}`}>
          <IconArrowLeft size={20} />
        </button>
        <div className="text-center">
          <div className={`text-[10px] tracking-editorial uppercase ${muted}`}>Новая запись</div>
        </div>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className={`text-[11px] tracking-editorial uppercase transition-all ${
            text.trim() ? accent : muted
          }`}
        >
          Сохранить
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-7 py-6">
        {/* Field: Quote */}
        <div className="mb-8">
          <label className={`text-[10px] tracking-editorial uppercase ${accent} block mb-4`}>
            — Текст цитаты —
          </label>
          <div className={`p-4 rounded-xl ${isLight ? 'bg-[#ede7db]' : 'bg-[#1e1c18]'}`}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Цитата, которая стоит сохранения..."
              rows={4}
              className={`w-full text-[17px] font-editorial leading-[1.45] tracking-tight resize-none focus:outline-none ${ink} bg-transparent`}
            />
          </div>
          <div className={`text-right text-[10px] tracking-editorial ${muted} mt-2 tabular-nums`}>
            {String(text.length).padStart(3, '0')}
          </div>
        </div>

        <div className={`h-px ${rule} mb-8`} />

        {/* Field: Author */}
        <div className="mb-8">
          <label className={`text-[10px] tracking-editorial uppercase ${accent} block mb-3`}>
            — Автор —
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Кто произнёс эти слова"
            className={`w-full pb-2 text-[16px] font-editorial tracking-tight border-b ${ruleBorder} focus:outline-none focus:border-current ${accent} ${ink} bg-transparent placeholder:${isLight ? 'text-[#b5afa6]' : 'text-[#4a4640]'}`}
          />
        </div>

        {/* Field: Source */}
        <div className="mb-8">
          <label className={`text-[10px] tracking-editorial uppercase ${accent} block mb-3`}>
            — Источник —
          </label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Книга, фильм, разговор..."
            className={`w-full pb-2 text-[14px] tracking-tight border-b ${ruleBorder} focus:outline-none focus:border-current ${accent} ${ink} bg-transparent placeholder:${isLight ? 'text-[#b5afa6]' : 'text-[#4a4640]'}`}
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label className={`text-[10px] tracking-editorial uppercase ${accent} block mb-4`}>
            — Теги —
          </label>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {availableTags.map((tag, i) => {
              const selected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[12px] tracking-wide pb-0.5 border-b transition-all ${
                    selected
                      ? `${accent} border-current`
                      : `${muted} border-transparent`
                  }`}
                >
                  <span className={`${muted} mr-1 font-medium`}>{String(i + 1).padStart(2, '0')}.</span>
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`h-px ${rule} mb-8`} />

        {/* Comment */}
        <div>
          <label className={`text-[10px] tracking-editorial uppercase ${accent} block mb-3`}>
            — Личный комментарий —
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Почему это важно для вас..."
            rows={3}
            className={`w-full text-[14px] leading-[1.6] resize-none focus:outline-none ${ink} bg-transparent placeholder:${isLight ? 'text-[#b5afa6]' : 'text-[#4a4640]'}`}
          />
        </div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 flex items-center justify-center ${paper} z-50`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`text-center px-8 py-10 rounded-3xl ${isLight ? 'bg-[#ede7db]' : 'bg-[#1e1c18]'} shadow-xl`}
            >
              <div className={`w-14 h-14 mx-auto mb-6 rounded-full border-2 ${accent} flex items-center justify-center`}>
                <IconCheck size={22} className={accent} />
              </div>
              <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-3`}>— Готово —</div>
              <h3 className="font-editorial text-[24px] leading-tight">
                Цитата<br />сохранена
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
