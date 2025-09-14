<?php

namespace App\Exports;

use App\Models\GajiGuru;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class GajiGuruExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithColumnWidths
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        return GajiGuru::when(isset($this->filters['search']) && $this->filters['search'], function ($query) {
                $search = $this->filters['search'];
                return $query->where('tanggal', 'like', "%{$search}%")
                    ->orWhere('nama_guru', 'like', "%{$search}%")
                    ->orWhere('hari', 'like', "%{$search}%");
            })
            ->when(isset($this->filters['week_start']) && $this->filters['week_start'], function ($query) {
                return $query->whereDate('tanggal', '>=', $this->filters['week_start']);
            })
            ->when(isset($this->filters['week_end']) && $this->filters['week_end'], function ($query) {
                return $query->whereDate('tanggal', '<=', $this->filters['week_end']);
            })
            ->orderBy('tanggal', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'Tanggal',
            'Hari',
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

    public function map($gajiGuru): array
    {
        return [
            $gajiGuru->tanggal->format('d/m/Y'),
            $gajiGuru->hari,
            $gajiGuru->gina ?: 0,
            $gajiGuru->amel ?: 0,
            $gajiGuru->lia ?: 0,
            $gajiGuru->siti ?: 0,
            $gajiGuru->nurul ?: 0,
            $gajiGuru->hikma ?: 0,
            $gajiGuru->safa ?: 0,
            $gajiGuru->khoir ?: 0,
            $gajiGuru->sarah ?: 0,
            $gajiGuru->indri ?: 0,
            $gajiGuru->aminah ?: 0,
            $gajiGuru->rina ?: 0,
            $gajiGuru->total ?: 0,
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
            'A' => 12, // Tanggal
            'B' => 10, // Hari
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