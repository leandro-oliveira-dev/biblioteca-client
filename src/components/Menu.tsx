import Link from "next/link";

interface IMenu {
    url:string;
    title:string;
    description?:string;

}

const MENUS:IMenu[] = [{url:"/",title:"Biblioteca"},{url:"/books",title:"Livros",description:" Acervo de livros disponiveis na biblioteca." },
{url:"/sair",title:"Sair"},];



export function Menu(){
    return (
        <div className="mb-30 grid text-center lg:max-w-xl lg:w--60 lg:mb-30 lg:text-left">
       {MENUS.map(menu=>(    <Link key={menu.title}
          href={menu.url}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
           {menu.title}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          {menu?.description}
          </p>
        </Link>))}
    

       
      </div>
     
    )
}










