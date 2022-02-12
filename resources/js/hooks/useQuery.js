import { useLocation } from 'react-router-dom';

const useQuery = () => {
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    return paramsToObject( query );
}

const paramsToObject = (entries) => {
    const result = {}
    for(const [key, value] of entries) {
      result[key] = value;
    }
    return result;
}

export default useQuery