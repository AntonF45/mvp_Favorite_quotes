import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSearch, IconSettings, IconPlus, IconStarFilled } from '../components/Icons';
import type { Screen, ThemeMode } from '../types';

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
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const ruleBorder = isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';
  const blockBg = isLight ? 'bg-[#ede7db]' : 'bg-[#1e1c18]';

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-10`}>
      {/* Header */}
      <div className="px-7 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-1`}>Коллекция</div>
            <h1 className="font-editorial text-[28px] leading-none tracking-tight">
              <span className={accent}>Цитаты.</span>
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* Quote of the Day — hero */}
        <div className="px-7 pt-2 pb-5">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>
            — Цитата дня —
          </div>
          <div className={`p-6 rounded-2xl ${blockBg}`}>
            <p className="font-editorial text-[20px] leading-[1.35] tracking-tight">
              <span className={`${accent} text-[24px] mr-1`}>"</span>
              {quoteOfDay.text}
              <span className={`${accent} text-[24px] ml-1`}>"</span>
            </p>
            <div className={`mt-4 pt-3 border-t ${rule}`}>
              <div className={`text-[12px] ${muted}`}>— {quoteOfDay.author}</div>
              <div className={`text-[10px] tracking-editorial uppercase ${muted} mt-0.5`}>{quoteOfDay.source}</div>
            </div>
          </div>
        </div>

        {/* Recent quotes block — with matching background */}
        <div className="px-7 mt-2">
          <div className={`p-5 rounded-2xl ${blockBg}`}>
            <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>
              — Недавние —
            </div>
            <div>
              {quotes.map((q, i) => (
                <motion.button
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => onNavigate('card')}
                  className={`w-full text-left py-4 border-b ${ruleBorder} group transition-colors last:border-b-0`}
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
                        <span className={`text-[11px] tracking-editorial uppercase ${muted}`}>
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
          </div>
        </div>

        <div className={`text-center py-8 text-[10px] tracking-editorial uppercase ${muted}`}>
          — конец —
        </div>
      </div>

      {/* FAB */}
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
