import React, {useRef} from "react";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";

import ComponentToPrint from "./ComponentToPrint";
const Example = () => {
    let componentRef = useRef();
    return ( 
        <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => { return <Button>Print this out!</Button>}}
          content={() =>componentRef}
          bodyClass='test'
        />

        {/* component to be printed */}
        <div ref={el =>(componentRef = el) } >
            <h1 className="test">PRINT ME AAAAAAAAAAAA</h1>
        </div>
      </div>
    </>
    )
}
 
export default Example;