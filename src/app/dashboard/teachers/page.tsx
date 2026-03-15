'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Loader2, UploadCloud, User } from 'lucide-react';
import Image from 'next/image';

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', subject: '' });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    setLoading(true);
    const { data, error } = await supabase.from('teachers').select('*').order('created_at', { ascending: false });
    if (!error && data) setTeachers(data);
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
    setSubmitting(true);
    
    let photoUrl = '';

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('teacher-photos')
        .upload(filePath, file);

      if (uploadError) {
        alert('Image upload failed: ' + uploadError.message);
        setSubmitting(false);
        return;
      }
      
      const { data } = supabase.storage.from('teacher-photos').getPublicUrl(filePath);
      photoUrl = data.publicUrl;
    } else {
      // Default placeholder if no photo provided
      photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=B91C1C&color=fff&size=200`;
    }

    const { error } = await supabase.from('teachers').insert([
      { name: formData.name, subject: formData.subject, photo_url: photoUrl }
    ]);

    setSubmitting(false);
    if (!error) {
      setIsAdding(false);
      setFormData({ name: '', subject: '' });
      setFile(null);
      setFilePreview(null);
      fetchTeachers();
    } else {
      alert('Failed to add teacher: ' + error.message);
    }
  }

  async function handleDelete(id: number, photoUrl: string) {
    if (!confirm('Are you sure you want to remove this teacher?')) return;
    
    // Attempt to delete photo from storage if it's from our supabase bucket
    if (photoUrl && photoUrl.includes('supabase.co')) {
      const pathSegments = photoUrl.split('/');
      const fileName = pathSegments[pathSegments.length - 1];
      const folderName = pathSegments[pathSegments.length - 2];
      await supabase.storage.from('teacher-photos').remove([`${folderName}/${fileName}`]);
    }

    const { error } = await supabase.from('teachers').delete().eq('id', id);
    if (!error) {
      fetchTeachers();
    } else {
      alert('Failed to delete: ' + error.message);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-foreground">Manage Teachers</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary py-2 px-4 shadow-sm"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} className="mr-2" /> Add Teacher</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-premium border border-border mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold mb-4">Add Teacher Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Image Upload Area */}
            <div className="flex justify-center mb-6">
              <div 
                className="relative w-32 h-32 rounded-full border-2 border-dashed border-primary/50 flex flex-col items-center justify-center bg-primary/5 cursor-pointer overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {filePreview ? (
                  <div className="absolute inset-0">
                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud className="text-white mb-1" size={20} />
                      <span className="text-white text-xs font-semibold">Change</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <User className="text-primary/60 mb-2" size={32} />
                    <span className="text-primary/70 text-xs font-semibold text-center leading-tight">Tap to Upload<br/>Photo</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/jpeg, image/png, image/webp" 
                  className="hidden" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teacher Name <span className="text-primary">*</span></label>
              <input 
                type="text" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                placeholder="e.g. Mrs. Sunita Verma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject <span className="text-primary">*</span></label>
              <input 
                type="text" required
                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                placeholder="e.g. Mathematics"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full py-3 mt-4">
              {submitting ? <Loader2 className="animate-spin mr-2"/> : null}
              {submitting ? 'Saving Profile...' : 'Save Profile'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : teachers.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-2xl border border-border">
          <p className="text-muted-foreground mb-4">No teachers profiled yet.</p>
          <button onClick={() => setIsAdding(true)} className="btn-secondary">Add the first teacher</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white p-4 rounded-2xl border border-border flex items-center gap-4 shadow-sm group">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shrink-0">
                <Image
                  src={teacher.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random`}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-base text-foreground truncate">{teacher.name}</h3>
                <p className="text-primary text-sm truncate">{teacher.subject}</p>
              </div>
              <button 
                onClick={() => handleDelete(teacher.id, teacher.photo_url)}
                className="p-2 text-red-500 bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                aria-label="Remove teacher"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
