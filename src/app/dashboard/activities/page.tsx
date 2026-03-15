'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Loader2, ImagePlus } from 'lucide-react';

export default function ManageActivities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', date: '' });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Basic categories
  const categories = ['Sports', 'Academics', 'Cultural', 'Tour', 'Workshop', 'Other'];

  useEffect(() => {
    if (supabase) {
      fetchActivities();
    } else {
      setLoading(false);
    }
  }, [supabase]);

  async function fetchActivities() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('activities').select('*').order('date', { ascending: false });
    if (!error && data) setActivities(data);
    setLoading(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!file) {
      alert("Please select a photo to upload.");
      return;
    }

    setSubmitting(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${formData.category.toLowerCase()}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('activity-photos')
      .upload(filePath, file);

    if (uploadError) {
      alert('Photo upload failed: ' + uploadError.message);
      setSubmitting(false);
      return;
    }
    
    const { data } = supabase.storage.from('activity-photos').getPublicUrl(filePath);
    const photoUrl = data.publicUrl;

    const activityDate = formData.date || new Date().toISOString().split('T')[0];

    const { error } = await supabase.from('activities').insert([
      { title: formData.title, category: formData.category, date: activityDate, image_url: photoUrl }
    ]);

    setSubmitting(false);
    if (!error) {
      setIsAdding(false);
      setFormData({ title: '', category: '', date: '' });
      setFile(null);
      setFilePreview(null);
      fetchActivities();
    } else {
      alert('Failed to add activity: ' + error.message);
    }
  }

  async function handleDelete(id: number, imageUrl: string) {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    
    // Attempt to delete photo from storage
    if (imageUrl && imageUrl.includes('supabase.co')) {
      const pathSegments = imageUrl.split('/');
      const fileName = pathSegments[pathSegments.length - 1];
      const folderName = pathSegments[pathSegments.length - 2];
      await supabase.storage.from('activity-photos').remove([`${folderName}/${fileName}`]);
    }

    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) {
      fetchActivities();
    } else {
      alert('Failed to delete: ' + error.message);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-foreground">Activity Gallery</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary py-2 px-4 shadow-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} className="mr-2" /> Upload Photo</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-premium border border-border mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold mb-4">Add Gallery Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Image Upload Area */}
            <div 
              className="relative w-full aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-muted/40 cursor-pointer overflow-hidden group mb-4 hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {filePreview ? (
                <>
                  <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold px-4 py-2 border border-white rounded-lg backdrop-blur-sm">Change Photo</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground group-hover:text-primary transition-colors">
                  <ImagePlus size={48} className="mb-3 opacity-50" />
                  <p className="font-medium text-sm">Tap to select a photo from your phone</p>
                  <p className="text-xs opacity-70 mt-1">Wide landscape photos work best</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/jpeg, image/png, image/webp" 
                className="hidden" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title <span className="text-primary">*</span></label>
              <input 
                type="text" required
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                placeholder="e.g. Annual Sports Day 2024"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category <span className="text-primary">*</span></label>
                <select 
                  required
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none bg-white"
                >
                  <option value="" disabled>Select...</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full py-4 mt-6 font-semibold">
              {submitting ? <Loader2 className="animate-spin mr-2"/> : null}
              {submitting ? 'Uploading to Gallery...' : 'Upload to Gallery'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : activities.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-2xl border border-border">
          <p className="text-muted-foreground mb-4">No activities present in the gallery.</p>
          <button onClick={() => setIsAdding(true)} className="btn-secondary">Upload First Photo</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm group">
              <div className="relative aspect-video">
                <img
                  src={activity.image_url}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => handleDelete(activity.id, activity.image_url)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                  aria-label="Delete photo"
                >
                  <Trash2 size={16} />
                </button>
                <div className="absolute top-2 left-2">
                  <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    {activity.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-foreground mb-1 truncate">{activity.title}</h3>
                <p className="text-muted-foreground text-xs">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
