// contexts/GigContext.tsx
import { createContext, useCallback, useContext, useState } from "react";
import { Gig } from "../types/gigsTypes";
import { getGigs } from "../services/gigService";
import { ReactNode } from "react";

type GigContextType = {
  gigs: Gig[];
  loadGigs: () => Promise<void>;
  loading: boolean;
  error: string;
};

const GigContext = createContext<GigContextType>({} as GigContextType);

export const GigProvider = ({ children }: { children: ReactNode }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadGigs = useCallback(async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const user_id = user.id;
      const data = await getGigs({
        learner_id: user_id,
        page: 1,
        per_page: 10,
        include: "category,learner",
      });
      setGigs(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GigContext.Provider value={{ gigs, loadGigs, loading, error }}>
      {children}
    </GigContext.Provider>
  );
};

export const useGigs = () => useContext(GigContext);
