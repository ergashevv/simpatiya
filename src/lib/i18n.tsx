'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'uz' | 'ru'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    'home.hero.title': 'Premium Ayollar Kiyimlari',
    'home.hero.subtitle': 'O\'ziga ishongan ayollar uchun nozik did va nafosat. Yangi to\'plamni kashf eting.',
    'home.hero.cta': 'Kolleksiyani ko\'rish',
    'nav.home': 'Bosh sahifa',
    'nav.categories': 'Kategoriyalar',
    'nav.login': 'Kirish',
    'nav.logout': 'Chiqish',
    'product.order': 'Buyurtma berish',
    'product.details': 'Tafsilotlar',
    'form.name': 'Ismingiz',
    'form.phone': 'Telefon raqamingiz',
    'form.address': 'Manzil',
    'form.submit': 'Yuborish',
    'order.success': 'Buyurtma muvaffaqiyatli qoldirildi!',
    'categories.all': 'Barcha Kategoriyalar',
  },
  ru: {
    'home.hero.title': 'Женская одежда премиум-класса',
    'home.hero.subtitle': 'Изысканность и утонченность для уверенных в себе женщин. Откройте для себя новую коллекцию.',
    'home.hero.cta': 'Смотреть коллекцию',
    'nav.home': 'Главная',
    'nav.categories': 'Категории',
    'nav.login': 'Войти',
    'nav.logout': 'Выйти',
    'product.order': 'Заказать',
    'product.details': 'Детали',
    'form.name': 'Ваше имя',
    'form.phone': 'Номер телефона',
    'form.address': 'Адрес',
    'form.submit': 'Отправить',
    'order.success': 'Заказ успешно оформлен!',
    'categories.all': 'Все категории',
  }
}

const I18nContext = createContext<I18nContextType>({
  lang: 'uz',
  setLang: () => {},
  t: (key) => key
})

export const useI18n = () => useContext(I18nContext)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('uz')

  useEffect(() => {
    const savedLine = localStorage.getItem('simpaty-lang') as Language
    if (savedLine && (savedLine === 'uz' || savedLine === 'ru')) {
      setLang(savedLine)
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('simpaty-lang', newLang)
    document.documentElement.lang = newLang
  }

  const t = (key: string) => {
    return translations[lang][key] || key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
