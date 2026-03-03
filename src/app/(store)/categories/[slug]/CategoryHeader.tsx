'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryPage.module.css'

type Props = {
  nameUz: string
  nameRu: string
  productCount: number
}

export function CategoryHeader({ nameUz, nameRu, productCount }: Props) {
  const { lang, t } = useI18n()

  const name = lang === 'uz' ? nameUz : nameRu
  const countLabel = lang === 'uz'
    ? `${productCount} ta mahsulot`
    : `${productCount} товаров`

  return (
    <div className={`container ${styles.headerContent}`}>
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>{t('category.breadcrumb.home')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/categories" className={styles.breadcrumbLink}>{t('category.breadcrumb.categories')}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{name}</span>
      </nav>
      <h1 className={styles.title}>{name}</h1>
      <span className={styles.productCount}>{countLabel}</span>
    </div>
  )
}
