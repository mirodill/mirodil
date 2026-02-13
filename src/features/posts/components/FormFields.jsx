export const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

export const Input = (props) => (
  <input
    {...props}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
  />
);