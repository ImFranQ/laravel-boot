<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['required', 'max:100'],
            'price' => ['required', 'numeric'],
            'description' => ['nullable', 'max:1000'],
            'category_id' => ['required', 'exists:categories,id'],
            'files' => ['nullable', 'array', 'min:1'],
            'files.*.id' => ['exists:files,id'],
        ];
    }
}
