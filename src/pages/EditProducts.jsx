import { useParams } from "react-router-dom";

export default function EditProducts() {
  const { id } = useParams();

  console.log(id); // 12

  return <div>Edit Product {id}</div>;
}