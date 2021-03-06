import { memo, useMemo, useLayoutEffect, useEffect, useState, useRef } from 'react';
import Link from "next/link";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";

import generateUniqId from "~/helpers/generateUniqId";

import styles from './styles.less';

const LENGHT_OF_FIRST_LAST_PAGES = 2;
const MINIMUM_DISPLAYED_BREADCRUMBS = 1;

/*
 Для оптимизации в pagesByWidth хранятся все возможные состояния pages в зависимости от ширины (а точнее от границ ширины), например
 {
    530: pages без точек
    480: pages с одним набором точек
    430: pages с двумя наборами точек
 }
 При ресайзе производится поиск по pagesByWidth, и в зависимости от найденной ширины подставляется нужный набор хлебных крошек
 */
function Breadcrumbs({ pages: propPages, className }) {
    const uniqid = useMemo(generateUniqId, []);

    const [pages, setPages] = useState(null);
    const [hideLastElement, setHideLastElement] = useState(false);

    const $nav = useRef(null);
    const $wrapper = useRef(null);
    const pagesEnumeration = useRef(0);
    const pagesByWidth = useRef(new Map());
    const currentlyDisplayedWidth = useRef(null);

    function reset(propPages) {
        pagesEnumeration.current = 0;
        pagesByWidth.current = new Map();
        currentlyDisplayedWidth.current = null;

        setHideLastElement(false);
        setPages(propPages);
    }

    function setActualPages() {
        let iterator = 0;

        for (let [width, possiblePages] of pagesByWidth.current) {
            iterator++;

            if ($nav.current.offsetWidth > width) {
                if (currentlyDisplayedWidth.current !== width) {
                    currentlyDisplayedWidth.current = width;

                    setHideLastElement(false);
                    setPages(possiblePages);
                }
                break;
            }

            // если ширина родителя меньше минимальной ширины, то скрываем текст у последней хлебной крошки
            if (iterator === pagesByWidth.current.size) {
                setHideLastElement(true);
                setPages(possiblePages);
            }
        }
    }

    const delayedSetActualPages = throttle(setActualPages, 300);

    useEffect(() => {
        if (propPages) {
            reset(propPages);
        }
    }, [propPages]);

    useEffect(() => {
        window.addEventListener('resize', delayedSetActualPages);

        return () => {
            window.removeEventListener('resize', delayedSetActualPages);
        }
    }, [])

    useLayoutEffect(() => {
        // если впервые отрендерили хлебные крошки и не перебирали все возможные состояния
        if (pages?.length > MINIMUM_DISPLAYED_BREADCRUMBS && pagesEnumeration.current !== null) {
            if (pagesEnumeration.current !== pages.length - LENGHT_OF_FIRST_LAST_PAGES) {
                pagesEnumeration.current += 1;
                pagesByWidth.current.set($wrapper.current.offsetWidth, cloneDeep(pages));

                const newPages = pages.map((page, index) => index === pagesEnumeration.current ? {
                    ...page,
                    title: "...",
                } : page);

                setPages(newPages);
            } else {
                pagesByWidth.current.set($wrapper.current.offsetWidth, cloneDeep(pages));
                pagesEnumeration.current = null;

                setActualPages();
            }
        }
    }, [pages])

    return <nav className={[className, styles.breadcrumbs].join(" ")} ref={$nav}>
        <div className={styles.wrapper} ref={$wrapper} data-hide-last-element={hideLastElement}>
            {pages && pages.length > 1
                ? pages.map((page, index) =>
                    <div className={styles.item} key={uniqid + page.url}>
                        {
                            index + 1 === pages.length
                            ? page.title
                            : <Link href={page.url}>{page.title}</Link>
                        }
                    </div>
                )
                : null
            }
        </div>
    </nav>
}

export default memo(Breadcrumbs);
