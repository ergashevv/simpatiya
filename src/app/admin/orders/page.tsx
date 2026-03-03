import prisma from '@/lib/prisma'
import { StatusUpdater } from './StatusUpdater'
import styles from '../AdminForms.module.css'
import { OrderStatus } from '@prisma/client'

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { product: true, user: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className={styles.container} style={{ maxWidth: '1200px' }}>
      <div className={styles.listHeader}>
        <h1 className={styles.title}>Buyurtmalar</h1>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vaqt</th>
            <th>Mijoz Ismi</th>
            <th>Telefon</th>
            <th>Mahsulot</th>
            <th>Manzil</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td><span style={{fontSize: '0.8rem', color: '#999'}}>{o.id.slice(-6)}</span></td>
              <td>{new Date(o.createdAt).toLocaleString('uz-UZ')}</td>
              <td>{o.clientName}</td>
              <td>{o.clientPhone}</td>
              <td>
                <a href={`/product/${o.product.slug}`} target="_blank" style={{color: 'var(--primary-color)'}}>
                  {o.product.nameUz}
                </a>
              </td>
              <td style={{maxWidth: '150px'}}>{o.address || '-'}</td>
              <td>
                <StatusUpdater orderId={o.id} currentStatus={o.status as OrderStatus} />
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} style={{textAlign: 'center', padding: '2rem'}}>Buyurtmalar topilmadi.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
