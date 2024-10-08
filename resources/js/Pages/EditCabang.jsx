import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';

const Edit = ({ cabang }) => {
  const { data, setData, put, errors } = useForm({
    nama: cabang.nama || '',
    pengeluaran: cabang.pengeluaran || '',
    pendapatan: cabang.pendapatan || '',
    jumlah_murid: cabang.jumlah_murid || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/cabangs/${cabang.id}`);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Edit Cabang</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    placeholder="Enter nama"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.nama && <div className="text-red-500">{errors.nama}</div>}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Pengeluaran
                  </label>
                  <input
                    type="number"
                    value={data.pengeluaran}
                    onChange={(e) => setData('pengeluaran', e.target.value)}
                    placeholder="Enter pengeluaran"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.pengeluaran && <div className="text-red-500">{errors.pengeluaran}</div>}
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Pendapatan
                  </label>
                  <input
                    type="number"
                    value={data.pendapatan}
                    onChange={(e) => setData('pendapatan', e.target.value)}
                    placeholder="Enter pendapatan"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.pendapatan && <div className="text-red-500">{errors.pendapatan}</div>}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Jumlah Murid
                  </label>
                  <input
                    type="number"
                    value={data.jumlah_murid}
                    onChange={(e) => setData('jumlah_murid', e.target.value)}
                    placeholder="Enter jumlah murid"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.jumlah_murid && <div className="text-red-500">{errors.jumlah_murid}</div>}
                </div>
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Edit;
