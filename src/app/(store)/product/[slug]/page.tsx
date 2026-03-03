import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { ProductDetails } from './ProductDetails'
import { CategoryThemeSetter } from '@/components/CategoryThemeSetter'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  return (
    <>
      <CategoryThemeSetter 
        primary={product.category.mainColor || '#800020'} 
        secondary={product.category.secondaryColor || '#d4af37'} 
      />
      <ProductDetails product={product} />
    </>
  )
}
