<?php

namespace App\Http\Controllers;

use App\Contracts\Resourceable;
use App\Http\Requests\Customer\StoreRequest;
use App\Http\Requests\Customer\UpdateRequest;
use App\Models\Customer;
use App\Traits\IsDestroyable;
use App\Traits\IsEditable;
use App\Traits\IsIndexable;
use App\Traits\IsShowable;
use App\Traits\IsStorable;

class CustomerController extends Controller implements Resourceable
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
        $this->middleware('inputCleaner')->only(['update']);
    }

    public function getEloquentResource()
    {
        return Customer::class;
    }

    public function viewPrefixName()
    {
        return 'Customers';
    }

    public function getIndexResponse()
    {
        $data = $this->getEloquentResource()::paginate(10);

        $data->getCollection()->transform(function ($customer) {
            $customer->actions = [
                'destroy' => route('Customers/Destroy', $customer),
                'edit' => route('Customers/Edit', $customer),
                'show' => route('Customers/Show', $customer)
            ];
            return $customer;
        });

        return [
            'customers' => $data,
            'createUrl' => route('Customers/Create'),
        ];
    }

    public function getCreateResponse()
    {
        return [
            'storeUrl' => route('Customers/Store'),
        ];
    }

    public function getEditResponse($id)
    {
        return [
            'updateUrl' => route('Customers/Update', $id),
            'customer' => $this->getEloquentResource()::find($id)
        ];;
    }

    public function getShowResponse($id)
    {
        return [
            'customer' => $this->getEloquentResource()::find($id)
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
            'message' => 'Category stored successfully'
        ]);
    }

    public function afterUpdate($resoruce, $request)
    {
        session()->flash('alert', [
            'type' => 'success',
            'message' => 'Category updated successfully'
        ]);
    }
}
