import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; 
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { getImageUrl } from "../utils/imageLoader"


export default function ImageSwiper() {
    return (
        <div className="image-swiper">
          <Swiper
            // loop={true}
            // modules={[Pagination]}
            // scrollbar={{ draggable: true }}
            // pagination={{ clickable: true, type: 'bullets' }}  slidesPerView={4} spaceBetween={30}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }} 
            // pagination={true}
            modules={[Autoplay,EffectCoverflow, Pagination]}
            className="image-swiper-slot"
          >
            <SwiperSlide><img src={getImageUrl('images/carousel1.jpg')} alt="Slide 1" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel2.png')} alt="Slide 2" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel3.jpg')} alt="Slide 3" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel3.jpg')} alt="Slide 3" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel2.jpg')} alt="Slide 2" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel3.jpg')} alt="Slide 3" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel1.jpg')} alt="Slide 1" /></SwiperSlide>
            <SwiperSlide><img src={getImageUrl('images/carousel3.jpg')} alt="Slide 3" /></SwiperSlide>
          </Swiper>
        </div>
    )
}