<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Penggajian Guru Bulanan - {{ $year }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 11px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 16px;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .header p {
            margin: 5px 0;
            color: #666;
        }
        
        .month-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .month-title {
            background-color: #f0f0f0;
            padding: 8px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            border: 1px solid #000;
            font-size: 12px;
        }
        
        .table-container {
            overflow-x: auto;
            margin-bottom: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 4px 3px;
            text-align: center;
            vertical-align: middle;
        }
        
        th {
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 8px;
        }
        
        .hari-col {
            width: 60px;
            font-size: 8px;
        }
        
        .tanggal-col {
            width: 70px;
            font-size: 8px;
        }
        
        .guru-col {
            width: 50px;
        }
        
        .total-col {
            width: 60px;
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
            padding-right: 5px;
        }
        
        .date-cell {
            text-align: center;
        }
        
        .month-total {
            background-color: #f9f9f9;
            font-weight: bold;
        }
        
        .no-data {
            text-align: center;
            color: #666;
            font-style: italic;
            padding: 15px;
        }
        
        @page {
            size: A4 landscape;
            margin: 15mm;
        }
        
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Penggajian Guru Tahun {{ $year }}</h1>
        <p>Rekap Per Bulan</p>
        <p>Dicetak pada: {{ $tanggal }}</p>
    </div>

    @foreach($monthlySummary as $summary)
    @if(count($summary['data']) > 0)
            <div class="month-section {{ $loop->index > 2 && $loop->index % 3 == 0 ? 'page-break' : '' }}">
                <div class="month-title">
                    {{ strtoupper($summary['month_name']) }} {{ $year }}
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th class="hari-col">Hari</th>
                                <th class="tanggal-col">Tanggal</th>
                                @foreach(array_keys($summary['totals']) as $guruName)
                                    @if($guruName !== 'total')
                                        <th class="guru-col">{{ $guruName }}</th>
                                    @endif
                                @endforeach
                                <th class="total-col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($summary['data'] as $item)
                            <tr>
                                <td class="hari-col">{{ $item['hari'] ?? '-' }}</td>
                                <td class="date-cell tanggal-col">{{ $item['tanggal'] ?? '-' }}</td>
                                @foreach(array_keys($summary['totals']) as $guruName)
                                    @if($guruName !== 'total')
                                        <td class="currency">{{ isset($item[$guruName]) ? number_format($item[$guruName], 0, ',', '.') : '-' }}</td>
                                    @endif
                                @endforeach
                                <td class="currency total-col">{{ isset($item['total']) ? number_format($item['total'], 0, ',', '.') : '-' }}</td>
                            </tr>
                            @endforeach
                            <!-- Monthly Total -->
                            <tr class="month-total">
                                <td colspan="2" class="date-cell"><strong>JUMLAH</strong></td>
                                @foreach(array_keys($summary['totals']) as $guruName)
                                    @if($guruName !== 'total')
                                        <td class="currency"><strong>{{ number_format($summary['totals'][$guruName], 0, ',', '.') }}</strong></td>
                                    @endif
                                @endforeach
                                <td class="currency total-col"><strong>{{ number_format($summary['totals']['total'], 0, ',', '.') }}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        @endif
    @endforeach

    @php
        $grandTotal = collect($monthlySummary)->sum(function($summary) {
            return $summary['totals']['total'] ?? 0;
        });
    @endphp

    @if($grandTotal > 0)
    <div class="month-section page-break">
        <div class="month-title">
            GRAND TOTAL TAHUN {{ $year }}
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Bulan</th>
                        @foreach(array_keys($monthlySummary[0]['totals']) as $guruName)
                            @if($guruName !== 'total')
                                <th class="guru-col">{{ $guruName }}</th>
                            @endif
                        @endforeach
                        <th class="total-col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($monthlySummary as $summary)
                        @if(count($summary['data']) > 0)
                        <tr>
                            <td>{{ $summary['month_name'] }}</td>
                            @foreach(array_keys($summary['totals']) as $guruName)
                                @if($guruName !== 'total')
                                    <td class="currency">{{ number_format($summary['totals'][$guruName], 0, ',', '.') }}</td>
                                @endif
                            @endforeach
                            <td class="currency total-col">{{ number_format($summary['totals']['total'], 0, ',', '.') }}</td>
                        </tr>
                        @endif
                    @endforeach
                    
                    <!-- Grand Total -->
                    <tr class="month-total">
                        <td><strong>GRAND TOTAL</strong></td>
                        @foreach(array_keys($monthlySummary[0]['totals']) as $guruName)
                            @if($guruName !== 'total')
                                <td class="currency"><strong>{{ number_format(collect($monthlySummary)->sum(function($summary) use ($guruName) { return $summary['totals'][$guruName] ?? 0; }), 0, ',', '.') }}</strong></td>
                            @endif
                        @endforeach
                        <td class="currency total-col"><strong>{{ number_format(collect($monthlySummary)->sum(function($summary) { return $summary['totals']['total'] ?? 0; }), 0, ',', '.') }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    @endif

    <div class="footer">
        <div class="signature">
            <p>Mengetahui,</p>
            <br><br><br>
            <p>_____________________</p>
            <p>Admin</p>
        </div>
    </div>
</body>
</html>