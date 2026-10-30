import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Bell, Download, Trash2, ChevronRight, Shield } from 'lucide-react';

type DesignVariant = 'minimal' | 'emotional';
type ThemeMode = 'light' | 'dark';

interface Props {
  variant: DesignVariant;
  theme: ThemeMode;
  onBack: () => void;
}

export default function SettingsScreen({ variant, theme, onBack }: Props) {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isLight = theme === 'light';
  const isEmotional = variant === 'emotional';

  return (
    <div className={`h-full w-full flex flex-col ${isLight ? 'bg-warm-bg' : 'bg-dark-bg'} pt-10`}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className={`p-1.5 rounded-lg ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            <ArrowLeft size={20} />
          </button>
          <h2 className={`text-lg font-bold ${isLight ? 'text-deep-blue' : 'text-amber'} ${isEmotional ? 'italic' : ''}`}
            style={isEmotional ? { fontFamily: 'Playfair Display, serif' } : {}}>
            Настройки
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-20 space-y-4">
        {/* Appearance Section */}
        <SettingsSection title="Внешний вид" isLight={isLight}>
          <SettingsRow
            icon={isLight ? <Sun size={18} /> : <Moon size={18} />}
            title="Тёмная тема"
            subtitle={isLight ? 'Выключена' : 'Включена'}
            isLight={isLight}
            toggle
            toggleValue={!isLight}
            onToggle={() => {}}
          />
        </SettingsSection>

        {/* Reminders Section */}
        <SettingsSection title="Напоминания" isLight={isLight}>
          <SettingsRow
            icon={<Bell size={18} />}
            title="Цитата дня"
            subtitle="Ежедневное напоминание"
            isLight={isLight}
            toggle
            toggleValue={reminderEnabled}
            onToggle={() => setReminderEnabled(!reminderEnabled)}
          />
          {reminderEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`px-4 py-3 rounded-xl mx-1 ${
                isLight ? 'bg-gray-50' : 'bg-gray-800/50'
              }`}
            >
              <div className={`text-xs mb-2 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Время напоминания
              </div>
              <div className="flex gap-2">
                {['08:00', '09:00', '12:00', '18:00', '21:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setReminderTime(time)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      reminderTime === time
                        ? isLight ? 'bg-deep-blue text-white' : 'bg-amber text-dark-bg'
                        : isLight ? 'bg-white border border-warm-border text-warm-text' : 'bg-dark-card border border-dark-border text-dark-text'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </SettingsSection>

        {/* Data Section */}
        <SettingsSection title="Данные" isLight={isLight}>
          <SettingsRow
            icon={<Download size={18} />}
            title="Экспорт коллекции"
            subtitle="Сохранить все цитаты в файл"
            isLight={isLight}
            onClick={() => setShowExportOptions(!showExportOptions)}
            chevron
          />
          {showExportOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`px-4 py-3 rounded-xl mx-1 space-y-2 ${
                isLight ? 'bg-gray-50' : 'bg-gray-800/50'
              }`}
            >
              <div className={`text-xs mb-2 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Формат экспорта
              </div>
              {['JSON', 'TXT', 'PDF'].map((format) => (
                <button
                  key={format}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    isLight ? 'bg-white border border-warm-border text-warm-text hover:border-deep-blue/30' : 'bg-dark-card border border-dark-border text-dark-text hover:border-amber/30'
                  }`}
                >
                  📄 Экспорт в {format}
                </button>
              ))}
            </motion.div>
          )}

          <SettingsRow
            icon={<Trash2 size={18} />}
            title="Удалить все данные"
            subtitle="Удалить все цитаты и настройки"
            isLight={isLight}
            danger
            onClick={() => setShowDeleteConfirm(true)}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="О приложении" isLight={isLight}>
          <SettingsRow
            icon={<Shield size={18} />}
            title="Конфиденциальность"
            subtitle="Все данные хранятся локально"
            isLight={isLight}
          />
          <div className={`px-4 py-3 rounded-xl mx-1 ${
            isLight ? 'bg-gray-50' : 'bg-gray-800/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>Версия</span>
              <span className={`text-sm ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>1.0.0</span>
            </div>
          </div>
        </SettingsSection>

        {/* Stats Card */}
        <div className={`p-4 rounded-2xl ${
          isLight 
            ? 'bg-gradient-to-br from-deep-blue/5 to-amber/5 border border-deep-blue/10' 
            : 'bg-gradient-to-br from-amber/10 to-deep-blue/10 border border-amber/10'
        }`}>
          <h3 className={`text-sm font-semibold mb-3 ${isLight ? 'text-deep-blue' : 'text-amber'}`}>
            📊 Ваша коллекция
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <StatItem value="24" label="Цитат" isLight={isLight} />
            <StatItem value="8" label="Избранных" isLight={isLight} />
            <StatItem value="12" label="Дней" isLight={isLight} />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDeleteConfirm(false)} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative w-full p-6 rounded-2xl ${
              isLight ? 'bg-warm-bg' : 'bg-dark-card'
            }`}
          >
            <div className="text-center mb-4">
              <span className="text-4xl block mb-3">⚠️</span>
              <h3 className={`text-lg font-semibold ${isLight ? 'text-warm-text' : 'text-dark-text'}`}>
                Удалить все данные?
              </h3>
              <p className={`text-sm mt-2 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
                Все ваши цитаты и настройки будут удалены навсегда. Это действие нельзя отменить.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold ${
                  isLight ? 'bg-gray-100 text-warm-text' : 'bg-gray-700 text-dark-text'
                }`}
              >
                Отмена
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-red-500 text-white"
              >
                Удалить всё
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function SettingsSection({ title, children, isLight }: { title: string; children: React.ReactNode; isLight: boolean }) {
  return (
    <div>
      <div className={`text-xs font-semibold uppercase tracking-wider mb-2 px-1 ${
        isLight ? 'text-warm-muted' : 'text-dark-muted'
      }`}>
        {title}
      </div>
      <div className={`rounded-xl overflow-hidden ${
        isLight ? 'bg-white border border-warm-border' : 'bg-dark-card border border-dark-border'
      }`}>
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ icon, title, subtitle, isLight, toggle, toggleValue, onToggle, onClick, chevron, danger }: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  isLight: boolean;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  chevron?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={toggle ? onToggle : onClick}
      className={`flex items-center gap-3 px-4 py-3.5 w-full text-left transition-all ${
        danger ? 'hover:bg-red-50 dark:hover:bg-red-900/10' : ''
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        danger 
          ? isLight ? 'bg-red-50 text-red-500' : 'bg-red-900/20 text-red-400'
          : isLight ? 'bg-gray-100 text-warm-muted' : 'bg-gray-700 text-dark-muted'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className={`text-sm font-medium ${danger ? 'text-red-500' : isLight ? 'text-warm-text' : 'text-dark-text'}`}>
          {title}
        </div>
        {subtitle && (
          <div className={`text-xs mt-0.5 ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>
            {subtitle}
          </div>
        )}
      </div>
      {toggle && (
        <div className={`w-10 h-5 rounded-full transition-all ${
          toggleValue 
            ? isLight ? 'bg-deep-blue' : 'bg-amber'
            : isLight ? 'bg-gray-200' : 'bg-gray-700'
        }`}>
          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            toggleValue ? 'translate-x-5' : 'translate-x-0.5'
          } mt-0.5`} />
        </div>
      )}
      {chevron && (
        <ChevronRight size={16} className={isLight ? 'text-warm-muted' : 'text-dark-muted'} />
      )}
    </button>
  );
}

function StatItem({ value, label, isLight }: { value: string; label: string; isLight: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-xl font-bold ${isLight ? 'text-deep-blue' : 'text-amber'}`}>{value}</div>
      <div className={`text-[10px] ${isLight ? 'text-warm-muted' : 'text-dark-muted'}`}>{label}</div>
    </div>
  );
}
