'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product, Category } from '@prisma/client'
import { useI18n } from '@/lib/i18n'
import { OrderModal } from '@/components/OrderModal'
import styles from './ProductDetails.module.css'

type ProductWithCategory = Product & { category: Category }

export function ProductDetails({ product }: { product: ProductWithCategory }) {
  const { lang, t } = useI18n()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(product.primaryImage)
  
  const allImages = [product.primaryImage, ...product.images].filter(Boolean) as string[]

  const name = lang === 'uz' ? product.nameUz : product.nameRu
  const description = lang === 'uz' ? product.descriptionUz : product.descriptionRu
  const priceFormatted = new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : 'ru-RU', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(product.price)

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.grid}>
        
        {/* Images Section */}
        <div className={styles.imageGallery}>
          <div className={styles.thumbnailList}>
            {allImages.map((img, i) => (
              <button 
                key={i} 
                className={`${styles.thumbBtn} ${activeImage === img ? styles.activeThumb : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${name} ${i}`} className={styles.thumbImg} />
              </button>
            ))}
          </div>
          <div className={styles.mainImageContainer}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                src={activeImage}
                alt={name}
                className={styles.mainImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Info Section */}
        <div className={styles.info}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>{name}</h1>
            <p className={styles.price}>{priceFormatted}</p>
            
            <div className={styles.divider} />
            
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: description || '' }} />
            
            <button 
              className={styles.orderBtn}
              onClick={() => setModalOpen(true)}
            >
              {t('product.order')}
            </button>
            
            <div className={styles.extraInfo}>
              <p>✓ 100% Sifat kafolati</p>
              <p>✓ Butun O'zbekiston bo'ylab yetkazib berish xizmati</p>
            </div>
          </motion.div>
        </div>
      </div>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        product={product} 
      />
    </div>
  )
}
