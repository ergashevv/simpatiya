'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Product, Category } from '@prisma/client'
import { useI18n } from '@/lib/i18n'
import { OrderModal } from '@/components/OrderModal'
import styles from './ProductDetails.module.css'

type ProductWithCategory = Product & { category: Category }

export function ProductDetails({ product }: { product: ProductWithCategory }) {
  const { lang, t } = useI18n()
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors[0] || null)
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] || null)
  
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
        
        {/* Images Section - Zara style vertical scroll */}
        <div className={styles.imageGallery}>
          {allImages.map((img, i) => (
            <div key={i} className={styles.mainImageWrapper}>
              <motion.img 
                src={img}
                alt={`${name} ${i}`}
                className={styles.mainImage}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          ))}
        </div>

        {/* Info Section - Sticky */}
        <div className={styles.info}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className={styles.title}>{name}</h1>
            <p className={styles.price}>{priceFormatted}</p>
            
            <div className={styles.divider} />

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>{t('product.color')} : {selectedColor}</label>
                <div className={styles.colorOptions}>
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      className={`${styles.colorTick} ${selectedColor === color ? styles.active : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>{t('product.size')}</label>
                <div className={styles.sizeOptions}>
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`${styles.sizeTick} ${selectedSize === size ? styles.active : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: description || '' }} />
            
            <button 
              className={styles.orderBtn}
              onClick={() => setModalOpen(true)}
            >
              {t('product.order')}
            </button>
            
            <div className={styles.extraInfo}>
              <div className={styles.extraItem}>✓ {t('product.quality')}</div>
              <div className={styles.extraItem}>✓ {t('product.delivery')}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        product={product} 
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  )
}
