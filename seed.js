const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Admin user
  const email = 'admin@simpaty.uz';
  const password = 'simpaty_admin';
  const passwordHash = await bcrypt.hash(password, 10);
  
  await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'ADMIN',
      name: 'Simpaty'
    },
    create: {
      email,
      name: 'Simpaty',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // Categories
  const categoriesData = [
    {
      slug: 'unforgettable-evening',
      nameUz: 'Ajoyib Oqshom',
      nameRu: 'Незабываемый Вечер',
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1600',
      mainColor: '#1A1A24', // Deep midnight blue/black
      secondaryColor: '#D4AF37', // Gold
      isActive: true,
    },
    {
      slug: 'breath-of-spring',
      nameUz: 'Bahorning Nafasi',
      nameRu: 'Дыхание Весны',
      imageUrl: 'https://images.unsplash.com/photo-1515347619362-e6fd01cc2510?auto=format&fit=crop&q=80&w=1600',
      mainColor: '#9C6B71', // Muted rose
      secondaryColor: '#FDF6F5', // Soft flesh
      isActive: true,
    },
    {
      slug: 'business-style',
      nameUz: 'Biznes Uslubi',
      nameRu: 'Бизнес Стиль',
      imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1600',
      mainColor: '#3F4E4F', // Slate grey
      secondaryColor: '#A27B5C', // Leather brown
      isActive: true,
    },
    {
      slug: 'elegant-accessories',
      nameUz: 'Nafosat Aksessuarlari',
      nameRu: 'Изысканные Аксессуары',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1600',
      mainColor: '#8B4513', // Saddle brown
      secondaryColor: '#FFF8DC', // Cornsilk
      isActive: true,
    }
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories.push(createdCat);
  }

  // SubCategories for Evening
  const subCatsEvening = [
    {
      categoryId: categories[0].id,
      slug: 'long-dresses',
      nameUz: "Uzun Ko'ylaklar",
      nameRu: 'Длинные Платья',
    },
    {
      categoryId: categories[0].id,
      slug: 'cocktail-dresses',
      nameUz: "Kokteyl Ko'ylaklar",
      nameRu: 'Коктейльные Платья',
    }
  ];

  const subCategories = [];
  for (const sub of subCatsEvening) {
      const createdSub = await prisma.subCategory.upsert({
          where: { slug: sub.slug },
          update: sub,
          create: sub
      });
      subCategories.push(createdSub);
  }

  // Products
  const productsData = [
    {
      categoryId: categories[0].id,
      subCategoryId: subCategories[0].id,
      slug: 'royal-velvet-dress',
      nameUz: "Shohona Baxmal Ko'ylak",
      nameRu: 'Королевское Бархатное Платье',
      descriptionUz: "Tun qorong'usida yulduzdek porlab turuvchi, aslzodalar xonimlariga xos bo'lgan shohona baxmal ko'ylak. Bu libos sizga o'zgacha viqor, sirli joziba va o'ziga ishonch hadya etadi. Qimmatbaho iplar va nozik bichim har bir harakatingizda oqlanganlikni ifodalaydi.",
      descriptionRu: "Королевское бархатное платье, сияющее как звезда в ночи, достойное истинных леди. Этот наряд подарит вам особое величие, таинственное очарование и уверенность в себе. Драгоценные нити и изящный крой подчеркнут грацию в каждом вашем движении.",
      price: 1250000,
      primaryImage: 'https://images.unsplash.com/photo-1566160983996-5f10640a42e5?auto=format&fit=crop&q=80&w=1000',
      images: [
        'https://images.unsplash.com/photo-1566160983996-5f10640a42e5?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000'
      ],
      isActive: true,
    },
    {
      categoryId: categories[1].id,
      slug: 'pure-silk-dress',
      nameUz: "Nafis Ipak Libosi",
      nameRu: 'Нежное Шелковое Платье',
      descriptionUz: "Yozgi tongning mayin shabadasidek rohat baxsh etuvchi toza ipak libos. Elegant ko'rinish va o'ta qulaylik uyg'unligi. Kundalik go'zalligingizni oddiylik orqali ulug'laydi.",
      descriptionRu: "Платье из чистого шелка, дарящее блаженство, как легкий ветерок летнего утра. Сочетание элегантности и абсолютного комфорта. Подчеркнет вашу повседневную красоту через простоту.",
      price: 850000,
      primaryImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000',
      images: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=1000'
      ],
      isActive: true,
    },
    {
      categoryId: categories[1].id,
      slug: 'spring-flower-set',
      nameUz: "Bahor Guli Top va Yubka",
      nameRu: 'Комплект Топ и Юбка "Весенний Цветок"',
      descriptionUz: "Yorqin bahor kunlari uchun yengil va havodor to'plam. Och ranglar va nozik tekstura sizning romantik tabiatingizni namoyon etadi. Qizg'in uchrashuvlar va shahar sayrlari uchun ayni muddao.",
      descriptionRu: "Легкий и воздушный комплект для ярких весенних дней. Светлые тона и нежная текстура раскроют вашу романтическую натуру. Идеальный выбор для пылких свиданий и городских прогулок.",
      price: 540000,
      primaryImage: 'https://images.unsplash.com/photo-1515347619362-e6fd01cc2510?auto=format&fit=crop&q=80&w=1000',
      images: [
        'https://images.unsplash.com/photo-1515347619362-e6fd01cc2510?auto=format&fit=crop&q=80&w=1000'
      ],
      isActive: true,
    },
    {
      categoryId: categories[2].id,
      slug: 'strict-business-suit',
      nameUz: "Qat'iy Biznes Kostyum",
      nameRu: 'Строгий Бизнес-Костюм',
      descriptionUz: "Ofisda ham mukammal ko'rinish va ishonchni his etish uchun italyan uslubida ishlangan biznes kostyum. Ayollik nafosatini saqlagan holda klassik jiddiylikni ifodalaydi.",
      descriptionRu: "Бизнес-костюм в итальянском стиле для идеального вида и уверенности в офисе. Выражает классическую строгость, сохраняя при этом женскую утонченность.",
      price: 1800000,
      primaryImage: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=1000',
      images: [
        'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000'
      ],
      isActive: true,
    }
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
