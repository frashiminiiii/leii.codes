export default function Header() {
  return (
    <div className="h-20 flex items-center bg-slate-50">
      <div className="h-15 w-15 bg-teal-400 rounded-3xl border-2 border-teal-200"></div>
      <div className="ml-3 flex flex-col">
        <p className="text-lg text-teal-600 font-semibold">UNSPLASH GALLERY</p>
        <p className="text-sm text-teal-600 mt-1">FRANCIS PASCUA</p>
      </div>
    </div>
  );
}
