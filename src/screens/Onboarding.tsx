import { motion } from 'framer-motion';

type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onStart: () => void;
}

export default function Onboarding({ variant, theme, onStart }: Props) {
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  return (
    <div className={`h-full w-full flex flex-col ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-12`}>
      {/* Minimal Variant */}
      {!isEmotional ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Icon */}
            <div className={`w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center ${
              isLight ? 'bg-deep-blue/5' : 'bg-amber/10'
            }`}>
              <span className="text-4xl">📖</span>
            </div>

            {/* Title */}
            <h1 className={`text-2xl font-semibold mb-3 ${isLight ? 'text-deep-blue' : 'text-amber'}`}>
              Любимые цитаты
            </h1>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-8 max-w-[280px] mx-auto ${
              isLight ? 'text-warm-muted' : 'text-dark-muted'
            }`}>
              Сохраняйте вдохновляющие мысли из книг, фильмов и разговоров. 
              Ваш личный дневник цитат — всегда под рукой.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-10 text-left max-w-[260px] mx-auto">
              {[
                { emoji: '✍️', text: 'Быстрое сохранение' },
                { emoji: '🏷️', text: 'Теги и поиск' },
                { emoji: '📤', text: 'Делитесь в Telegram' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`flex items-center gap-3 p-2.5 rounded-lg ${
                    isLight ? 'bg-white/60' : 'bg-dark-card/60'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className={`text-sm ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onStart}
            className={`w-full max-w-[280px] py-4 rounded-2xl text-base font-semibold transition-all active:scale-95 ${
              isLight 
                ? 'bg-deep-blue text-white hover:bg-deep-blue-light' 
                : 'bg-amber text-dark-bg hover:bg-amber-light'
            }`}
          >
            Начать
          </motion.button>
        </div>
      ) : (
        /* Emotional Variant */
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className="absolute top-20 left-8 text-6xl"
          >
            ✨
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute bottom-40 right-8 text-5xl"
          >
            💫
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Decorative quote marks */}
            <div className={`text-7xl mb-4 ${isLight ? 'text-amber/30' : 'text-amber/20'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
              «»
            </div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-3xl font-bold mb-4 ${isLight ? 'text-deep-blue' : 'text-amber'} italic`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Любимые<br />цитаты
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-sm leading-relaxed mb-10 max-w-[280px] mx-auto ${
                isLight ? 'text-warm-muted' : 'text-dark-muted'
              }`}
            >
              Каждая цитата — это момент, который тронул вас. 
              Собирайте их, перечитывайте, делитесь.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onStart}
            className={`w-full max-w-[280px] py-4 rounded-2xl text-base font-semibold transition-all active:scale-95 relative overflow-hidden ${
              isLight 
                ? 'bg-gradient-to-r from-deep-blue to-deep-blue-light text-white' 
                : 'bg-gradient-to-r from-amber to-amber-light text-dark-bg'
            }`}
          >
            <span className="relative z-10">Начать собирать</span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`text-xs mt-4 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}
          >
            Бесплатно • Без рекламы • Приватно
          </motion.p>
        </div>
      )}
    </div>
  );
}
