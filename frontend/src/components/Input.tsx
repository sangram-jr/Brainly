//create reuseable input field
interface InputProps{
    onChange:()=> void,
    placeholder:string
}

export function Input({onChange,placeholder}:InputProps){
    return <div>
        <input placeholder={placeholder} type={'text'} onChange={onChange} className="px-4 py-2 m-2 rounded border border-gray-200"/>
    </div>
}