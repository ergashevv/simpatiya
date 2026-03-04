'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './Header.module.css'
import { User, Search } from 'lucide-react'
import { SearchModal } from './SearchModal'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Simpaty — магазин женской одежды премиум-класса"
        >
          {/* Native img avoids any SVG optimisation issues for the logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-simpaty.svg"
            alt="Simpaty — женская одежда премиум-класса"
            width={140}
            height={36}
            className={styles.logoImage}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>{t('nav.home')}</Link>
          <Link href="/categories" className={styles.navLink}>{t('nav.categories')}</Link>
          <Link href="/about" className={styles.navLink}>{t('nav.about')}</Link>
          <Link href="/delivery" className={styles.navLink}>{t('nav.delivery')}</Link>
          <Link href="/contacts" className={styles.navLink}>{t('nav.contacts')}</Link>
        </nav>
        <div className={styles.actions}>
          <button 
            className={styles.langBtn} 
            onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
          >
            {lang.toUpperCase()}
          </button>
          <button 
            className={styles.iconBtn} 
            onClick={() => setIsSearchOpen(true)}
            aria-label={t('nav.search') || 'Search'}
          >
            <Search size={20} />
          </button>
          <Link href="/login" className={styles.iconBtn} aria-label={t('nav.login')}>
            <User size={20} />
          </Link>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
