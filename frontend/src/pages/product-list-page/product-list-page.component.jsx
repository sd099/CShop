import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message.component";
import Loader from "../../components/loader/loader.component";
import Paginate from "../../components/paginate/paginate.component";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../redux/products/product.actions";
import { PRODUCT_CREATE_RESET } from "../../redux/products/product.types";

const ProductListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Product <b>List</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <Link
                  to="#"
                  onClick={createProductHandler}
                  className="a btn btn-success"
                  data-toggle="modal"
                >
                  <i className="fas fa-plus"></i> <span>Add New Product</span>
                </Link>
              </div>
            </div>
          </div>

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>
                        <Link
                          to={`/admin/product/${product._id}/edit`}
                          className="a edit"
                          data-toggle="modal"
                        >
                          <i title="Edit" className="fas fa-edit"></i>
                        </Link>
                        <Link
                          to="#"
                          className="a delete"
                          data-toggle="modal"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i title="Delete" className="fas fa-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
