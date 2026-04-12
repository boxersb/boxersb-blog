import type {ComponentPropsWithoutRef} from 'react'

function H1(properties: ComponentPropsWithoutRef<'h1'>) {
    return <h1 className="mt-10 mb-4 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]" {...properties} />
}

function H2(properties: ComponentPropsWithoutRef<'h2'>) {
    return <h2 className="mt-8 mb-3 text-[28px] font-semibold leading-[1.3]" {...properties} />
}

function H3(properties: ComponentPropsWithoutRef<'h3'>) {
    return <h3 className="mt-6 mb-2 text-[22px] font-semibold leading-[1.4]" {...properties} />
}

function P(properties: ComponentPropsWithoutRef<'p'>) {
    return <p className="mb-6 text-lg leading-[1.8]" style={{color: 'var(--color-text)'}} {...properties} />
}

function A({href, children, ...rest}: ComponentPropsWithoutRef<'a'>) {
    const isExternal = href?.startsWith('http')

    return (
        <a
            href={href}
            className="underline underline-offset-2"
            style={{color: 'var(--color-accent)'}}
            {...(isExternal ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
            {...rest}
        >
            {children}
        </a>
    )
}

function Ul(properties: ComponentPropsWithoutRef<'ul'>) {
    return <ul className="mb-6 list-disc pl-6 text-lg leading-[1.8]" {...properties} />
}

function Ol(properties: ComponentPropsWithoutRef<'ol'>) {
    return <ol className="mb-6 list-decimal pl-6 text-lg leading-[1.8]" {...properties} />
}

function Li(properties: ComponentPropsWithoutRef<'li'>) {
    return <li className="mb-1" {...properties} />
}

function Blockquote(properties: ComponentPropsWithoutRef<'blockquote'>) {
    return (
        <blockquote
            className="mb-6 border-l-3 pl-4 italic"
            style={{
                borderColor: 'var(--color-accent)',
                color: 'var(--color-text-secondary)',
            }}
            {...properties}
        />
    )
}

function Code(properties: ComponentPropsWithoutRef<'code'>) {
    return (
        <code
            className="rounded px-1.5 py-0.5 font-mono text-[15px]"
            style={{backgroundColor: 'var(--color-code-bg)'}}
            {...properties}
        />
    )
}

function Pre(properties: ComponentPropsWithoutRef<'pre'>) {
    return (
        <pre
            className="mb-6 overflow-x-auto rounded-lg p-4 font-mono text-[15px] leading-[1.6]"
            style={{backgroundColor: 'var(--color-code-bg)'}}
            {...properties}
        />
    )
}

function Img(properties: ComponentPropsWithoutRef<'img'>) {
    return <img className="my-6 rounded-lg" loading="lazy" {...properties} />
}

function Hr(properties: ComponentPropsWithoutRef<'hr'>) {
    return <hr className="my-8" style={{borderColor: 'var(--color-border)'}} {...properties} />
}

export const mdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    a: A,
    ul: Ul,
    ol: Ol,
    li: Li,
    blockquote: Blockquote,
    code: Code,
    pre: Pre,
    img: Img,
    hr: Hr,
}
