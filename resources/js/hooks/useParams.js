import useQuery from '@/hooks/useQuery';

const useParams = () => {
    const query = useQuery();

    const initParams = {
        sort_column: 'id',
        direction: 'desc',
        per_page: 10,
        ...query
    };

    return initParams;
}

export default useParams