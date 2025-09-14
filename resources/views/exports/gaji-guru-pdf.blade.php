<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Penggajian Guru</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 12px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 18px;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .header p {
            margin: 5px 0;
            color: #666;
        }
        
        .table-container {
            overflow-x: auto;
            margin-top: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 10px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 6px 4px;
            text-align: center;
            vertical-align: middle;
        }
        
        th {
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 9px;
        }
        
        .tanggal-col {
            width: 80px;
            font-size: 9px;
        }
        
        .guru-col {
            width: 60px;
        }
        
        .total-col {
            width: 80px;
            font-weight: bold;
        }
        
        .footer {
            margin-top: 40px;
            text-align: right;
        }
        
        .signature {
            margin-top: 60px;
            text-align: right;
            margin-right: 50px;
        }
        
        .currency {
            text-align: right;
            padding-right: 8px;
        }
        
        .date-cell {
            text-align: left;
            padding-left: 8px;
        }
        
        @page {
            size: A4 landscape;
            margin: 15mm;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Penggajian Guru</h1>
        <p>Per Tanggal: {{ $tanggal }}</p>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th class="tanggal-col">Tanggal</th>
                    <th class="guru-col">Gina</th>
                    <th class="guru-col">Amel</th>
                    <th class="guru-col">Lia</th>
                    <th class="guru-col">Siti</th>
                    <th class="guru-col">Nurul</th>
                    <th class="guru-col">Hikma</th>
                    <th class="guru-col">Safa</th>
                    <th class="guru-col">Khoir</th>
                    <th class="guru-col">Sarah</th>
                    <th class="guru-col">Indri</th>
                    <th class="guru-col">Aminah</th>
                    <th class="guru-col">Rina</th>
                    <th class="total-col">Total</th>
                </tr>
            </thead>
            <tbody>
                @forelse($gajiGuru as $item)
                <tr>
                    <td class="date-cell tanggal-col">
                        <strong>{{ $item->hari }}</strong><br>
                        {{ $item->tanggal->format('d/m/Y') }}
                    </td>
                    <td class="currency">{{ $item->gina ? number_format($item->gina, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->amel ? number_format($item->amel, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->lia ? number_format($item->lia, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->siti ? number_format($item->siti, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->nurul ? number_format($item->nurul, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->hikma ? number_format($item->hikma, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->safa ? number_format($item->safa, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->khoir ? number_format($item->khoir, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->sarah ? number_format($item->sarah, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->indri ? number_format($item->indri, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->aminah ? number_format($item->aminah, 0, ',', '.') : '-' }}</td>
                    <td class="currency">{{ $item->rina ? number_format($item->rina, 0, ',', '.') : '-' }}</td>
                    <td class="currency total-col">{{ number_format($item->total, 0, ',', '.') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="14" style="text-align: center; padding: 20px; color: #666;">
                        Tidak ada data gaji guru
                    </td>
                </tr>
                @endforelse
            </tbody>
            
            @if($gajiGuru->count() > 0)
            <tfoot>
                <tr style="background-color: #f9f9f9;">
                    <th class="date-cell">TOTAL</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('gina'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('amel'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('lia'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('siti'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('nurul'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('hikma'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('safa'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('khoir'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('sarah'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('indri'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('aminah'), 0, ',', '.') }}</th>
                    <th class="currency">{{ number_format($gajiGuru->sum('rina'), 0, ',', '.') }}</th>
                    <th class="currency total-col">{{ number_format($gajiGuru->sum('total'), 0, ',', '.') }}</th>
                </tr>
            </tfoot>
            @endif
        </table>
    </div>

    <div class="footer">
        <p>Dicetak pada: {{ $tanggal }}</p>
        
        <div class="signature">
            <p>Mengetahui,</p>
            <br><br><br>
            <p>_____________________</p>
            <p>Admin</p>
        </div>
    </div>
</body>
</html>