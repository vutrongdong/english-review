import InputForm from '@/commons/components/InputForm';

const Search = ({ showFormSearch, paramsSearch, handleChangeParamsSearch, handleSearch }) => {
    if (!showFormSearch) return (<></>);

    const handleChange = async (value, name) => {
        handleChangeParamsSearch({
            ...paramsSearch,
            [name]: value
        })
    }

    const handleReset = () => {
        handleChangeParamsSearch({name: '', slug: ''})
    }

    return (
        <div id="searchArea" className="col-md-12 mt-2">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <InputForm
                            label="Nhập danh mục"
                            value={paramsSearch.name}
                            handleChange={handleChange}
                            name="name" 
                            placeholder="Tên danh mục"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <InputForm
                            label="Nhập tên không dấu"
                            value={paramsSearch.slug}
                            handleChange={handleChange}
                            name="slug" 
                            placeholder="Tên không dấu"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center mb-3">
                <button className="btn btn-default mr-1" type="button" onClick={() => handleReset()}>Làm mới</button>
                <button className="btn btn-success" type="submit" onClick={() => handleSearch()}>Tìm kiếm</button>
            </div>
        </div>
    )
}

export default Search