<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class NewsEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'status',
        'published_at',
        'created_by',
        'updated_by',
        'meta_data'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'meta_data' => 'array'
    ];

    // Relasi dengan User untuk created_by
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relasi dengan User untuk updated_by
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Scope untuk published news
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->where('published_at', '<=', now());
    }

    // Scope untuk draft news
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    // Auto generate slug dari title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($newsEvent) {
            if (empty($newsEvent->slug)) {
                $newsEvent->slug = Str::slug($newsEvent->title);
            }
        });

        static::updating(function ($newsEvent) {
            if ($newsEvent->isDirty('title') && empty($newsEvent->slug)) {
                $newsEvent->slug = Str::slug($newsEvent->title);
            }
        });
    }
}
