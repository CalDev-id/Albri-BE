<?php
use App\Models\GajiGuru;
require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$year = date('Y');
$month = 9; // September
$data = GajiGuru::whereYear('tanggal', $year)->whereMonth('tanggal', $month)->orderBy('tanggal','desc')->get();
echo "Data bulan September $year: ".count($data)." baris".PHP_EOL;
foreach($data as $d){
    echo $d->tanggal.' | '.$d->nama_guru.' | '.$d->total.PHP_EOL;
}
