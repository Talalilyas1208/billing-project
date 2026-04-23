import { Card } from "antd"

export default function CardComponent(props) {
const {style = {},children} =props;

    return(
        <>
      <Card style= {{...style}}>
    
        {children}
      </Card>
        
        </>
    )
}