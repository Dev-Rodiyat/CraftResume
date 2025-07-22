function FormSectionWrapper({ title, children }) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

export default FormSectionWrapper;