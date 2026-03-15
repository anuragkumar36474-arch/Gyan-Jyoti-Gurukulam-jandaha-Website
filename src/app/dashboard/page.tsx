'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Users, Camera, Activity, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DashboardOverview() {
  const [stats, setStats] = useState({ notices: 0, teachers: 0, activities: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        // Run aggregations in parallel
        const [
          { count: noticeCount },
          { count: teacherCount },
          { count: activityCount }
        ] = await Promise.all([
          supabase.from('notices').select('*', { count: 'exact', head: true }),
          supabase.from('teachers').select('*', { count: 'exact', head: true }),
          supabase.from('activities').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          notices: noticeCount || 0,
          teachers: teacherCount || 0,
          activities: activityCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  const cards = [
    { title: 'Total Notices', count: stats.notices, icon: <Bell size={32} />, color: 'bg-blue-50 text-blue-600', link: '/dashboard/notices' },
    { title: 'Our Teachers', count: stats.teachers, icon: <Users size={32} />, color: 'bg-emerald-50 text-emerald-600', link: '/dashboard/teachers' },
    { title: 'Activity Photos', count: stats.activities, icon: <Camera size={32} />, color: 'bg-purple-50 text-purple-600', link: '/dashboard/activities' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Manage school website content easily from your mobile phone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
              {loading ? (
                <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />
              ) : (
                <span className="text-3xl font-bold text-foreground">{card.count}</span>
              )}
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-1">{card.title}</h3>
            
            <Link href={card.link} className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-primary font-medium hover:text-accent-orange transition-colors">
              Manage Items
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-accent-orange/10 rounded-2xl p-6 md:p-8 border border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white p-3 rounded-full text-primary shadow-sm">
            <Activity size={24} />
          </div>
          <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
        </div>
        <p className="text-muted-foreground mb-6">Need to update the website quickly? Use the buttons below.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard/notices" className="btn-primary w-full shadow-md text-sm py-4">
            + Post New Notice
          </Link>
          <Link href="/dashboard/activities" className="btn-secondary w-full shadow-md text-sm py-4 border-white bg-white">
            + Upload Event Photo
          </Link>
          <Link href="/dashboard/teachers" className="btn-secondary w-full shadow-md text-sm py-4 border-white bg-white">
            + Add Teacher Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
