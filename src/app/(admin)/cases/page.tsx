'use client';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Define the type for the case data based on your API response
interface CaseData {
  caseTitle: string;
  caseStartDate: string;
  courtName: string;
  caseStatus: string;
  lawyer: string;
  // Add any other fields that exist in your data
}

const Cases = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [cases, setCases] = useState<CaseData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem('token');
      return token;
    };
    setToken(getToken() || null);
  }, []);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('https://api.suleymanmercan.com/api/Case', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            const errorData = await res.text();
            setError(`API request failed: ${errorData}`);
            return;
          }

          const text = await res.text();
          if (!text) {
            setError('Empty response received');
            return;
          }

          const data = JSON.parse(text);
          console.log("Data received from API:", data);
          setCases(data);
        } catch (error) {
          setError('Error loading data: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [token]);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 bg-red-50 rounded-lg shadow-md">
          <p className="text-lg text-red-600 font-medium">No token found. Please log in again.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 bg-red-50 rounded-lg shadow-md">
          <p className="text-lg text-red-600 font-medium">Error:</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageBreadcrumb pageTitle='Davalar' />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dava Listesi</h1>
        <button
          onClick={() => router.push('/cases/Create')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Dava Başlat
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-600">Loading cases...</p>
        </div>
      ) : cases.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-yellow-700">No cases found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700">Case Title</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700">Start Date</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700">Court</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700">Lawyer</th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 border-b border-gray-200">{caseItem.caseTitle}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{formatDate(caseItem.caseStartDate)}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{caseItem.courtName}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${caseItem.caseStatus === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      caseItem.caseStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {caseItem.caseStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">{caseItem.lawyer}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm"
                        onClick={() => alert(`View details for case: ${caseItem.caseTitle}`)}
                      >
                        Detay
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md text-sm"
                        onClick={() => alert(`Edit case: ${caseItem.caseTitle}`)}
                      >
                        Düzenle
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cases;