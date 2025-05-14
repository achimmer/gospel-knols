export default function Footer() {
  return (
    <footer className="bg-gray-50 border-gray-100 border-t">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-20 items-center">
          <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:text-left lg:text-6xl text-stone-500">Knol upon knol.</h3>
          <dl className="text-3xl prose text-slate-600">
            <dt>
              <strong>Knol</strong>, <em>n;</em>
            </dt>
            <dd>
              A unit of gospel knowledge, representing a discrete measure of understanding or insight related to spiritual or religious teachings.
            </dd>
          </dl>        </div>
        <div className="flex flex-col items-center py-10">
          <p className="text-sm text-gray-500">&copy; Gospel Knols, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
