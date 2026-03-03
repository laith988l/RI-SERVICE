"use client";

import { useState } from 'react';
import { updateTestimonialStatus, deleteTestimonial, deleteFeedback, addService, updateService, deleteService, approveFeedbackAsTestimonial, deleteContactRequest, toggleTestimonialVisibility, toggleServiceVisibility } from '@/app/actions/admin';

export default function DashboardClient({ initialData }: { initialData: any }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [services, setServices] = useState(initialData.services || []);
    const [testimonials, setTestimonials] = useState(initialData.testimonials || []);
    const [feedbacks, setFeedbacks] = useState(initialData.feedback || []);
    const [contactRequests, setContactRequests] = useState(initialData.contact_requests || []);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    import('react').then(React => {
        React.useEffect(() => {
            const stored = sessionStorage.getItem('adminDashboardTab');
            if (stored) setActiveTab(stored);
        }, []);
    });

    const [isEditingService, setIsEditingService] = useState(false);
    const [currentService, setCurrentService] = useState<any>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Filter pending vs approved testimonials
    const pendingTestimonials = testimonials.filter((t: any) => t.status === 'pending');

    // Average rating
    const avgRating = feedbacks.length > 0
        ? (feedbacks.reduce((acc: number, f: any) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
        : '0.0';

    const handleMenuClick = (tab: string) => {
        setActiveTab(tab);
        sessionStorage.setItem('adminDashboardTab', tab);
        setIsEditingService(false);
        setIsMobileMenuOpen(false);
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        // Prevent Next.js "Failed to fetch" errors by not sending empty file objects
        const imageFile = formData.get('image') as File;
        if (imageFile && imageFile.size === 0) {
            formData.delete('image');
        }

        try {
            if (currentService?.id) {
                await updateService(currentService.id, formData);
            } else {
                await addService(formData);
            }
            // Temporarily store the active tab in sessionStorage right before reload to ensure it persists reliably
            sessionStorage.setItem('adminDashboardTab', activeTab);
            window.location.reload();
        } catch (error: any) {
            console.error("Service Save Error:", error);
            alert("Error saving service: " + (error?.message || "Unknown error"));
        }
    };

    const handleTestimonialAction = async (id: string, action: 'approved' | 'rejected' | 'delete') => {
        try {
            if (action === 'delete' || action === 'rejected') {
                await deleteTestimonial(id);
            } else {
                await updateTestimonialStatus(id, action);
            }
            sessionStorage.setItem('adminDashboardTab', activeTab);
            window.location.reload();
        } catch (error: any) {
            console.error("Testimonial Action Error:", error);
            alert("Error updating testimonial: " + (error?.message || "Unknown error"));
        }
    };

    const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
        try {
            await toggleTestimonialVisibility(id, !currentVisibility);
            const updatedTestimonials = testimonials.map((t: any) =>
                t.id === id ? { ...t, is_visible: !currentVisibility } : t
            );
            setTestimonials(updatedTestimonials);
            showToast(!currentVisibility ? "Testimonial hidden" : "Testimonial is now visible");
        } catch (error: any) {
            console.error("Visibility Toggle Error:", error);
            alert("Error updating visibility: " + (error?.message || "Unknown error"));
        }
    };

    const handleToggleServiceVisibility = async (id: string, currentVisibility: boolean) => {
        try {
            await toggleServiceVisibility(id, !currentVisibility);
            const updatedServices = services.map((s: any) =>
                s.id === id ? { ...s, is_visible: !currentVisibility } : s
            );
            setServices(updatedServices);
            showToast(!currentVisibility ? "Service hidden" : "Service is now visible");
        } catch (error: any) {
            console.error("Service Visibility Toggle Error:", error);
            alert("Error updating service visibility: " + (error?.message || "Unknown error"));
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 ">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 text-white flex items-center justify-between px-4 z-40 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-1.5 rounded text-white">
                        <span className="material-symbols-outlined block text-sm">diamond</span>
                    </div>
                    <h2 className="text-lg font-bold">RI Admin</h2>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-slate-300 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-950 text-slate-300 border-r border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:flex flex-col`}>
                <div className="p-8 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded text-white">
                        <span className="material-symbols-outlined block">diamond</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">RI Admin</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <button onClick={() => handleMenuClick('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-medium">Dashboard</span>
                    </button>
                    <button onClick={() => handleMenuClick('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <span className="material-symbols-outlined">category</span>
                        <span className="font-medium">Services</span>
                    </button>
                    <button onClick={() => handleMenuClick('testimonials')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'testimonials' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <span className="material-symbols-outlined">format_quote</span>
                        <span className="font-medium">Testimonials</span>
                    </button>
                    <button onClick={() => handleMenuClick('feedback')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'feedback' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <span className="material-symbols-outlined">rate_review</span>
                        <span className="font-medium">Feedback</span>
                    </button>
                    <button onClick={() => handleMenuClick('contact')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'contact' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <span className="material-symbols-outlined">mail</span>
                        <span className="font-medium">Contact Requests</span>
                    </button>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            <main className="flex-1 lg:ml-64 p-4 pt-20 md:p-8 md:pt-24 lg:p-12">
                <div className="max-w-[1200px] mx-auto space-y-8">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 capitalize">{activeTab}</h1>
                            <p className="text-slate-500 mt-1">Manage your {activeTab} data directly from the console.</p>
                        </div>
                    </header>

                    {toastMessage && (
                        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-medium">
                            {toastMessage}
                        </div>
                    )}

                    {/* OVERVIEW DASHBOARD */}
                    {activeTab === 'dashboard' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Total Services</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-3xl font-bold">{services.length}</h3>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Pending Testimonials</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-3xl font-bold text-yellow-600">{pendingTestimonials.length}</h3>
                                        {pendingTestimonials.length > 0 && <span className="text-blue-600 text-xs font-bold flex items-center">Action required</span>}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Average Feedback Rating</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-3xl font-bold text-secondary">{avgRating} / 5</h3>
                                        <div className="flex gap-0.5 text-yellow-400">
                                            <span className="material-symbols-outlined text-sm fill-current">star</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* SERVICES */}
                    {activeTab === 'services' && !isEditingService && (
                        <div className="space-y-4">
                            <div className="flex justify-end">
                                <button onClick={() => { setCurrentService(null); setIsEditingService(true); }} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-600/90 shadow-lg shadow-blue-600/25 transition-all">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    New Service
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {services.map((service: any) => (
                                    <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col group">
                                        <h4 className="text-lg font-bold mb-1">{service.title}</h4>
                                        <span className="text-xs text-blue-600 font-bold uppercase mb-2 block">{service.category}</span>
                                        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{service.description}</p>
                                        <div className="mt-auto flex items-center justify-between border-t border-blue-600/5 pt-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleServiceVisibility(service.id, service.is_visible !== false)}
                                                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${service.is_visible !== false ? 'bg-primary' : 'bg-gray-200'} transition-colors duration-200 ease-in-out`}
                                                    title={service.is_visible !== false ? "Hide Service" : "Show Service"}
                                                >
                                                    <span className="sr-only">Toggle visibility</span>
                                                    <span aria-hidden="true" className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white ring-0 shadow transition duration-200 ease-in-out ${service.is_visible !== false ? 'translate-x-2' : '-translate-x-2'}`} />
                                                </button>
                                                <span className={`text-xs font-bold ${service.is_visible !== false ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {service.is_visible !== false ? 'Visible' : 'Hidden'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => { setCurrentService(service); setIsEditingService(true); }} className="p-2 bg-slate-50 rounded-lg text-slate-600 hover:text-blue-600 transition-colors">
                                                    <span className="material-symbols-outlined text-lg leading-none">edit</span>
                                                </button>
                                                <button onClick={async () => { await deleteService(service.id); sessionStorage.setItem('adminDashboardTab', activeTab); window.location.reload(); }} className="p-2 bg-slate-50 rounded-lg text-slate-600 hover:text-red-500 transition-colors">
                                                    <span className="material-symbols-outlined text-lg leading-none">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SERVICE EDIT/CREATE FORM */}
                    {activeTab === 'services' && isEditingService && (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-blue-600/5 max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6">{currentService ? 'Edit Service' : 'Add New Service'}</h2>
                            <form onSubmit={handleServiceSubmit} className="flex flex-col gap-4">
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">Title</span>
                                    <input name="title" required defaultValue={currentService?.title} className="p-3 bg-slate-50 rounded border border-gray-200 " />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">Category</span>
                                    <input name="category" required defaultValue={currentService?.category} className="p-3 bg-slate-50 rounded border border-gray-200 " />
                                </label>
                                <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-gray-200 rounded">
                                    <span className="text-sm font-semibold text-gray-800">Service Image (Choose one)</span>
                                    {currentService?.image_url && (
                                        <div className="mb-2">
                                            <p className="text-xs text-slate-500 mb-1">Current Image:</p>
                                            <img src={currentService.image_url} alt="Current" className="h-24 w-auto rounded object-cover border border-gray-200 shadow-sm" />
                                        </div>
                                    )}
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-gray-700">Option 1: Upload new image file</span>
                                        <input type="file" name="image" accept="image/*" className="p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 bg-white rounded border border-gray-200" />
                                    </label>
                                    <div className="text-center text-xs text-gray-400 font-bold uppercase relative py-2">
                                        <span className="bg-slate-50 px-2 relative z-10">OR</span>
                                        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-200 -z-0"></div>
                                    </div>
                                    <label className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-gray-700">Option 2: Paste an image URL (Google Drive links supported)</span>
                                        <input type="text" name="image_url" defaultValue={currentService?.image_url || ''} placeholder="https://example.com/image.jpg" className="p-3 bg-white rounded border border-gray-200" />
                                    </label>
                                </div>
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">Short Description (Services Page)</span>
                                    <textarea name="description" required defaultValue={currentService?.description} className="p-3 h-24 bg-slate-50 rounded border border-gray-200 " />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">Long Description (Request Page)</span>
                                    <textarea name="long_description" defaultValue={currentService?.long_description} className="p-3 h-32 bg-slate-50 rounded border border-gray-200 " />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">Features (comma separated: Feat 1, Feat 2)</span>
                                    <textarea
                                        name="features"
                                        required
                                        defaultValue={
                                            Array.isArray(currentService?.features)
                                                ? currentService.features.join(', ')
                                                : (typeof currentService?.features === 'string'
                                                    ? (() => {
                                                        try {
                                                            const parsed = JSON.parse(currentService.features);
                                                            return Array.isArray(parsed) ? parsed.join(', ') : currentService.features;
                                                        } catch {
                                                            return currentService.features;
                                                        }
                                                    })()
                                                    : '')
                                        }
                                        className="p-3 bg-slate-50 rounded border border-gray-200 "
                                    />
                                </label>
                                <div className="flex gap-4 mt-4">
                                    <button type="button" onClick={() => setIsEditingService(false)} className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded shadow-lg shadow-blue-600/20 hover:bg-blue-600/90">Save Service</button>
                                </div>
                            </form>
                        </div>
                    )}


                    {/* TESTIMONIALS */}
                    {activeTab === 'testimonials' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Client</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Review</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Rating</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-600/5">
                                        {testimonials.map((t: any) => (
                                            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-900 ">{t.name}</span>
                                                        <span className="text-xs text-slate-500">{t.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 text-sm max-w-md truncate">"{t.quote}"</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-0.5 text-yellow-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: i < (t.rating || 5) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {t.status === 'approved' ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Approved</span>
                                                            <button
                                                                onClick={() => handleToggleVisibility(t.id, t.is_visible !== false)}
                                                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${t.is_visible !== false ? 'bg-primary' : 'bg-gray-200'} transition-colors duration-200 ease-in-out`}
                                                                title={t.is_visible !== false ? "Hide Testimonial" : "Show Testimonial"}
                                                            >
                                                                <span className="sr-only">Toggle visibility</span>
                                                                <span aria-hidden="true" className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white ring-0 shadow transition duration-200 ease-in-out ${t.is_visible !== false ? 'translate-x-2' : '-translate-x-2'}`} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700">Pending</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                                    {t.status !== 'approved' && (
                                                        <button onClick={() => handleTestimonialAction(t.id, 'approved')} className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors">Accept</button>
                                                    )}
                                                    <button onClick={() => handleTestimonialAction(t.id, 'delete')} className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


                    {/* FEEDBACK */}
                    {activeTab === 'feedback' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {feedbacks.map((f: any) => (
                                <div key={f.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold">{f.first_name} {f.last_name}</h4>
                                            <span className="text-xs text-slate-500">{f.company_name || 'Privat'}</span>
                                        </div>
                                        <div className="flex text-yellow-400">
                                            {[...Array(Math.max(0, f.rating || 0))].map((_, i) => <span key={i} className="material-symbols-outlined text-lg fill-current">star</span>)}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 italic text-sm">"{f.feedback_text}"</p>
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                        <button onClick={async () => { await approveFeedbackAsTestimonial(f.id); showToast("Testimonial approved"); sessionStorage.setItem('adminDashboardTab', activeTab); setTimeout(() => window.location.reload(), 1000); }} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors" title="Als Testimonial übernehmen">
                                            <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                                        </button>
                                        <button onClick={async () => { await deleteFeedback(f.id); showToast("Feedback deletion successful"); sessionStorage.setItem('adminDashboardTab', activeTab); setTimeout(() => window.location.reload(), 1000); }} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors" title="Löschen">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CONTACT REQUESTS */}
                    {activeTab === 'contact' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500" style={{ width: '25%' }}>Client</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500" style={{ width: '25%' }}>Service Interest</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500" style={{ width: '40%' }}>Message</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right" style={{ width: '10%' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-600/5">
                                        {contactRequests.map((req: any) => (
                                            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 text-sm">{req.first_name} {req.last_name}</span>
                                                        <a href={`mailto:${req.email}`} className="text-xs text-blue-600 hover:underline">{req.email}</a>
                                                        {req.phone && <a href={`tel:${req.phone}`} className="text-xs text-slate-500 hover:text-slate-700">{req.phone}</a>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {req.service_interest || 'General'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-slate-700 line-clamp-3">{req.message}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">{new Date(req.created_at).toLocaleDateString()}</p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button onClick={async () => { await deleteContactRequest(req.id); showToast("Operation Completed Successfully"); sessionStorage.setItem('adminDashboardTab', activeTab); setTimeout(() => window.location.reload(), 1000); }} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors ml-auto" title="Delete Request">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
