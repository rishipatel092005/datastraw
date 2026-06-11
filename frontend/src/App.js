import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://datastraw-i7f5.onrender.com/api';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: '',
  });

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      
      const response = await axios.get(`${API_URL}/tickets?${params}`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
    setLoading(false);
  }, [search, status]);

  // Fetch tickets
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Create ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/tickets`, formData);
      setFormData({
        customer_name: '',
        customer_email: '',
        subject: '',
        description: '',
      });
      setShowForm(false);
      fetchTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket');
    }
  };

  // View ticket details
  const viewTicket = async (ticketId) => {
    try {
      const response = await axios.get(`${API_URL}/tickets/${ticketId}`);
      setSelectedTicket(response.data);
      setNote('');
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  };

  // Update ticket status
  const updateStatus = async (ticketId, newStatus) => {
    try {
      await axios.put(`${API_URL}/tickets/${ticketId}`, {
        status: newStatus,
        note_text: note || '',
      });
      setSelectedTicket(null);
      setNote('');
      fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Error updating ticket');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open':
        return { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700' };
      case 'In Progress':
        return { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-700' };
      case 'Closed':
        return { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-700' };
      default:
        return { bg: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  if (selectedTicket) {
    const colors = getStatusColor(selectedTicket.status);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 fade-in">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedTicket(null)}
            className="mb-6 px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
          >
            ← Back to Tickets
          </button>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className={`${colors.bg} p-6 text-white`}>
              <h2 className="text-3xl font-bold">{selectedTicket.ticket_id}</h2>
              <p className="text-white/80 mt-1">Ticket Details</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Customer Name</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{selectedTicket.customer_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Email</p>
                  <p className="text-xl font-bold text-indigo-600 mt-2">{selectedTicket.customer_email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Subject</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{selectedTicket.subject}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Description</p>
                  <p className="text-gray-700 mt-2 leading-relaxed">{selectedTicket.description}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Status</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-white text-sm font-bold mt-2 ${colors.bg}`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Created Date</p>
                  <p className="text-gray-900 font-bold mt-2">{new Date(selectedTicket.created_at).toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6 mb-6">
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-4">Add Note & Update Status</p>
                <textarea
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none mb-4 resize-none"
                  rows="3"
                />
                <div className="flex gap-3 flex-wrap">
                  {selectedTicket.status !== 'In Progress' && (
                    <button
                      onClick={() => updateStatus(selectedTicket.ticket_id, 'In Progress')}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      ⏳ In Progress
                    </button>
                  )}
                  {selectedTicket.status !== 'Closed' && (
                    <button
                      onClick={() => updateStatus(selectedTicket.ticket_id, 'Closed')}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      ✓ Close Ticket
                    </button>
                  )}
                  {selectedTicket.status !== 'Open' && (
                    <button
                      onClick={() => updateStatus(selectedTicket.ticket_id, 'Open')}
                      className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      ⚠ Reopen
                    </button>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedTicket.notes && selectedTicket.notes.length > 0 && (
                <div className="border-t pt-6">
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-4">Notes History</p>
                  <div className="space-y-3">
                    {selectedTicket.notes.map((n, i) => (
                      <div key={i} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p className="text-gray-700">{n.note_text}</p>
                        <p className="text-gray-400 text-xs mt-2">{new Date(n.created_at).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 slide-in">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">🎫 DataStraw CRM</h1>
          <p className="text-white/80 text-lg mt-2">Professional Ticket Management System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 py-8">
        {/* Create Ticket Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              {showForm ? '✕ Cancel' : '✨ Create Ticket'}
            </button>
          </div>
          <div className="text-white text-sm font-semibold">
            Total Tickets: <span className="text-2xl text-yellow-300">{tickets.length}</span>
          </div>
        </div>

        {/* Create Ticket Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 fade-in">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.customer_email}
                  onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
              <textarea
                placeholder="Description"
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                ✓ Create Ticket
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-8 border border-white/20 fade-in">
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex-1 min-w-[250px]">
              <input
                type="text"
                placeholder="🔍 Search by name, email, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 backdrop-blur text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 backdrop-blur text-white focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all"
            >
              <option value="">All Status</option>
              <option value="Open">🔴 Open</option>
              <option value="In Progress">🟡 In Progress</option>
              <option value="Closed">🟢 Closed</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Ticket ID</th>
                  <th className="px-6 py-4 text-left font-bold">Customer</th>
                  <th className="px-6 py-4 text-left font-bold">Subject</th>
                  <th className="px-6 py-4 text-left font-bold">Status</th>
                  <th className="px-6 py-4 text-left font-bold">Created</th>
                  <th className="px-6 py-4 text-left font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg">📭 No tickets found</div>
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => {
                    const colors = getStatusColor(ticket.status);
                    return (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 font-mono font-bold text-indigo-600">{ticket.ticket_id}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{ticket.customer_name}</td>
                        <td className="px-6 py-4 text-gray-700">{ticket.subject}</td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-2 rounded-full text-white text-sm font-bold ${colors.bg}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => viewTicket(ticket.ticket_id)}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            👁 View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}