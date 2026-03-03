'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import styles from './Hero.module.css'

export function Hero() {
  const { t } = useI18n()

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={styles.tagline}>Simpaty Exclusive</span>
          <h1 className={styles.title}>{t('home.hero.title')}</h1>
          <p className={styles.subtitle}>{t('home.hero.subtitle')}</p>
          
          <Link href="/categories" className={styles.btn}>
            {t('home.hero.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
