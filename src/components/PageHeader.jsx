export default function PageHeader({ title, subtitle }) {
  return (
    <div className="sticky top-0 z-30 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
