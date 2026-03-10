// ============================================
// CONTOH PENGGUNAAN TEMA - BEFORE & AFTER
// ============================================

// ❌ CARA LAMA (Tidak responsif terhadap tema)
// ============================================

function OldDashboard() {
  return (
    <div className="space-y-6">
      {/* Card dengan warna hardcoded */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
        <p className="text-3xl font-bold text-gray-900">150</p>
      </div>

      {/* Button dengan warna hardcoded */}
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Click Me
      </button>

      {/* Text dengan warna hardcoded */}
      <h1 className="text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Welcome to admin panel</p>
    </div>
  );
}


// ✅ CARA BARU (Responsif terhadap tema)
// ============================================

import { GlassCard, GlassButton } from '../components/GlassComponents';
import { useTheme } from '../contexts/ThemeContext';

function NewDashboard() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Card dengan GlassCard - otomatis menyesuaikan tema */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-primary">Total Users</h3>
        <p className="text-3xl font-bold text-primary">150</p>
      </GlassCard>

      {/* Button dengan GlassButton - otomatis menyesuaikan tema */}
      <GlassButton variant="primary">
        Click Me
      </GlassButton>

      {/* Text dengan class tema - otomatis menyesuaikan warna */}
      <h1 className="text-primary">Dashboard</h1>
      <p className="text-secondary">Welcome to admin panel</p>
    </div>
  );
}


// ============================================
// CONTOH STAT CARD DENGAN TEMA
// ============================================

// ❌ Cara Lama
function OldStatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-600 rounded-xl flex items-center justify-center`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ✅ Cara Baru
import { GlassCard } from '../components/GlassComponents';

function NewStatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
  };

  return (
    <GlassCard hover={true}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondary text-sm">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center shadow-lg`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </GlassCard>
  );
}


// ============================================
// CONTOH FORM DENGAN TEMA
// ============================================

// ❌ Cara Lama
function OldForm() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add User</h2>
      <form>
        <input 
          type="text" 
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button 
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// ✅ Cara Baru
import { GlassCard, GlassButton } from '../components/GlassComponents';

function NewForm() {
  return (
    <GlassCard>
      <h2 className="text-xl font-bold text-primary mb-4">Add User</h2>
      <form>
        <input 
          type="text" 
          placeholder="Name"
          className="w-full px-4 py-2 border border-theme rounded-lg bg-transparent text-primary placeholder-secondary"
        />
        <GlassButton type="submit" variant="primary" className="mt-4">
          Submit
        </GlassButton>
      </form>
    </GlassCard>
  );
}


// ============================================
// CONTOH MODAL DENGAN TEMA
// ============================================

// ❌ Cara Lama
function OldModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Action</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to proceed?</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Cara Baru
import { GlassCard, GlassButton } from '../components/GlassComponents';

function NewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <GlassCard className="max-w-md w-full">
        <h3 className="text-xl font-bold text-primary mb-4">Confirm Action</h3>
        <p className="text-secondary mb-6">Are you sure you want to proceed?</p>
        <div className="flex gap-3">
          <GlassButton 
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </GlassButton>
          <GlassButton 
            variant="primary"
            className="flex-1"
          >
            Confirm
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}


// ============================================
// CONTOH TABLE DENGAN TEMA
// ============================================

// ❌ Cara Lama
function OldTable({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-gray-700">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-800">{item.name}</td>
              <td className="px-6 py-4 text-gray-600">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ✅ Cara Baru
import { GlassCard } from '../components/GlassComponents';

function NewTable({ data }) {
  return (
    <GlassCard className="overflow-hidden p-0">
      <table className="w-full">
        <thead className="glass-button">
          <tr>
            <th className="px-6 py-3 text-left text-primary">Name</th>
            <th className="px-6 py-3 text-left text-primary">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-theme">
              <td className="px-6 py-4 text-primary">{item.name}</td>
              <td className="px-6 py-4 text-secondary">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}


// ============================================
// TIPS & BEST PRACTICES
// ============================================

/*
1. SELALU gunakan GlassCard untuk container/card
   ✅ <GlassCard>...</GlassCard>
   ❌ <div className="bg-white">...</div>

2. SELALU gunakan class tema untuk warna text
   ✅ className="text-primary"
   ❌ className="text-gray-800"

3. SELALU gunakan GlassButton untuk button
   ✅ <GlassButton variant="primary">...</GlassButton>
   ❌ <button className="bg-blue-600">...</button>

4. GUNAKAN border-theme untuk border yang konsisten
   ✅ className="border border-theme"
   ❌ className="border border-gray-200"

5. TEST di semua tema sebelum commit
   - Default
   - Glass Light
   - Glass Dark
   - Cyberpunk

6. HINDARI hardcode warna
   ❌ style={{ color: '#1f2937' }}
   ✅ className="text-primary"

7. GUNAKAN CSS variables jika perlu custom styling
   ✅ style={{ backgroundColor: 'var(--card-bg)' }}
   ❌ style={{ backgroundColor: '#ffffff' }}
*/
