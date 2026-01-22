import React from 'react';
import { Order } from '../types';
import { Package, Calendar, ChevronRight } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Order History</h3>
        <span className="text-sm text-slate-500">{orders.length} orders total</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-700">{order.id}</td>
                <td className="px-6 py-4 text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {order.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex flex-col">
                    <span className="font-medium">{order.items[0].name}</span>
                    {order.items.length > 1 && (
                      <span className="text-xs text-slate-400">+{order.items.length - 1} more items</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">
                  ${order.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.length === 0 && (
        <div className="p-12 text-center text-slate-400 flex flex-col items-center">
            <Package className="w-12 h-12 mb-3 opacity-20" />
            <p>No orders found for this period.</p>
        </div>
      )}
    </div>
  );
};

export default OrderTable;