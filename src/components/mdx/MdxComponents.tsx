import type { ComponentPropsWithoutRef } from 'react'

function H1(props: ComponentPropsWithoutRef<'h1'>) {
    return <h1 className="mt-10 mb-4 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]" {...props} />
}

function H2(props: ComponentPropsWithoutRef<'h2'>) {
    return <h2 className="mt-8 mb-3 text-[28px] font-semibold leading-[1.3]" {...props} />
}

function H3(props: ComponentPropsWithoutRef<'h3'>) {
    return <h3 className="mt-6 mb-2 text-[22px] font-semibold leading-[1.4]" {...props} />
}

function P(props: ComponentPropsWithoutRef<'p'>) {
    return <p className="mb-6 text-lg leading-[1.8]" style={{ color: 'var(--color-text)' }} {...props} />
}

function A({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) {
    const isExternal = href?.startsWith('http')

    return (
        <a
            href={href}
            className="underline underline-offset-2"
            style={{ color: 'var(--color-accent)' }}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...rest}
        >
            {children}
        </a>
    )
}

function Ul(props: ComponentPropsWithoutRef<'ul'>) {
    return <ul className="mb-6 list-disc pl-6 text-lg leading-[1.8]" {...props} />
}

function Ol(props: ComponentPropsWithoutRef<'ol'>) {
    return <ol className="mb-6 list-decimal pl-6 text-lg leading-[1.8]" {...props} />
}

function Li(props: ComponentPropsWithoutRef<'li'>) {
    return <li className="mb-1" {...props} />
}

function Blockquote(props: ComponentPropsWithoutRef<'blockquote'>) {
    return (
        <blockquote
            className="mb-6 border-l-3 pl-4 italic"
            style={{
                borderColor: 'var(--color-accent)',
                color: 'var(--color-text-secondary)',
            }}
            {...props}
        />
    )
}

function Code(props: ComponentPropsWithoutRef<'code'>) {
    return (
        <code
            className="rounded px-1.5 py-0.5 font-mono text-[15px]"
            style={{ backgroundColor: 'var(--color-code-bg)' }}
            {...props}
        />
    )
}

function Pre(props: ComponentPropsWithoutRef<'pre'>) {
    return (
        <pre
            className="mb-6 overflow-x-auto rounded-lg p-4 font-mono text-[15px] leading-[1.6]"
            style={{ backgroundColor: 'var(--color-code-bg)' }}
            {...props}
        />
    )
}

function Img(props: ComponentPropsWithoutRef<'img'>) {
    return <img className="my-6 rounded-lg" loading="lazy" {...props} />
}

function Hr(props: ComponentPropsWithoutRef<'hr'>) {
    return <hr className="my-8" style={{ borderColor: 'var(--color-border)' }} {...props} />
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
