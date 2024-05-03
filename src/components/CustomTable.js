import React from "react";
import { Link } from 'react-router-dom';

const CustomTable = ({data, headers, type}) => {
  return (
    <div className="custom-table">
      <div className="desktop-version" >
        <div className="custom-table-header">
          {
            headers.map((item, index) => (
              <div className="child-cell" key={index}>
                <p>{item}</p>
              </div>
            ))
          }        
        </div>
        <div className="custom-table-content">
          {
            data.map((item, index) => (
              <div className="custom-table-cell" key={index}>
                <div className={`child-cell ${type === "student" ? "with-avatar" : ""}`}>                
                  { type === "student" ?  
                      <div className="avatar-part">
                        <img src={item.img} alt=""/>
                      </div>: ""
                  }
                  <p>{item.studentName}</p>
                </div>
                <div className="child-cell">
                  <p>{item.lessonNumber}</p>
                </div>
                <div className="child-cell with-button">
                  <p>{item.lessonDate}</p>
                  <Link to={type === "student" ? '/students/' + item.id : '#'}>View Details</Link>
                </div>                    
              </div>
            ))
          }
        </div>
      </div>
      <div className="mobile-version">
        {
          data.map((item, index) => (
            <table key={index}>
              <tbody>
                <tr>
                  <td>{headers[0]}</td>
                  <td>{item.studentName}</td>
                </tr>
                <tr>
                  <td>{headers[1]}</td>
                  <td>{item.lessonNumber}</td>
                </tr>
                <tr>
                  <td>{headers[2]}</td>
                  <td>
                    <p>{item.lessonDate}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    {type === "student" ?  
                        <div className="avatar-part">
                          <img src={item.img} alt=""/>
                        </div>: ""
                    }
                  </td>
                  <td>
                    <Link to={type === "student" ? '/students/' + item.id : '#'}>View Details</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        }            
      </div>     
    </div>
  )
}

export default CustomTable;
