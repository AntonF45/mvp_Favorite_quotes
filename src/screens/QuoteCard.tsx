import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowLeft, IconStar, IconStarFilled, IconCopy, IconShare, IconEdit, IconTrash, IconCheck, IconClose } from '../components/Icons';
import type { ThemeMode } from '../types';

interface Props {
  theme: ThemeMode;
  onBack: () => void;
}

export default function QuoteCard({ theme, onBack }: Props) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const ruleBorder = isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';
  const accentBg = isLight ? 'bg-[#b87333]' : 'bg-[#d4944a]';

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
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-10`}>
      {/* Header */}
      <div className={`px-7 pt-5 pb-4 flex items-center justify-between border-b ${ruleBorder}`}>
        <button onClick={onBack} className={`p-1 ${muted}`}>
          <IconArrowLeft size={20} />
        </button>
        <div className={`text-[10px] tracking-editorial uppercase ${muted}`}>Цитата № 01</div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsFavorite(!isFavorite)} className={`p-1.5 transition-colors ${isFavorite ? accent : muted}`}>
            {isFavorite ? <IconStarFilled size={16} /> : <IconStar size={16} />}
          </button>
          <button onClick={() => setShowDelete(true)} className={`p-1.5 ${muted}`}>
            <IconTrash size={16} />
          </button>
        </div>
      </div>

      {/* Quote Content — hero */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-7 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Quote text — the hero with inline quotes */}
          <p className="font-editorial text-[24px] leading-[1.35] tracking-tight mb-6">
            <span className={`${accent} text-[28px] mr-1`}>"</span>
            {quote.text}
            <span className={`${accent} text-[28px] ml-1`}>"</span>
          </p>

          {/* Hairline */}
          <div className={`h-px ${rule} mb-6`} />

          {/* Author block */}
          <div className="mb-6">
            <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-2`}>— Автор —</div>
            <div className="font-editorial text-[18px] tracking-tight">{quote.author}</div>
            <div className={`text-[12px] tracking-wide ${muted} mt-1`}>{quote.source}</div>
          </div>

          {/* Date */}
          <div className="mb-6">
            <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-1`}>Добавлено</div>
            <div className={`text-[12px] tracking-wide ${ink}`}>{quote.date}</div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-3`}>— Теги —</div>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {quote.tags.map((tag, i) => (
                <span key={tag} className={`text-[12px] tracking-wide ${ink}`}>
                  <span className={`${accent} mr-1 font-medium`}>{String(i + 1).padStart(2, '0')}.</span>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comment */}
          {quote.comment && (
            <div className={`pt-6 border-t ${ruleBorder}`}>
              <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-3`}>— Комментарий —</div>
              <p className={`text-[13px] leading-[1.7] ${ink}`}>
                {quote.comment}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Actions bar — editorial */}
      <div className={`px-7 py-5 border-t ${ruleBorder} flex items-center justify-between`}>
        <button onClick={handleCopy} className={`flex items-center gap-2 text-[11px] tracking-editorial uppercase transition-colors ${copied ? accent : muted}`}>
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          {copied ? 'Скопировано' : 'Копировать'}
        </button>
        <button className={`flex items-center gap-2 text-[11px] tracking-editorial uppercase ${muted}`}>
          <IconShare size={14} />
          Поделиться
        </button>
        <button className={`flex items-center gap-2 text-[11px] tracking-editorial uppercase ${muted}`}>
          <IconEdit size={14} />
          Изменить
        </button>
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end"
          >
            <div className={`absolute inset-0 ${isLight ? 'bg-[#1c1c1c]/30' : 'bg-[#000]/50'}`} onClick={() => setShowDelete(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`relative w-full p-8 rounded-t-3xl ${paper}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[10px] tracking-editorial uppercase ${accent}`}>— Подтверждение —</span>
                <button onClick={() => setShowDelete(false)} className={muted}>
                  <IconClose size={18} />
                </button>
              </div>
              <h3 className="font-editorial text-[22px] leading-tight mb-3">
                Удалить эту<br />цитату?
              </h3>
              <p className={`text-[13px] leading-relaxed ${muted} mb-8`}>
                Это действие нельзя будет отменить
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className={`flex-1 py-4 rounded-xl border text-[11px] tracking-editorial uppercase ${ruleBorder} ${ink}`}
                >
                  Отмена
                </button>
                <button
                  onClick={() => { setShowDelete(false); onBack(); }}
                  className="flex-1 py-4 rounded-xl bg-[#1c1c1c] text-[#f5f0e8] text-[11px] tracking-editorial uppercase"
                >
                  Удалить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
