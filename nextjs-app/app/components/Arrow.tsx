export default function Arrow({className = ""}: {className?: string}) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`h-5 w-5 ${className}`}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
