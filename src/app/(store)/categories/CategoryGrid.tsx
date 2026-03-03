'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './CategoriesListPage.module.css'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop'

type Category = {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  imageUrl: string | null
  mainColor: string | null
  _count: { products: number }
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const { lang, t } = useI18n()

  if (categories.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{lang === 'uz' ? "Hozircha kategoriyalar yo'q." : 'Категории пока недоступны.'}</p>
        <Link href="/" className={styles.backBtn}>
          {lang === 'uz' ? 'Bosh sahifaga qaytish' : 'На главную'}
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {categories.map((category) => {
        const name = lang === 'uz' ? category.nameUz : category.nameRu
        const countLabel = lang === 'uz'
          ? `${category._count.products} ta mahsulot`
          : `${category._count.products} ${t('category.products')}`

        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={styles.card}
            style={{ '--cat-color': category.mainColor || '#800020' } as React.CSSProperties}
          >
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.imageUrl || PLACEHOLDER}
                alt={name}
                className={styles.image}
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = PLACEHOLDER
                }}
              />
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.name}>{name}</h2>
              <span className={styles.count}>{countLabel}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

// Separate header sub-component (also client, uses i18n)
export function CategoriesPageHeader() {
  const { t } = useI18n()

  return (
    <div className={styles.header}>
      <div className="container">
        <span className={styles.tagline}>Simpaty</span>
        <h1 className={styles.title}>{t('categories.all')}</h1>
        <div className={styles.divider} />
      </div>
    </div>
  )
}
