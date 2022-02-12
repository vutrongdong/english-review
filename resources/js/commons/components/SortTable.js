const SortTable = ({params, name, handleSort}) => {
    const getClassIconSort = (column) => {
        const {sort_column, direction} = params;
        let className = 'fas fa-sort';

        if(sort_column === column) {
            className = direction === 'asc' ? 'fas fa-sort-amount-up' : 'fas fa-sort-amount-down';
        }

        return className;
    };

    const sort = (sort_column) => {
        const sortValue = {
            sort_column,
            direction: params.direction === "asc" ? "desc" : "asc"
        };

        handleSort(sortValue);
    };

    return (
        <a onClick={() => sort(name)}>
            <i className={getClassIconSort(name)}></i>
        </a>
    )
}

export default SortTable;