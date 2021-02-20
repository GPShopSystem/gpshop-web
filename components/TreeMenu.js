import React, {memo} from 'react';
import { useSpring, animated } from 'react-spring';
import { ChevronRight, ChevronDown, Hash } from 'react-feather';
import { usePrevious, useMeasure } from '../hooks/hooks';
import { useState } from 'react';

const Item = memo(({children,
      name,
      isOpen,
      isChild,
      active,
      onClick,
      onOpen
    }) => {
    const [openArrow, setOpenArrow] = useState(false)
    isOpen = openArrow || isOpen
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
        from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: {
          height: isOpen ? viewHeight : 0,
          opacity: isOpen ? 1 : 0,
          transform: `translate3d(${isOpen ? 0 : 0}px,0,0)`,
        },
    });
    isOpen = isOpen || openArrow
    const Icon = isOpen ? <ChevronDown  /> : <ChevronRight onClick={onOpen}/>

    if(isChild) {
        return (
            <label 
                key={name} 
                className={"treemenu-item-content-item " + (isOpen ? ' active' : '')+ "" }
                onClick={onClick}
            >
                {name}
            </label>
        )
    }
    
    return (
        <div className="treemenu-item">
            <div className="treemenu-item-title">
                <label className={ active ? 'active' : ''} >
                    <span className="thumb">
                        <Hash size={14} />
                    </span>    
                    <span className="name" onClick={onClick} >
                        {name}
                    </span>
                    {
                      children && children.length > 0 ? (
                        <span className="open" onClick={() => setOpenArrow(!openArrow)}> 
                          {children && children.length > 0 ? Icon : null}
                      </span>
                      ) : ''
                    }
                    
                </label>
            </div>
            
            {
              children.length > 0 ? (
                <animated.div style={{
                  opacity,
                  height: isOpen && previous === isOpen ? 'auto' : height,
                  paddingLeft: 60,
                  paddingRight: 15,
                  overflow: 'hidden'
                }}>
                  <animated.div 
                    style={{ transform }} 
                    {...bind} 
                    children={children} />
                </animated.div>
              ) : null
            }
        </div>
    )
})

const TreeMenu = ({
    data,
    onClick,
    active,
  }) => {
    const handler = (children) => {
      return children.map((subOption) => {
        const hasChild = subOption.children?.length
        if (subOption.parent_id) {
          return (
            <Item
              key={subOption.id}
              name={subOption.title}
              onClick={() => onClick(subOption.slug)}
              isOpen={active === subOption.slug}
              isChild
            />
          );
        }
        return (
          <Item
            key={subOption.id}
            name={subOption.title}
            icon={subOption.icon}
            onClick={() => onClick(subOption.slug)}
            active={active === subOption.slug}
            isOpen={
              active === subOption.slug ||
              hasChild && subOption.children.some((item) => item.slug === active)
            }
          >
            {hasChild && handler(subOption.children)}
          </Item>
        );
      });
    };
    return <>{handler(data)}</>;
  };
 
export default TreeMenu;