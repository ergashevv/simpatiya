import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { CategoryThemeSetter } from '@/components/CategoryThemeSetter'
import { ProductCard } from '@/components/ProductCard'
import styles from './CategoryPage.module.css'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      subCategories: true,
      products: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!category) {
    notFound()
  }

  return (
    <div className={styles.page}>
      <CategoryThemeSetter 
        primary={category.mainColor || '#800020'} 
        secondary={category.secondaryColor || '#d4af37'} 
      />
      
      <div className={styles.hero} style={{ backgroundImage: `url(${category.imageUrl || ''})` }}>
        <div className={styles.overlay} />
        <div className={`container ${styles.headerContent}`}>
          <h1 className={styles.title}>{category.nameUz}</h1>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          {category.products.length > 0 ? (
            category.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className={styles.empty}>Hozircha ushbu kategoriyada mahsulotlar y'oq.</p>
          )}
        </div>
      </div>
    </div>
  )
}
