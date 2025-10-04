<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait FilterByUser
{
    /**
     * Filter query berdasarkan user yang sedang login
     */
    public function filterByAuthUser($query)
    {
        return $query->where('user_id', Auth::id());
    }
    
    /**
     * Check apakah user memiliki akses ke data tertentu
     */
    public function checkUserAccess($model)
    {
        return $model->user_id === Auth::id();
    }
}
