'use client';
import { useState,useEffect, useCallback,useContext} from 'react';
import { appUserService,UserInfo } from './userInfoService';
import { AuthContext } from '@/config/context/AuthContext';

export default function User() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [apps,setApps] = useState<UserInfo[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending', 
  })
  const [currentPage,setCurrentPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [totalPages,setTotalPages] = useState(0);
  const [startIndex,setStartIndex] = useState(0);
  const auth = useContext(AuthContext);
  

  useEffect(() => {
    console.log("auth is:"+auth)
    appUserService.getAppInfo().then((data) => {
        setApps(data)
        setTotalPages(data.length)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  const callbackfunc = useCallback(() => {
    appUserService.getAppInfo().then((data) => {
        setApps(data)
        setTotalPages(data.length)
    }).catch((err) => {
      console.log(err)
    })
  },[apps])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

const handleSort = (key: string) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 搜索框 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('name')}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('email')}
              >
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('role')}
              >
                Role {sortConfig.key === 'role' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('status')}
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {apps.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.role}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页控件 */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
