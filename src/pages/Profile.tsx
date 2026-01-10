
// import React, { useState, useEffect } from 'react';
// import { 
//   User as UserIcon, 
//   Mail, 
//   Phone, 
//   Shield, 
//   Lock, 
//   Camera, 
//   CheckCircle2, 
//   AlertTriangle, 
//   LogOut, 
//   Trash2, 
//   Save, 
//   Loader2, 
//   Key,
//   ChevronRight,
//   Activity,
//   Smartphone,
//   Globe
// } from 'lucide-react';
// import { getUserProfile, updateUserProfile, updatePassword } from '../services/user';
// import type { User } from '../types';

// const Profile: React.FC = () => {
//   const [profile, setProfile] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   // Form states
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [currentPass, setCurrentPass] = useState('');
//   const [newPass, setNewPass] = useState('');
//   const [confirmPass, setConfirmPass] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const data = await getUserProfile();
//       setProfile(data);
//       setName(data.name);
//       setEmail(data.email);
//       setPhone(data.phone || '');
//       setLoading(false);
//     };
//     fetchProfile();
//   }, []);

//   const handleUpdateInfo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const updated = await updateUserProfile({ name, email, phone });
//       setProfile(updated);
//       showFeedback('success', 'Profile configuration updated successfully.');
//     } catch (err) {
//       showFeedback('error', 'Failed to synchronize profile data.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleUpdatePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPass !== confirmPass) {
//       showFeedback('error', 'Authentication mismatch: New passwords do not match.');
//       return;
//     }
//     setSaving(true);
//     try {
//       await updatePassword(currentPass, newPass);
//       setCurrentPass('');
//       setNewPass('');
//       setConfirmPass('');
//       showFeedback('success', 'Security credentials updated securely.');
//     } catch (err) {
//       showFeedback('error', 'Password update failed. Verify current credentials.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const showFeedback = (type: 'success' | 'error', message: string) => {
//     setFeedback({ type, message });
//     setTimeout(() => setFeedback(null), 4000);
//   };

//   const getPassStrength = () => {
//     if (!newPass) return 0;
//     let strength = 0;
//     if (newPass.length > 8) strength += 1;
//     if (/[A-Z]/.test(newPass)) strength += 1;
//     if (/[0-9]/.test(newPass)) strength += 1;
//     if (/[^A-Za-z0-9]/.test(newPass)) strength += 1;
//     return strength;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <Loader2 className="animate-spin text-emerald-500" size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
//       {/* Feedback Toast */}
//       {feedback && (
//         <div className={`fixed top-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
//           feedback.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-red-500 text-white border-red-400'
//         } animate-fade-in`}>
//           {feedback.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
//           <span className="font-bold text-sm tracking-tight">{feedback.message}</span>
//         </div>
//       )}

