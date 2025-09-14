<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GajiGuru;
use App\Exports\GajiGuruExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class GajiGuruController extends Controller
{
    public function index(Request $request)
    {
        $gajiGuru = GajiGuru::when($request->search, function ($query, $search) {
                return $query->where('tanggal', 'like', "%{$search}%")
                    ->orWhere('nama_guru', 'like', "%{$search}%")
                    ->orWhere('hari', 'like', "%{$search}%");
            })
            ->orderBy('tanggal', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/GajiGuru/Index', [
            'gajiGuru' => $gajiGuru,
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

    public function exportExcel(Request $request)
    {
        $filters = $request->only(['search', 'start_date', 'end_date', 'week_start', 'week_end']);
        
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
}