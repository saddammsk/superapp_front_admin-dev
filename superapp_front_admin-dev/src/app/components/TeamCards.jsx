'use client' // This is a client component 👈🏽

import { Swiper, SwiperSlide } from 'swiper/react'
import TeamCardItem from '@/app/components/TeamCardItem'
import { useStaffStore } from '@/store/StaffStore'

import 'swiper/css'

export default function TeamCards({ translations }) {
    const {
        staffs,
    } = useStaffStore((state) => ({
        staffs: state.staffs,
    }));
    return (
        <>
            {/* onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)} */}
            <Swiper
                // install Swiper modules
                spaceBetween={50}
                slidesPerView={6}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    400: {
                        slidesPerView: 1,
                    },
                    639: {
                        slidesPerView: 3,
                        spaceBetween:3
                    },
                    1500: {
                        slidesPerView: 4,
                        spaceBetween:10
                    },
                }}
            >
                {staffs.map((data, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <TeamCardItem translations={translations} element={data} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}
