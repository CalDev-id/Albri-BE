import React from "react";
import { Link } from "@inertiajs/react";

const TableOne = ({ laporanCabang, laporanPengeluaranCabang, laporanMitra, laporanPengeluaranMitra, laporanPrivate, laporanPengeluaranPrivate }) => {
    const calculateTotals = (
        laporanCabangData,
        laporanPengeluaranCabangData
    ) => {
        // Pastikan data adalah array
        if (!Array.isArray(laporanCabangData)) laporanCabangData = [];
        if (!Array.isArray(laporanPengeluaranCabangData))
            laporanPengeluaranCabangData = [];

        // Hitung total pemasukan
        const totalProfit = laporanCabangData.reduce(
            (sum, laporan) => sum + (laporan.totalpemasukan || 0),
            0
        );

        // Hitung total pengeluaran
        const totalOutcome = laporanPengeluaranCabangData.reduce(
            (sum, pengeluaran) => sum + (pengeluaran.totalpengeluaran || 0),
            0
        );

        // Hitung total laba
        const totalLaba = totalProfit - totalOutcome;

        // Hitung total students (biaya)
        const totalStudents = laporanCabangData.reduce(
            (sum, laporan) =>
                sum +
                ((laporan.biaya_5000 || 0) +
                    (laporan.biaya_10000 || 0) +
                    (laporan.biaya_12000 || 0)),
            0
        );

        return { totalLaba, totalProfit, totalOutcome, totalStudents };
    };

    // Memastikan .data digunakan saat memanggil fungsi
    const { totalLaba, totalProfit, totalOutcome, totalStudents } =
        calculateTotals(laporanCabang.data, laporanPengeluaranCabang.data);

        const calculateTotalsM = (laporanMitraData, laporanPengeluaranMitraData) => {
          // Pastikan data adalah array
          if (!Array.isArray(laporanMitraData)) laporanMitraData = [];
          if (!Array.isArray(laporanPengeluaranMitraData)) laporanPengeluaranMitraData = [];
      
          // Hitung total pemasukan
          const totalProfitM = laporanMitraData.reduce(
              (sum, laporan) => sum + (laporan.totalpemasukan || 0),
              0
          );
      
          // Hitung total pengeluaran
          const totalOutcomeM = laporanPengeluaranMitraData.reduce(
              (sum, pengeluaran) => sum + (pengeluaran.totalpengeluaran || 0),
              0
          );
      
          // Hitung total laba
          const totalLabaM = totalProfitM - totalOutcomeM;
      
          // Hitung total students (biaya)
          const totalStudentsM = laporanMitraData.reduce(
              (sum, laporan) =>
                  sum +
                  ((laporan.biaya_5000 || 0) +
                      (laporan.biaya_8000 || 0) +
                      (laporan.biaya_10000 || 0) +
                      (laporan.biaya_15000 || 0)),
              0
          );
      
          return { totalLabaM, totalProfitM, totalOutcomeM, totalStudentsM };
      };
      
      // Memastikan .data digunakan saat memanggil fungsi
      const { totalLabaM, totalProfitM, totalOutcomeM, totalStudentsM } = calculateTotalsM(
          laporanMitra.data,
          laporanPengeluaranMitra.data
      );

      const calculateTotalsP = (laporanPrivateData, laporanPengeluaranPrivateData) => {
        // Pastikan data adalah array
        if (!Array.isArray(laporanPrivateData)) laporanPrivateData = [];
        if (!Array.isArray(laporanPengeluaranPrivateData)) laporanPengeluaranPrivateData = [];
    
        // Hitung total pemasukan
        const totalProfitP = laporanPrivateData.reduce(
            (sum, laporan) => sum + (laporan.totalpemasukan || 0),
            0
        );
    
        // Hitung total pengeluaran
        const totalOutcomeP = laporanPengeluaranPrivateData.reduce(
            (sum, pengeluaran) => sum + (pengeluaran.totalpengeluaran || 0),
            0
        );
    
        // Hitung total laba
        const totalLabaP = totalProfitP - totalOutcomeP;
    
        // Hitung total students (biaya)
        const totalStudentsP = laporanPrivateData.reduce(
            (sum, laporan) =>
                sum +
                ((laporan.biaya_30 || 0) +
                    (laporan.biaya_35 || 0) +
                    (laporan.biaya_40 || 0) +
                    (laporan.biaya_45 || 0)),
            0
        );
    
        return { totalLabaP, totalProfitP, totalOutcomeP, totalStudentsP };
    };
    
    // Memastikan .data digunakan saat memanggil fungsi
    const { totalLabaP, totalProfitP, totalOutcomeP, totalStudentsP } = calculateTotalsP(
        laporanPrivate.data,
        laporanPengeluaranPrivate.data
    );

    const brandData = [
        {
            logo: "/images/brand/brand-01.svg",
            name: "Cabang",
            totalStudents: totalStudents,
            pemasukan: totalProfit,
            pengeluaran: totalOutcome,
            laba: totalLaba,
            short: "C",
        },
        {
            logo: "/images/brand/brand-02.svg",
            name: "Mitra",
            totalStudents: totalStudentsM,
            pemasukan: totalProfitM,
            pengeluaran: totalOutcomeM,
            laba: totalLabaM,
            short: "M",
        },
        {
            logo: "/images/brand/brand-03.svg",
            name: "Private",
            totalStudents: totalStudentsP,
            pemasukan: totalProfitP,
            pengeluaran: totalOutcomeP,
            laba: totalLabaP,
            short: "P",
        },
    ];
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Laporan Albri
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Nama
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Jumlah Murid
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Pemasukan
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Pengeluaran
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Laba
                        </h5>
                    </div>
                </div>
                {brandData.map((data, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-3 sm:grid-cols-5 `}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-800">
                                <h1 className="text-2xl font-bold text-gray-200">
                                    {data.short}
                                </h1>
                            </div>

                            <p className="hidden text-black dark:text-white sm:block">
                                {data.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">
                                {data.totalStudents}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">
                                {"Rp. " + data.pemasukan.toLocaleString()}
                            </p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-red dark:text-white">
                                {"Rp. " + data.pengeluaran.toLocaleString()}
                            </p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5">{"Rp. " + data.laba.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
