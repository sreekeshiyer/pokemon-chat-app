import Head from "next/head";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Pokemon Chat App</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    property="og:title"
                    content="Pokemon Chat App"
                    key="title"
                />
                <meta
                    property="og:description"
                    content="A Chat Application created using Next.js and Supabase."
                    key="description"
                />
            </Head>
            <div className="main-body">
                <main>{children}</main>
            </div>
        </>
    );
}
