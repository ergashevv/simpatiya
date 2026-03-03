'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@prisma/client'
import { useI18n } from '@/lib/i18n'
import { placeOrder } from '@/app/actions/order'
import { X } from 'lucide-react'
import styles from './OrderModal.module.css'

export function OrderModal({ 
  isOpen, 
  onClose, 
  product 
}: { 
  isOpen: boolean
  onClose: () => void
  product: Product 
}) {
  const { t, lang } = useI18n()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.append('productId', product.id)
    
    try {
      const res = await placeOrder(formData)
      if (res.success) {
        setSuccess(true)
      } else {
        setError(res.error || 'Xatolik yuz berdi')
      }
    } catch (err) {
      setError('Tizim xatosi')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
          
          <h2 className={styles.title}>{t('product.order')}</h2>
          <p className={styles.subtitle}>
            {lang === 'uz' ? product.nameUz : product.nameRu}
          </p>
          
          {success ? (
            <div className={styles.success}>
              <h3>{t('order.success')}</h3>
              <p>Tez orada menejerlarimiz siz bilan bog'lanishadi.</p>
              <button className={styles.btn} onClick={onClose}>Yopish</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <p className={styles.error}>{error}</p>}
              
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('form.name')}</label>
                <input name="clientName" className={styles.input} required />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('form.phone')}</label>
                <input name="clientPhone" type="tel" className={styles.input} required placeholder="+998 90 123 45 67" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('form.address')} (Ixtiyoriy)</label>
                <textarea name="address" className={styles.input} rows={2} />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Kuting...' : t('form.submit')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
