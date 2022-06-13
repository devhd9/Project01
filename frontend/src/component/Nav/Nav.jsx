import { Link } from "react-router-dom";
import {
  UserAddIcon,
  UserCircleIcon as UserIcon,
} from "@heroicons/react/solid";
import { HomeIcon } from "@heroicons/react/outline";

const divClassname =
  "hover:cursor-pointer flex mx-2 px-3 py-2 text-yellow-400 text-lg transition-all duration-300 rounded-lg cursor-pointer hover:bg-slate-100 hover:text-yellow-800 ease-in";

const Nav = () => {
  return (
    <nav className='flex px-2 py-1 font-bold mb-5 bg-slate-700 border-b-2 border-stone-400'>
      <div className='flex mr-auto'>
        <Link to='/' style={{ textDecorationLine: "none" }} className='my-auto'>
          <span className='flex w-8 text-yellow-400'>
            <HomeIcon />
          </span>
        </Link>
      </div>
      <div className='flex ml-auto'>
        <Link to='/login'>
          <section className={divClassname}>
            <p>Login</p>
            <UserIcon className='ml-1 w-7 text-lg' />
          </section>
        </Link>
        <Link to='/register'>
          <section className={divClassname}>
            <p>Register</p>
            <UserAddIcon className='ml-1 w-6 text-lg' />
          </section>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
