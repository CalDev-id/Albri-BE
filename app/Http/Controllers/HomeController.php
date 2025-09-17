<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NewsEvent;

class HomeController extends Controller
{
    public function index()
    {
        $latestNews = NewsEvent::published()
            ->with('creator') // Load relasi creator
            ->orderBy('published_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($news, $index) {
                // Generate random image jika tidak ada featured_image
                $randomImageIds = [1018, 1015, 1019, 1022, 1025, 1016, 1020, 1021, 1024, 1026];
                $randomId = $randomImageIds[$index % count($randomImageIds)];
                $defaultImage = "https://picsum.photos/id/{$randomId}/1600/800";
                
                // Cek apakah file gambar benar-benar ada
                $imagePath = $news->featured_image ? public_path('storage/' . $news->featured_image) : null;
                $imageExists = $imagePath && file_exists($imagePath);
                
                $imageUrl = ($imageExists) ? asset('storage/' . $news->featured_image) : $defaultImage;
                
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'slug' => $news->slug,
                    'excerpt' => $news->excerpt,
                    'image' => $imageUrl,
                    'date' => $news->published_at->format('d F Y'),
                    'author' => $news->creator ? $news->creator->name : 'Admin',
                    'content' => $news->excerpt ?? ''
                ];
            });

        return Inertia::render('Albri', [
            'latestNews' => $latestNews
        ]);
    }
}