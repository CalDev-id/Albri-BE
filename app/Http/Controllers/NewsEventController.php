<?php

namespace App\Http\Controllers;

use App\Models\NewsEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = NewsEvent::with(['creator', 'updater']);

        // Filter berdasarkan status - hanya jika status tidak kosong dan bukan null
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search berdasarkan title
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $newsEvents = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/NewsEvents/Index', [
            'newsEvents' => $newsEvents,
            'filters' => $request->only(['status', 'search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/NewsEvents/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'meta_data' => 'nullable|array'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);
        $data['created_by'] = Auth::id();

        // Handle file upload
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('news-events', 'public');
        }

        // Set published_at jika status published
        if ($request->status === 'published' && !$request->published_at) {
            $data['published_at'] = now();
        }

        NewsEvent::create($data);

        return redirect()->route('admin.news-events.index')
            ->with('success', 'Berita acara berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(NewsEvent $newsEvent)
    {
        $newsEvent->load(['creator', 'updater']);
        
        return Inertia::render('Admin/NewsEvents/Show', [
            'newsEvent' => $newsEvent
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NewsEvent $newsEvent)
    {
        return Inertia::render('Admin/NewsEvents/Edit', [
            'newsEvent' => $newsEvent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NewsEvent $newsEvent)
    {
        // Build validation rules dynamically
        $rules = [
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'meta_data' => 'nullable|array'
        ];

        // Only validate title and content if they are provided and not empty
        if ($request->filled('title')) {
            $rules['title'] = 'required|string|max:255';
        }
        if ($request->filled('content')) {
            $rules['content'] = 'required|string';
        }

        $request->validate($rules);

        $data = $request->only(['excerpt', 'status', 'published_at', 'meta_data']);
        
        // Only update title and slug if title is provided and not empty
        if ($request->filled('title')) {
            $data['title'] = $request->input('title');
            $data['slug'] = Str::slug($request->input('title'));
        }
        
        // Only update content if provided and not empty
        if ($request->filled('content')) {
            $data['content'] = $request->input('content');
        }
        
        $data['updated_by'] = Auth::id();

        // Handle file upload
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($newsEvent->featured_image) {
                Storage::disk('public')->delete($newsEvent->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('news-events', 'public');
        }

        // Set published_at jika status published dan belum ada
        if ($request->status === 'published' && !$newsEvent->published_at && !$request->published_at) {
            $data['published_at'] = now();
        }

        $newsEvent->update($data);

        return redirect()->route('admin.news-events.index')
            ->with('success', 'Berita acara berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NewsEvent $newsEvent)
    {
        // Delete featured image if exists
        if ($newsEvent->featured_image) {
            Storage::disk('public')->delete($newsEvent->featured_image);
        }

        $newsEvent->delete();

        return redirect()->route('admin.news-events.index')
            ->with('success', 'Berita acara berhasil dihapus.');
    }
}
