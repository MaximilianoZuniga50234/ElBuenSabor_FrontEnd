import { useStore as useStoreP } from "../store/ProductStore";

const Landing = () => {
  const { products } = useStoreP();

  return (
    <div>
      <div style={{margin: "80px 0 0 0"}}></div>
      {products?.map((p) => {
        return <div key={p.id}>{p.denomination}</div>;
      })}
    </div>
  );
};

export default Landing;
