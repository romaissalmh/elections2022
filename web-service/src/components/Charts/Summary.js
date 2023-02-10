import React from 'react'
import { Table } from "reactstrap";
import { useIntl } from 'react-intl';

function Summary({data}) { 
    const intl = useIntl();

    return (
        
                <Table className="summary" >
                    <tbody>
                       
                        <tr>
                            <th > {intl.formatMessage({ id: 'dashboardSubTitle1' })} </th>
                            <th >  {intl.formatMessage({ id: 'dashboardSubTitle2' })}</th>
                            <th >  {intl.formatMessage({ id: 'dashboardSubTitle3' })}</th>
                           

                        </tr>
                      
                       {
                           
                           data.lower_bound_impressions !== undefined ? 
                           <tr>
                           <td> {data.numberPages.toLocaleString("en-US")} </td>
                            <td> [ {parseInt(data.lower_bound_impressions).toLocaleString("en-US")} ; {parseInt(data.upper_bound_impressions).toLocaleString("en-US")} ] </td>
                            <td> [ {Math.min(parseInt(data.lower_bound_spend),parseInt(data.upper_bound_spend)).toLocaleString("en-US")}  € ; {Math.max(parseInt(data.lower_bound_spend),parseInt(data.upper_bound_spend)).toLocaleString("en-US")}  € ] </td>


                        </tr>
                           : ""
                       }

                    </tbody>
                </Table>
        
    )
}

export default Summary
