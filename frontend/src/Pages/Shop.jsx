import { Hero } from "../Components/Hero/Hero";
import Popular from "../Components/Popular/PopularInWomen";
import { Offers } from "../Components/Offers/Offers";
import { PopularInMen } from "../Components/NewCollection/PopularInMen";

function Shop() {
  return (
    <div>
      <Hero />
      <PopularInMen />
      <Offers />
      <Popular />
    </div>
  );
}

export default Shop;
