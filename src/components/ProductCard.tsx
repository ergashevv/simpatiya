'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './ProductCard.module.css'

type Product = {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  price: number
  primaryImage: string | null
  isActive: boolean
  categoryId: string
  subCategoryId: string | null
  images: string[]
  createdAt: Date
  updatedAt: Date
  descriptionUz: string | null
  descriptionRu: string | null
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop'

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useI18n()

  const name = lang === 'uz' ? product.nameUz : product.nameRu
  const priceFormatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price) + ' UZS'

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/product/${product.slug}`} className={styles.link}>
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.primaryImage || PLACEHOLDER}
            alt={name}
            className={styles.image}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = PLACEHOLDER
            }}
          />
          <div className={styles.overlay}>
            <span className={styles.quickView}>{t('product.details')}</span>
          </div>
        </div>

        <div className={styles.details}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{priceFormatted}</p>
        </div>
      </Link>
    </motion.div>
  )
}

