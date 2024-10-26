// resources/js/Pages/Mitra/Edit.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ mitra }) {
    const { data, setData, put, errors } = useForm({
        name: mitra.name || '',
        email: mitra.email || '',
        phone: mitra.phone || '',
        company: mitra.company || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mitra.update', mitra.id));
    };

    return (
        <div>
            <h1>Edit Mitra</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nama</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label>Phone</label>
                    <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                    {errors.phone && <div>{errors.phone}</div>}
                </div>
                <div>
                    <label>Company</label>
                    <input value={data.company} onChange={(e) => setData('company', e.target.value)} />
                    {errors.company && <div>{errors.company}</div>}
                </div>
                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
}
