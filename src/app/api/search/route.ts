import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { nameUz: { contains: query, mode: 'insensitive' } },
          { nameRu: { contains: query, mode: 'insensitive' } },
          { descriptionUz: { contains: query, mode: 'insensitive' } },
          { descriptionRu: { contains: query, mode: 'insensitive' } },
        ],
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        nameUz: true,
        nameRu: true,
        price: true,
        primaryImage: true,
      },
      take: 20,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
