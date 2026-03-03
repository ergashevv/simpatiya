'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function saveCategory(formData: FormData) {
  const nameUz = formData.get('nameUz') as string
  const nameRu = formData.get('nameRu') as string
  const slug = formData.get('slug') as string
  const imageUrl = formData.get('imageUrl') as string
  const mainColor = formData.get('mainColor') as string
  const secondaryColor = formData.get('secondaryColor') as string

  if (!nameUz || !slug) return { error: "Majburiy maydonlar: Nomi va Slug" }

  await prisma.category.upsert({
    where: { slug: slug },
    update: { nameUz, nameRu, imageUrl, mainColor, secondaryColor },
    create: { slug, nameUz, nameRu, imageUrl, mainColor, secondaryColor }
  })

  revalidatePath('/admin/categories')
  revalidatePath('/')
  return { success: true }
}

export async function saveProduct(formData: FormData) {
  const nameUz = formData.get('nameUz') as string
  const nameRu = formData.get('nameRu') as string
  const slug = formData.get('slug') as string
  const descriptionUz = formData.get('descriptionUz') as string
  const descriptionRu = formData.get('descriptionRu') as string
  const categoryId = formData.get('categoryId') as string
  const price = parseFloat(formData.get('price') as string)
  const primaryImage = formData.get('primaryImage') as string

  if (!nameUz || !slug || !categoryId || isNaN(price)) {
    return { error: "Majburiy maydonlar: Nomi, Slug, Kategoriya va Narx" }
  }

  await prisma.product.upsert({
    where: { slug: slug },
    update: { nameUz, nameRu, descriptionUz, descriptionRu, price, primaryImage, categoryId },
    create: { slug, nameUz, nameRu, descriptionUz, descriptionRu, price, primaryImage, categoryId, images: [] }
  })

  revalidatePath('/admin/products')
  revalidatePath('/')
  return { success: true }
}

export async function updateOrderStatus(orderId: string, status: any) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  })
  
  revalidatePath('/admin/orders')
  return { success: true }
}
