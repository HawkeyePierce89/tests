import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

import BigRed200 from "../../components/BigRed200";
import Breadcrumbs from "../../ui/Breadcrumbs";
import generateUniqId from "../../helpers/generateUniqId";
import sitemap from "../../contexts/sitemap.json";

import styles from './styles.less';

function Catalog() {
    const router = useRouter();
    const [nav, setNav] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState(null);
    const uniqid = useMemo(generateUniqId, []);

    useEffect(() => {
        if (router.query.all) {
            const data = router.query.all.reduce((acc, item) => {
                acc.menu = acc.menu.childs[item];

                acc.url += "/" + item;

                acc.breadcrumbs.push({
                    title: acc.menu.title,
                    url: acc.url,
                });

                return acc;
            }, { menu: sitemap, breadcrumbs: [], url: '' });

            setNav(data.menu?.childs)

            if (data.breadcrumbs) {
                setBreadcrumbs(data.breadcrumbs)
            }
        }
    }, [router.query.all])

    return <section className={styles.all}>
        <Breadcrumbs pages={breadcrumbs} className={styles.breadcrumbs} />

        <BigRed200 />

        {nav
            ? <section>
                <h2>Выберите дальнейший раздел</h2>

                {Object.values(nav).map(item => (
                    <div className={styles.section} key={uniqid + item.url}>
                        <Link href={`/${router.query.all.join("/")}/${item.url}`}>
                            {item.title}
                        </Link>
                    </div>
                ))}
            </section>
            : <div className={styles.empty}>Тут будет контент с товарами</div>
        }
    </section>
}

export default Catalog