//       {/* Header / Hero */}
//       <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-10">
//         <div className="relative group">
//           <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-6xl text-white font-black shadow-2xl shadow-emerald-200 dark:shadow-none overflow-hidden">
//             {name.charAt(0).toUpperCase()}
//           </div>
//           <button className="absolute bottom-2 right-2 p-3 bg-white dark:bg-gray-700 text-emerald-500 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform group-hover:bg-emerald-50">
//             <Camera size={20} />
//           </button>
//         </div>
//         <div className="flex-1 text-center md:text-left space-y-2">
//           <div className="flex flex-col md:flex-row md:items-center gap-3">
//             <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tighter">{name}</h1>
//             <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">
//               {profile?.role}
//             </span>
//           </div>
//           <p className="text-gray-400 font-medium text-lg">{email}</p>
//           <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
//             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//               <CheckCircle2 size={16} className="text-emerald-500" />
//               <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Account Verified</span>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//               <Shield size={16} className="text-emerald-500" />
//               <span className="text-xs font-bold text-gray-500 dark:text-gray-400">2FA Active</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* General Information */}
//         <div className="lg:col-span-2 space-y-8">
//           <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
//             <div className="flex items-center gap-3 mb-10">
//               <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-2xl">
//                 <UserIcon size={24} />
//               </div>
//               <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Identity & Reach</h2>
//             </div>
//             <form onSubmit={handleUpdateInfo} className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Legal Name</label>
//                   <div className="relative">
//                     <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                     <input 
//                       type="text" 
//                       value={name} 
//                       onChange={e => setName(e.target.value)} 
//                       className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-gray-800 dark:text-white outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Endpoint</label>
//                   <div className="relative">
//                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                     <input 
//                       type="email" 
//                       value={email} 
//                       onChange={e => setEmail(e.target.value)} 
//                       className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-gray-800 dark:text-white outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Direct Contact</label>
//                   <div className="relative">
//                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                     <input 
//                       type="text" 
//                       value={phone} 
//                       onChange={e => setPhone(e.target.value)} 
//                       className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-gray-800 dark:text-white outline-none"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Role</label>
//                   <div className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 rounded-2xl text-gray-400 font-bold cursor-not-allowed">
//                     {profile?.role}
//                   </div>
//                 </div>
//               </div>
//               <button 
//                 type="submit" 
//                 disabled={saving}
//                 className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center gap-3 disabled:opacity-50"
//               >
//                 {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
//                 Synchronize Profile
//               </button>
//             </form>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
//             <div className="flex items-center gap-3 mb-10">
//               <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl">
//                 <Lock size={24} />
//               </div>
//               <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Access Protocol</h2>
//             </div>
//             <form onSubmit={handleUpdatePassword} className="space-y-8">
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
//                 <div className="relative">
//                   <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                   <input 
//                     type="password" 
//                     value={currentPass} 
//                     onChange={e => setCurrentPass(e.target.value)} 
//                     className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-gray-800 dark:text-white outline-none"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Credential</label>
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                     <input 
//                       type="password" 
//                       value={newPass} 
//                       onChange={e => setNewPass(e.target.value)} 
//                       className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-gray-800 dark:text-white outline-none"
//                       placeholder="••••••••"
//                     />
//                   </div>
//                   {/* Password Strength */}
//                   <div className="flex gap-1 h-1.5 mt-2">
//                     {[1, 2, 3, 4].map(step => (
//                       <div key={step} className={`flex-1 rounded-full transition-colors ${getPassStrength() >= step ? 'bg-emerald-500' : 'bg-gray-100 dark:bg-gray-700'}`}></div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Credential</label>
//                   <div className="relative">
//                     <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
//                     <input 
//                       type="password" 
//                       value={confirmPass} 
//                       onChange={e => setConfirmPass(e.target.value)} 
//                       className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-gray-800 dark:text-white outline-none"
//                       placeholder="••••••••"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <button 
//                 type="submit" 
//                 disabled={saving || !newPass}
//                 className="px-10 py-5 bg-gray-900 dark:bg-black hover:bg-black text-white rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 flex items-center gap-3 disabled:opacity-50"
//               >
//                 {saving ? <Loader2 className="animate-spin" size={20} /> : <Key size={20} />}
//                 Update Security Protocol
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Sidebar Status / Actions */}
//         <div className="space-y-8">
//           <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
//             <h3 className="text-xl font-black text-gray-800 dark:text-white mb-8 tracking-tight flex items-center gap-3">
//               <Activity className="text-emerald-500" size={20} />
//               Session Telemetry
//             </h3>
//             <div className="space-y-6">
//               {[
//                 { label: 'Last Authentication', value: profile?.lastLogin, icon: Globe },
//                 { label: 'Registered Device', value: 'MacBook Pro 16"', icon: Smartphone },
//                 { label: 'Network Integrity', value: 'Secure / TLS 1.3', icon: Shield },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-start gap-4">
//                   <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-gray-400">
//                     <item.icon size={18} />
//                   </div>
//                   <div>
//                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{item.label}</span>
//                     <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.value}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-10 pt-10 border-t border-gray-50 dark:border-gray-700">
//                <button className="w-full py-4 border-2 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-2xl font-black text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3">
//                  View History <ChevronRight size={18} />
//                </button>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
//              <button 
//               onClick={() => showFeedback('error', 'Logout initialized.')}
//               className="w-full py-5 bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 rounded-2xl font-black text-sm hover:bg-orange-100 transition-all flex items-center justify-center gap-3 group"
//              >
//                 <LogOut size={20} className="group-hover:translate-x-1 transition-transform" /> Sign Out Session
//              </button>
//              <button 
//               onClick={() => setShowDeleteModal(true)}
//               className="w-full py-5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-2xl font-black text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-3 group"
//              >
//                 <Trash2 size={20} /> Deactivate Account
//              </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
//           <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 max-w-md w-full shadow-2xl border border-white/20 text-center">
//             <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
//               <AlertTriangle size={40} />
//             </div>
//             <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-4 tracking-tight">Critical Confirmation</h3>
//             <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
//               Deactivating your account will result in the immediate suspension of all financial tracking data. This action is <span className="text-red-500 font-black italic underline">irreversible</span>.
//             </p>
//             <div className="flex flex-col gap-4">
//               <button 
//                 onClick={() => setShowDeleteModal(false)}
//                 className="w-full py-5 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-red-500/20"
//               >
//                 Yes, Purge Account Data
//               </button>
//               <button 
//                 onClick={() => setShowDeleteModal(false)}
//                 className="w-full py-5 border-2 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all"
//               >
//                 Cancel Procedure
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
