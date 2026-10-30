import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowLeft, IconSun, IconMoon, IconBell, IconDownload, IconTrash, IconShield, IconClose } from '../components/Icons';

type ThemeMode = 'light' | 'dark';

interface Props {
  theme: ThemeMode;
  onBack: () => void;
}

export default function SettingsScreen({ theme, onBack }: Props) {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isLight = theme === 'light';
  const paper = isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]';
  const ink = isLight ? 'text-[#1c1c1c]' : 'text-[#e8e2d6]';
  const muted = isLight ? 'text-[#8a8580]' : 'text-[#7a7368]';
  const rule = isLight ? 'bg-[#d4cdc2]' : 'bg-[#2e2b25]';
  const ruleBorder = isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]';
  const accent = isLight ? 'text-[#b87333]' : 'text-[#d4944a]';

  return (
    <div className={`h-full w-full flex flex-col ${paper} ${ink} pt-10`}>
      {/* Header */}
      <div className="px-7 pt-5 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`p-1 ${muted}`}>
            <IconArrowLeft size={20} />
          </button>
          <div>
            <div className={`text-[10px] tracking-editorial uppercase ${muted}`}>Параметры</div>
            <h1 className="font-editorial text-[24px] leading-none tracking-tight mt-1">
              <span className={accent}>Настройки</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-7 pb-20">
        {/* Section: Appearance */}
        <div className="mb-8">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>— Внешний вид —</div>
          <div className={`border-b ${ruleBorder} py-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              {isLight ? <IconMoon size={16} className={muted} /> : <IconSun size={16} className={muted} />}
              <div>
                <div className={`text-[13px] ${ink}`}>Тёмная тема</div>
                <div className={`text-[11px] ${muted} mt-0.5`}>{isLight ? 'Выключена' : 'Включена'}</div>
              </div>
            </div>
            <Toggle active={!isLight} onToggle={() => {}} isLight={isLight} />
          </div>
        </div>

        {/* Section: Reminders */}
        <div className="mb-8">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>— Напоминания —</div>
          <div className={`border-b ${ruleBorder} py-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <IconBell size={16} className={muted} />
              <div>
                <div className={`text-[13px] ${ink}`}>Цитата дня</div>
                <div className={`text-[11px] ${muted} mt-0.5`}>Ежедневное напоминание</div>
              </div>
            </div>
            <Toggle active={reminderEnabled} onToggle={() => setReminderEnabled(!reminderEnabled)} isLight={isLight} />
          </div>
          {reminderEnabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4">
              <div className={`text-[10px] tracking-editorial uppercase ${muted} mb-3`}>Время</div>
              <div className="flex gap-4 flex-wrap">
                {['08:00', '09:00', '12:00', '18:00', '21:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setReminderTime(time)}
                    className={`text-[12px] tracking-wide pb-0.5 border-b transition-all tabular-nums ${
                      reminderTime === time ? `${accent} border-current` : `${muted} border-transparent`
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Section: Data */}
        <div className="mb-8">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>— Данные —</div>
          <div className={`border-b ${ruleBorder} py-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <IconDownload size={16} className={muted} />
              <div>
                <div className={`text-[13px] ${ink}`}>Экспорт коллекции</div>
                <div className={`text-[11px] ${muted} mt-0.5`}>JSON, TXT, PDF</div>
              </div>
            </div>
            <IconArrowLeft size={14} className={`${muted} rotate-180`} />
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className={`w-full py-4 flex items-center justify-between border-b ${ruleBorder}`}
          >
            <div className="flex items-center gap-4">
              <IconTrash size={16} className="text-[#c0392b]" />
              <div className="text-left">
                <div className="text-[13px] text-[#c0392b]">Удалить все данные</div>
                <div className={`text-[11px] ${muted} mt-0.5`}>Навсегда</div>
              </div>
            </div>
          </button>
        </div>

        {/* Section: About */}
        <div className="mb-8">
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>— О приложении —</div>
          <div className={`border-b ${ruleBorder} py-4 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <IconShield size={16} className={muted} />
              <div>
                <div className={`text-[13px] ${ink}`}>Конфиденциальность</div>
                <div className={`text-[11px] ${muted} mt-0.5`}>Данные хранятся локально</div>
              </div>
            </div>
          </div>
          <div className={`py-4 flex items-center justify-between`}>
            <div className={`text-[13px] ${ink}`}>Версия</div>
            <div className={`text-[13px] ${muted} tabular-nums`}>1.0.0</div>
          </div>
        </div>

        {/* Stats */}
        <div className={`pt-6 border-t ${ruleBorder}`}>
          <div className={`text-[10px] tracking-editorial uppercase ${accent} mb-4`}>— Ваша коллекция —</div>
          <div className="grid grid-cols-3 gap-4">
            <StatItem value="24" label="цитат" isLight={isLight} accent={accent} muted={muted} />
            <StatItem value="08" label="избранных" isLight={isLight} accent={accent} muted={muted} />
            <StatItem value="12" label="дней" isLight={isLight} accent={accent} muted={muted} />
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end"
          >
            <div className={`absolute inset-0 ${isLight ? 'bg-[#1c1c1c]/30' : 'bg-[#000]/50'}`} onClick={() => setShowDeleteConfirm(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`relative w-full p-8 ${paper}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[10px] tracking-editorial uppercase text-[#c0392b]`}>— Внимание —</span>
                <button onClick={() => setShowDeleteConfirm(false)} className={muted}>
                  <IconClose size={18} />
                </button>
              </div>
              <h3 className="font-editorial text-[22px] leading-tight mb-3">
                Удалить все<br />данные?
              </h3>
              <p className={`text-[13px] leading-relaxed ${muted} mb-8`}>
                Все цитаты и настройки будут удалены навсегда
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`flex-1 py-4 border text-[11px] tracking-editorial uppercase ${ruleBorder} ${ink}`}
                >
                  Отмена
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-4 bg-[#c0392b] text-[#f5f0e8] text-[11px] tracking-editorial uppercase"
                >
                  Удалить всё
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({ active, onToggle, isLight }: { active: boolean; onToggle: () => void; isLight: boolean }) {
  return (
    <button
      onClick={onToggle}
      className={`w-9 h-[18px] rounded-full border transition-all flex items-center ${
        active
          ? isLight ? 'bg-[#b87333] border-[#b87333]' : 'bg-[#d4944a] border-[#d4944a]'
          : isLight ? 'border-[#d4cdc2]' : 'border-[#2e2b25]'
      }`}
    >
      <div className={`w-[14px] h-[14px] rounded-full transition-transform ${active ? 'translate-x-[18px]' : 'translate-x-[2px]'} ${isLight ? 'bg-[#f5f0e8]' : 'bg-[#171512]'}`} />
    </button>
  );
}

function StatItem({ value, label, isLight, accent, muted }: any) {
  return (
    <div className="text-center">
      <div className={`font-editorial text-[28px] leading-none ${accent} tabular-nums`}>{value}</div>
      <div className={`text-[10px] tracking-editorial uppercase ${muted} mt-2`}>{label}</div>
    </div>
  );
}
