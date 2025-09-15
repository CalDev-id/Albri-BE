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
        
        // Initialize data array
        $data = [];
        foreach ($uniqueDates as $date) {
            $data[$date] = [];
            foreach ($gurus as $guru) {
                $data[$date][$guru->id] = [
                    'details' => [],
                    'total' => 0
                ]; // Default value
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
                    // Calculate from cabang - get detail gaji from reports created by this user
                    $cabangReports = LapPengeluaranCabang::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($cabangReports as $report) {
                        $cabangGurus = LaporanPengeluaranGuru::where('lap_pengeluaran_id', $report->id)->get();
                        foreach ($cabangGurus as $cabangGuru) {
                            $details[] = [
                                'nama' => $cabangGuru->nama_guru,
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
                                'nama' => $mitraGuru->nama_guru,
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
                                    'nama' => $guruData['nama_guru'] ?? 'N/A',
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
                                'nama' => $cabangGuru->nama_guru,
                                'gaji' => $cabangGuru->gaji,
                                'source' => 'Cabang'
                            ];
                            $total += $cabangGuru->gaji;
                        }
                    }
                }
                // Check if user has Mitra role (only mitra)
                elseif (in_array('Mitra', $userRoles)) {
                    // Get detail gaji from mitra reports created by this user
                    $mitraReports = LapPengeluaranMitra::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($mitraReports as $report) {
                        $mitraGurus = LaporanPengeluaranGuruMitra::where('lap_pengeluaran_mitra_id', $report->id)->get();
                        foreach ($mitraGurus as $mitraGuru) {
                            $details[] = [
                                'nama' => $mitraGuru->nama_guru,
                                'gaji' => $mitraGuru->gaji,
                                'source' => 'Mitra'
                            ];
                            $total += $mitraGuru->gaji;
                        }
                    }
                }
                // Check if user has Private role (only private)
                elseif (in_array('Private', $userRoles)) {
                    // Get detail gaji from private reports created by this user
                    $privateRecords = LapPengeluaranPrivate::where('tanggal', $date)
                        ->where('created_by', $guru->id)
                        ->get();
                    foreach ($privateRecords as $record) {
                        if ($record->gurus) {
                            foreach ($record->gurus as $guruData) {
                                $details[] = [
                                    'nama' => $guruData['nama_guru'] ?? 'N/A',
                                    'gaji' => $guruData['gaji'] ?? 0,
                                    'source' => 'Private'
                                ];
                                $total += $guruData['gaji'] ?? 0;
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

    public function weeklyReport(Request $request)
    {
        // Get current week or specified week
        $startDate = $request->week_start ? $request->week_start : now()->startOfWeek()->format('Y-m-d');
        $endDate = $request->week_end ? $request->week_end : now()->endOfWeek()->format('Y-m-d');

        $gajiGuru = GajiGuru::whereBetween('tanggal', [$startDate, $endDate])
            ->when($request->search, function ($query, $search) {
                return $query->where('tanggal', 'like', "%{$search}%")
                    ->orWhere('nama_guru', 'like', "%{$search}%")
                    ->orWhere('hari', 'like', "%{$search}%");
            })
            ->orderBy('tanggal', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/GajiGuru/WeeklyReport', [
            'gajiGuru' => $gajiGuru,
            'filters' => $request->only(['search', 'week_start', 'week_end']),
            'week_start' => $startDate,
            'week_end' => $endDate
        ]);
    }

    public function monthlyReport(Request $request)
    {
        $year = $request->year ?? now()->year;

        // Get all data for the selected year grouped by month
        $gajiGuru = GajiGuru::whereYear('tanggal', $year)
            ->when($request->search, function ($query, $search) {
                return $query->where('tanggal', 'like', "%{$search}%")
                    ->orWhere('nama_guru', 'like', "%{$search}%")
                    ->orWhere('hari', 'like', "%{$search}%");
            })
            ->orderBy('tanggal', 'asc')
            ->get()
            ->groupBy(function($item) {
                return $item->tanggal->format('m'); // Group by month
            });

        // Calculate monthly summary
        $monthlySummary = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthKey = sprintf('%02d', $month);
            $monthData = $gajiGuru->get($monthKey, collect());
            
            $monthlySummary[$month] = [
                'month' => $month,
                'month_name' => \Carbon\Carbon::create()->month($month)->locale('id')->monthName,
                'data' => $monthData,
                'totals' => [
                    'gina' => $monthData->sum('gina'),
                    'amel' => $monthData->sum('amel'),
                    'lia' => $monthData->sum('lia'),
                    'siti' => $monthData->sum('siti'),
                    'nurul' => $monthData->sum('nurul'),
                    'hikma' => $monthData->sum('hikma'),
                    'safa' => $monthData->sum('safa'),
                    'khoir' => $monthData->sum('khoir'),
                    'sarah' => $monthData->sum('sarah'),
                    'indri' => $monthData->sum('indri'),
                    'aminah' => $monthData->sum('aminah'),
                    'rina' => $monthData->sum('rina'),
                    'total' => $monthData->sum('total'),
                ]
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
        $query = GajiGuru::query();
        
        // Apply filters if provided
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('tanggal', 'like', "%{$request->search}%")
                  ->orWhere('nama_guru', 'like', "%{$request->search}%")
                  ->orWhere('hari', 'like', "%{$request->search}%");
            });
        }
        
        if ($request->start_date) {
            $query->whereDate('tanggal', '>=', $request->start_date);
        }
        
        if ($request->end_date) {
            $query->whereDate('tanggal', '<=', $request->end_date);
        }
        
        // Add week filter support
        if ($request->week_start) {
            $query->whereDate('tanggal', '>=', $request->week_start);
        }
        
        if ($request->week_end) {
            $query->whereDate('tanggal', '<=', $request->week_end);
        }
        
        // Add year filter support
        if ($request->year) {
            $query->whereYear('tanggal', $request->year);
        }
        
        $gajiGuru = $query->orderBy('tanggal', 'desc')->get();
        
        // Add tanggal variable for PDF header with Indonesian format
        $bulanIndonesia = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        
        $hari = date('d');
        $bulan = $bulanIndonesia[date('n')];
        $tahun = date('Y');
        $tanggal = "$hari $bulan $tahun";
        
        $pdf = Pdf::loadView('exports.gaji-guru-pdf', compact('gajiGuru', 'tanggal'))
                  ->setPaper('a4', 'landscape');
        
        return $pdf->download('gaji-guru-' . date('Y-m-d') . '.pdf');
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
        
        // Get all data for the selected year grouped by month
        $gajiGuru = GajiGuru::whereYear('tanggal', $year)
            ->orderBy('tanggal', 'asc')
            ->get()
            ->groupBy(function($item) {
                return $item->tanggal->format('m');
            });

        // Calculate monthly summary
        $monthlySummary = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthKey = sprintf('%02d', $month);
            $monthData = $gajiGuru->get($monthKey, collect());
            
            $monthlySummary[$month] = [
                'month' => $month,
                'month_name' => \Carbon\Carbon::create()->month($month)->locale('id')->monthName,
                'data' => $monthData,
                'totals' => [
                    'gina' => $monthData->sum('gina'),
                    'amel' => $monthData->sum('amel'),
                    'lia' => $monthData->sum('lia'),
                    'siti' => $monthData->sum('siti'),
                    'nurul' => $monthData->sum('nurul'),
                    'hikma' => $monthData->sum('hikma'),
                    'safa' => $monthData->sum('safa'),
                    'khoir' => $monthData->sum('khoir'),
                    'sarah' => $monthData->sum('sarah'),
                    'indri' => $monthData->sum('indri'),
                    'aminah' => $monthData->sum('aminah'),
                    'rina' => $monthData->sum('rina'),
                    'total' => $monthData->sum('total'),
                ]
            ];
        }

        $bulanIndonesia = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        
        $hari = date('d');
        $bulan = $bulanIndonesia[date('n')];
        $tahunSekarang = date('Y');
        $tanggal = "$hari $bulan $tahunSekarang";

        $pdf = Pdf::loadView('exports.gaji-guru-monthly-pdf', compact('monthlySummary', 'year', 'tanggal'))
                  ->setPaper('a4', 'landscape');
        
        return $pdf->download('gaji-guru-bulanan-' . $year . '.pdf');
    }
}