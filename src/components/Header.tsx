'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './Header.module.css'
import { ShoppingBag, User } from 'lucide-react'

export function Header() {
  const { t, lang, setLang } = useI18n()

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
        </nav>
        <div className={styles.actions}>
          <button 
            className={styles.langBtn} 
            onClick={() => setLang(lang === 'uz' ? 'ru' : 'uz')}
          >
            {lang.toUpperCase()}
          </button>
          <Link href="/login" className={styles.iconBtn} aria-label={t('nav.login')}>
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}
