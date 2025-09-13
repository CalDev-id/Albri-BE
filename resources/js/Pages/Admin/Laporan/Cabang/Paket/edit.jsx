import { useForm } from "@inertiajs/react";

export default function Edit({ paket }) {
  const { data, setData, put, errors } = useForm({
    nama_paket: paket.nama_paket,
    harga: paket.harga,
  });

  const submit = (e) => {
    e.preventDefault();
    put(route("paket.update", paket.id));
  };

  return (
    <form onSubmit={submit} className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Paket</h1>

      <div className="mb-3">
        <label>Nama Paket</label>
        <input type="text" value={data.nama_paket} onChange={(e) => setData("nama_paket", e.target.value)} className="border p-2 w-full" />
        {errors.nama_paket && <div className="text-red-500">{errors.nama_paket}</div>}
      </div>

      <div className="mb-3">
        <label>Harga</label>
        <input type="number" value={data.harga} onChange={(e) => setData("harga", e.target.value)} className="border p-2 w-full" />
        {errors.harga && <div className="text-red-500">{errors.harga}</div>}
      </div>

      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
