/*
* This hook is used to manage the state of the PDF viewer.
* The state includes the current page, the dimensions of the page, the file, the name of the PDF, and the attachments.
* The hook also includes functions to navigate between pages, save the PDF, and initialize the state.
*/

import React, { useState, useCallback } from 'react';
import { save } from '@/pdf-module/utils/pdf';

export const usePdf = () => {
  const [name, setName] = useState('');
  const [pageIndex, setPageIndex] = useState(-1);
  const [dimensions, setDimensions] = useState();
  const [file, setFile] = useState();
  const [pages, setPages] = useState([]);
  const [isMultiPage, setIsMultiPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const currentPage = pages[pageIndex];

  const setDimensionsHandler = useCallback(setDimensions, [setDimensions]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < pages.length) {
      setPageIndex(pageNumber);
      setIsFirstPage(pageNumber === 0);
      setIsLastPage(pageNumber === pages.length - 1);
    }
  };

  const nextPage = () => {
    const newPageIndex = pageIndex + 1;
    setPageIndex(pageIndex + 1);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pages.length - 1);
  };

  const previousPage = () => {
    const newPageIndex = pageIndex - 1;
    setPageIndex(newPageIndex);
    setIsFirstPage(newPageIndex === 0);
    setIsLastPage(newPageIndex === pages.length - 1);
  };

  const initialize = ({ name, file, pages: _pages }) => {
    const multi = _pages.length > 1;
    setName(name);
    setFile(file);
    setPages(_pages);
    setPageIndex(0);
    setIsMultiPage(multi);
    setIsFirstPage(true);
    setIsLastPage(_pages.length === 1);
  };

  const savePdf = async (attachments) => {
    if (isSaving || !file) return;

    setIsSaving(true);

    try {
      await save(file, attachments, name);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    currentPage,
    dimensions,
    setDimensions: setDimensionsHandler,
    name,
    setName,
    pageIndex,
    setPageIndex,
    file,
    setFile,
    nextPage,
    pages,
    savePdf,
    initialize,
    isMultiPage,
    previousPage,
    isFirstPage,
    isLastPage,
    isSaving,
    goToPage
  };
};
