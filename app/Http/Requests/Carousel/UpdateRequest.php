<?php

namespace App\Http\Requests\Carousel;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:100'],  
            'description' => ['required', 'string', 'max:255'],
            'file_relation_id' => ['required', 'integer', 'exists:files,id'],
            'link' => ['nullable', 'string', 'max:255'],
            'link_text' => ['nullable', 'string', 'max:100'],
            'is_active'=>  ['nullable', 'boolean'],
            'order' => ['required', 'integer', 'min:1']
        ];
    }
}
