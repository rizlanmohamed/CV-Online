import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () =>{
const navigate = useNavigate();
 return (
  <Result
  style={{marginTop: 80}}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => navigate("/sign-in")}>Back Home</Button>}
  />
)};
export default NotFound;