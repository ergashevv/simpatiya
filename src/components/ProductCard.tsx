'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Product } from '@prisma/client'
import { useI18n } from '@/lib/i18n'
import styles from './ProductCard.module.css'

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useI18n()
  
  const name = lang === 'uz' ? product.nameUz : product.nameRu
  // Format price nicely
  const priceFormatted = new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(product.price)

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
          <img 
            src={product.primaryImage || 'https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=2067&auto=format&fit=crop'} 
            alt={name} 
            className={styles.image} 
          />
          <div className={styles.overlay}>
            <span className={styles.quickView}>Tafsilotlar</span>
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
