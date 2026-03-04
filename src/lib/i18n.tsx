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
    'home.hero.subtitle': "O'ziga ishongan ayollar uchun nozik did va nafosat. Yangi to'plamni kashf eting.",
    'home.hero.cta': "Kolleksiyani ko'rish",
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
    'product.quality': "100% Sifat kafolati",
    'product.delivery': "Butun O'zbekiston bo'ylab yetkazib berish xizmati",
    'category.breadcrumb.home': 'Bosh sahifa',
    'category.breadcrumb.categories': 'Kategoriyalar',
    'category.products': 'ta mahsulot',
    'category.empty': 'Bu kategoriyada hozircha mahsulotlar yo\'q.',
    'category.back': '← Kategoriyalar',
    'home.featured.tagline': 'Trendda',
    'home.featured.title': 'Yangi Kolleksiya',
    'home.features.shipping.title': 'Tezkor Yetkazib Berish',
    'home.features.shipping.desc': 'Barcha hududlarga tez va ishonchli yetkazib berish xizmati',
    'home.features.quality.title': 'Premium Sifat',
    'home.features.quality.desc': 'Eng yaxshi matolardan tayyorlangan eksklyuziv kiyimlar',
    'home.features.support.title': "24/7 Qo'llab-quvvatlash",
    'home.features.support.desc': 'Mijozlarimiz uchun doimiy yordam va maslahatlar',
    'home.story.title': 'Simpaty - bu nafosat',
    'home.story.desc': "Bizning maqsadimiz har bir ayolning o'ziga xos go'zalligini ochib berishdir. Har qanday libos nafislik, qulaylik va yuqori sifatni o'zida mujassam etadi. Maxsus kolleksiyalarimiz orqali o'zingizga ishonchni his qiling.",
    'home.story.btn': 'Batafsil',
    'auth.login.title': 'Kirish',
    'auth.login.subtitle': "Tizimga kirish uchun ma'lumotlaringizni kiriting",
    'auth.login.submit': 'Kirish',
    'auth.login.loading': 'Kuting...',
    'auth.login.error': "Tizim xatosi. Qayta urinib ko'ring",
    'auth.login.footer': "Hisobingiz yo'qmi?",
    'auth.login.footerLink': "Ro'yxatdan o'tish",
    'auth.signup.title': "Ro'yxatdan o'tish",
    'auth.signup.subtitle': 'Yangi hisob yaratish uchun ma\'lumotlarni kiriting',
    'auth.signup.submit': "Ro'yxatdan o'tish",
    'auth.signup.loading': 'Kuting...',
    'auth.signup.error': "Tizim xatosi. Qayta urinib ko'ring",
    'auth.signup.footer': 'Hisobingiz bormi?',
    'auth.signup.footerLink': 'Kirish',
    'nav.about': 'Brend haqida',
    'nav.contacts': 'Kontaktlar',
    'nav.delivery': 'Yetkazib berish',
    'nav.search': 'Qidiruv',
    'search.placeholder': 'Mahsulotlarni qidiring...',
    'search.loading': 'Qidirilmoqda...',
    'search.noResults': 'Hech narsa topilmadi.',
    'search.viewAll': 'Barchasini ko\'rish',
    'search.popular': 'Ommabop kategoriyalar',
    'category.shopNow': 'Sotib olish',
    'profile.title': 'Mening profilim',
    'profile.info': 'Shaxsiy ma\'lumotlar',
    'profile.orders': 'Buyurtmalar tarixi',
    'profile.noOrders': 'Sizda hali buyurtmalar yo\'q',
    'profile.joined': 'Ro\'yxatdan o\'tgan sana',
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
    'product.quality': '100% Гарантия качества',
    'product.delivery': 'Доставка по всему Узбекистану',
    'category.breadcrumb.home': 'Главная',
    'category.breadcrumb.categories': 'Категории',
    'category.products': 'товаров',
    'category.empty': 'В этой категории пока нет товаров.',
    'category.back': '← Категории',
    'home.featured.tagline': 'В тренде',
    'home.featured.title': 'Новая Коллекция',
    'home.features.shipping.title': 'Быстрая доставка',
    'home.features.shipping.desc': 'Быстрая и надежная доставка во все регионы',
    'home.features.quality.title': 'Премиальное качество',
    'home.features.quality.desc': 'Эксклюзивная одежда из лучших тканей',
    'home.features.support.title': 'Поддержка 24/7',
    'home.features.support.desc': 'Постоянная помощь и консультации для наших клиентов',
    'home.story.title': 'Simpaty - это утонченность',
    'home.story.desc': 'Наша цель - раскрыть уникальную красоту каждой женщины. Каждое платье сочетает в себе элегантность, комфорт и высокое качество. Почувствуйте уверенность в себе с нашими специальными коллекциями.',
    'home.story.btn': 'Подробнее',
    'auth.login.title': 'Вход в аккаунт',
    'auth.login.subtitle': 'Введите свои данные, чтобы войти в систему',
    'auth.login.submit': 'Войти',
    'auth.login.loading': 'Подождите...',
    'auth.login.error': 'Системная ошибка. Попробуйте ещё раз',
    'auth.login.footer': 'Нет аккаунта?',
    'auth.login.footerLink': 'Зарегистрироваться',
    'auth.signup.title': 'Регистрация',
    'auth.signup.subtitle': 'Заполните форму, чтобы создать новый аккаунт',
    'auth.signup.submit': 'Зарегистрироваться',
    'auth.signup.loading': 'Подождите...',
    'auth.signup.error': 'Системная ошибка. Попробуйте ещё раз',
    'auth.signup.footer': 'Уже есть аккаунт?',
    'auth.signup.footerLink': 'Войти',
    'nav.about': 'О бренде',
    'nav.contacts': 'Контакты',
    'nav.delivery': 'Доставка',
    'nav.search': 'Поиск',
    'search.placeholder': 'Поиск товаров...',
    'search.loading': 'Поиск...',
    'search.noResults': 'Ничего не найдено.',
    'search.viewAll': 'Посмотреть все результаты',
    'search.popular': 'Популярные категории',
    'category.shopNow': 'Купить сейчас',
    'profile.title': 'Мой профиль',
    'profile.info': 'Личные данные',
    'profile.orders': 'История заказов',
    'profile.noOrders': 'У вас пока нет заказов',
    'profile.joined': 'Дата регистрации',
  },
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => key,
})

export const useI18n = () => useContext(I18nContext)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ru')

  // After the component mounts (client-only), sync to the saved preference.
  // We use startTransition so the state update is non-urgent (avoids cascading render warning).
  useEffect(() => {
    const saved = localStorage.getItem('simpaty-lang') as Language
    if (saved === 'uz' || saved === 'ru') {
      React.startTransition(() => setLang(saved))
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('simpaty-lang', newLang)
    document.documentElement.lang = newLang
  }

  const t = (key: string) => translations[lang][key] || key

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
