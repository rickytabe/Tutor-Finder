// components/Icons.tsx
import { 
    Search, Globe, Monitor, MapPin, DollarSign, Star, Clock, Briefcase, User, RefreshCw, Calendar, Sun,
    ChevronDown, ChevronUp, Users, Book
  } from 'react-feather';
  
  interface IconProps {
    name: string;
    className?: string;
    size?: number;
  }
  
  const Icon = ({ name, className = "", size = 18 }: IconProps) => {
    const icons: { [key: string]: JSX.Element } = {
      search: <Search className={className} size={size} />,
      globe: <Globe className={className} size={size} />,
      monitor: <Monitor className={className} size={size} />,
      mappin: <MapPin className={className} size={size} />,
      dollar: <DollarSign className={className} size={size} />,
      star: <Star className={className} size={size} />,
      clock: <Clock className={className} size={size} />,
      briefcase: <Briefcase className={className} size={size} />,
      user: <User className={className} size={size} />,
      refresh: <RefreshCw className={className} size={size} />,
      calendar: <Calendar className={className} size={size} />,
      sun: <Sun className={className} size={size} />,
      chevrondown: <ChevronDown className={className} size={size} />,
      chevronup: <ChevronUp className={className} size={size} />,
      users: <Users className={className} size={size} />,
      book: <Book className={className} size={size} />
    };
  
    return icons[name.toLowerCase()] || null;
  };
  
  export default Icon;