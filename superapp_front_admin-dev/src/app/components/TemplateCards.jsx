'use client' // This is a client component 👈🏽

import { useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import TemplateCardItem from '@/app/components/TemplateCardItem'
import { useAppStore } from '@/store/AppStore'
import { useTemplatesStore } from '@/store/TemplatesStore'
import { TOTAL_PAGES_PAGINATION } from '@/consts'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function TemplateCards({ translations }) {
    const {
        search
    } = useAppStore((state) => ({
        search: state.search
    }));

    const {
        templates,
    } = useTemplatesStore((state) => ({
        templates: state.templates,
    }));

    const [paginatedData, setPaginatedData] = useState([]);
    const [controlledSwiper, setControlledSwiper] = useState(null);
    /* paginacion */
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const onPageChange = (data, page) => {
        const startIndex = (page - 1) * (TOTAL_PAGES_PAGINATION + 5);
        const finalIndex = page * (TOTAL_PAGES_PAGINATION + 5);

        setPaginatedData(data.slice(startIndex, finalIndex))
        setCurrentPage(page)
    };

    useEffect(() => {
        if (search.length) {
            setPaginatedData(templates.filter(e => {
                if ((e.template_name && e.template_name.toLowerCase().includes(search.toLowerCase())))
                    return e
            }))
            setTotalPages(0)
        } else {
            onPageChange(templates, 1)
            setTotalPages(Math.ceil(templates.length / (TOTAL_PAGES_PAGINATION + 5)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {

        templates.sort((a, b) => new Date(b.date_create) - new Date(a.date_create));
        onPageChange(templates, 1)
        setTotalPages(Math.ceil(templates.length / (TOTAL_PAGES_PAGINATION + 5)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templates]);
    

    return (
        <>
            <div className="hidden md:block">
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {paginatedData.map((data, index) =>
                        (<TemplateCardItem key={index} translations={translations} element={data} />)
                    )}
                </div>
                {
                    totalPages > 1 && (
                        <div className="flex overflow-x-auto justify-end w-full mt-2 mb-2 pr-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => onPageChange(templates, page)}
                                showIcons
                            />
                        </div>
                    )
                }
            </>
            </div>
            <div className="block md:hidden">
                <Swiper
                    modules={[Controller]} 
                    controller={{ control: controlledSwiper }} 
                    // install Swiper modules
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={true}
                    pagination={true}
                >
                    {templates.map((data, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <TemplateCardItem translations={translations} element={data} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    )
}
