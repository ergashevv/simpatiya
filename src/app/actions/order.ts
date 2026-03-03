'use server'

import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function placeOrder(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    let session = null
    
    if (token) {
      session = await verifyToken(token)
    }

    if (!session || !session.sub) {
      return { success: false, error: "Iltimos, avval tizimga kiring (Login)" }
    }

    const productId = formData.get('productId') as string
    const clientName = formData.get('clientName') as string
    const clientPhone = formData.get('clientPhone') as string
    const address = formData.get('address') as string

    if (!productId || !clientName || !clientPhone) {
      return { success: false, error: "Barcha majburiy maydonlarni to'ldiring" }
    }

    await prisma.order.create({
      data: {
        userId: session.sub,
        productId,
        clientName,
        clientPhone,
        address,
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Order Error:', error)
    return { success: false, error: "Tizimda xatolik yuz berdi. Iltimos qayta urinib ko'ring." }
  }
}
