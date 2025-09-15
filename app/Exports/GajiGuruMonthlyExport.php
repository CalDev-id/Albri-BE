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
        
        // Get all data for the selected year grouped by month
        $gajiGuru = GajiGuru::whereYear('tanggal', $year)
            ->orderBy('tanggal', 'asc')
            ->get()
            ->groupBy(function($item) {
                return $item->tanggal->format('m');
            });

        $data = [];
        $bulanIndonesia = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        // Process each month
        for ($month = 1; $month <= 12; $month++) {
            $monthKey = sprintf('%02d', $month);
            $monthData = $gajiGuru->get($monthKey, collect());
            
            if ($monthData->count() > 0) {
                // Add month header
                $data[] = [
                    'BULAN ' . strtoupper($bulanIndonesia[$month]) . ' ' . $year,
                    '', '', '', '', '', '', '', '', '', '', '', '', ''
                ];
                
                // Add month data
                foreach ($monthData as $item) {
                    $data[] = [
                        $item->hari,
                        $item->tanggal->format('d/m/Y'),
                        $item->gina ?: 0,
                        $item->amel ?: 0,
                        $item->lia ?: 0,
                        $item->siti ?: 0,
                        $item->nurul ?: 0,
                        $item->hikma ?: 0,
                        $item->safa ?: 0,
                        $item->khoir ?: 0,
                        $item->sarah ?: 0,
                        $item->indri ?: 0,
                        $item->aminah ?: 0,
                        $item->rina ?: 0,
                        $item->total ?: 0,
                    ];
                }
                
                // Add monthly total
                $data[] = [
                    'JUMLAH',
                    '',
                    $monthData->sum('gina'),
                    $monthData->sum('amel'),
                    $monthData->sum('lia'),
                    $monthData->sum('siti'),
                    $monthData->sum('nurul'),
                    $monthData->sum('hikma'),
                    $monthData->sum('safa'),
                    $monthData->sum('khoir'),
                    $monthData->sum('sarah'),
                    $monthData->sum('indri'),
                    $monthData->sum('aminah'),
                    $monthData->sum('rina'),
                    $monthData->sum('total'),
                ];
                
                // Add empty row between months
                $data[] = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            }
        }

        return $data;
    }

    public function headings(): array
    {
        return [
            'Hari',
            'Tanggal',
            'Gina',
            'Amel',
            'Lia',
            'Siti',
            'Nurul',
            'Hikma',
            'Safa',
            'Khoir',
            'Sarah',
            'Indri',
            'Aminah',
            'Rina',
            'Total'
        ];
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