// Tambahkan komponen ini ke AppSettings.jsx
// Ganti bagian modal dengan komponen ini

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editingDb ? 'Edit Koneksi Database' : 'Tambah Koneksi Database'}
      </h2>
      
      {/* Tab Selector */}
      {!editingDb && (
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setModalType('manual')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              modalType === 'manual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setModalType('api')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              modalType === 'api'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Import dari API
          </button>
        </div>
      )}

      {/* Manual Form */}
      {modalType === 'manual' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Koneksi</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
              <input
                type="text"
                value={formData.host}
                onChange={(e) => setFormData({...formData, host: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
              <input
                type="text"
                value={formData.port}
                onChange={(e) => setFormData({...formData, port: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Database</label>
            <input
              type="text"
              value={formData.database}
              onChange={(e) => setFormData({...formData, database: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingDb(null);
                setFormData({ name: '', host: 'localhost', port: '3306', database: '', username: 'root', password: '' });
              }}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingDb ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      )}

      {/* API Import Form */}
      {modalType === 'api' && (
        <form onSubmit={handleSubmitApi} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
            <input
              type="url"
              value={apiFormData.apiUrl}
              onChange={(e) => setApiFormData({...apiFormData, apiUrl: e.target.value})}
              placeholder="https://api.example.com/members"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">URL API yang mengembalikan data anggota</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Opsional)</label>
            <input
              type="text"
              value={apiFormData.apiKey}
              onChange={(e) => setApiFormData({...apiFormData, apiKey: e.target.value})}
              placeholder="Bearer token atau API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Database</label>
            <input
              type="text"
              value={apiFormData.databaseName}
              onChange={(e) => setApiFormData({...apiFormData, databaseName: e.target.value})}
              placeholder="nama_organisasi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Nama database yang akan dibuat</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Format API yang diharapkan:</strong><br/>
              <code className="text-xs bg-blue-100 px-1 py-0.5 rounded">
                {`{ "members": [{ "name": "...", "email": "...", "phone": "..." }] }`}
              </code>
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setApiFormData({ apiUrl: '', apiKey: '', databaseName: '' });
              }}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={importing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {importing ? 'Importing...' : 'Import'}
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
)}
