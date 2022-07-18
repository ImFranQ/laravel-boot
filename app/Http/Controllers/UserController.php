<?php

namespace App\Http\Controllers;

use App\Contracts\Resourceable;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;
use App\Traits\IsDestroyable;
use App\Traits\IsEditable;
use App\Traits\IsIndexable;
use App\Traits\IsShowable;
use App\Traits\IsStorable;

class UserController extends Controller implements Resourceable
{
    use IsIndexable, IsDestroyable, IsShowable;
    use IsEditable {
        update as protected updateResource;
    }
    use IsStorable {
        store as protected storeResource;
    }

    function __construct()
    {
        $this->middleware('auth');
        $this->middleware('passwordHasher')->only(['store', 'update']);
        $this->middleware('inputCleaner')->only(['update']);
    }

    public function getEloquentResource()
    {
        return User::class;
    }

    public function viewPrefixName()
    {
        return 'Users';
    }

    public function getIndexResponse()
    {
        $data = $this->getEloquentResource()::paginate(10);

        $data->getCollection()->transform(function ($user) {
            $user->actions = [
                'destroy' => route('Users/Destroy', $user),
                'edit' => route('Users/Edit', $user),
                'show' => route('Users/Show', $user)
            ];
            return $user;
        });

        return [
            'users' => $data,
            'createUrl' => route('Users/Create'),
        ];
    }

    public function getCreateResponse()
    {
        return [
            'storeUrl' => route('Users/Store'),
        ];
    }

    public function getEditResponse($id)
    {
        return [
            'updateUrl' => route('Users/Update', $id),
            'user' => $this->getEloquentResource()::find($id)
        ];;
    }

    public function getShowResponse($id)
    {
        return [
            'user' => $this->getEloquentResource()::find($id)
        ];
    }

    public function store(StoreRequest $request)
    {
        return $this->storeResource($request);
    }

    public function update(UpdateRequest $request, $id)
    {
        return $this->updateResource($request, $id);
    }

    public function afterStore($resoruce)
    {
        session()->flash('alert', [
            'type' => 'success',
            'message' => 'User stored successfully'
        ]);
    }

    public function afterUpdate($resoruce, $request)
    {
        session()->flash('alert', [
            'type' => 'success',
            'message' => 'User updated successfully'
        ]);
    }
}   
