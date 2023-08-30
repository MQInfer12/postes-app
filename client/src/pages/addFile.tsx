import { useNavigate } from "react-router-dom";
import { useJsonData } from "../context/jsonData";
import { useEffect } from 'react'

const AddFile = () => {
  const navigate = useNavigate();
  const { setJsonData, jsonData } = useJsonData();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setJsonData(JSON.parse(content as string));
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    console.log(Object.keys(jsonData).length)
    if(Object.keys(jsonData).length) {
      navigate("/map");
    }
  }, [jsonData]);
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}

export default AddFile