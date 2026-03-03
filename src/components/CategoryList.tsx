'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryList.module.css'
import { Category } from '@prisma/client'

export function CategoryList({ categories }: { categories: Category[] }) {
  const { lang, t } = useI18n()

  if (!categories || categories.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>{t('categories.all')}</h2>
        <p>Hozircha kategoriyalar yo'q</p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t('categories.all')}
      </motion.h2>

      <div className={styles.grid}>
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link 
              href={`/categories/${category.slug}`} 
              className={styles.card}
              style={{ '--cat-color': category.mainColor } as React.CSSProperties}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={category.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop'} 
                  alt={lang === 'uz' ? category.nameUz : category.nameRu} 
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.name}>
                  {lang === 'uz' ? category.nameUz : category.nameRu}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
