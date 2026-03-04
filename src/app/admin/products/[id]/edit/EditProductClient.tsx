'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveProduct } from '@/app/actions/admin'
import { ImageUpload } from '@/components/ImageUpload'
import styles from '../../../AdminForms.module.css'

type Product = {
  id: string
  nameUz: string
  nameRu: string | null
  slug: string
  descriptionUz: string | null
  descriptionRu: string | null
  categoryId: string
  price: number
  primaryImage: string | null
  isActive: boolean
  colors: string[]
  sizes: string[]
}

type Category = {
  id: string
  nameUz: string
}

export default function EditProductClient({ product, categories }: { product: Product, categories: Category[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(product.primaryImage || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append('primaryImage', imageUrl)
    formData.append('id', product.id)

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
      <h1 className={styles.title}>Mahsulotni Tahrirlash</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nomi (UZ) *</label>
            <input name="nameUz" required className={styles.input} defaultValue={product.nameUz} />
          </div>
          <div className={styles.formGroup}>
            <label>Nomi (RU)</label>
            <input name="nameRu" className={styles.input} defaultValue={product.nameRu || ''} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Slug (URL) *</label>
            <input name="slug" required className={styles.input} defaultValue={product.slug} />
          </div>
          <div className={styles.formGroup}>
            <label>Narx (UZS) *</label>
            <input name="price" type="number" required className={styles.input} defaultValue={product.price} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Kategoriya *</label>
            <select name="categoryId" required className={styles.select} defaultValue={product.categoryId}>
              <option value="">Tanlang...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.nameUz}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select name="isActive" className={styles.select} defaultValue={String(product.isActive)}>
              <option value="true">Faol</option>
              <option value="false">Nofaol</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Ranglar (vergul bilan ajrating)</label>
            <input name="colors" defaultValue={product.colors?.join(', ') || ''} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>O&apos;lchamlar (vergul bilan ajrating)</label>
            <input name="sizes" defaultValue={product.sizes?.join(', ') || ''} className={styles.input} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Ta&apos;rif (UZ)</label>
          <textarea name="descriptionUz" rows={4} className={styles.textarea} defaultValue={product.descriptionUz || ''} />
        </div>

        <div className={styles.formGroup}>
          <label>Ta&apos;rif (RU)</label>
          <textarea name="descriptionRu" rows={4} className={styles.textarea} defaultValue={product.descriptionRu || ''} />
        </div>

        <div className={styles.formGroup}>
          <label>Asosiy Rasm</label>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            hint="Tavsiya: 800×1000 px (portrait/vertikal format)"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>
            ← Bekor qilish
          </button>
          <button type="submit" disabled={loading} className={styles.btn} style={{ flex: 1 }}>
            {loading ? 'Saqlanmoqda...' : '✓ Saqlash'}
          </button>
        </div>
      </form>
    </div>
  )
}
