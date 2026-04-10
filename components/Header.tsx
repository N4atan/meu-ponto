
export const Header = () => (
    <header className="navbar bg-base-100 shadow-sm font-gochi">
        <div className="navbar-start">

        </div>

        <div className="navbar-center">
            <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>

        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1 btn btn-ghost btn-circle avatar hover:opacity-50 transition-opacity duration-200 cursor-pointer">
                    <div className="w-10 rounded-full ">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {/* TODO: Implementar troca de foto de perfil */}
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
    </header>
)