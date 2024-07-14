<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index(){
        return Inertia::render('Todo',
        [
            'todos' => Todo::latest()->paginate(5   ),
        ]);     
    } 
    public function edit(Todo $todo){
        return Inertia::render('Edit',[
            'todo' => $todo
        ]); 
    } 
    public function store(Request $request){
        $data = $request->validate([
            'name' => 'required|min:3',     
            'is_complete' => 'boolean'
        ],[
            'name.required' => 'Nama Todo harus diisi',
            'name.min' => 'Minimal 3 karakter',
        ]);
        Todo::create($data);
        return back()->with('message','Todo berhasil disimpan');
    } 
    public function update(Request $request, Todo $todo){
        $data = $request->validate([
            'name' => 'required|min:3',     
        ],[
            'name.required' => 'Nama Todo harus diisi',
            'name.min' => 'Minimal 3 karakter',
        ]);
        $todo->update($data);
        return redirect('/todo')->with('message','Todo berhasil diupdate');
    }
    public function updateComplete(Request $request, Todo $todo){
        $data = $request->validate([
            'is_complete' => 'boolean'
        ]);
        $todo->update($data);
        return back()->with('message','Todo berhasil diupdate');
    } 
    public function destroy(Todo $todo){
        $todo->delete();
        return back()->with('message','Todo berhasil dihapus');
    } 
}
