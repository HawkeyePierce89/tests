import Link from 'next/link';

import sitemap from "~/contexts/sitemap.json";

function HomePage() {
    return <section>
        <h1>Здравствуйте</h1>

        <nav>{Object.values(sitemap.childs).map(child => (
            <div key={child.url}><Link href={`/${child.url}`}>{child.title}</Link></div>
        ))}</nav>
    </section>
}

export default HomePage
