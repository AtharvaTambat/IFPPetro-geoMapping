import Table from 'react-bootstrap/Table'

function Tableform({tableData}){
    return(
        <Table>
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
            {
                tableData.map((data, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.fullName}</td>
                            <td>{data.emailAddress}</td>
                            <td>{data.salary}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}
export default Tableform;