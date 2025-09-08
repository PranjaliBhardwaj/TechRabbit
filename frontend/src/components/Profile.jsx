import "../../tailwind.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, refresh } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notif, setNotif] = useState({ email: true, productUpdates: true, marketing: false });
  const profileImg = user?.avatar ? (user.avatar.startsWith('http') || user.avatar.startsWith('/') ? user.avatar : `${window.location.origin.replace(/\/$/, '')}/backend/uploads/${user.avatar}`) : `${window.location.origin}/default_bunny.jpg`;

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAvatar(user.avatar || '');
      setNotif({
        email: user.notifications?.email ?? true,
        productUpdates: user.notifications?.productUpdates ?? true,
        marketing: user.notifications?.marketing ?? false,
      });
    } else {
      refresh();
    }
  }, [user, refresh]);

  const saveProfile = async () => {
    setSaving(true); setError(''); setSuccess('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/user/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, avatar, password: password || undefined, notifications: notif })
      });
      if (!res.ok) {
        let msg = 'Update failed';
        try { const d = await res.json(); msg = d?.error || msg; } catch {}
        throw new Error(msg);
      }
      setPassword('');
      await refresh();
      setSuccess('Saved');
    } catch (e) {
      setError(e?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#151122] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                My Profile
              </p>
            </div>
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                      style={{ backgroundImage: `url('${profileImg}')` }}
                    ></div>
                    <label className="absolute bottom-0 right-0 bg-[#5b46ff] text-white text-xs px-2 py-1 rounded-full cursor-pointer">
                      Change
                      <input type="file" accept="image/*" className="hidden" onChange={async (e)=>{
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setSaving(true); setError(''); setSuccess('');
                        try {
                          const fd = new FormData();
                          fd.append('avatar', file);
                          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/user/me/avatar`, { method: 'POST', credentials: 'include', body: fd });
                          if (!res.ok) {
                            let msg = 'Avatar upload failed';
                            try { const d = await res.json(); msg = d?.error || msg; } catch {}
                            throw new Error(msg);
                          }
                          await refresh();
                          setSuccess('Avatar updated');
                        } catch (err) {
                          setError(err?.message || 'Avatar upload failed');
                        } finally {
                          setSaving(false);
                        }
                      }} />
                    </label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-[22px] font-bold">{name || 'User'}</p>
                    <p className="text-[#9f93c8] text-base">{user?.email || ''}</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Settings</h2>
            <div className="bg-[#17122b] rounded-xl mx-4 p-4 space-y-4">
              <p className="text-white font-semibold">Account Settings</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#9f93c8] text-sm">Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 rounded-md bg-[#1f1840] text-white p-2 outline-none" />
                </div>
                <div>
                  <label className="text-[#9f93c8] text-sm">Email</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 rounded-md bg-[#1f1840] text-white p-2 outline-none" />
                </div>
                {/* Avatar URL removed as per request */}
              </div>
            </div>

            <div className="bg-[#17122b] rounded-xl mx-4 p-4 space-y-3">
              <p className="text-white font-semibold">Notifications</p>
              <label className="flex items-center gap-3 text-white">
                <input type="checkbox" checked={notif.email} onChange={e=>setNotif(v=>({...v, email: e.target.checked}))} />
                Email notifications
              </label>
              <label className="flex items-center gap-3 text-white">
                <input type="checkbox" checked={notif.productUpdates} onChange={e=>setNotif(v=>({...v, productUpdates: e.target.checked}))} />
                Product updates
              </label>
              <label className="flex items-center gap-3 text-white">
                <input type="checkbox" checked={notif.marketing} onChange={e=>setNotif(v=>({...v, marketing: e.target.checked}))} />
                Marketing messages
              </label>
            </div>

            <div className="bg-[#17122b] rounded-xl mx-4 p-4 space-y-4">
              <p className="text-white font-semibold">Security</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#9f93c8] text-sm">New Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 rounded-md bg-[#1f1840] text-white p-2 pr-10 outline-none" />
                    <button type="button" onClick={()=>setShowPassword(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9f93c8] text-sm">
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {(error || success) && (
              <div className="mx-4">
                {error && <p className="text-red-400 text-sm">{error}</p>}
                {success && <p className="text-green-400 text-sm">{success}</p>}
              </div>
            )}

            <div className="flex px-4 py-3 gap-3">
              <button onClick={saveProfile} disabled={saving} className="flex min-w-[84px] items-center justify-center rounded-full h-10 px-4 bg-[#5b46ff] text-white text-sm font-bold disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button onClick={async () => { await logout(); navigate('/explore'); }} className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-10 px-4 bg-[#2c2447] text-white text-sm font-bold">
                Logout
              </button>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button onClick={async () => { await logout(); navigate('/explore'); }} className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-10 px-4 bg-[#2c2447] text-white text-sm font-bold">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;