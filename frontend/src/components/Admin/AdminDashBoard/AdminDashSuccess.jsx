import ProductService from "../../../services/ProductService";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashSuccess = () => {
  const [allproducts, setAllProducts] = useState([]);

  const [displayProducts, setDisplayProducts] = useState([]);

  const [searchText, setSearchText] = useState("");

  const fetchAllFromDatabase = () => {
    ProductService.getAllProducts()
      .then((result) => {
        console.log("View All: ", result);
        setAllProducts([...result.data]);
        setDisplayProducts([...result.data]);
      })
      .catch((err) => {
        console.log("Error in view fetch all " + err);
        throw err;
      });
  };

  useEffect(() => {
    fetchAllFromDatabase();
  }, []);

  const deleteProduct = (productId) => {
    ProductService.deleteProductById(productId)
      .then((data) => {
        console.log(data);
        fetchAllFromDatabase();
      })
      .catch((err) => {
        console.log("Error in view all button " + err);
        throw err;
      });
  };


  useEffect(()=>{
if(searchText!==""){
  let searchedProduct = allproducts.filter(p=>p.productName.includes(searchText));
  setDisplayProducts([...searchedProduct]);
}else{
  if(allproducts.length>0){
    setDisplayProducts([...allproducts])
  }
}
  }, [searchText])

  const handleChange = (e)=>{
    setSearchText(e.target.value);
  }

  return (
    <div>
      <h1 className="text-center mb-3 ">Welcome to Project Management</h1>

      <div>
        <form>
          <div className="w-3/5 mx-auto">
            <div className="flex flex-wrap">
              <label htmlFor="search"> Search Product</label>
              <input type="text" name="input_search" id="search" value={searchText} onChange={handleChange} />
            </div>
          </div>
        </form>
      </div>

      <table className="table table-striped">
        <thead>
          <tr className="text-center">
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product Quantity</th>
            <th scope="col">Product Category Id</th>
            <th scope="col">Product Image URL</th>
            <th scope="col">Product Description</th>
            <th colSpan={3}>Product Action</th>
          </tr>
        </thead>

        <tbody>
          {displayProducts.map((product) => (
            <tr className="text-center" key={product.id}>
              <th>{product.id}</th>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.categoryId}</td>
              <td>{product.imageUrl}</td>
              <td>{product.description}</td>
              <td>
                <Link
                  to={`/admin/viewProduct/${product.id}`}
                  state={{ viewProduct: product }}
                >
                  <button
                    type="button"
                    id="view"
                    name="btn_view"
                    className="btn btn-outline-success"
                  >
                    View
                  </button>
                </Link>
              </td>
              <td>
                <Link
                  to={`/admin/editProduct/${product.id}`}
                  state={{ editProduct: product }}
                >
                  <button
                    type="button"
                    id="update"
                    name="btn_update"
                    className="btn btn-outline-info"
                  >
                    Update
                  </button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  id="delete"
                  name="btn_delete"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    deleteProduct(product.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Outlet></Outlet>
    </div>
  );
};

export default AdminDashSuccess;
