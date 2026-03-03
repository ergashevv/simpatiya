'use server'

import prisma from '@/lib/prisma'
import { setSession, clearSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: "Barcha maydonlarni to'ldiring" }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { error: "Foydalanuvchi topilmadi" }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) return { error: "Parol noto'g'ri" }

  await setSession({ sub: user.id, role: user.role, email: user.email })
  
  return { success: true, role: user.role }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const name = formData.get('name') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: "Barcha maydonlarni to'ldiring" }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: "Bu email allaqachon ro'yxatdan o'tgan" }

  const passwordHash = await bcrypt.hash(password, 10)

  const isFirstUser = await prisma.user.count() === 0
  const role = isFirstUser ? 'ADMIN' : 'USER'

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role
    }
  })

  await setSession({ sub: user.id, role: user.role, email: user.email })
  return { success: true }
}

export async function logout() {
  await clearSession()
  return { success: true }
}
