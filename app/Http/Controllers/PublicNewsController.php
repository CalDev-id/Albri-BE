<?php

namespace App\Http\Controllers;

use App\Models\NewsEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicNewsController extends Controller
{
    /**
     * Display a listing of published news events for public view.
     */
    public function index(Request $request)
    {
        $query = NewsEvent::with(['creator'])
            ->where('status', 'published')
            ->where('published_at', '<=', now());

        // Search functionality
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%');
            });
        }

        $newsEvents = $query->orderBy('published_at', 'desc')
                           ->paginate(9);

        return Inertia::render('Public/NewsEvents/Index', [
            'newsEvents' => $newsEvents,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display the specified news event for public view.
     */
    public function show($slug)
    {
        $newsEvent = NewsEvent::with(['creator'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->firstOrFail();

        // Get related news events (same category or recent)
        $relatedNews = NewsEvent::with(['creator'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->where('id', '!=', $newsEvent->id)
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Public/NewsEvents/Show', [
            'newsEvent' => $newsEvent,
            'relatedNews' => $relatedNews
        ]);
    }
}