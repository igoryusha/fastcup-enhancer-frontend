import classNames from 'classnames/bind';
import { throttle, uniqueId } from 'lodash';
import React, { FC, useState } from 'react';

import { ClickableAnimatedItemProps } from './ClickableAnimatedItem.types';

import styles from './ClickableAnimatedItem.local.css';

const cx = classNames.bind(styles);

export const ClickableAnimatedItem: FC<ClickableAnimatedItemProps> = (
  props
) => {
  const { className = '', children } = props;

  const [isMouseDownInItem, setIsMouseDownInItem] = useState(false);

  const [ripples, setRipples] = useState<
    {
      id: string;
      scale: number;
      diameter: number;
      top: number;
      left: number;
      shouldLeaveLater?: boolean;
      shouldLeave?: boolean;
    }[]
  >([]);

  const startRippleAnimation = (options: {
    pageX: number;
    pageY: number;
    left: number;
    top: number;
    width: number;
    height: number;
  }) => {
    const { pageX, pageY, left, top, width, height } = options;

    const clickX = pageX - left;
    const clickY = pageY - top;

    const perfectX = width / 2;
    const perfectY = height / 2;

    const shiftDistanceX = Math.abs(perfectX - clickX);
    const shiftDistanceY = Math.abs(perfectY - clickY);
    const blockDiameter = Math.sqrt(width ** 2 + height ** 2);

    const circleDiameter =
      blockDiameter + (shiftDistanceX + shiftDistanceY) * 2;

    setIsMouseDownInItem(true);

    setRipples((prev) => {
      return [
        ...prev,
        {
          id: uniqueId(),
          scale: circleDiameter,
          diameter: 1,

          top: clickY,
          left: clickX,
        },
        // {
        //   diameter: circleDiameter,
        //   top: (height - circleDiameter) / 2,
        //   left: (width - blockDiameter) / 2 - perfectX + clickX,
        // },
      ];
    });
  };

  const stopRippleAnimations = () => {
    setRipples((prev) => {
      return prev.map((ripple) => {
        return { ...ripple, shouldLeave: true };
      });
    });

    setIsMouseDownInItem(false);
  };

  const handleMouseDown = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { currentTarget, pageX, pageY } = evt;

    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    startRippleAnimation({ pageX, pageY, left, top, width, height });
  };

  const handleMouseUp = () => {
    stopRippleAnimations();
  };

  const handleMouseLeave = () => {
    stopRippleAnimations();
  };

  return (
    <div
      className={`${className} ${cx('item')}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div className={cx('ripple-container')}>
        {ripples.map((ripple) => {
          const { id, top, left, diameter, scale, shouldLeave } = ripple;

          const handleShowRippleAnimationEnd = () => {
            setRipples((prev) => {
              return prev.map((i) => {
                if (!isMouseDownInItem && i.id === ripple.id) {
                  return {
                    ...i,
                    shouldLeave: true,
                  }; 
                }

                return i;
              });
            });
          };

          const handleLeaveRippleAnimationEnd = () => {
            setRipples((prev) => {
              return prev.filter((i) => i.id !== ripple.id);
            });
          };

          return (
            <div
              className={cx('ripple')}
              key={id}
              onAnimationEnd={handleShowRippleAnimationEnd}
              style={{
                top,
                left,

                'width': diameter,
                'height': diameter,
                '--scaleToMax-scale': scale,
              }}
            >
              <div
                className={cx('ripple-child', {
                  'ripple-leave': shouldLeave,
                })}
                onAnimationEnd={handleLeaveRippleAnimationEnd}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
