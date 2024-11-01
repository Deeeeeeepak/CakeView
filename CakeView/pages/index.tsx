import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Types
interface Cake {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface PaginationInfo {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface Props {
  initialCakes: Cake[];
  initialPagination: PaginationInfo;
}

const CakeManagement: React.FC<Props> = ({ initialCakes, initialPagination }) => {
  // State management
  const [cakes, setCakes] = useState<Cake[]>(initialCakes);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Form states
  const [editingCake, setEditingCake] = useState<Cake | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });

  // Current page state
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch cakes with filters and pagination
  const fetchCakes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        ...(nameFilter && { name: nameFilter }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice })
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      setCakes(data.data);
      setPagination(data.pagination);
    } catch {
      setError('Failed to fetch cakes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCakes();
  }, [currentPage, nameFilter, minPrice, maxPrice]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const method = editingCake ? 'PUT' : 'POST';
      const endpoint = editingCake ? `/api/products/${editingCake.id}` : '/api/products/add';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(editingCake ? 'Failed to update cake' : 'Failed to add cake');
      
      setSuccess(editingCake ? 'Cake updated successfully!' : 'Cake added successfully!');
      setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '' });
      setEditingCake(null);
      setShowModal(false);
      fetchCakes();
    } catch (err) {
      alert(`Error fetching cakes: ${(err as Error).message}`);
      console.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this cake?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (!response.ok) throw new Error('Failed to delete cake');
      setSuccess('Cake deleted successfully!');
      fetchCakes();
    } catch (err) {
      alert(`Error fetching cakes: ${(err as Error).message}`);
      console.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold">Cake Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} /> Add New Cake
          </button>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                placeholder="Search by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min price"
                className="w-28 px-4 py-2 border rounded-md"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max price"
                className="w-28 px-4 py-2 border rounded-md"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Cakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cakes.map((cake) => (
              <div key={cake.id} className="bg-white rounded-lg shadow border">
                <img
                  src={cake.imageUrl}
                  alt={cake.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{cake.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cake.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-green-600">${cake.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">Stock: {cake.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCake(cake);
                        setFormData({
                          name: cake.name,
                          description: cake.description,
                          price: cake.price.toString(),
                          stock: cake.stock.toString(),
                          imageUrl: cake.imageUrl
                        });
                        setShowModal(true);
                      }}
                      className="flex-1 px-3 py-1 border rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cake.id)}
                      className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                Showing {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.total, pagination.currentPage * pagination.limit)} of {pagination.total}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  disabled={!pagination.hasNextPage}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Cake */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold mb-4">{editingCake ? 'Edit Cake' : 'Add New Cake'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="imageUrl">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-500">
                  <X className="h-4 w-4" />
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {editingCake ? 'Update Cake' : 'Add Cake'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Server-side rendering for initial data fetching
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/products?page=1&limit=6');
  const data = await res.json();

  return {
    props: {
      initialCakes: data.data,
      initialPagination: data.pagination,
    },
  };
};

export default CakeManagement;
