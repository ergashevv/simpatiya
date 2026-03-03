'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import styles from './CategoryPage.module.css'

export function CategoryEmptyState() {
  const { t } = useI18n()

  return (
    <div className={styles.empty}>
      <p>{t('category.empty')}</p>
      <Link href="/categories" className={styles.backBtn}>
        {t('category.back')}
      </Link>
    </div>
  )
}

