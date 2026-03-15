'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit2, Loader2 } from 'lucide-react';

export default function ManageNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {
    setLoading(true);
    const { data, error } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    if (!error && data) setNotices(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    // Fallback date to today if empty
    const noticeDate = formData.date || new Date().toISOString().split('T')[0];

    const { error } = await supabase.from('notices').insert([
      { title: formData.title, description: formData.description, date: noticeDate }
    ]);

    setSubmitting(false);
    if (!error) {
      setIsAdding(false);
      setFormData({ title: '', description: '', date: '' });
      fetchNotices();
    } else {
      alert('Failed to add notice: ' + error.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (!error) {
      fetchNotices();
    } else {
      alert('Failed to delete: ' + error.message);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-foreground">Manage Notices</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary py-2 px-4 shadow-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} className="mr-2" /> Add Notice</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-premium border border-border mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold mb-4">Post a New Notice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Notice Title <span className="text-primary">*</span></label>
              <input 
                type="text" required
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                placeholder="e.g. School Reopening Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <textarea 
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full border border-border rounded-lg px-4 py-3 min-h-[100px] focus:ring-1 focus:ring-primary outline-none"
                placeholder="Details about the notice..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input 
                type="date" 
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
              {submitting ? <Loader2 className="animate-spin mr-2"/> : null}
              {submitting ? 'Publishing...' : 'Publish Notice'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : notices.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-2xl border border-border">
          <p className="text-muted-foreground mb-4">No notices found.</p>
          <button onClick={() => setIsAdding(true)} className="btn-secondary">Create your first notice</button>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white p-5 rounded-2xl border border-border flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-primary">{notice.title}</h3>
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                    {notice.date}
                  </span>
                </div>
                {notice.description && <p className="text-muted-foreground text-sm line-clamp-2">{notice.description}</p>}
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:justify-start">
                <button 
                  onClick={() => handleDelete(notice.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  aria-label="Delete notice"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
