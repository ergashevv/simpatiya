import React from 'react'
import { Hero } from '@/components/Hero'
import { CategoryList } from '@/components/CategoryList'
import prisma from '@/lib/prisma'

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div>
      <Hero />
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <CategoryList categories={categories} />
      </section>
    </div>
  )
}
