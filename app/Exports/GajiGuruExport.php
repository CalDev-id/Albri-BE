<?php

namespace App\Exports;

use App\Models\GajiGuru;
use App\Models\User;
use App\Models\LapPengeluaranCabang;
use App\Models\LapPengeluaranMitra;
use App\Models\LapPengeluaranPrivate;
use App\Models\LaporanPengeluaranGuru;
use App\Models\LaporanPengeluaranGuruMitra;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class GajiGuruExport implements FromArray, WithStyles, WithColumnWidths
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function array(): array
    {
        // Get all users as columns (dinamis dari database)
        $gurus = User::all();

        // Get unique dates from all pengeluaran tables
        $dates = collect();

        // Get dates from cabang pengeluaran
        $cabangDates = LapPengeluaranCabang::select('tanggal')->distinct()->get();
        foreach ($cabangDates as $date) {
            $dates->push($date->tanggal);
        }

        // Get dates from mitra pengeluaran  
        $mitraDates = LapPengeluaranMitra::select('tanggal')->distinct()->get();
        foreach ($mitraDates as $date) {
            $dates->push($date->tanggal);
        }

        // Get dates from private pengeluaran
        $privateDates = LapPengeluaranPrivate::select('tanggal')->distinct()->get();
        foreach ($privateDates as $date) {
            $dates->push($date->tanggal);
        }

        // Remove duplicates and sort
        $uniqueDates = $dates->unique()->sort()->values();

        // Apply filters
        if (isset($this->filters['start_date']) && $this->filters['start_date']) {
            $uniqueDates = $uniqueDates->filter(function ($date) {
                return $date >= $this->filters['start_date'];
            });
        }

        if (isset($this->filters['end_date']) && $this->filters['end_date']) {
            $uniqueDates = $uniqueDates->filter(function ($date) {
                return $date <= $this->filters['end_date'];
            });
        }

        if (isset($this->filters['week_start']) && $this->filters['week_start']) {
            $uniqueDates = $uniqueDates->filter(function ($date) {
                return $date >= $this->filters['week_start'];
            });
        }

        if (isset($this->filters['week_end']) && $this->filters['week_end']) {
            $uniqueDates = $uniqueDates->filter(function ($date) {
                return $date <= $this->filters['week_end'];
            });
        }

        if (isset($this->filters['year']) && $this->filters['year']) {
            $uniqueDates = $uniqueDates->filter(function ($date) {
                return date('Y', strtotime($date)) == $this->filters['year'];
            });
        }

        // Initialize data array
        $data = [];
        foreach ($uniqueDates as $date) {
            $data[$date] = [];
            foreach ($gurus as $guru) {
                $data[$date][$guru->id] = [
                    'details' => [],
                    'total' => 0
                ];
            }
        }

        // Calculate totals for each guru on each date (menggunakan logika yang sama dengan controller)
        foreach ($uniqueDates as $date) {
            foreach ($gurus as $guru) {
                $details = [];
                $total = 0;

                // Get user roles
                $userRoles = $guru->getRoleNames()->toArray();

                // Check if user is Admin (can access all three modules)
                if (in_array('Admin', $userRoles)) {
                    // Calculate from cabang - get detail gaji from reports created by this user
                    $cabangReports = LapPengeluaranCabang::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($cabangReports as $report) {
                        $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                        foreach ($cabangGurus as $cabangGuru) {
                            $details[] = [
                                'nama' => $cabangGuru->guru_nama,
                                'gaji' => $cabangGuru->gaji,
                                'source' => 'Cabang'
                            ];
                            $total += $cabangGuru->gaji;
                        }
                    }

                    // Calculate from mitra - get detail gaji from reports created by this user
                    $mitraReports = LapPengeluaranMitra::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($mitraReports as $report) {
                        $mitraGurus = LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                        foreach ($mitraGurus as $mitraGuru) {
                            $details[] = [
                                'nama' => $mitraGuru->mitra_nama, // Menggunakan mitra_nama seperti di controller
                                'gaji' => $mitraGuru->gaji,
                                'source' => 'Mitra'
                            ];
                            $total += $mitraGuru->gaji;
                        }
                    }

                    // Calculate from private - get detail gaji from reports created by this user
                    $privateRecords = LapPengeluaranPrivate::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($privateRecords as $record) {
                        if ($record->gurus) {
                            foreach ($record->gurus as $guruData) {
                                $details[] = [
                                    'nama' => $guruData['guru_id'] ?? 'N/A',
                                    'gaji' => $guruData['gaji'] ?? 0,
                                    'source' => 'Private'
                                ];
                                $total += $guruData['gaji'] ?? 0;
                            }
                        }
                    }
                }
                // Check if user has Guru role (only cabang) - Logic yang hilang di export sebelumnya
                elseif (in_array('Guru', $userRoles)) {
                    // Get detail gaji from cabang reports created by this user
                    $cabangReports = LapPengeluaranCabang::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($cabangReports as $report) {
                        $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                        foreach ($cabangGurus as $cabangGuru) {
                            $details[] = [
                                'nama' => $cabangGuru->guru_nama,
                                'gaji' => $cabangGuru->gaji,
                                'source' => 'Cabang'
                            ];
                            $total += $cabangGuru->gaji;
                        }
                    }
                } else {
                    // Role-based calculation for other specific roles
                    if (in_array('Cabang', $userRoles)) {
                        $cabangReports = LapPengeluaranCabang::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($cabangReports as $report) {
                            $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                            foreach ($cabangGurus as $cabangGuru) {
                                $details[] = [
                                    'nama' => $cabangGuru->guru_nama,
                                    'gaji' => $cabangGuru->gaji,
                                    'source' => 'Cabang'
                                ];
                                $total += $cabangGuru->gaji;
                            }
                        }
                    }

                    if (in_array('Mitra', $userRoles)) {
                        $mitraReports = LapPengeluaranMitra::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($mitraReports as $report) {
                            $mitraGurus = LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                            foreach ($mitraGurus as $mitraGuru) {
                                $details[] = [
                                    'nama' => $mitraGuru->mitra_nama,
                                    'gaji' => $mitraGuru->gaji,
                                    'source' => 'Mitra'
                                ];
                                $total += $mitraGuru->gaji;
                            }
                        }
                    }

                    if (in_array('Private', $userRoles)) {
                        $privateRecords = LapPengeluaranPrivate::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($privateRecords as $record) {
                            if ($record->gurus) {
                                foreach ($record->gurus as $guruData) {
                                    $details[] = [
                                        'nama' => $guruData['guru_id'] ?? 'N/A',
                                        'gaji' => $guruData['gaji'] ?? 0,
                                        'source' => 'Private'
                                    ];
                                    $total += $guruData['gaji'] ?? 0;
                                }
                            }
                        }
                    }
                }
                $data[$date][$guru->id] = [
                    'details' => $details,
                    'total' => $total
                ];
            }
        }

        // Build Excel array
        $result = [];

        // Header row - dinamis berdasarkan users dari database
        $header = ['Tanggal', 'Hari'];
        foreach ($gurus as $guru) {
            $header[] = $guru->name;
        }
        $header[] = 'Total';
        $result[] = $header;

        // Data rows
        foreach ($uniqueDates as $date) {
            $row = [
                date('d/m/Y', strtotime($date)),
                $this->getDayName($date)
            ];

            $dayTotal = 0;
            foreach ($gurus as $guru) {
                $guruData = $data[$date][$guru->id];
                $guruTotal = $guruData['total'];

                // Format detail breakdown seperti di halaman web
                if ($guruTotal > 0 && !empty($guruData['details'])) {
                    $detailParts = [];
                    foreach ($guruData['details'] as $detail) {
                        $detailParts[] = $detail['nama'] . ': Rp ' . number_format($detail['gaji'], 0, ',', '.');
                    }
                    $detailText = implode(', ', $detailParts);
                    if (count($guruData['details']) > 1) {
                        $detailText .= ' | Total: Rp ' . number_format($guruTotal, 0, ',', '.');
                    }
                    $row[] = $detailText;
                } else {
                    $row[] = '-';
                }

                $dayTotal += $guruTotal;
            }

            $row[] = $dayTotal > 0 ? 'Rp ' . number_format($dayTotal, 0, ',', '.') : '-';
            $result[] = $row;
        }

        return $result;
    }

    private function getDayName($date)
    {
        $days = [
            'Sunday' => 'Minggu',
            'Monday' => 'Senin',
            'Tuesday' => 'Selasa',
            'Wednesday' => 'Rabu',
            'Thursday' => 'Kamis',
            'Friday' => 'Jumat',
            'Saturday' => 'Sabtu'
        ];

        $dayName = date('l', strtotime($date));
        return $days[$dayName] ?? $dayName;
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
        $gurus = User::all();
        $widths = [
            'A' => 12, // Tanggal
            'B' => 10, // Hari
        ];

        // Dinamis untuk setiap guru - lebih lebar untuk detail
        $column = 'C';
        foreach ($gurus as $guru) {
            $widths[$column] = 40; // Lebih lebar untuk menampung detail breakdown
            $column++;
        }

        // Total column
        $widths[$column] = 20;

        return $widths;
    }
}