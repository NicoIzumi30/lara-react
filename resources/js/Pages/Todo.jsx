import AdminLayout from '@/Layouts/AdminLayout'
import PopupTodo from '@/Components/PopupTodo'  
import React, { useEffect, useState } from 'react'
import { router, useForm, usePage, Link, Head } from '@inertiajs/react'
import { HiPencilAlt } from "react-icons/hi";
import { BsFillTrashFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import Pagination from '@/Components/Pagination';
import toast from 'react-hot-toast';
import { IoMdCloseCircle } from "react-icons/io";
const Todo = ({ todos }) => {
    const { flash, errors } = usePage().props;
    const { data, setData, reset } = useForm({
        name: "",
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [todoProps, setTodoProps] = useState({
        id : "",
        name : ""
    });
    const storeTodo = (e) => {
        e.preventDefault();
        router.post('/todo', data, {
            onSuccess: () => {
                reset();
            },
        });
    }
    const handleShowConfirm = (id,name) => {
        setTodoProps({id:id, name:name});
        setShowConfirm(true);   
    }
    useEffect(() => {
        flash.message && toast.success(flash.message)

    }, [flash])
    const handleComplete = (id, name, isComplete) => {
        let title = document.getElementById(id);
        title.innerText = "Processing...";
        router.patch(`/todo/edit-complete/${id}`, {
            is_complete: !isComplete
        }, {
            onSuccess: () => {
                title.innerText = name;

            },
        })
    }
    return (
        <>
            <Head title="Todo" />
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <h2 className='font-semibold text-4xl my-8 text-center' >Todo APP</h2>
                    <form onSubmit={storeTodo}>
                        <div className="mb-6">
                            <div className="flex gap-4 item-center">
                                <input type="text" placeholder='Enter todo here' className='px-4 py-2 rounded-md grow' onChange={(e) => setData('name', e.target.value)} value={data.name} />
                                <button className='py-2 px-4 rounded-md bg-indigo-500 text-white'>Save</button>
                            </div>
                            {errors.name && <p className="text-red-700 text-sm mt-2 ">{errors.name}</p>}
                        </div>

                    </form>
                    <div className="flex flex-col gap-4">
                        {todos.data.map((todo, i) => {
                            return (
                                <div key={i} className={`flex justify-between items-center py-3 px-6 ${todo.is_complete ? "bg-green-100" : "bg-red-100"} rounded-md`}>
                                    <h3 id={todo.id}>{todo.name}</h3>
                                    <div className='flex items-center justify-center gap-2' >
                                        {todo.is_complete ? (<IoMdCloseCircle className='cursor-pointer text-red-600' size={21} onClick={() => handleComplete(todo.id, todo.name, todo.is_complete)} />) : (
                                            <FaCheckCircle className='cursor-pointer' size={18} onClick={() => handleComplete(todo.id, todo.name, todo.is_complete)} />
                                        )}

                                        <Link href={`todo/edit/${todo.id}`}><HiPencilAlt size={20} /></Link> |
                                        <BsFillTrashFill size={20} className='cursor-pointer' onClick={()=>handleShowConfirm(todo.id,todo.name)} />
                                        {showConfirm && (<PopupTodo  todoProps={todoProps} setShowConfirm={setShowConfirm} />)}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="mt-5 flex justify-end items-center">
                        <Pagination todos={todos} />
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default Todo