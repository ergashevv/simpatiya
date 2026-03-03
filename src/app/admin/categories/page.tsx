import prisma from '@/lib/prisma'
import Link from 'next/link'
import styles from '../AdminForms.module.css'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className={styles.container} style={{ maxWidth: '1000px' }}>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Kategoriyalar</h1>
        <Link href="/admin/categories/create" className={styles.addBtn}>
          + Yangi qoshish
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rasm</th>
            <th>Nomi (UZ)</th>
            <th>Slug</th>
            <th>Asosiy Rang</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.nameUz} />
                ) : (
                  <div style={{width: 50, height: 50, background: '#eee', borderRadius: 4}} />
                )}
              </td>
              <td>{c.nameUz}</td>
              <td>{c.slug}</td>
              <td>
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <div style={{width: 20, height: 20, background: c.mainColor || '#800020', borderRadius: '50%'}} />
                  {c.mainColor}
                </div>
              </td>
              <td>{c.isActive ? 'Faol' : 'Nofaol'}</td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>Kategoriyalar topilmadi.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
