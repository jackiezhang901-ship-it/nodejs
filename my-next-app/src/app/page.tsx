'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext , Auth} from '@/config/context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();

  const [auth,setAuth] = useState<Auth>({
       id:5,
       name:'jackie'
  })
  ;

  const navItems = [
    { name: '首页', path: '/' },
    { name: '用户', path: '/user' },
    { name: '服务', path: '/services' },
    { name: '博客', path: '/blog' },
    { name: '联系我们', path: '/contact' },
  ];

  return (
    <AuthContext.Provider value={{ auth,setAuth}}>
<nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-800"
              >
                YourLogo
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                      ${
                        isActive
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </AuthContext.Provider>
    
  );
};

export default Navbar;
