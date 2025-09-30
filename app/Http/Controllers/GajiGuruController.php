<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GajiGuru;
use App\Models\User;
use App\Models\LaporanPengeluaranGuru;
use App\Models\LaporanPengeluaranGuruMitra;
use App\Models\LapPengeluaranPrivate;
use App\Models\LapPengeluaranCabang;
use App\Models\LapPengeluaranMitra;
use App\Exports\GajiGuruExport;
use App\Exports\GajiGuruMonthlyExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class GajiGuruController extends Controller
{
    public function index(Request $request)
    {
        // Get all users as columns
        $gurus = User::all();

        // Get unique dates from all pengeluaran tables
        $dates = collect();

        // Get dates from cabang pengeluaran
        $cabangDates = LapPengeluaranCabang::select('tanggal')->distinct()->get();
        foreach ($cabangDates as $d) {
            $dates->push($d->tanggal);
        }

        // Get dates from mitra pengeluaran
        $mitraDates = LapPengeluaranMitra::select('tanggal')->distinct()->get();
        foreach ($mitraDates as $d) {
            $dates->push($d->tanggal);
        }

        // Get dates from private pengeluaran
        $privateDates = LapPengeluaranPrivate::select('tanggal')->distinct()->get();
        foreach ($privateDates as $d) {
            $dates->push($d->tanggal);
        }

        // Remove duplicates and sort
        $uniqueDates = $dates->unique()->sort()->values();

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

        // Calculate totals for each guru on each date
        foreach ($uniqueDates as $date) {
            foreach ($gurus as $guru) {
                $details = [];
                $total = 0;

                // Get user roles
                $userRoles = $guru->getRoleNames()->toArray();

                // Check if user is Admin (can access all three modules)
                if (in_array('Admin', $userRoles)) {
                    // Cabang
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

                    // Mitra
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

                    // Private
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
                } elseif (in_array('Guru', $userRoles)) {
                    // Only cabang for Guru role
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

        return Inertia::render('Admin/GajiGuru/Index', [
            'dates' => $uniqueDates->toArray(),
            'gurus' => $gurus,
            'data' => $data,
            'filters' => $request->only(['search'])
        ]);
    }


    public function monthlyReport(Request $request)
    {
        $year = $request->year ?? now()->year;
        $gurus = User::all();
        $dates = collect();

        // Ambil tanggal dari semua tabel pengeluaran
        $cabangDates = LapPengeluaranCabang::select('tanggal')->distinct()->get();
        foreach ($cabangDates as $date) {
            $dates->push($date->tanggal);
        }
        $mitraDates = LapPengeluaranMitra::select('tanggal')->distinct()->get();
        foreach ($mitraDates as $date) {
            $dates->push($date->tanggal);
        }
        $privateDates = LapPengeluaranPrivate::select('tanggal')->distinct()->get();
        foreach ($privateDates as $date) {
            $dates->push($date->tanggal);
        }

        // Filter tahun
        $uniqueDates = $dates->unique()->sort()->filter(function ($date) use ($year) {
            if (empty($date)) {
                return false;
            }

            return date('Y', strtotime((string) $date)) == (string) $year;
        });
        $monthlySummary = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthKey = sprintf('%02d', $month);
            $monthDates = $uniqueDates->filter(function ($date) use ($monthKey) {
                if (empty($date)) {
                    return false;
                }

                return date('m', strtotime((string) $date)) == $monthKey;
            });

            $monthData = [];
            $totals = [];
            foreach ($gurus as $guru) {
                $totals[$guru->name] = 0;
            }
            $totals['total'] = 0;

            foreach ($gurus as $guru) {
                $total = 0;
                $details = [];
                $userRoles = $guru->getRoleNames()->toArray();
                foreach ($monthDates as $date) {
                    if (empty($date)) {
                        continue;
                    }

                    // Sama persis seperti index()
                    if (in_array('Admin', $userRoles)) {
                        $cabangReports = LapPengeluaranCabang::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($cabangReports as $report) {
                            $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                            foreach ($cabangGurus as $cabangGuru) {
                                $details[] = [
                                    'nama' => $cabangGuru->guru_nama,
                                    'gaji' => $cabangGuru->gaji,
                                    'source' => 'Cabang',
                                    'tanggal' => $date
                                ];
                                $total += $cabangGuru->gaji;
                            }
                        }
                        $mitraReports = LapPengeluaranMitra::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($mitraReports as $report) {
                            $mitraGurus = LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                            foreach ($mitraGurus as $mitraGuru) {
                                $details[] = [
                                    'nama' => $mitraGuru->mitra_nama,
                                    'gaji' => $mitraGuru->gaji,
                                    'source' => 'Mitra',
                                    'tanggal' => $date
                                ];
                                $total += $mitraGuru->gaji;
                            }
                        }
                        $privateRecords = LapPengeluaranPrivate::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($privateRecords as $record) {
                            if ($record->gurus) {
                                foreach ($record->gurus as $guruData) {
                                    $details[] = [
                                        'nama' => $guruData['guru_id'] ?? 'N/A',
                                        'gaji' => $guruData['gaji'] ?? 0,
                                        'source' => 'Private',
                                        'tanggal' => $date
                                    ];
                                    $total += $guruData['gaji'] ?? 0;
                                }
                            }
                        }
                    } elseif (in_array('Guru', $userRoles)) {
                        $cabangReports = LapPengeluaranCabang::where('tanggal', $date)
                            ->where('created_by', $guru->id)
                            ->get();
                        foreach ($cabangReports as $report) {
                            $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                            foreach ($cabangGurus as $cabangGuru) {
                                $details[] = [
                                    'nama' => $cabangGuru->guru_nama,
                                    'gaji' => $cabangGuru->gaji,
                                    'source' => 'Cabang',
                                    'tanggal' => $date
                                ];
                                $total += $cabangGuru->gaji;
                            }
                        }
                    } else {
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
                                        'source' => 'Cabang',
                                        'tanggal' => $date
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
                                        'source' => 'Mitra',
                                        'tanggal' => $date
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
                                            'source' => 'Private',
                                            'tanggal' => $date
                                        ];
                                        $total += $guruData['gaji'] ?? 0;
                                    }
                                }
                            }
                        }
                    }
                }
                $monthData[] = [
                    'guru_id' => $guru->id,
                    'guru_nama' => $guru->name,
                    'details' => $details,
                    'total' => $total
                ];
                $totals[$guru->name] += $total;
                $totals['total'] += $total;
            }
            $monthlySummary[$month] = [
                'month' => $month,
                'month_name' => \Carbon\Carbon::create()->month($month)->locale('id')->monthName,
                'data' => $monthData,
                'totals' => $totals,
            ];
        }

        return Inertia::render('Admin/GajiGuru/MonthlyReport', [
            'monthlySummary' => $monthlySummary,
            'year' => $year,
            'filters' => $request->only(['search', 'year'])
        ]);
    }

    public function exportExcel(Request $request)
    {
        $filters = $request->only(['search', 'start_date', 'end_date', 'week_start', 'week_end', 'year']);

        return Excel::download(new GajiGuruExport($filters), 'gaji-guru-' . date('Y-m-d') . '.xlsx');
    }

    public function exportPdf(Request $request)
    {
        // Menggunakan logic yang sama dengan halaman web dan Excel (bukan model GajiGuru yang hardcode)

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
        if ($request->start_date) {
            $uniqueDates = $uniqueDates->filter(function ($date) use ($request) {
                return $date >= $request->start_date;
            });
        }

        if ($request->end_date) {
            $uniqueDates = $uniqueDates->filter(function ($date) use ($request) {
                return $date <= $request->end_date;
            });
        }

        if ($request->week_start) {
            $uniqueDates = $uniqueDates->filter(function ($date) use ($request) {
                return $date >= $request->week_start;
            });
        }

        if ($request->week_end) {
            $uniqueDates = $uniqueDates->filter(function ($date) use ($request) {
                return $date <= $request->week_end;
            });
        }

        if ($request->year) {
            $uniqueDates = $uniqueDates->filter(function ($date) use ($request) {
                return date('Y', strtotime($date)) == $request->year;
            });
        }

        // Search filter
        if ($request->search) {
            $searchTerm = strtolower($request->search);
            $uniqueDates = $uniqueDates->filter(function ($date) use ($searchTerm) {
                return strpos(strtolower($date), $searchTerm) !== false ||
                    strpos(strtolower($this->getDayName($date)), $searchTerm) !== false;
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

        // Calculate totals for each guru on each date (logic yang sama dengan halaman web)
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
                                'nama' => $mitraGuru->mitra_nama,
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
                // Check if user has Guru role (only cabang)
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

        // Add tanggal variable for PDF header with Indonesian format
        $bulanIndonesia = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember'
        ];

        $hari = date('d');
        $bulan = $bulanIndonesia[date('n')];
        $tahun = date('Y');
        $tanggal = "$hari $bulan $tahun";

        // Pass data dinamis ke view PDF
        $pdf = Pdf::loadView('exports.gaji-guru-pdf', compact('gurus', 'data', 'uniqueDates', 'tanggal'))
            ->setPaper('a4', 'landscape'); // Landscape untuk menampung banyak kolom

        return $pdf->download('gaji-guru-' . date('Y-m-d') . '.pdf');
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

        if (empty($date)) {
            return '-';
        }

        $dayName = date('l', strtotime((string) $date));
        return $days[$dayName] ?? $dayName;
    }

    public function exportMonthlyExcel(Request $request)
    {
        $year = $request->year ?? now()->year;
        $filters = ['year' => $year, 'type' => 'monthly'];

        return Excel::download(new GajiGuruMonthlyExport($filters), 'gaji-guru-bulanan-' . $year . '.xlsx');
    }

    public function exportMonthlyPdf(Request $request)
    {
        $year = $request->year ?? now()->year;
    $gurus = User::all();
        $monthlySummary = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthName = [
                1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April', 5 => 'Mei', 6 => 'Juni',
                7 => 'Juli', 8 => 'Agustus', 9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
            ][$month];
            $startDate = date("$year-$month-01");
            $endDate = date("$year-$month-" . date('t', strtotime("$year-$month-01")));
            $data = [];
            $totals = [];
            foreach ($gurus as $guru) {
                $totals[$guru->name] = 0;
            }
            $totals['total'] = 0;
            $totals['total'] = 0;

            // Get all dates in this month from all pengeluaran tables
            $dates = collect();
            $dates = $dates->merge(LapPengeluaranCabang::whereBetween('tanggal', [$startDate, $endDate])->pluck('tanggal'));
            $dates = $dates->merge(LapPengeluaranMitra::whereBetween('tanggal', [$startDate, $endDate])->pluck('tanggal'));
            $dates = $dates->merge(LapPengeluaranPrivate::whereBetween('tanggal', [$startDate, $endDate])->pluck('tanggal'));
            $dates = $dates->unique()->sort()->values();

            foreach ($dates as $date) {
                if (empty($date)) {
                    continue;
                }

                $row = [
                    'hari' => Carbon::parse($date)->locale('id')->isoFormat('dddd'),
                    'tanggal' => Carbon::parse($date)->format('d/m/Y'),
                ];
                $rowTotal = 0;
                foreach ($gurus as $guru) {
                    $guruName = $guru->name;
                    $gaji = 0;
                    // Cabang
                    $cabangReports = LapPengeluaranCabang::where('tanggal', $date)->where('created_by', $guru->id)->get();
                    foreach ($cabangReports as $report) {
                        $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                        foreach ($cabangGurus as $cabangGuru) {
                            $gaji += $cabangGuru->gaji;
                        }
                    }
                    // Mitra
                    $mitraReports = LapPengeluaranMitra::where('tanggal', $date)->where('created_by', $guru->id)->get();
                    foreach ($mitraReports as $report) {
                        $mitraGurus = LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                        foreach ($mitraGurus as $mitraGuru) {
                            $gaji += $mitraGuru->gaji;
                        }
                    }
                    // Private
                    $privateRecords = LapPengeluaranPrivate::where('tanggal', $date)->where('created_by', $guru->id)->get();
                    foreach ($privateRecords as $record) {
                        if ($record->gurus) {
                            foreach ($record->gurus as $guruData) {
                                $gaji += $guruData['gaji'] ?? 0;
                            }
                        }
                    }
                    $row[$guruName] = $gaji;
                    $totals[$guruName] += $gaji;
                    $rowTotal += $gaji;
                }
                $row['total'] = $rowTotal;
                $totals['total'] += $rowTotal;
                $data[] = $row;
            }
            $monthlySummary[] = [
                'month' => $month,
                'month_name' => $monthName,
                'data' => $data,
                'totals' => $totals,
            ];
        }

        $bulanIndonesia = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember'
        ];
        $hari = date('d');
        $bulan = $bulanIndonesia[date('n')];
        $tahunSekarang = date('Y');
        $tanggal = "$hari $bulan $tahunSekarang";

        $pdf = Pdf::loadView('exports.gaji-guru-monthly-pdf', compact('monthlySummary', 'year', 'tanggal'))
            ->setPaper('a4', 'landscape');
        return $pdf->stream('gaji-guru-bulanan-' . $year . '.pdf');
    }
}




