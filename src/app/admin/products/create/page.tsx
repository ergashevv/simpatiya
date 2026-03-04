'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { saveProduct } from '@/app/actions/admin'
import { ImageUpload } from '@/components/ImageUpload'
import styles from '../../AdminForms.module.css'
import { getCategories } from './actions'

export default function CreateProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [categories, setCategories] = useState<{id: string, nameUz: string}[]>([])

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append('primaryImage', imageUrl)
    
    try {
      const res = await saveProduct(formData)
      if (res.error) alert(res.error)
      else router.push('/admin/products')
    } catch {
      alert("Tizim xatosi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yangi Mahsulot</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nomi (UZ) *</label>
            <input name="nameUz" required className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Nomi (RU)</label>
            <input name="nameRu" className={styles.input} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Slug (URL) * masalan: qizil-koylak-01</label>
            <input name="slug" required className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Narx (UZS) *</label>
            <input name="price" type="number" required className={styles.input} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Kategoriya *</label>
          <select name="categoryId" required className={styles.select}>
            <option value="">Tanlang...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nameUz}</option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Ranglar (vergul bilan ajrating) masalan: Red, Blue, Black</label>
            <input name="colors" placeholder="Red, Blue, Black" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>O'lchamlar (vergul bilan ajrating) masalan: S, M, L, XL</label>
            <input name="sizes" placeholder="S, M, L, XL" className={styles.input} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Ta&apos;rif (UZ)</label>
          <textarea name="descriptionUz" rows={4} className={styles.textarea} />
        </div>

        <div className={styles.formGroup}>
          <label>Ta&apos;rif (RU)</label>
          <textarea name="descriptionRu" rows={4} className={styles.textarea} />
        </div>

        <div className={styles.formGroup}>
          <label>Asosiy Rasm *</label>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            hint="Tavsiya: 800×1000 px (portrait/vertikal format)"
          />
        </div>

        <button type="submit" disabled={loading} className={styles.btn}>
          {loading ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </form>
    </div>
  )
}
