import { Database, FileSpreadsheetIcon } from "lucide-react";

export const Header = () => (
    <header className="navbar bg-base-100 shadow-sm ">
        <div className="navbar-start">

        </div>

        <div className="navbar-center">
            <a className="btn btn-ghost text-xl font-gochi">Meu Ponto</a>
        </div>

        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1 btn btn-ghost btn-circle avatar hover:opacity-50 transition-opacity duration-200 cursor-pointer">
                    <div className="w-10 rounded-full ">
                        <img src="https://i.pinimg.com/736x/12/19/b7/1219b73ce4261fa85b6dc3949c7d6281.jpg" />
                    </div>
                </div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {/* TODO: Implementar troca de foto de perfil */}
                    <li><a href="https://supabase.com/dashboard/project/hheurdhjbzqtcxtfkxsi" target="_blank" rel="noopener noreferrer">
                        <Database size={14}/>
                        Dados do App
                    </a></li>
                    <li><a>
                        <FileSpreadsheetIcon size={14}/>
                        Exportar para [.xlsx]
                    </a></li>
                </ul>
            </div>
        </div>
    </header>
)