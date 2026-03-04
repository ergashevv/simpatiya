'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SearchModal.module.css'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ProductResult {
  id: string
  slug: string
  nameUz: string
  nameRu: string
  price: number
  primaryImage: string
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t, lang } = useI18n()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ProductResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(handleSearch, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`)
    onClose()
  }

  const getProductName = (product: ProductResult) => {
    return lang === 'uz' ? product.nameUz : product.nameRu
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.modal}>
            <div className={styles.header}>
              <div className={styles.searchField}>
                <Search size={24} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('search.placeholder') || 'Search...'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.input}
                />
              </div>
              <button onClick={onClose} className={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              {loading && <div className={styles.loading}>{t('search.loading') || 'Searching...'}</div>}
              
              {!loading && results.length > 0 && (
                <div className={styles.resultsGrid}>
                  {results.slice(0, 6).map((product) => (
                    <div 
                      key={product.id} 
                      className={styles.resultItem}
                      onClick={() => handleProductClick(product.slug)}
                    >
                      <div className={styles.productImage}>
                        <img src={product.primaryImage} alt={getProductName(product)} />
                      </div>
                      <div className={styles.productInfo}>
                        <h3>{getProductName(product)}</h3>
                        <p>{new Intl.NumberFormat('uz-UZ').format(product.price)} UZS</p>
                      </div>
                    </div>
                  ))}
                  {results.length > 6 && (
                    <button className={styles.viewMore}>
                      {t('search.viewAll') || 'View All Results'} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className={styles.noResults}>
                  {t('search.noResults') || 'No products found matching your search.'}
                </div>
              )}
              
              {query.length === 0 && (
                <div className={styles.suggestions}>
                  <h4>{t('search.popular') || 'Popular Categories'}</h4>
                  <div className={styles.suggestionTags}>
                    <button onClick={() => { router.push('/categories/new-in'); onClose(); }}>New In</button>
                    <button onClick={() => { router.push('/categories/evening-wear'); onClose(); }}>Evening Wear</button>
                    <button onClick={() => { router.push('/categories/outerwear'); onClose(); }}>Outerwear</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
