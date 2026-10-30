import { motion } from 'framer-motion';
import { IconArrowRight } from '../components/Icons';
import type { ThemeMode } from '../types';

interface Props {
  theme: ThemeMode;
  onStart: () => void;
}

export default function Onboarding({ theme, onStart }: Props) {
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-12`}>
      {/* Top editorial marker */}
      <div className="px-8 pt-6 flex items-center justify-between">
        <span className={`text-[10px] tracking-editorial uppercase ${muted}`}>№ 01</span>
        <span className={`text-[10px] tracking-editorial uppercase ${muted}`}>Введение</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial text-[44px] leading-[1.05] tracking-tight mb-6"
        >
          <span className={`${accent} text-[50px] mr-1`}>"</span>
          Цитаты<span className={accent}>.</span>
          <span className={`${accent} text-[50px] ml-1`}>"</span>
        </motion.h1>

        {/* Hairline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`h-px ${rule} origin-left mb-6`}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-[15px] leading-[1.6] ${muted} max-w-[300px] mb-10`}
        >
          Тихое место для мыслей, которые стоит сохранить. Из книг, фильмов, разговоров и дней, которые вы не хотите забыть.
        </motion.p>

        {/* Feature list — numbered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4 mb-12"
        >
          {[
            { n: 'i.', text: 'Сохраняйте цитаты одним касанием' },
            { n: 'ii.', text: 'Находите по тегам, автору, источнику' },
            { n: 'iii.', text: 'Делитесь в Telegram' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-baseline gap-4"
            >
              <span className={`text-[11px] tracking-editorial ${accent} w-6 font-medium`}>
                {item.n}
              </span>
              <span className={`text-[13px] ${ink}`}>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="px-8 pb-10">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={onStart}
          className={`w-full py-4 flex items-center justify-between px-6 rounded-xl border transition-all active:scale-[0.98] ${
            isLight
              ? 'bg-[#1c1c1c] text-[#f5f0e8] border-[#1c1c1c] hover:bg-[#3d3d3d]'
              : 'bg-[#e8e2d6] text-[#171512] border-[#e8e2d6] hover:bg-[#d4cdc2]'
          }`}
        >
          <span className="text-[11px] tracking-editorial uppercase font-medium">Начать</span>
          <IconArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
