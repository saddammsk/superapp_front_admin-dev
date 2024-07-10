/**
 * Represents an image component in the PDF module.
 * @component
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier of the image.
 * @param {number} props.x - The x-coordinate of the image.
 * @param {number} props.y - The y-coordinate of the image.
 * @param {string} props.img - The image source.
 * @param {number} props.width - The width of the image.
 * @param {number} props.height - The height of the image.
 * @param {number} props.pageWidth - The width of the page.
 * @param {number} props.pageHeight - The height of the page.
 * @param {Function} props.removeImage - The function to remove the image.
 * @param {Function} props.updateImageAttachment - The function to update the image attachment.
 * @param {Function} props.setPlaceholderId - The function to set the placeholder ID.
 * @param {string} props.highlightedPlaceholder - Indicates if the placeholder is highlighted.
 * @param {string} props.placeholderKey - The placeholder key.
 * @param {number} props.page - The page number.
 * @param {String} selectedElement - Currently selected placeholder id
 * @returns {JSX.Element} The rendered image component.
 */
import React, { useState, useEffect, useRef } from 'react';
import { DragActions } from '@/pdf-module/entities';
import { getMovePosition } from '@/pdf-module/utils/helpers';
import { Image as ImageComponent } from '@/pdf-module/components/image';

const IMAGE_MAX_SIZE = 300;

const Image = ({
  id,
  x,
  y,
  img,
  width,
  height,
  pageWidth,
  removeImage,
  pageHeight,
  updateImageAttachment,
  setPlaceholderId,
  assigneeName,
  selectedElement,
}) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(width);
  const [canvasHeight, setCanvasHeight] = useState(height);
  const [mouseDown, setMouseDown] = useState(false);
  const [positionTop, setPositionTop] = useState(y);
  const [positionLeft, setPositionLeft] = useState(x);
  const [direction, setDirection] = useState([]);
  const [operation, setOperation] = useState(DragActions.NO_MOVEMENT);
  const [dimmerActive, setDimmerActive] = useState(false);

  useEffect(() => {
    const renderImage = (img) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      let scale = 1;
      if (canvasWidth > IMAGE_MAX_SIZE) {
        scale = IMAGE_MAX_SIZE / canvasWidth;
      }

      if (canvasHeight > IMAGE_MAX_SIZE) {
        scale = Math.min(scale, IMAGE_MAX_SIZE / canvasHeight);
      }

      const newCanvasWidth = canvasWidth * scale;
      const newCanvasHeight = canvasHeight * scale;

      if (newCanvasWidth !== canvasWidth) {
        setCanvasWidth(newCanvasWidth);
      }
      if (newCanvasHeight !== canvasHeight) {
        setCanvasHeight(newCanvasHeight);
      }

      canvas.width = newCanvasWidth;
      canvas.height = newCanvasHeight;

      context.drawImage(img, 0, 0, newCanvasWidth, newCanvasHeight);
      canvas.toBlob((blob) => {
        updateImageAttachment({
          file: blob,
          width: newCanvasWidth,
          height: newCanvasHeight,
        });
      });
    };

    renderImage(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, canvasWidth, canvasHeight]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setMouseDown(true);
    setOperation(DragActions.MOVE);
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    const directions = event.currentTarget.dataset.direction;
    if (directions) {
      setDirection(directions.split('-'));
      setOperation(DragActions.SCALE);
    }
  };

  const handleMouseMove = (event) => {
    event.preventDefault();

    if (mouseDown) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        canvasWidth,
        canvasHeight,
        pageWidth,
        pageHeight
      );

      setPositionTop(top);
      setPositionLeft(left);
    }
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    setMouseDown(false);
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    if (operation === DragActions.MOVE) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        canvasWidth,
        canvasHeight,
        pageWidth,
        pageHeight
      );

      updateImageAttachment({
        x: left,
        y: top,
      });
    }

    if (operation === DragActions.SCALE) {
      updateImageAttachment({
        x: positionLeft,
        y: positionTop,
      });
    }

    setOperation(DragActions.NO_MOVEMENT);
  };

  const handleMouseOut = (event) => {
    if (operation === DragActions.MOVE) {
      // handleMouseUp(event);
    }
  };

  const handleImageScale = (event) => {
    event.preventDefault();

    if (mouseDown) {
      if (direction.includes('left')) {
        setPositionLeft(positionLeft + event.movementX);
        setCanvasWidth(canvasWidth - event.movementX);
      }

      if (direction.includes('top')) {
        setPositionTop(positionTop + event.movementY);
        setCanvasHeight(canvasHeight - event.movementY);
      }

      if (direction.includes('right')) {
        setCanvasWidth(canvasWidth + event.movementX);
      }

      if (direction.includes('bottom')) {
        setCanvasHeight(canvasHeight + event.movementY);
      }
    }
  };

  const handleClick = () => setDimmerActive(true);
  const onCancelDelete = () => setDimmerActive(false);

  const deleteImage = () => {
    onCancelDelete();
    removeImage();
  };

  return (
    <ImageComponent
      id={id}
      onClick={handleClick}
      dimmerActive={dimmerActive}
      cancelDelete={onCancelDelete}
      deleteImage={deleteImage}
      positionLeft={positionLeft}
      positionTop={positionTop}
      canvasRef={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      handleImageScale={handleImageScale}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      handleMouseMove={handleMouseMove}
      handleMouseOut={handleMouseOut}
      setPlaceholderId={setPlaceholderId}
      assigneeName={assigneeName}
      removeImage={removeImage}
      selectedElement={selectedElement}
    />
  );
};

export { Image };
