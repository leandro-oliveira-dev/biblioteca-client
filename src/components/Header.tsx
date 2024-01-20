interface IHeaderParams{
    title:string;
    

}


export function Header({title}:IHeaderParams){
    return( <div className="bg-red-600 p-6 w-full mx-aut">{title}
    </div>)
}