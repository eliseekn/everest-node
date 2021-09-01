import _Head from 'next/head'

export default function Head({ title }) {
    return (
        <_Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="robots" content="noindex, nofollow" />
            <meta name="description" content={title} />
                    
            <title>{title}</title>
        </_Head>
    )
}