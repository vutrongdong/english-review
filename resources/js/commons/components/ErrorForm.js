const ErrorForm = ({ error }) => {
    if (!(error && error[0])) return (<></>);

    return (
        <span className="invalid-feedback">
            <strong>{ error[0] }</strong>
        </span>
    )
}

export default ErrorForm;