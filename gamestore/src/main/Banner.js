import { Carousel } from "flowbite-react";
import summerDeal from "./bannerImg/summer-deal.png"
import newOrder from "./bannerImg/new-order.png"

const Banner = () => {
  return (
    <div className="h-56 sm:h-80 lg:h-96 xl:h-[26rem] 3xl:m-5 2xl:mt-5 3xl:mt-6">
      <Carousel slideInterval={8000}>
        <img className="object-cover h-full" src={summerDeal} alt="summer-sale"/>
        <img className="object-cover h-full" src={newOrder} alt="new-order"/>
      </Carousel>
    </div>
  )
}

export default Banner;