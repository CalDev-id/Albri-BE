<?php
use App\Models\GajiGuru;
require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$year = date('Y');
$data = GajiGuru::orderBy('tanggal','desc')->get();
echo "Total data: ".count($data).PHP_EOL;
foreach($data as $d){
    echo $d->tanggal.' | '.$d->nama_guru.' | '.$d->total.PHP_EOL;
}

// Group by month
$grouped = $data->groupBy(function($item){ return date('m', strtotime($item->tanggal)); });
echo PHP_EOL."=== Grouping by month ===".PHP_EOL;
foreach($grouped as $month=>$items){
    echo "Bulan $month: ".count($items)." data".PHP_EOL;
    foreach($items as $i){
        echo "  ".$i->tanggal." | ".$i->nama_guru." | ".$i->total.PHP_EOL;
    }
}
