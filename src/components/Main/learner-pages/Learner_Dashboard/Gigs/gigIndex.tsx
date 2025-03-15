// App.tsx
import { GigProvider } from './context/gigContext';
import GigList  from './components/gigs/gigList';

const Gigs = () => {
  return (
    <GigProvider>
      <div className="container mx-auto p-4">
        <GigList />
      </div>
    </GigProvider>
  );
}

export default Gigs;
