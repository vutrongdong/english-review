export const BodyTable = (tbody) => {
    if (tbody) {
        return (
            <tbody className="small">
                { tbody }
            </tbody>
        )
    }

    return (
        <tbody className="small">
            <tr>
                <th className="text-center bg-light" colSpan="11">
                    <div className="text-muted">
                        Không có kết quả được tìm thấy
                    </div>
                </th>
            </tr>
        </tbody>
    )
}