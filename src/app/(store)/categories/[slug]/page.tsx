import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { CategoryThemeSetter } from '@/components/CategoryThemeSetter'
import { ProductCard } from '@/components/ProductCard'
import { CategoryHeader } from './CategoryHeader'
import { CategoryEmptyState } from './CategoryEmptyState'
import styles from './CategoryPage.module.css'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  return {
    title: category ? `${category.nameUz} | Simpaty` : 'Kategoriya | Simpaty',
    description: category ? `Simpaty - ${category.nameUz} kolleksiyasi` : '',
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
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

      {/* Hero banner — uses CategoryHeader (client) for i18n-aware title + breadcrumb */}
      <div
        className={styles.hero}
        style={{ backgroundImage: category.imageUrl ? `url(${category.imageUrl})` : 'none' }}
      >
        <div className={styles.overlay} />
        <CategoryHeader
          nameUz={category.nameUz}
          nameRu={category.nameRu}
          productCount={category.products.length}
        />
      </div>

      {/* Products */}
      <div className={`container ${styles.content}`}>
        {category.products.length > 0 ? (
          <div className={styles.grid}>
            {category.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CategoryEmptyState />
        )}
      </div>
    </div>
  )
}

