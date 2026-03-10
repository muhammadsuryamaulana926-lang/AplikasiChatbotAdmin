import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import SearchBar from '../../components/SearchBar';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ApiDatabaseManager() {
  const [connectionName, setConnectionName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [importedDatabases, setImportedDatabases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchImportedDatabases();
  }, []);

  const fetchImportedDatabases = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/databases/api-imports`);
      const data = await res.json();
      if (data.success) {
        setImportedDatabases(data.databases || []);
      }
    } catch (error) {
      console.error('Error fetching imported databases:', error);
    }
  };



  const handlePreview = async () => {
    setLoading(true);
    setError('');
    setPreviewData(null);

    try {
      const headers = {};
      if (apiKey) {
        headers['Authorization'] = apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`;
      }

      const response = await axios.post(`${API_BASE_URL}/api/databases/preview-api-v2`, {
        apiUrl,
        headers
      });

      if (response.data.success) {
        setPreviewData(response.data);
        setSuccess(`✅ Preview berhasil! Ditemukan ${response.data.totalRecords} records`);
      } else {
        setError(response.data.error || 'Preview gagal');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!databaseName) {
      setError('Nama database harus diisi!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const headers = {};
      if (apiKey) {
        headers['Authorization'] = apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`;
      }

      const response = await axios.post(`${API_BASE_URL}/api/databases/import-from-api-v2`, {
        apiUrl,
        databaseName,
        headers
      });

      if (response.data.success) {
        setSuccess(`✅ Import berhasil! ${response.data.imported} data telah diimport ke database ${response.data.database}`);
        
        // Simpan metadata ke backend
        try {
          await axios.post(`${API_BASE_URL}/api/databases/save-api-import`, {
            name: response.data.database,
            apiUrl: apiUrl,
            apiKey: apiKey || null,
            records: response.data.imported,
            importedAt: new Date().toISOString()
          });
        } catch (err) {
          console.error('Error saving API import metadata:', err);
        }
        
        fetchImportedDatabases();
        setPreviewData(null);
        setShowModal(false);
        setConnectionName('');
        setApiUrl('');
        setDatabaseName('');
        setApiKey('');
      } else {
        setError(response.data.error || 'Import gagal');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDatabases = importedDatabases.filter(db => {
    const query = searchQuery.toLowerCase();
    return (
      db.name.toLowerCase().includes(query) ||
      (db.apiUrl || '').toLowerCase().includes(query) ||
      (db.records || 0).toString().includes(query)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6 overflow-x-hidden">
        {/* HEADER + BUTTON */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">API Database Manager</h1>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            + Import dari API
          </button>
        </div>

        {/* SUCCESS/ERROR MESSAGES */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-2xl border border-red-200">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-100 text-green-700 rounded-2xl border border-green-200">
            {success}
          </div>
        )}

        {/* IMPORTED DATABASES TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-end">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari database..."
            />
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama Database</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sumber API</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">API Key</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Records</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal Import</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDatabases.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada database yang diimport dari API'}
                  </td>
                </tr>
              ) : (
                filteredDatabases.map((db, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{db.name}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <div className="max-w-xs truncate" title={db.apiUrl}>
                        {db.apiUrl || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {db.apiKey ? (
                        <span className="font-mono">{db.apiKey.substring(0, 15)}...</span>
                      ) : (
                        <span className="text-gray-400 italic">Tidak ada</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{db.records || 0}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {db.importedAt ? (
                        new Date(db.importedAt).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Tersedia
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Informasi Import API</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Fitur ini memungkinkan Anda untuk mengimport data dari API eksternal dan menyimpannya sebagai database baru. 
                Pastikan API endpoint dapat diakses dan mengembalikan data dalam format JSON.
              </p>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto relative my-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPreviewData(null);
                  setError('');
                  setConnectionName('');
                }}
                className="sticky top-0 float-right m-6 z-10 text-gray-800 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8 pt-4">
                {/* LEFT COLUMN - Configuration */}
                <div className="lg:col-span-2 space-y-4 lg:space-y-5">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Konfigurasi API
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Koneksi *</label>
                        <input
                          type="text"
                          value={connectionName}
                          onChange={(e) => setConnectionName(e.target.value)}
                          placeholder="Koneksi ITB API"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API URL *</label>
                        <input
                          type="text"
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                          placeholder="https://api.example.com/data"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API Key / Bearer Token (Optional)</label>
                        <input
                          type="text"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Masukkan API key atau Bearer token"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        />
                        <p className="text-xs text-gray-500 mt-1">Sistem akan otomatis menambahkan "Bearer" jika diperlukan</p>
                      </div>
                    </div>
                  </div>



                  <button
                    onClick={handlePreview}
                    disabled={loading || !apiUrl}
                    className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {loading ? 'Loading...' : 'Preview Data'}
                  </button>
                </div>

                {/* RIGHT COLUMN - Preview & Import */}
                <div className="space-y-4 order-first lg:order-last">
                  {previewData ? (
                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Preview Results
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-500">Total Records</p>
                              <p className="font-semibold text-gray-800">{previewData.totalRecords}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Detected Field</p>
                              <p className="font-semibold text-gray-800">{previewData.detectedField}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Columns:</p>
                          <div className="flex flex-wrap gap-1">
                            {previewData.columns?.map((c, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                {c.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {previewData.sample && (
                          <div className="bg-white rounded-lg p-4 border">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Sample Data:</p>
                            <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-32 border">
                              {JSON.stringify(previewData.sample[0], null, 2)}
                            </pre>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Database *</label>
                          <input
                            type="text"
                            value={databaseName}
                            onChange={(e) => setDatabaseName(e.target.value)}
                            placeholder="my_database"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                          />
                        </div>

                        <button
                          onClick={handleImport}
                          disabled={loading || !databaseName}
                          className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {loading ? 'Importing...' : 'Import to Database'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
                      <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">Preview akan muncul di sini</p>
                      <p className="text-gray-400 text-sm mt-1">Klik "Preview Data" untuk melihat data dari API</p>
                    </div>
                  )}

                {error && (
                  <div className="fixed top-0 left-0 right-0 p-4 bg-red-600 text-white text-sm text-center z-20">
                    ❌ {error}
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
