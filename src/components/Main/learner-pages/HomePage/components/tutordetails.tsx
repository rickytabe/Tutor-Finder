import { AlertCircle } from 'lucide-react';
import NavBar from './nav_bar'

const WorkInProgress = () => {
  return (
      <div>
       <NavBar/>
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
          <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 text-center shadow-lg">
            <div className="mx-auto flex items-center justify-center text-blue-600">
              <AlertCircle className="h-12 w-12" strokeWidth={1.5} />
            </div>
        
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Still working on it
            </h1>
        
            <div className="inline-block rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
              Break on production
            </div>
        
            <p className="text-lg text-slate-600">
              Currently working on it
            </p>
        
            <p className="text-sm text-slate-500">
              Please check back later. Thank you for your patience!
            </p>
          </div>
        </div>
    </div>
  );
};

export default WorkInProgress;