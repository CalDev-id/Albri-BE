<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Penggajian Guru</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 10px;
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

        .table-container {
            overflow-x: auto;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 8px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 4px 2px;
            text-align: center;
            vertical-align: top;
            word-wrap: break-word;
        }

        th {
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 8px;
        }

        .tanggal-col {
            width: 60px;
            font-size: 8px;
        }

        .guru-col {
            width: 120px;
            max-width: 120px;
            font-size: 7px;
        }

        .total-col {
            width: 70px;
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
            text-align: left;
            padding: 2px;
            font-size: 7px;
            line-height: 1.2;
        }

        .date-cell {
            text-align: center;
            padding: 4px 2px;
        }

        .day-name {
            font-weight: bold;
            font-size: 8px;
        }

        .detail-text {
            font-size: 6px;
            line-height: 1.1;
            word-break: break-word;
        }

        @page {
            size: A4 landscape;
            margin: 10mm;
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
                    <th class="tanggal-col">Hari</th>
                    @foreach($gurus as $guru)
                        <th class="guru-col">{{ $guru->name }}</th>
                    @endforeach
                    <th class="total-col">Total</th>
                </tr>
            </thead>
            <tbody>
                @forelse($uniqueDates as $date)
                    @php
                        $dayTotal = 0;
                        $dayName = \Carbon\Carbon::parse($date)->locale('id')->dayName;
                    @endphp
                    <tr>
                        <td class="date-cell tanggal-col">
                            {{ \Carbon\Carbon::parse($date)->format('d/m/Y') }}
                        </td>
                        <td class="date-cell tanggal-col day-name">
                            {{ ucfirst($dayName) }}
                        </td>
                        @foreach($gurus as $guru)
                            @php
                                $guruData = $data[$date][$guru->id] ?? ['details' => [], 'total' => 0];
                                $guruTotal = $guruData['total'];
                                $dayTotal += $guruTotal;
                            @endphp
                            <td class="currency guru-col">
                                @if($guruTotal > 0 && !empty($guruData['details']))
                                    <div class="detail-text">
                                        @foreach($guruData['details'] as $detail)
                                            {{ $detail['nama'] }}: Rp {{ number_format($detail['gaji'], 0, ',', '.') }}
                                            @if(!$loop->last), @endif
                                        @endforeach
                                        @if(count($guruData['details']) > 1)
                                            <br><strong>Total: Rp {{ number_format($guruTotal, 0, ',', '.') }}</strong>
                                        @endif
                                    </div>
                                @else
                                    -
                                @endif
                            </td>
                        @endforeach
                        <td class="currency total-col">
                            {{ $dayTotal > 0 ? 'Rp ' . number_format($dayTotal, 0, ',', '.') : '-' }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="{{ count($gurus) + 3 }}" style="text-align: center; padding: 20px; color: #666;">
                            Tidak ada data gaji guru
                        </td>
                    </tr>
                @endforelse
            </tbody>

            @if(count($uniqueDates) > 0)
                <tfoot>
                    <tr style="background-color: #f9f9f9;">
                        <th class="date-cell" colspan="2">TOTAL</th>
                        @php $grandTotal = 0; @endphp
                        @foreach($gurus as $guru)
                            @php 
                                                    $guruGrandTotal = 0;
                                foreach ($uniqueDates as $date) {
                                    $guruGrandTotal += $data[$date][$guru->id]['total'] ?? 0;
                                }
                                $grandTotal += $guruGrandTotal;
                            @endphp
                                <th class="currency">
                                    {{ $guruGrandTotal > 0 ? 'Rp ' . number_format($guruGrandTotal, 0, ',', '.') : '-' }}
                                </th>
                        @endforeach
                        <th class="currency total-col">
                            {{ $grandTotal > 0 ? 'Rp ' . number_format($grandTotal, 0, ',', '.') : '-' }}
                        </th>
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