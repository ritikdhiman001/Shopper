import { Hero } from "../Components/Hero/Hero";
import Popular from "../Components/Popular/PopularInWomen";
import { Offers } from "../Components/Offers/Offers";
import { PopularInMen } from "../Components/NewCollection/PopularInMen";
import { NewsLetter } from "../Components/NewsLatter/NewsLetter";

function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <PopularInMen />
      <NewsLetter />
    </div>
  );
}

export default Shop;
