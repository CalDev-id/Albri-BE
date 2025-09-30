<?php

namespace App\Exports;

use App\Models\GajiGuru;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class GajiGuruMonthlyExport implements FromArray, WithHeadings, WithStyles, WithColumnWidths
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function array(): array
    {
        $year = $this->filters['year'] ?? now()->year;
        $monthFilter = isset($this->filters['month']) ? $this->filters['month'] : null;
        $gurus = \App\Models\User::all();
        $bulanIndonesia = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        // Get all dates for the year, filter by month if needed
        $dates = collect();
        $cabangDates = \App\Models\LapPengeluaranCabang::select('tanggal')->distinct()->get();
        foreach ($cabangDates as $date) { $dates->push($date->tanggal); }
        $mitraDates = \App\Models\LapPengeluaranMitra::select('tanggal')->distinct()->get();
        foreach ($mitraDates as $date) { $dates->push($date->tanggal); }
        $privateDates = \App\Models\LapPengeluaranPrivate::select('tanggal')->distinct()->get();
        foreach ($privateDates as $date) { $dates->push($date->tanggal); }
        $uniqueDates = $dates->unique()->sort()->filter(function ($date) use ($year, $monthFilter) {
            $isYear = date('Y', strtotime($date)) == $year;
            $isMonth = $monthFilter ? date('m', strtotime($date)) == sprintf('%02d', $monthFilter) : true;
            return $isYear && $isMonth;
        })->values();

        $data = [];
        $monthList = $monthFilter ? [intval($monthFilter)] : range(1, 12);
        foreach ($monthList as $month) {
            $monthKey = sprintf('%02d', $month);
            $monthDates = $uniqueDates->filter(function ($date) use ($monthKey) {
                return date('m', strtotime($date)) == $monthKey;
            });
            if ($monthDates->count() > 0) {
                // Always start each month section with the BULAN header at row 1 of that section
                $monthSection = [];
                $monthSection[] = [
                    'BULAN ' . strtoupper($bulanIndonesia[$month]) . ' ' . $year,
                    '',
                    ...array_fill(0, $gurus->count(), ''),
                    ''
                ];
                foreach ($monthDates as $date) {
                    $row = [
                        date('l', strtotime($date)),
                        date('d/m/Y', strtotime($date)),
                    ];
                    $total = 0;
                    foreach ($gurus as $guru) {
                        // Sum all gaji for this guru on this date from all sources
                        $guruTotal = 0;
                        // Cabang
                        $cabangReports = \App\Models\LapPengeluaranCabang::where('tanggal', $date)->where('created_by', $guru->id)->get();
                        foreach ($cabangReports as $report) {
                            $cabangGurus = \App\Models\LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                            foreach ($cabangGurus as $cabangGuru) {
                                $guruTotal += $cabangGuru->gaji;
                            }
                        }
                        // Mitra
                        $mitraReports = \App\Models\LapPengeluaranMitra::where('tanggal', $date)->where('created_by', $guru->id)->get();
                        foreach ($mitraReports as $report) {
                            $mitraGurus = \App\Models\LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                            foreach ($mitraGurus as $mitraGuru) {
                                $guruTotal += $mitraGuru->gaji;
                            }
                        }
                        // Private
                        $privateRecords = \App\Models\LapPengeluaranPrivate::where('tanggal', $date)->where('created_by', $guru->id)->get();
                        foreach ($privateRecords as $record) {
                            if ($record->gurus) {
                                foreach ($record->gurus as $guruData) {
                                    $guruTotal += $guruData['gaji'] ?? 0;
                                }
                            }
                        }
                        $row[] = $guruTotal;
                        $total += $guruTotal;
                    }
                    $row[] = $total;
                    $monthSection[] = $row;
                }
                // Monthly total
                $rowTotal = ['JUMLAH', ''];
                $grandTotal = 0;
                foreach ($gurus as $guru) {
                    $sum = 0;
                    foreach ($monthDates as $date) {
                        // Sum all gaji for this guru on this date from all sources
                        $guruTotal = 0;
                        $cabangReports = \App\Models\LapPengeluaranCabang::where('tanggal', $date)->where('created_by', $guru->id)->get();
                        foreach ($cabangReports as $report) {
                            $cabangGurus = \App\Models\LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                            foreach ($cabangGurus as $cabangGuru) {
                                $guruTotal += $cabangGuru->gaji;
                            }
                        }
                        $mitraReports = \App\Models\LapPengeluaranMitra::where('tanggal', $date)->where('created_by', $guru->id)->get();
                        foreach ($mitraReports as $report) {
                            $mitraGurus = \App\Models\LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                            foreach ($mitraGurus as $mitraGuru) {
                                $guruTotal += $mitraGuru->gaji;
                            }
                        }
                        $privateRecords = \App\Models\LapPengeluaranPrivate::where('tanggal', $date)->where('created_by', $guru->id)->get();
                        foreach ($privateRecords as $record) {
                            if ($record->gurus) {
                                foreach ($record->gurus as $guruData) {
                                    $guruTotal += $guruData['gaji'] ?? 0;
                                }
                            }
                        }
                        $sum += $guruTotal;
                    }
                    $rowTotal[] = $sum;
                    $grandTotal += $sum;
                }
                $rowTotal[] = $grandTotal;
                $monthSection[] = $rowTotal;
                $monthSection[] = array_fill(0, 2 + $gurus->count() + 1, '');
                // Push the whole month section to the main data array
                foreach ($monthSection as $row) {
                    $data[] = $row;
                }
            }
        }
        return $data;
    }

    public function headings(): array
    {
        $gurus = \App\Models\User::all();
        $headings = ['Hari', 'Tanggal'];
        foreach ($gurus as $guru) {
            $headings[] = $guru->name;
        }
        $headings[] = 'Total';
        return $headings;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Set header background color and bold
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E2E8F0']
                ]
            ],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 12, // Hari
            'B' => 12, // Tanggal
            'C' => 12, // Gina
            'D' => 12, // Amel
            'E' => 12, // Lia
            'F' => 12, // Siti
            'G' => 12, // Nurul
            'H' => 12, // Hikma
            'I' => 12, // Safa
            'J' => 12, // Khoir
            'K' => 12, // Sarah
            'L' => 12, // Indri
            'M' => 12, // Aminah
            'N' => 12, // Rina
            'O' => 15, // Total
        ];
    }
}